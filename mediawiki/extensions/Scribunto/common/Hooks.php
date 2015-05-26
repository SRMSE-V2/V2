<?php
/**
 * Wikitext scripting infrastructure for MediaWiki: hooks.
 * Copyright (C) 2009-2012 Victor Vasiliev <vasilvv@gmail.com>
 * http://www.mediawiki.org/
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 * http://www.gnu.org/copyleft/gpl.html
 */

/**
 * Hooks for the Scribunto extension.
 */
class ScribuntoHooks {
	/**
	 * Get software information for Special:Version
	 * @param &$software array
	 * @return bool
	 */
	public static function getSoftwareInfo( &$software ) {
		$engine = Scribunto::newDefaultEngine();
		$engine->setTitle( Title::makeTitle( NS_SPECIAL, 'Version' ) );
		$engine->getSoftwareInfo( $software );
		return true;
	}

	/**
	 * Register parser hooks.
	 * @param $parser Parser
	 * @return bool
	 */
	public static function setupParserHook( &$parser ) {
		$parser->setFunctionHook( 'invoke', 'ScribuntoHooks::invokeHook', SFH_OBJECT_ARGS );
		return true;
	}

	/**
	 * Called when the interpreter is to be reset.
	 *
	 * @param $parser Parser
	 * @return bool
	 */
	public static function clearState( &$parser ) {
		Scribunto::resetParserEngine( $parser );
		return true;
	}

	/**
	 * Called when the parser is cloned
	 *
	 * @param $parser Parser
	 * @return bool
	 */
	public static function parserCloned( $parser ) {
		$parser->scribunto_engine = null;
		return true;
	}

	/**
	 * Hook function for {{#invoke:module|func}}
	 *
	 * @param $parser Parser
	 * @param $frame PPFrame
	 * @param $args array
	 * @throws MWException
	 * @throws ScribuntoException
	 * @return string
	 */
	public static function invokeHook( &$parser, $frame, $args ) {
		if ( !@constant( get_class( $frame ) . '::SUPPORTS_INDEX_OFFSET' ) ) {
			throw new MWException(
				'Scribunto needs MediaWiki 1.20 or later (Preprocessor::SUPPORTS_INDEX_OFFSET)' );
		}

		wfProfileIn( __METHOD__ );

		try {
			if ( count( $args ) < 2 ) {
				throw new ScribuntoException( 'scribunto-common-nofunction' );
			}
			$moduleName = trim( $frame->expand( $args[0] ) );
			$engine = Scribunto::getParserEngine( $parser );
			$title = Title::makeTitleSafe( NS_MODULE, $moduleName );
			if ( !$title || Scribunto::isDocPage( $title ) ) {
				throw new ScribuntoException( 'scribunto-common-nosuchmodule', array( 'args' => array( $moduleName ) ) );
			}
			$module = $engine->fetchModuleFromParser( $title );
			if ( !$module ) {
				throw new ScribuntoException( 'scribunto-common-nosuchmodule', array( 'args' => array( $moduleName ) ) );
			}
			$functionName = trim( $frame->expand( $args[1] ) );

			$bits = $args[1]->splitArg();
			unset( $args[0] );
			unset( $args[1] );

			// If $bits['index'] is empty, then the function name was parsed as a
			// key=value pair (because of an equals sign in it), and since it didn't
			// have an index, we don't need the index offset.
			$childFrame = $frame->newChild( $args, $title, $bits['index'] === '' ? 0 : 1 );
			$result = $module->invoke( $functionName, $childFrame );
			$result = UtfNormal::cleanUp( strval( $result ) );

			wfProfileOut( __METHOD__ );
			return $result;
		} catch( ScribuntoException $e ) {
			$trace = $e->getScriptTraceHtml( array( 'msgOptions' => array( 'content' ) ) );
			$html = Html::element( 'p', array(), $e->getMessage() );
			if ( $trace !== false ) {
				$html .= Html::element( 'p',
					array(),
					wfMessage( 'scribunto-common-backtrace' )->inContentLanguage()->text()
				) . $trace;
			} else {
				$html .= Html::element( 'p',
					array(),
					wfMessage( 'scribunto-common-no-details' )->inContentLanguage()->text()
				);
			}
			$out = $parser->getOutput();
			if ( !isset( $out->scribunto_errors ) ) {
				$out->addOutputHook( 'ScribuntoError' );
				$out->scribunto_errors = array();
				$parser->addTrackingCategory( 'scribunto-common-error-category' );
			}

			$out->scribunto_errors[] = $html;
			$id = 'mw-scribunto-error-' . ( count( $out->scribunto_errors ) - 1 );
			$parserError = htmlspecialchars( $e->getMessage() );
			wfProfileOut( __METHOD__ );

			// #iferror-compatible error element
			return "<strong class=\"error\"><span class=\"scribunto-error\" id=\"$id\">" .
				$parserError. "</span></strong>";
		}
	}

