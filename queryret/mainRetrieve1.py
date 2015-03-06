from pymongo import MongoClient as mc
from mergedict import MergeDict



class SumDict(MergeDict):
    @MergeDict.dispatch(int)
    def merge_int(this, other):
        return this + other

def getListQuery(lis,dbase,coll):
    
    from collections import Counter
    client = mc()
    
    db = client[dbase]

    results=db[coll].find({"keyword":{"$in":lis}})
    #print list(results)
    listCounters = map(remove,list(results))
    
    result=SumDict({})
    
    for listCounter in listCounters:
        result.merge(listCounter)
    #print result
    sor=sorted(result, key=result.get, reverse=True)
    #print sor
    return sor

def remove(mongoDict):
    from collections import Counter

    mongoDict.pop('_id')
    mongoDict.pop('keyword')
    return mongoDict
    
