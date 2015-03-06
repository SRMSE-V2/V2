
#!/usr/bin/python

from threading import Thread as T
import threading,json
from Queue import Queue
import mainGla as MG
import mainRetrieve1 as MR
import che as SC
import fetchResults as FR


def getResults(id,typ):
    k={"1":"general","2":"wiki","3":"news"}
    typ=k[typ]    
    dist={}    
    valuesDictionary = {"dictionary":["dictionary_db","dictionary_index","test","dictionary_table"],"news":["news_module","news_index","SRMSE","source2"],"wiki":["starkIndex","wiki","my_wiki","page"],"general":["starkIndex","calIndex","test","source_main1"]}
    get = valuesDictionary[typ]
    database = get[2]
    table = get[3]
    topIds = id
    topResults = FR.fetchResults(topIds,database,table)
    dist["results"]=topResults
    return dist
    
        
    

    