	/**
	 * @param $title Title
	 * @param $lang string
	 * @return bool
	 */
	public static function getCodeLanguage( $title, &$lang ) {
		global $wgScribuntoUseCodeEditor;
		if( $wgScribuntoUseCodeEditor && $title->getNamespace() == NS_MODULE &&
			!Scribunto::isDocPage( $title )
		) {
			$engine = Scribunto::newDefaultEngine();
			if( $engine->getCodeEditorLanguage() ) {
				$lang = $engine->getCodeEditorLanguage();
				return false;
			}
		}

		return true;
	}

	/**
	 * Set the Scribunto content handler for modules
	 * @param $title Title
	 * @param &$model string
	 * @return bool
	 */
	public static function contentHandlerDefaultModelFor( $title, &$model ) {
		if( $title->getNamespace() == NS_MODULE && !Scribunto::isDocPage( $title ) ) {
			$model = 'Scribunto';
			return false;
		}
		return true;
	}

	/**
	 * Adds report of number of evaluations by the single wikitext page.
	 *
	 * @deprecated
	 * @param $parser Parser
	 * @param $report
	 * @return bool
	 */
	public static function reportLimits( $parser, &$report ) {
		if ( Scribunto::isParserEnginePresent( $parser ) ) {
			$engine = Scribunto::getParserEngine( $parser );
			$report .= $engine->getLimitReport();
		}
		return true;
	}

	/**
	 * Adds report of number of evaluations by the single wikitext page.
	 *
	 * @param $parser Parser
	 * @param $output ParserOutput
	 * @return bool
	 */
	public static function reportLimitData( $parser, $output ) {
		// Unhook the deprecated hook, since the new one exists.
		global $wgHooks;
		unset( $wgHooks['ParserLimitReport']['scribunto'] );

		if ( Scribunto::isParserEnginePresent( $parser ) ) {
			$engine = Scribunto::getParserEngine( $parser );
			$engine->reportLimitData( $output );
		}
		return true;
	}

	/**
	 * Formats the limit report data
	 *
	 * @param $key string
	 * @param &$value string
	 * @param &$report string
	 * @param $isHTML bool
	 * @param $localize bool
	 * @return bool
	 */
	public static function formatLimitData( $key, &$value, &$report, $isHTML, $localize ) {
		$engine = Scribunto::newDefaultEngine();
		return $engine->formatLimitData( $key, $value, $report, $isHTML, $localize );
	}

	/**
	 * Adds the module namespaces.
	 */
	public static function addCanonicalNamespaces( &$list ) {
		$list[NS_MODULE] = 'Module';
		$list[NS_MODULE_TALK] = 'Module_talk';
		return true;
	}

	/**
	 * EditPageBeforeEditChecks hook
	 * @param $editor EditPage
	 * @param $checkboxes Checkbox array
	 * @param $tabindex Current tabindex
	 */
	public static function beforeEditChecks( &$editor, &$checkboxes, &$tabindex ) {
		if ( $editor->getTitle()->getNamespace() !== NS_MODULE ) {
			return true;
		}

		if ( Scribunto::isDocPage( $editor->getTitle() ) ) {
			return true;
		}

		$req = RequestContext::getMain()->getRequest();
		$name = 'scribunto_ignore_errors';

		$attribs = array(
			'tabindex' => ++$tabindex,
			'id' => "mw-$name",
		);
		$checkboxes['scribunto'] =
			Xml::check( $name, $req->getCheck( $name ), $attribs ) .
			'&#160;' .
			Xml::label( wfMessage( 'scribunto-ignore-errors' )->text(), "mw-$name" );

		// While we're here, lets set up the edit module
		global $wgOut;
		$wgOut->addModules( 'ext.scribunto.edit' );
		$editor->editFormTextAfterTools = '<div id="mw-scribunto-console"></div>';
		return true;
	}

