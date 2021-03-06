<?php


# This file was automatically generated by the MediaWiki 1.23.6
# installer. If you make manual changes, please keep track in case you
# need to recreate them later.
#
# See includes/DefaultSettings.php for all configurable settings
# and their default values, but don't forget to make changes in _this_
# file, not there.
#
# Further documentation for configuration settings may be found at:
# https://www.mediawiki.org/wiki/Manual:Configuration_settings

# Protect against web entry
if ( !defined( 'MEDIAWIKI' ) ) {
	exit;
}

## Uncomment this to disable output compression
# $wgDisableOutputCompression = true;

$wgSitename = "wiki";
$wgMetaNamespace = "Wiki";

## The URL base path to the directory containing the wiki;
## defaults for all runtime URL paths are based off of this.
## For more information on customizing the URLs
## (like /w/index.php/Page_title to /wiki/Page_title) please see:
## https://www.mediawiki.org/wiki/Manual:Short_URL
$wgScriptPath = "/mediawiki";
$wgScriptExtension = ".php";

## The protocol and server name to use in fully-qualified URLs
$wgServer = "http://srmsearchengine.in";

## The relative URL path to the skins directory
$wgStylePath = "$wgScriptPath/skins";

## The relative URL path to the logo.  Make sure you change this from the default,
## or else you'll overwrite your logo when you upgrade!
$wgLogo = "$wgStylePath/common/images/wiki.png";

## UPO means: this is also a user preference option

$wgEnableEmail = true;
$wgEnableUserEmail = true; # UPO

$wgEmergencyContact = "apache@srmsearchengine.in";
$wgPasswordSender = "apache@srmsearchengine.in";

$wgEnotifUserTalk = false; # UPO
$wgEnotifWatchlist = false; # UPO
$wgEmailAuthentication = true;

## Database settings
$wgDBtype = "mysql";
$wgDBserver = "localhost";
$wgDBname = "wiki";
$wgDBuser = "root";
$wgDBpassword = "#srmseONserver1";

# MySQL specific settings
$wgDBprefix = "";

# MySQL table options to use during installation or update
$wgDBTableOptions = "ENGINE=InnoDB, DEFAULT CHARSET=utf8";

# Experimental charset support for MySQL 5.0.
$wgDBmysql5 = false;

## Shared memory settings
$wgMainCacheType = CACHE_NONE;
$wgMemCachedServers = array();

## To enable image uploads, make sure the 'images' directory
## is writable, then set this to true:
$wgEnableUploads = false;
$wgUseImageMagick = true;
$wgImageMagickConvertCommand = "/usr/bin/convert";

# InstantCommons allows wiki to use images from http://commons.wikimedia.org
$wgUseInstantCommons = false;

## If you use ImageMagick (or any other shell command) on a
## Linux server, this will need to be set to the name of an
## available UTF-8 locale
$wgShellLocale = "en_US.utf8";

## If you want to use image uploads under safe mode,
## create the directories images/archive, images/thumb and
## images/temp, and make them all writable. Then uncomment
## this, if it's not already uncommented:
#$wgHashedUploadDirectory = false;

## Set $wgCacheDirectory to a writable directory on the web server
## to make your wiki go slightly faster. The directory should not
## be publically accessible from the web.
#$wgCacheDirectory = "$IP/cache";

# Site language code, should be one of the list in ./languages/Names.php
$wgLanguageCode = "en";

$wgSecretKey = "817630af1f4026e661cd3c955b18c765fb985e5ec7b78b2632f2c01726493dc5";

# Site upgrade key. Must be set to a string (default provided) to turn on the
# web installer while LocalSettings.php is in place
$wgUpgradeKey = "22ec648e13fa2848";

## Default skin: you can change the default skin. Use the internal symbolic
## names, ie 'cologneblue', 'monobook', 'vector':
$wgDefaultSkin = "vector";

## For attaching licensing metadata to pages, and displaying an
## appropriate copyright notice / icon. GNU Free Documentation
## License and Creative Commons licenses are supported so far.
$wgRightsPage = ""; # Set to the title of a wiki page that describes your license/copyright
$wgRightsUrl = "";
$wgRightsText = "";
$wgRightsIcon = "";

# Path to the GNU diff3 utility. Used for conflict resolution.
$wgDiff3 = "/usr/bin/diff3";



# End of automatically generated settings.
# Add more configuration options below.
/**
 * The debug log file must never be publicly accessible because it
 * contains private data. But ensure that the directory is writeable by the
 * PHP script running within your Web server.
 * The filename is with the database name of the wiki.
 */
 
 #config for logging
$wgDebugLogFile = "/var/log/mediawiki/debug-{$wgDBname}.log";
$wgShowSQLErrors = true;
$wgDebugDumpSql  = true;
error_reporting( -1 );
ini_set( 'display_errors', 1 );
$wgShowDBErrorBacktrace = true;
ini_set( 'post_max_size', '500M' );
ini_set( 'upload_max_filesize', '500M' );
$wgMaxUploadSize = array(
    '*' => 1024 * 1024 * 1000, // 100 MB
    'url' => 1024 * 1024 * 200, // 2 MB
);
#for disambiguations+
require_once "$IP/extensions/Disambiguator/Disambiguator.php";
$wgDisambiguatorIndicateLinks=true;
#config for opensearch xml support
$wgEnableOpenSearchSuggest=true;
require_once "$IP/extensions/OpenSearchXml/OpenSearchXml.php";
$wgEnableMWSuggest = true; #Not needed if using MediaWiki 1.20+
#config for rendering 
require_once "$IP/extensions/Cite/Cite.php";
require_once "$IP/extensions/TitleBlacklist/TitleBlacklist.php";
require_once "$IP/extensions/Scribunto/Scribunto.php";
$wgScribuntoDefaultEngine = 'luastandalone';
$wgScribuntoEngineConf['luastandalone']['luaPath'] = '/var/www/html/srm/SRMSE/mediawiki/extensions/Scribunto/engines/LuaStandalone/binaries/lua5_1_5_linux_64_generic/lua';
require_once "$IP/extensions/ParserFunctions/ParserFunctions.php";
