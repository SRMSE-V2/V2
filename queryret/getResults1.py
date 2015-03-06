#!/usr/bin/python
import MySQLdb,cgi,cgitb,json
import fetchResults
form = cgi.FieldStorage()
cgitb.enable()
q = form.getvalue('q','###123###')
f = form.getvalue('f','###123###') 
values = {"wiki":{"db":"my_wiki","table":""},"general":{"db":"test"},"dictionary":,"news":}
if q!="###123###" and f!="###123###":
	
