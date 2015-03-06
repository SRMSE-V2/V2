
#!/usr/bin/python

from threading import Thread as T
import threading,json
from Queue import Queue
import mainGla as MG
import mainRetrieve1 as MR
import che as SC
import fetchResults as FR


def getQuery(query,typ):
    k={"1":"general","2":"wiki","3":"news"}
    typ=k[typ]    
    dist={}
    
    changed_query=SC.checking(query)
    if query == changed_query:
	dist={"Did You Mean: ":""}
    else:
	query=changed_query
	dist = {"Did You Mean: ":query}
	
    
    valuesDictionary = {"dictionary":["dictionary_db","dictionary_index","test","dictionary_table"],"news":["news_module","news_index","SRMSE","source2"],"wiki":["starkIndex","wiki1","my_wiki","page"],"general":["starkIndex","calIndex","test","source_main1"]}
    query = query.split(" ")
    get = valuesDictionary[typ]
    result = MR.getListQuery(query,get[0],get[1])

    database = get[2]
    table = get[3]
    if (typ=="general"):
	
    	topIds = result[:10]
	topResults=[]
	if len(topIds)!=0:
    		topResults = FR.fetchResults(topIds,database,table)
	dist["results"]=topResults
	dist["ids"]= result[10:100]
    elif (typ=="wiki"):
        topIds=result[:3]
	topResults=[]
	if len(topIds)!=0:
        	topResults = FR.fetchResultsWiki(topIds,database,table)
        dist["results"]=topResults
        dist["ids"]= result[5:50]

    else:
	topIds=result[:5]
	topResults=[]
	if len(topIds)!=0:
		topResults = FR.fetchResults(topIds,database,table)
	dist["results"]=topResults
	dist["ids"]= result[5:50]            

    return dist
    
        
    

    
