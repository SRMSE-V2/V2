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
      <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
     
 
   
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
   <body><div class="scroll-top-wrapper alpha-blur"> <span class="scroll-top-inner"> <i class="glyphicon glyphicon-arrow-up"></i> </span> </div>
      <div class="background"></div>
      <div class="container-fluid full-height">
         <div class="row nav-panel">
            <div id="logo" class="col-lg-2 col-sm-12 col-md-2 col-xs-12" style="">
               <span class="fostyle1" >SRM</span>
               <span class="fostyle2" >Search Engine</span>
            </div>
            <div class="col-lg-7 col-sm-12 col-xs-12 col-md-7">
               <form id="frm" action="/cgi-bin/s.py" method="POST">
                   <div style="z-index:10;position:absolute;height:46px;">
                              <div class="input-group input-group-lg">
                                 
                                      <input data-toggle="tooltip" title="Search" style="font-size:1.5em;display:block;" type="text" class="form-control form-control1 fostyle btn2" placeholder="Search here" name="q" id="search" autofocus/>

                                  <span class="input-group-btn" style="z-index:10;"> 
                                      <button id="search_btn" class="btn btn-default spanbtn">
                                        <span class="glyphicon glyphicon-search"></span>
                                      </button>
                                    </span>
                                    </div>
 </div>
<div id="div_for_back">  
                              </div>
               </form>
            </div>
            <div class="col-lg-3 col-md-3 hidden-sm hidden-xs" style="height:62px;">      
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

