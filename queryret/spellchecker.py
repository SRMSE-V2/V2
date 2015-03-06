import enchant
import enchant.checker
from enchant.checker import SpellChecker
from enchant.tokenize import EmailFilter, URLFilter
from enchant.checker.CmdLineChecker import CmdLineChecker
def check(a):    

        d2 = enchant.DictWithPWL("en_GB","names.txt")
        chkr =SpellChecker(d2,filters=[EmailFilter,URLFilter])
        ##a=raw_input("Input:").title()
        chkr.set_text(a)
        cmdln = CmdLineChecker()
        cmdln.set_checker(chkr)
        cmdln.run()
        a=chkr.get_text()
        return  a.lower()




