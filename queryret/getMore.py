#!/usr/bin/python
import getMoreResults as GMR

import cgi,cgitb,json

form = cgi.FieldStorage()
cgitb.enable()
ids = form.getvalue('q','###123###')
f = form.getvalue('f','###123###')
print "Content-type:text/html\r\n\r"
import askMeAsync as ask
if ids!="###123###":
   ids =ids.split(",")
   print json.dumps(GMR.getResults(ids,f))

