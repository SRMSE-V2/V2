#!/usr/bin/python
import cgi,json,urllib2 as u
print "Content-type:text/html\r\n\r\n"
#cgitb.enable()  # for troubleshooting
form = cgi.FieldStorage() 
keyword=form.getvalue('q',"#123none123#").strip()
#keyword is #123none123# when input from form is None is
if keyword=="#123none123#" or keyword=="":
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
         window.location="/";
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
      <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
      <script src="/bootstrap/js/bootstrap.min.js"></script>
      <script>
      $(document).ready(function(){
      $("#search").val(\""""+u.unquote(keyword)+"""\");
         	$("#search").attr("value",\""""+u.unquote(keyword)+"""\");
		window.query=\""""+u.unquote(keyword)+"""\";
var cook=document.cookie.split(";");
var co={};
if(cook.toString().indexOf("color")>-1){
$.each(cook,function(index,element){
co[element.split("=")[0].trim()]=element.split("=")[1].trim();

});
window.color=co["color"];//default theme
$.ajaxSetup({ cache: true });
}
else{
window.color=undefined;
}
if(!window.color){

if(Math.random()*10>5){
	window.color="dark";
	document.cookie="color=dark;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/";
	$("head").append("<link id="dark_theme" href="css/dark/search.css" rel="stylesheet"> ");
}else{
	window.color="light";
	document.cookie="color=light;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/";
	$("head").append("<link id="light_theme" href="css/light/search.css" rel="stylesheet"> ");
	
}
}
    
 
         	
	});
		
      </script>

      <script type="text/javascript" src="/js/search.js"></script>
   </head>
   <body class="background">
 
   <div id="arrow_parent" style="position:fixed;top:0px;z-index:110;right:0px;">
<div id="arrow">
  <span class="glyphicon glyphicon-menu-hamburger" style="font-size:14px;position:relative;top:30px;left:29px;"></span>
</div>
</div>
   
   <div class="scroll-top-wrapper "> <span class="scroll-top-inner"> <i class="glyphicon glyphicon-arrow-up"></i> </span> </div>
      <div class="container-fluid full-height">
         <div class="row nav-panel">
            <div id="logo"  class="col-lg-2 col-md-2 hidden-sm hidden-xs" style="">
	
            </div>
            <div class="col-lg-8 col-sm-12 col-xs-12 col-md-8" style="height:62px;">
<div class="container-fluid" style="padding-left:0px !important;padding-right:0px !important;">
<div class="row">
<div class="col-lg-2 col-md-2" style="height:62px;"><a href="/"><img id="srmse-logo" style="margin-top:18px;" width="120" height="27"/></a></div>
<div class="col-lg-10 col-md-10 nav_col" style="height:60px;">

                   <div id="search_bar" style="z-index:10;position:absolute;width:80%;height:46px;margin-top:8px;">
                              <div class="input_div input-group input-group-lg" style="">
                                 
                                      <input data-toggle="tooltip" title="Search" style="font-size:1.5em;display:block;" type="text" class="form-control form-control1 fostyle btn2 simplebox" placeholder="Search here" name="q" id="search" autocomplete="off" autofocus/>

                                  <span class="input-group-btn" style="font-size:18px;z-index:10;"> 
                                      <button id="search_btn" class="btn btn-default spanbtn">
                                        <span style="color:#474747;" class="glyphicon glyphicon-search"></span>
                                      </button>
                                    </span>
                                    </div>
 </div>
<div id="div_for_back">  
                              </div>
              </div>
</div>
</div>

              
            </div>
            <div class="col-lg-2 col-md-2 hidden-sm hidden-xs" style="height:62px;">      
            </div>
         </div>
         <div class="nav_changer row full-height">
            <div class="col-xs-12 col-sm-12 col-md-2 col-lg-2 full-height side">
               <ul class="nav nav-sidebar" >
                  <!--li class="active"><a href="#">Clusters<span class="sr-only">(current)</span></a></li-->
               </ul>
            </div>
<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 col-lg-push-7 col-md-push-7">

<div class="" id="smart_col">

</div>
                </div>
            <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7 padded_body col-lg-pull-3 col-md-pull-3">
               <div id="centre_parent" class="container-fluid full-height full-width">
                 
                  
                  <div class="row">
                     <div id="smart_answer" class="module hide col-lg-12 col-sm-12 col-md-12 col-xs-12 " style="">
                     </div>
                  </div>
                  <div class="row">
                     <div style="padding-left:0px;padding-right:0px;" class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
<div class="dym hide" style="padding-bottom:15px;">
<span class="dym" style="color:#FFFFFF;font-size:18px;">Did You Mean :</span><a href="" id="dym_val" class="dym" style="color:#DDDDDD;font-size:18px;"></a>
</div>
                      
                        <div class="table">
 <div class="" id="wikiMain">
                           </div>
 <div class="" id="news">
                           </div>
                           <div class="" id="search_results">
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

