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
         window.location="/main/";
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
      <link rel="stylesheet" href="/main/bootstrap/css/bootstrap.min.css">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
     
 
   
      <script src="/main/bootstrap/js/bootstrap.min.js"></script>
      <script>
         $(document).ready(function(){
         	$("#search").val(\""""+keyword+"""\");
         	$("#search").attr("value",\""""+keyword+"""\");
         	window.cluster=\""""+cluster+"""\";
		window.query=\""""+keyword+"""\";
         });
      </script>
<script>
var screensize=$("html").height();
 $(function(){ 

$(window).on('scroll',function(){

if($(window).scrollTop()>600){
$("#smart_col").addClass("affix affix-top");
console.log("added");

}
else{
$("#smart_col").removeClass("affix affix-top");
}


});
$(document).on( 'scroll', function(){ 

if ($(window).scrollTop() > 100) {
 $('.scroll-top-wrapper').addClass('show');setTimeout(function(){$('.scroll-top-wrapper').removeClass('show');},4000); } else { $('.scroll-top-wrapper').removeClass('show'); } }); $('.scroll-top-wrapper').on('click', scrollToTop); }); function scrollToTop() { verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0; element = $('body'); offset = element.offset(); offsetTop = offset.top; $('html, body').animate({scrollTop: offsetTop}, 500, 'linear'); } </script>
      <script type="text/javascript" src="/main/js/search.js"></script>
   </head>
   <body class="background">
 
   <div id="arrow_parent" style="position:fixed;top:0px;z-index:110;right:0px;">
<div id="arrow" style="position:relative;right:0px;float:left;cursor:pointer;height:68px;top:-6px;width:50px;background-repeat:no-repeat;background-size:contain;background-image:url('/main/images/arrow.png');background-position:right;">
  <span class="glyphicon glyphicon-menu-hamburger" style="color:white;font-size:14px;position:relative;top:30px;left:29px;"></span>
</div>
</div>
   
   <div class="scroll-top-wrapper alpha-blur"> <span class="scroll-top-inner"> <i class="glyphicon glyphicon-arrow-up"></i> </span> </div>
      <div class="container-fluid full-height">
         <div class="row nav-panel">
            <div id="logo"  class="col-lg-2 col-md-2 hidden-sm hidden-xs" style="">
	
            </div>
            <div class="col-lg-8 col-sm-12 col-xs-12 col-md-8" style="height:62px;">
<div class="container-fluid" style="padding-left:0px !important;padding-right:0px !important;">
<div class="row">
<div class="col-lg-2 col-md-2" style="height:62px;"><a href="/main/"><img style="margin-top:18px;" src="/main/images/srmselogo.png" width="120" height="27"/></a></div>
<div class="col-lg-10 col-md-10" style="height:60px;background: #2d2d2d !important;">

                   <div id="search_bar" style="z-index:10;position:absolute;width:80%;height:46px;margin-top:8px;">
                              <div class="input-group input-group-lg" style="">
                                 
                                      <input data-toggle="tooltip" title="Search" style="font-size:1.5em;display:block;" type="text" class="form-control form-control1 fostyle btn2" placeholder="Search here" name="q" id="search" autocomplete="off" autofocus/>

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
            <div class="hide col-xs-12 col-sm-12 col-md-2 col-lg-2 full-height side">
               <ul class="affix affix-top nav nav-sidebar" >
                  <li class="active"><a href="#">Clusters<span class="sr-only">(current)</span></a></li>
               </ul>
            </div>
<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 col-lg-push-7 col-md-push-7">

<div class="" id="smart_col">

</div>
                </div>
            <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7 padded_body col-lg-pull-3 col-md-pull-3">
               <div id="centre_parent" class="container full-height full-width">
                 
                  
                  <div class="row">
                     <div id="smart_answer" class="hide col-lg-12 col-sm-12 col-md-12 col-xs-12 alpha-blur" style="">
                     </div>
                  </div>
                  <div class="row">
                     <div style="padding-left:0px;padding-right:0px;" class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
<div class="dym hide" style="padding-bottom:15px;">
<span class="dym" style="color:#FFFFFF;font-size:18px;">Did You Mean :</span><a href="" id="dym_val" class="dym" style="color:#DDDDDD;font-size:18px;"></a>
</div>
                        <div class="list-group hide" id="predefined_questions">
                           <a data-toggle="collapse" href="#collapsee" aria-expanded="false" aria-controls="collapse" class="list-group-item active">
                           Would you also like to know?
                           </a>
                        </div>
                        <div class="collapse" id="collapsee">
                        </div>
                        <div class="table">
 <div class="alpha-blur" id="wiki">
                           </div>
 <div class="alpha-blur" id="news">
                           </div>
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

