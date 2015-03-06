import enchant
from enchant.checker import SpellChecker
from enchant.tokenize import EmailFilter, URLFilter, get_tokenizer

def checking(a):
	d2 = enchant.DictWithPWL("en_GB","names.txt")
	chkr = SpellChecker(d2,filters=[EmailFilter,URLFilter])
	chkr.set_text(a)
	for err in chkr:
		d4=d2.suggest(err.word)
		a=a.replace(err.word,d4[0])
	return a
