import re

remove = ['a','is','the','and','to','as','at','are','any']
quesTags = ['what','who','when','whom','why','where','how']
dictionary = ["means","meaning","idiom","mean","define","definition"]

def getType(query):

    query = query.lower()
    query = query.split()
    #questionWOQtags = getQuesTags(query) # question without question tags 

    mainList=["news","wiki","general"]
    words=[]
    # checking if the module belongs to dictionary module -- Stage 1
    if len(query) == 1:
        mainList=["dictionary"]+mainList
        words=query
        subquery = query

    else:
        words = removeWordsDict(query)
        if words:
            mainList=["dictionary"]+mainList
        subquery = removeUnwanted(query)

    return [mainList,subquery,query,words]





#remove question tags
def getQuesTags(query):

    wordList = [] # list without question tags
    for word in query:
        if word not in quesTags:
            wordList.append(word)
    return wordList            



    
#removing words for dictionary module
def removeWordsDict(query):

    import re
    #print query
    words = re.findall('what is the meaning of (.+)|what does the word (.+) mean|meaining of (.+)|(.+) means|what meaning of (.+)|meaning of (.+)|meaning (.+)|what (.+) means|what is (.+)|define (.+)|definition of (.+)|(.+) definition|(.+) meaning|(.+) means|(.+) means what|what does (.+) mean|whats the meaning of (.+)'," ".join(query))
    word=[]
    if words:
        word=filter(lambda x:x!='', list(words[0]))
    return word





# removing stopwords
def removeUnwanted(query):
    wordList = []
    
    for word in query :

        if word not in remove:
            wordList.append(word)        


    return wordList


    
