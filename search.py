#!/usr/bin/python
import cgi,cgitb,MySQLdb,json
print "Content-type:text/html\r\n\r\n"
cgitb.enable()  # for troubleshooting
form = cgi.FieldStorage() 
keyword=form.getvalue('q',"").strip()
cluster=form.getvalue('c','').strip()
#keyword is #123none123# when input from form is None
#print keyword
if keyword=="":
	print """<!DOCTYPE html>
<!--
   To change this license header, choose License Headers in Project Properties.
   To change this template file, choose Tools | Templates
   and open the template in the editor.
   -->
<html>
   <head>
      <title>SRM Search Engine</title>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script>
         window.location="/ver1/";
      </script>
   </head>
   <body>
   </body>
</html>
	"""
else:
	print """<!DOCTYPE html>
<!--
   To change this license header, choose License Headers in Project Properties.
   To change this template file, choose Tools | Templates
   and open the template in the editor.
   -->
<html>
   <head>
      <title>SRM Search Engine</title>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="/ver1/css/bootstrap.min.css" rel="stylesheet">
      <link href="/ver1/css/search.css" rel="stylesheet">
      <script type="text/javascript" src="/ver1/js/jquery.min.js"></script>
     
      <link href='http://fonts.googleapis.com/css?family=Quicksand:400,700' rel='stylesheet' type='text/css'>
 <script type="text/javascript" src="/ver1/js/scripts.js"></script>
      <script type="text/javascript" src="/ver1/js/jquery-ui.min.js"></script>
      <script type="text/javascript" src="/ver1/js/jquery.ui.autocomplete.html.js"></script>
      <script type="text/javascript" src="/ver1/js/bootstrap.min.js"></script>
      <!--script type="text/javascript" src="/ver1/js/location_centric.js"></script-->
      <script>
         $(document).ready(function(){
         	$("#search").val(\""""+keyword+"""\");
         	$("#search").attr("value",\""""+keyword+"""\");
         	window.cluster=\""""+cluster+"""\";
		window.query=\""""+keyword+"""\";
         });
      </script>
      <script type="text/javascript" src="/ver1/js/search.js"></script>
   </head>
   <body>
      <div class="background"></div>
      <div class="container-fluid full-height">
         <div class="row nav-panel">
            <div id="logo" class="col-lg-2 col-sm-12 col-md-2 col-xs-12" style="">
               <span class="fostyle1" >SRM</span>
               <span class="fostyle2" >Search Engine</span>
            </div>
            <div class="col-lg-7 col-sm-12 col-xs-12 col-md-7">
               <form id="frm" action="/cgi-bin/search.py" method="POST">
                  <div class="input-group input-group-lg">
                     <input  type="text" class="form-control form-control1 fostyle btn1" placeholder="Search here" name="q" id="search">
                     <span class="input-group-btn"> 
                     <button type="submit" id="search_btn" class="btn btn-default spanbtn">
                     <span class="glyphicon glyphicon-search"></span>
                     </button>
                     </span>
                  </div>
               </form>
            </div>
            <div class="col-lg-3 col-md-3 hidden-sm hidden-xs" style="height:62px;">      
            </div>
         </div>
         <div class="nav_changer row full-height">
            <div class="col-xs-12 col-sm-12 col-md-2 col-lg-2 full-height side">
               <ul class="affix affix-top nav nav-sidebar alpha-blur" >
                  <li class="active"><a href="#">Clusters<span class="sr-only">(current)</span></a></li>
               </ul>
            </div>
<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 col-lg-push-7 col-md-push-7">

<div class="affix affix-top" id="smart_col">

</div>
                </div>
            <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7 padded_body col-lg-pull-3 col-md-pull-3">
               <div id="centre_parent" class="container full-height full-width">
                 
                  
                  <div class="row">
                     <div id="smart_answer" class="col-lg-12 col-sm-12 col-md-12 col-xs-12 alpha-blur" style="">
                     </div>
                  </div>
                  <div class="row">
                     <div style="padding-left:0px;padding-right:0px;" class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                        <div class="list-group hide" id="predefined_questions">
                           <a data-toggle="collapse" href="#collapsee" aria-expanded="false" aria-controls="collapse" class="list-group-item active">
                           Would you also like to know?
                           </a>
                        </div>
                        <div class="collapse" id="collapsee">
                        </div>
                        <div class="table">
                           <div class="alpha-blur" id="search_results">
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            
         </div>
      </div>
   </body>

</html>
	"""

