

def removePandS(content):
    import re,string
    re.sub(r'\b\w{,2}\b',' ', content)
    re.sub(r'\b\w{15,}\b',' ', content)
    regex=re.compile('[%s]'% re.escape(string.punctuation))
    content=re.sub(regex," ",content)
    return content.split()


def getData(query):
    import mainRetrieveCount as mr
    query=query.lower()
    query = removePandS(query)
  #  print query
    ids =mr.getListQuery(query)
    #print ids
    content = fetchResults(ids[:10])
   # print content

def fetchResults(ids,db,table):

    import MySQLdb

    db = MySQLdb.connect('127.0.0.1','root','###',db)

    cursor= db.cursor(MySQLdb.cursors.DictCursor)
    values=str(tuple(ids)).replace("u","")
    values=values.replace(',)',')')#if len of tuple is 1 then ('101568',)
    sql="SELECT `url`,SUBSTR(`title`,1,100) as `title`,SUBSTR(`body`,1,200) as `body` FROM %s WHERE `id` IN %s ORDER BY FIELD(`id`,%s) "%(table,values,values[1:len(values)-1])
 #   sql = "SELECT `url`,`title` FROM source_main WHERE `id` IN %s ORDER BY alexa desc"%(values)
    #print sql
    cursor.execute(sql)

    data = cursor.fetchall()

    return list(eval(str(data).replace('\\x',' ')))

def fetchResultsWiki(ids,db,table):
    import MySQLdb
    def changeIds(i):
	return i[3:]

    db = MySQLdb.connect('127.0.0.1','root','###',db)
    ids = map(changeIds,ids)
    cursor= db.cursor(MySQLdb.cursors.DictCursor)
    values=str(tuple(ids)).replace("u","")
    values=values.replace(',)',')')#if len of tuple is 1 then ('101568',)
    sql="SELECT SUBSTR(page.page_title,1,100) as `title`,SUBSTR(CAST(text.old_text AS CHAR),1,200) AS `body` FROM %s INNER JOIN text ON text.old_id = page.page_id WHERE page.page_id IN %s ORDER BY FIELD(page.page_id,%s) "%(table,values,values[1:len(values)-1])
 #   sql = "SELECT `url`,`title` FROM source_main WHERE `id` IN %s ORDER BY alexa desc"%(values)
    #print sql
    cursor.execute(sql)

    data = cursor.fetchall()

    return list(eval(str(data).replace('\\x',' ')))

#query=raw_input()

#getData(query)
