
#!/usr/bin/python

from threading import Thread as T
import threading,json
from Queue import Queue
import mainGla as MG
import mainRetrieve as MR
import che as SC
#import cgi,cgitb,json
#form = cgi.FieldStorage()
#cgitb.enable()
#query = form.getvalue('q','what is the meaning of dream')
#print "Content-type:text/html\r\n\r"



def getQuery(query):
    dist={}

    changed_query=SC.checking(query)
    if query == changed_query:
	dist={"Did You Mean: ":""}
    else:
	query=changed_query
	dist = {"Did You Mean: ":query}
	
    
    valuesDictionary = {"dictionary":["dictionary_db","dictionary_index"],"news":["news_module","news_index"],"wiki":["starkIndex","wiki"],"general":["starkIndex","calIndex"]}
    results = MG.getType(query)
    getTypes = results.pop(0)
    getResults = results[1]
    dictionaryValues = results[2]
    q=Queue()
    for types in getTypes:
        get = valuesDictionary[types]
        t=T(target=MR.getListQuery,args=(getResults,get[0],get[1],q,))
        t.start()
        dist[types]=q.get()
   # print dist["dictionary"]
    print json.dumps(dist)   
        

#if query!="###123###":
#   getQuery(query)
	

#import sys

#getQuery(sys.argv[1])
    
        
    

    
