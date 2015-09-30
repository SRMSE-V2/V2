#!/usr/bin/python
import cgi,cgitb,urllib2 as u
import Cookie
cookie = Cookie.SimpleCookie()
import createCSRF as csrf
cgitb.enable()  # for troubleshooting
form = cgi.FieldStorage() 
keyword=form.getvalue('q',"#123none123#").replace("\\","").strip()
#keyword is #123none123# when input from form is None is
token=csrf.generateToken()
cookie["srmse_token"]=u.quote(token[1])
print cookie
print "Content-type:text/html\r\n\r\n"
if keyword=="#123none123#":
	print """<!DOCTYPE html>
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
<html>
   <head>
      <title>SRM Search Engine</title>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <meta name="csrf-param" content="authenticity_token" />
	<meta name="csrf-token" content='"""+u.quote(token[0])+"""'/>
	 <link rel="shortcut icon" type="image/png" href="/images/favicon.png"/>
   </head>
   <body class="background" style="overflow-y:scroll;">
   <div class="gallery-single-view">
   <div class="img-single-view-head" style=""></div>
   <button class="btn btn-primary btn-single-view"><span class="glyphicon glyphicon-remove"></span></button><button class="btn btn-primary btn-single-view-left"><span class="glyphicon glyphicon-chevron-left"></span></button><button class="btn btn-primary btn-single-view-right"><span class="glyphicon glyphicon-chevron-right"></span></button></div>
   <div class="container img-container">
 </div>
                      
 <div id="blur_back"></div>
   <div id="arrow_parent">
<div id="arrow">
  <span class="glyphicon glyphicon-menu-hamburger arrow_glyph"></span>
</div>
</div>
   
   <div class="scroll-top-wrapper "> <span class="scroll-top-inner"> <i class="switch_arrow"></i> </span> </div>
      <div class="container-fluid main_cont">
         <div class="row nav-panel">
            <div class="col-lg-7 col-sm-12 col-xs-12 col-md-7" style="height:50px;">
<div class="row">
<div class="col-lg-2 col-md-2" style="height:50px;"><a href="/"><img id="srmse-logo"  class="switch" alt="SRM Search Engine" name="srmselogo.png" width="110" height="25"/></a>
<div  class="input-group input-group-sm extra_search">
<input class="form-control extra_search_bar" placeholder="Search here" disabled="disabled"/> 
 <span class="input-group-btn" style="font-size:10px;z-index:10;"> 
                                      <button id="search_btn_extra" class="btn btn-default spanbtn">
                                        <span class="glyphicon glyphicon-search"></span>
                                      </button>
                                    </span></div></div>
<div class="col-lg-10 col-md-10 nav_col">
                   <div id="search_bar" class="row">
                              <div style="width:96%;" class="input_div input-group input-group-lg col-lg-12">
                                 
                                      <input spellcheck="false" title="Search" type="text" class="form-control simplebox" placeholder="Search here" name="q" id="search" autocomplete="off" autofocus/>
	<span class="mob_close input-group-btn glyphicon glyphicon-remove-circle"></span>
                                  <span class="input-group-btn" style="font-size:18px;z-index:10;"> 
                                      <button id="search_btn" class="btn btn-default spanbtn">
                                        <span class="search_glyph glyphicon glyphicon-search"></span>
                                      </button>
                                    </span>
                                    </div>
 </div>
<div id="div_for_back" class="row">  
                              </div>
              </div>
         
</div>

</div>
            
            <div class="col-lg-5 col-md-5 hidden-sm hidden-xs" style="height:50px;">   
            <div class="row desktop_pills_row" style="padding-top: 5px;">
            <div class="col-lg-12 col-md-12">
            <ul class="nav nav-pills desktop_pills">
  <li role="presentation" class="active"><a href="#" class="d_a web_search"><span class="d_span glyphicon glyphicon-globe"></span>Web</a></li>
  <li role="presentation"><a href="#" class="d_a images_search"><span class="d_span glyphicon glyphicon-picture"></span>Images</a></li>
  <li role="presentation"><a href="#" class="d_a videos_search"><span class="d_span glyphicon glyphicon-facetime-video"></span>Videos</a></li>
   <li role="presentation"><a href="#" class="d_a news_search"><span class="d_span glyphicon glyphicon-picture"></span>News</a></li>
</ul></div></div>   
            </div>
         </div>
         <div class="nav_changer row">
            <div class="col-xs-12 col-sm-12 col-md-1 col-lg-1 full-height side">
               <ul class="nav nav-sidebar hide" >
          
               </ul>
            </div>
<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 col-lg-push-8 col-md-push-8">

<div id="smart_col">

</div>
                </div>
            <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 padded_body col-lg-pull-3 col-md-pull-3">
               <div id="centre_parent" class="container-fluid full-height full-width">
                 
                  
                  <div class="row">
                     <div id="smart_answer" class="module hide col-lg-12 col-sm-12 col-md-12 col-xs-12 " style="">
                     </div>
                  </div>
                  <div class="row">
                     <div style="padding-left:0px;padding-right:0px;" class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                        <div class="table">
 <div id="wikiMain">
                           </div>
 <div id="news">
                           </div>
                           <div class="extra_results" id="videos">
                           </div>
                           <div class="extra_results" id="search_results">
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            
         </div>
         
         <div class="cluster_drawer">
         <button class="btn btn-primary show_cluster">Clusters</button>
          <div class="media">
  <a class="pull-left" href="#">
      <img class="media-object img-circle" id="cluster-img" style="margin-left: 12px;" width=64 height=64/>
      <span class="badge badge-success pull-right cluster_num">0</span>
  </a>
  <div class="media-body">
    <h3 style="padding-top:8px;" class="media-heading">Clusters</h3>
    <span class="cluster_cur"></span>
  </div>
</div>
          <hr style="margin-top: 28px;margin-bottom: 10px;">
         <ul class="nav nav-pills nav-stacked cluster_li">
		  <li role="presentation" class="cluster active_c"><a class="gen_cluster" href="#">General</a></li>
	</ul>
         </div>
         <div class="top_drawer">
         <ul class="nav nav-pills desktop_pills">
  <li role="presentation" class="active"><a href="#" class="d_a web_search"><span class="d_span glyphicon glyphicon-globe"></span>Web</a></li>
  <li role="presentation"><a href="#" class="d_a images_search"><span class="d_span glyphicon glyphicon-picture"></span>Images</a></li>
  <li role="presentation"><a href="#" class="d_a videos_search"><span class="d_span glyphicon glyphicon-facetime-video"></span>Videos</a></li>
   <li role="presentation"><a href="#" class="d_a news_search"><span class="d_span glyphicon glyphicon-picture"></span>News</a></li>
</ul>
         </div>
         
      </div>
      <span id="dummy"></span>
      
   </body>
   <script src="http://srmse-v2.github.io/V2/js/min/basket.full.min.js"></script>
        <script>
     (function(){
     window.key="SECRET_KEY";
//no storage using cookie
	var cook=document.cookie.split(";");
	var co={};
	//if color present
	if(document.cookie!==""){
		for(var i=0;i<cook.length;i++){
		co[cook[i].split("=")[0].trim()]=cook[i].split("=")[1].trim();

		}
	}
	else{
		co["search_type"]=true;//this will set default as web
	}
	
	if(!co["search_type"]){
			document.cookie = "search_type=web;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/";
		
	}



function prependCss(css,id){
    elChild = document.createElement('style');
    elChild.setAttribute("id",id);
elChild.innerHTML = css;
document.getElementsByTagName("head")[0].appendChild(elChild);
}




         basket.require({ url: "http://srmse-v2.github.io/V2/css/light/search"+key+".min.css", execute: false,expire:168,skipCache:false }).then(function(responses) {
        var css = responses[0].data;
        prependCss(css,"light_theme");
        });
       
   


basket.require({ url: 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js',expire:168,execute:true,skipCache:false}).then(function(){
$(document).ready(function(){
$("#search").val(\""""+u.unquote(keyword)+"""\");
         	$("#search").attr("value",\""""+u.unquote(keyword)+"""\");
         	$(".extra_search_bar").val(\""""+u.unquote(keyword)+"""\");
         	$(".extra_search_bar").attr("value",\""""+u.unquote(keyword)+"""\");
         	

});
basket.require({ url: 'http://srmse-v2.github.io/V2/bootstrap/js/bootstrap.min.js',expire:168,execute:true,skipCache:false}).then(function(){
	 basket.require({ url: 'http://srmse-v2.github.io/V2/js/min/search'+key+'.min.js',expire:168,execute:true,skipCache:false});

});
});

  window.cacheImage=function(src,element){
         var canvasEl = document.createElement('canvas');
         element.setAttribute("src",src); //bypass
         return;
        	if(typeof(Storage) !== "undefined" && !!canvasEl.getContext) {
        		
        		var item=localStorage.getItem(src+"#image#"+element.width+"#key#"+key);
        		if(item){
        		element.setAttribute("src",item);
        		}
        		else{
        		(function(element,src){
        			var image=new Image();
        			image.setAttribute("crossOrigin",'Anonymous');
        			image.setAttribute("src",src);
        			image.onload=function(){
        			//console.log(this.getAttribute("src"));
        			var canvas = document.createElement('CANVAS'),
        			ctx = canvas.getContext('2d');
        			canvas.height = element.height;
        			canvas.width = element.width;
        			ctx.drawImage(image, 0, 0,element.width,element.height);
        			var dataURL = canvas.toDataURL("image/png");
        			//console.log(dataURL);
        			element.setAttribute("src",dataURL);
        			localStorage.setItem(src+"#image#"+element.width+"#key#"+key,dataURL);
        			canvas=null;
        		
        		
        		};
        		
        		
        		})(element,src);
        		
        		}
        	}
        	else{
        		element.setAttribute("src",src);
        	}
        
        
        };
          cacheImage("http://srmse-v2.github.io/V2/images"+key+"/light/nav_logo.png",document.getElementById("srmse-logo"));
	cacheImage("http://srmse-v2.github.io/V2/images"+key+"/clusters%20button1.jpg",document.getElementById("cluster-img"));
})();
        </script>
</html>
"""
