from pymongo import MongoClient as mc
from mergedict import MergeDict

client = mc()

db = client.test


class SumDict(MergeDict):
    @MergeDict.dispatch(int)
    def merge_int(this, other):
        return this + other

def getListQuery(lis):
    from collections import Counter
    import operator
    results=db.indexTable.find({"keyword":{"$in":lis}})
    
    listCounters = map(remove,list(results))
    #print listCounters
    
    result=SumDict({})
    
    for listCounter in listCounters:
        listCounter.update((x,calFun(y)) for x,y in listCounter.items())
        result.merge(listCounter)
    #print result
    sor=sorted(result, key=result.get, reverse=True)
    #sor = sorted(result.items(), key=operator.itemgetter(1),reverse=True)
    #print sor
    return sor


def remove(mongoDict):
    from collections import Counter
    

    mongoDict.pop('_id')
    mongoDict.pop('keyword')
    return mongoDict
    

def calFun(lis):
    try:
       bodyWeight = 1
       titleWeight = 200
       bharathWeight = 0
       domainWeight = 0
       return lis[1]*int(bodyWeight) + lis[0]*int(titleWeight) + lis[3]*int(bharathWeight) + lis[2]*int(domainWeight)
    except Exception as x:
       print x
       return 0
