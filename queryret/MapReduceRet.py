from pymongo import MongoClient as MC
from bson.code import Code

client = MC()

db= client.indexDB

def getReduced():

    docs= db.indexTableMain

    map = Code( """
	function() 
	{
            
		for(var key in this) 
		{
		
			emit(key, 1); 
		}
	}
	""")

    reduce = Code("""
function(key,values){
    var total=0;
    for (var i=0; i < values.length; i++)
    {
    total += values[i];
    console.log(total);
    }
    return total;
    }""")

    a=db.indexTableMain.map_reduce(map,reduce,"result",query={"keyword":{"$in":['team']}})
    

    print list(a.find())