	/**
	 * EditPageBeforeEditButtons hook
	 * @param $editor EditPage
	 * @param $buttons Button array
	 * @param $tabindex Current tabindex
	 */
	public static function beforeEditButtons( &$editor, &$buttons, &$tabindex ) {
		if ( $editor->getTitle()->getNamespace() !== NS_MODULE ) {
			return true;
		}

		if ( Scribunto::isDocPage( $editor->getTitle() ) ) {
			return true;
		}

		unset( $buttons['preview'] );
		return true;
	}

	/**
	 * @param $editor EditPage
	 * @param $text string
	 * @param $error
	 * @param $summary
	 * @return bool
	 */
	public static function validateScript( $editor, $text, &$error, $summary ) {
		global $wgOut;
		$title = $editor->getTitle();

		if( $title->getNamespace() != NS_MODULE ) {
			return true;
		}

		if ( Scribunto::isDocPage( $title ) ) {
			return true;
		}

		$req = RequestContext::getMain()->getRequest();
		if ( $req->getBool( 'scribunto_ignore_errors' ) ) {
			return true;
		}

		$engine = Scribunto::newDefaultEngine();
		$engine->setTitle( $title );
		$status = $engine->validate( $text, $title->getPrefixedDBkey() );
		if( $status->isOK() ) {
			return true;
		}

		$errmsg = $status->getWikiText( 'scribunto-error-short', 'scribunto-error-long' );
		$error = <<<WIKI
<div class="errorbox">
{$errmsg}
</div>
<br clear="all" />
WIKI;
		if ( isset( $status->scribunto_error->params['module'] ) ) {
			$module = $status->scribunto_error->params['module'];
			$line = $status->scribunto_error->params['line'];
			if ( $module === $title->getPrefixedDBkey() && preg_match( '/^\d+$/', $line ) ) {
				$wgOut->addInlineScript( 'window.location.hash = ' . Xml::encodeJsVar( "#mw-ce-l$line" ) );
			}
		}

		return true;
	}

	/**
	 * @param $files array
	 * @return bool
	 */
	public static function unitTestsList( &$files ) {
		$tests = array(
			'engines/LuaStandalone/LuaStandaloneInterpreterTest.php',
			'engines/LuaStandalone/StandaloneTest.php',
			'engines/LuaSandbox/LuaSandboxInterpreterTest.php',
			'engines/LuaSandbox/SandboxTest.php',
			'engines/LuaCommon/LuaEnvironmentComparisonTest.php',
			'engines/LuaCommon/CommonTest.php',
			'engines/LuaCommon/SiteLibraryTest.php',
			'engines/LuaCommon/UriLibraryTest.php',
			'engines/LuaCommon/UstringLibraryTest.php',
			'engines/LuaCommon/MessageLibraryTest.php',
			'engines/LuaCommon/TitleLibraryTest.php',
			'engines/LuaCommon/TextLibraryTest.php',
			'engines/LuaCommon/HtmlLibraryTest.php',
			'engines/LuaCommon/LanguageLibraryTest.php',
			'engines/LuaCommon/UstringLibraryPureLuaTest.php',
		);
		foreach ( $tests as $test ) {
			$files[] = __DIR__ . '/../tests/' . $test;
		}
		return true;
	}

	/**
	 * @param $outputPage OutputPage
	 * @param $parserOutput ParserOutput
	 */
	public static function parserOutputHook( $outputPage, $parserOutput ) {
		// Only run the following if we're not on mobile as ext.scribunto doesn't work on mobile. Bug 59808
		if ( $outputPage->getTarget() === 'mobile' ) {
			return;
		}

		$outputPage->addModules( 'ext.scribunto' );
		$outputPage->addInlineScript(
			'mw.loader.using("ext.scribunto", function() {' .
				Xml::encodeJsCall( 'mw.scribunto.setErrors', array( $parserOutput->scribunto_errors ) )
			. '});'
		);
	}

	/**
	 * @param &$article Article
	 * @param &$outputDone boolean
	 * @param &$pcache boolean
	 * @return boolean
	 */
	public static function showDocPageHeader( &$article, &$outputDone, &$pcache ) {
		global $wgOut;

		$title = $article->getTitle();
		if ( Scribunto::isDocPage( $title, $forModule ) ) {
			$wgOut->addHTML(
				wfMessage( 'scribunto-doc-page-header', $forModule->getPrefixedText() )->parseAsBlock()
			);
		}
		return true;
	}
}
