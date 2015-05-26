/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 
 Author Tilak Patidar
 email tilakpatidar@gmail.com
 github http://github.com/tilakpatidar      
  */
$(document).ready(function() {

//load scripts
$.ajaxSetup({cache:true});
$.getScript( "/js/jquery-ui.min.js",function(){
$.getScript( "/js/scripts.js");
});
//end load scripts

//start of theme switch

var img2=$("#srmse-logo");
img2.addClass("switch");
if(window.color==="dark"){$("head").append("<link id=\"dark_theme\" rel='stylesheet' type='text/css' href='/css/dark/search.css' />");img2.attr("src","/images/dark/srmselogo.png");}else{img2.attr("src","/images/light/srmselogo.png");$("head").append("<link id=\"light_theme\" rel='stylesheet' type='text/css' href='/css/light/search.css' />");}
img2.attr("alt","SRM Search Engine");
var u=0;
var dispBtns=function(){$(".arrow_div").css("padding-left","20px");$(".arrow_div").append("<div style=\"position:relative;top:0;bottom:0;padding-top:18px;height:50px;\"><span id=\"light\" class=\"side_btns\" data-toggle=\"tooltip\" title=\"Light Theme\"><img style=\"top:0;bottom:0;margin:auto;width:31px;height:27px;\" src=\"/images/lighttheme.png\"></span><span   class=\"side_btns\" id=\"dark\" data-toggle=\"tooltip\" title=\"Dark Theme\"><img style=\"top:0;bottom:0;margin:auto;width:31px;height:27px;margin-left:5px;\" src=\"/images/darktheme.png\">   </span> <span class=\"side_btns\" data-toggle=\"tooltip\" title=\"Want Help !\">  <img style=\"top:0;bottom:0;margin:auto;width:31px;height:27px;margin-left:5px;\" src=\"/images/howtouse.png\">      </span> </div>");$(".side_btns").css("cursor","pointer");
   $("#light").on('click',function(){
	window.color="light";
document.cookie="color=light;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/";
	$("#dark_theme").remove();
$("#light_theme").remove();
window.switchImg();
	$("head").append("<link id=\"light_theme\" rel='stylesheet' type='text/css' href='/css/light/search.css' />");
});

$("#dark").on('click',function(){
	window.color="dark";
document.cookie="color=dark;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/";
	$("#light_theme").remove();
	$("#dark_theme").remove();
	window.switchImg();
		$("head").append("<link id=\"dark_theme\" rel='stylesheet' type='text/css' href='/css/dark/search.css' />");
});
   
   };
function arrowClick(){
	if(u===0){
	$(".arrow_div").remove();
	$("#arrow_parent").append("<div class=\"arrow_div\" style=\"float:left;height:62px;float:right;width:0px;\"></div>");
	dispBtns();
	$(".side_btns").hide();
	$(".arrow_div").animate({width:'150px'},500,function(){$(".side_btns").fadeIn();});

	++u;
	}
	else{
	$(".side_btns").fadeOut(function(){$(".side_btns").hide();$(".arrow_div").css("padding-left","0px");$(".arrow_div").animate({width:'0px'},500,function(){
	});
	u=0;});
	

	}

}
$("#arrow").on("click",arrowClick);
//end of theme switch

//global vars start
    window.i = 0;
    window.j = 10;
    IDS = [];
    IDSwiki=[];
    IDSnews=[];
    window.trains = [];
    window.icluster = 0;
    window.jcluster = 4;
    window.results = true;
    window.clusters = [];
    window.locations=[];
    window.clocation=0;
    window.val={};
window.tap=false;
window.scrolled=false;
window.wiki=false;
//global vars closed



//scroll button start
var screensize=$("html").height();
 $(function(){ 
$(document).on( 'scroll', function(){ 
if ($(window).scrollTop() > 100) {
 $('.scroll-top-wrapper').addClass('show');setTimeout(function(){$('.scroll-top-wrapper').removeClass('show');},4000);
 } 
 else { $('.scroll-top-wrapper').removeClass('show'); } });
$('.scroll-top-wrapper').on('click', scrollToTop); });
function scrollToTop() { verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0; element = $('body'); offset = element.offset(); offsetTop = offset.top; $('html, body').animate({scrollTop: offsetTop}, 500, 'linear'); } 
//scroll button ends

    var load = $("<div id=\"loading\" style=\"background-color:#333333;\"><img src=\"/images/ajax-loader.gif\" width=\"20\" height=\"20\"/></div>");
    function navChanger() {
        $(".newside").remove();
  //hides autocomplete dropdown on screen resize
        $(".ui-autocomplete").removeClass("show");
        if ($(window).width() <= 1000) {
        if($(".disc_back")){
        $(".disc_back").css("top","180px");
        }

if($("#tap").length<=0 && !window.tap && window.clusters.length>0){
var tap=$("<div id=\"tap\" style=\"position:absolute;top:122px;width:100%;height:46px;z-index:99;\"><button class=\"btn tap-btn\" style=\"width:100%;height:100%;\" type=\"button\">Tap to see clusters</button></div>");
$("body").append(tap);
tap.on("click",function(){
 $(this).slideUp("fast",function(){
	$(this).hide();
});
});
window.tap=true;
}
else if(window.tap){

}
else{
$("#tap").show();
}
if(window.clusters.length===0){
$("#smart_answer").css("margin-top","102px");
$(".side").removeClass("full-height");
}
else{
$("#smart_col").css("margin-top","62px");
$(".side").addClass("full-height");
}     
       
$(".side").addClass("hide");

$("#centre_parent").css("margin-top","20px");
console.log("resize");
            var newnav = $("<div class=\"newside\" style=\"width:"+$(".nav_changer").width()+"px;\"></div");
            var lbtn = $("<button style=\"\" class=\"cluster_lbtn btn glyphicon glyphicon-chevron-left\"></button>");
            var rcol = $("<div style=\"float:left;height:100%;width:40px;\" class=\"\"></div>");
            var lcol = $("<div style=\"float:left;height:100%;width:40px;\" class=\"\"></div>");
            var rbtn = $("<button style=\"\" class=\"cluster_rbtn btn glyphicon glyphicon-chevron-right\"></button>");
            var r = $("<div style=\"width:100%;height:100%;padding-top:5px;padding-bottom:5px;\"></div>");
            var main = $("<div style=\"padding:0px !important;height:50px;width:"+($(".nav_changer").width()-80)+"px;\" class=\"col-lg-10 col-md-10 col-sm-10 col-xs-10\"></div>");
            rcol.append(rbtn);
            lcol.append(lbtn);
            r.append(lcol);



            if (window.clusters.length > 0) {
                var m = $();
                //console.log(window.clusters.slice(window.icluster, window.jcluster));
                $.each(window.clusters.slice(window.icluster, window.jcluster), function(index, element) {
                    //console.log(element);
                    var h=($(".nav_changer").width()-105)/4;
if(index===window.jcluster){
var temp = $("<div data-toggle=\"tooltip\" data-placement=\"bottom\" class=\"cluster_btn\" title=\""+element.capitalizeMe()+"\" style=\"width:"+h+"px;\"></div>");

                    temp.text(element.capitalizeMe());
                    m = m.add(temp);
}
else{
                    var temp = $("<div data-toggle=\"tooltip\" data-placement=\"bottom\" class=\"cluster_btn\" title=\""+element.capitalizeMe()+"\" style=\"width:"+h+"px;\"></div>");

                    temp.text(element.capitalizeMe());
                    m = m.add(temp);
}
                });
                main.append(m);
                r.append(main);
                r.append(rcol);
                newnav.append(r);

                newnav.height("50");
                $(".nav_changer").prepend(newnav);
                main.on("mouseenter", "div", function() {
                    $(this).css({
                        "color": "#e2e2e2",
                        "background-color": "#383838"
                    });

                });
                main.on("mouseleave", "div", function() {
                    $(this).css({
                        "color": "#e2e2e2",
                        "background-color": "transparent"
                    });
                    main.on("click", "div", function() {
                        $(this).addClass("active");
                      clickOnCluster(this);

                    });

                });
                lbtn.on("click", function() {
                    if (window.icluster !== 0) {
                        window.icluster -= 3;
                        window.jcluster -= 3;
                        //console.log(window.icluster);
                        $(".navside").remove();
                        navChanger();

                    }

                });
                rbtn.on("click", function() {
                    if ((window.jcluster + 3) <= window.clusters.length) {
                        window.icluster += 3;
                        window.jcluster += 3;
                        //console.log(window.icluster);
                        $(".navside").remove();
                        navChanger();
                    }
                });
            } else {

                getClusters();
            }

$(".newside").css("margin-top","122px");

        } else {
$("#tap").hide();
$("#centre_parent").css("margin-top","82px");
$(".newside").css("margin-top","82px");
$("#smart_col").css("margin-top","82px");
if(window.clusters.length>0){
            $(".side").removeClass("hide");
}
else{
$("#smart_answer").css("margin-top","22px");

}

        }




    }
    navChanger();
    $(window).on("resize", navChanger);

   
  
    $("#search_btn").on("submit", function() {
        if ($("#search").val().trim() !== "") {
            var query = $("#search").val().trim();
            return true;
        }
    });


    $("#logo").on("click", function() {

        window.location = "/";
    });

  
  


    function getIdsResults(bool) {

        if ($("#search").val().trim() !== "") {
         

                $.ajax({
                    async: bool,
                    url: "/cgi-bin/queryret/getIds.py",
	            data:{q:$("#search").val().trim().toLowerCase(),f:1},
                    dataType: 'text',
                    type: "GET",
                    error: function() {
                    window.results=false;
                    }

                }).done(function(text) {
                   var js = JSON.parse(text);
                    IDS = js["ids"];
		    renderResult(js["results"],$("#search_results"),undefined,true);
                   window.results=true;

                });

            

        }

    }
function renderResult(arr,fat,wiki,isappend){
 if (arr[0]) {

 			if(wiki===""){
 				window.wiki=true;
 				
 			}
 			else{
 			window.results = true;
                    window.i+=10;
                    window.j+=10; 			
 			}
                    
                    var main = $();
                    $.each(arr, function(index, element) {
                        var prnt = $("<div></div>");
                        prnt.addClass("search_result effect");
                        
                        var title = $("<div style=\"display:block;\"></div>");
                        titlea = $("<a></a>");
                        titlea.addClass("search_title");
                        var g=element["title"].replace(/_/g," ").split(" ");
			if(g.length>10){  
				var ti=g.slice(0,10).join(" ")+" ...";
			}
			else{
				var ti=g.slice(0,10).join(" ");
			}
			if(wiki===""){
				titlea.text(ti.capitalizeMe()+" - Wikipedia, the free encyclopedia");
				titlea.attr("href", "http://en.wikipedia.org/wiki/"+element["title"]);
				element['url']="http://en.wikipedia.org/wiki/"+element["title"];
				element['body']="";//element['body'].filter();
			}
			else{
				titlea.text(ti.capitalizeMe());
				titlea.attr("href", element["url"]);
			}
			
                        
                        
                        title.append(titlea);
                        var imgspan = $("<div></div>");
imgspan.addClass("search_green");
                        imgspan.append(element["url"]);
var img=new Image();
var u="http://www.google.com/s2/favicons?domain=" + element['url'];
img.onload=function(){imgspan.prepend(img);prnt.find("p").after(imgspan);};
img.src=u;
img.width=15;
img.height=15;
$(img).css("margin-right","10px");
                       
                        var p = $("<p></p>");
                        p.addClass("search_info");
                        p.text(element["body"]);
                        prnt.append(title);
                        prnt.append(imgspan);
                        
                        prnt.append(p);
                        main = main.add(prnt);



                    });
                   main=main.add("<hr class=\"hr_breaker\">");
                   if(isappend){
                    fat.append(main);
                    }
                    else{
                    fat.html(main);
                    }
                     
                    $(".search_result").on("click",function(){
                    window.location=$(this).find(".search_title").attr("href");
                    
                    });
                      $(".search_result").on("mouseenter",function(){
                      if(window.color==="light"){
                      $(this).find(".search_title").css("color","rgba(71, 71, 71, 0.85)");
                      $(this).find(".search_title").css("text-decoration","underline");
                      }
                      else if(window.color==="dark"){
                      $(this).find(".search_title").css("color","#DDDDDD");
                      $(this).find(".search_title").css("text-decoration","underline");
                      }
                      });
                       $(".search_result").on("mouseleave",function(){
                       if(window.color==="light"){
                       $(".search_title").css("color","#474747");
                      $(".search_title").css("text-decoration","none");
                       }
                       else if(window.color==="dark"){
                         $(".search_title").css("color","#DFDDDD");
                      $(".search_title").css("text-decoration","none");
                       
                       }
                       
                       });
                  //  $(".effect").hide();
                    
                    $(".effect").animate({opacity:1.0,queue:false},1000,function(){});
                    $(".effect").removeClass("effect");
                    $("#loading").remove();
                    $(window).scroll(bindScroll);
                } else {
			if(!window.scrolled){
				if(!(IDSwiki.length>0 || IDSnews.length>0)){
					load.remove();
                        var prnt = $("<div><span></span></div>");
                        prnt.width($("#search_results").width());
                        prnt.addClass("h6 text-center no-results");
                        prnt.text("No more results available");
				}
			}
                    else if (window.results) {
                        load.remove();
                        var prnt = $("<div><span></span></div>");
                        prnt.width($("#search_results").width());
                        prnt.addClass("h6 text-center no-results");
                        prnt.text("No more results available");
                        fat.append(prnt);
                        window.results = false;
                    }

                }


}

    function getResultsResults(i, j, bool) {
if(i<IDS.length){
        if (IDS && window.results) {
            $.ajax({
                url: "/cgi-bin/queryret/getMore.py",
                dataType: 'text',
                type: "GET",
                async: bool,
                data: {
                    q: "" + IDS.slice(window.i, window.j).toString(),
		    f:"1"
                },
                error: function() {

                    load.remove();
                    var prnt = $("<div><span></span></div>");
                    prnt.width($("#search_results").width());
                    prnt.addClass("h6 text-center no-results");
                    prnt.text("No more results available");
                    load.remove();
                    $("#search_results").append(prnt);
                    window.results = false;


                }

            }).done(function(text) {
                var arr = JSON.parse(text);
console.log(arr);
               renderResult(arr["results"],$("#search_results"),undefined,true);


            });

        }
}
else{
 load.remove();
$(".no-results").remove();
                    var prnt = $("<div><span></span></div>");
                    prnt.width($("#search_results").width());
                    prnt.addClass("h6 text-center no-results");
                    prnt.text("No more results available");
                    load.remove();
                    $("#search_results").append(prnt);
                    window.results = false;
}



    }

    function bindScroll() {
    
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
       
            $(window).unbind('scroll');
            if (window.results) {
		window.scrolled=true;
                $("#search_results").append(load);
                $("#loading").width($("#search_results").width());
                setTimeout(function() {
                    getResultsResults(i, j, true);
                }, 1000);

            }

        }

    }
function getIdsWiki(bool){
 $.ajax({
                async: bool,
                url: "/cgi-bin/queryret/getIds.py",
                dataType: 'text',
                type: "GET",
                data: {
                    q: $("#search").val().trim().toLowerCase(),f:2
                },
                error: function() {
                }

            }).done(function(text) {
            try{
                var js = JSON.parse(text);
                IDSwiki=js["ids"];
                
                window.wikiTitle=js["results"][0]["title"];
		renderResult(js["results"],$("#wikiMain"),"",true);
		$.getScript("/js/modules/wiki.js");
		window.wiki=true;
		}
		catch(err){
		window.wiki=false;
		}

            });



}
function getIdsNews(bool){
 $.ajax({
                async: bool,
                url: "/cgi-bin/queryret/getIds.py",
                dataType: 'text',
                type: "GET",
                data: {
                    q: $("#search").val().trim().toLowerCase(),f:3
                },
                error: function() {
                }

            }).done(function(text) {
            try{
                var js = JSON.parse(text);
                IDSnews=js["ids"];
		renderResult(js["results"],$("#news"),undefined,true);
		window.news=true;
		}
		catch(err){
		window.news=false;
		}
            });



}


   window.getSmartAns=function() {
        if ($("#search").val().trim() !== "") {
            //console.log("getSmartAns q:" + $("#search").val().trim().toLowerCase());
            $.ajax({
                async: true,
                url: "/cgi-bin/new2/smart/getSmartAns.py",
                dataType: 'text',
                type: "GET",
                data: {
                    q: $("#search").val().trim().toLowerCase()
                },
                error: function() {
                    console.log("error smart ans");
                    $("#smart_answer").removeClass("show");
                  $("#smart_col").addClass("hide");
                     
                }

            }).done(function(textt) {
	try{
		$.ajaxSetup({cache:false});
                var js = JSON.parse(textt.replace(/\n/g, "").trim());
                if (!$.isEmptyObject(js)) {
                    $.each(js, function(key, val) {
                       window.val=val;
                        switch (key) {

                            case "general":
				$.getScript("/js/modules/general.js");
                                break;
                            case "sports":
                                $.getScript("/js/modules/sports.js");
                                break;
                            case "stock":
                                $.getScript("/js/modules/stocks.js");
                                break;
                            case "train":
                                $.getScript("/js/modules/train.js");
                                break;

                            case "weather":

                              $.getScript("/js/modules/weather.js");
                                break;
                            case "movie":
                               $.getScript("/js/modules/movie.js"); 
                            break;
                            case "exam":
			       $.getScript("/js/modules/exam.js");
				 
                            break;
                           case "location":
                              $.getScript("/js/modules/locations.js");
                            break;
                           case "minerals":
                               $.getScript("/js/modules/minerals.js");
			 break;
			 case "differences":
                               $.getScript("/js/modules/differences.js");	
			break;
			case "wiki":
			function dispInfoBox(){$("#smart_col").html("").append(window.InfoBox);
				$("#wiki>a").on("click",function(e){e.stopPropagation();});
				$("#smart_answer").addClass("hide");
				$("#smart_col").removeClass("hide");
				}
			function recur(){
			setTimeout(function(){
					if(window.InfoBox){dispInfoBox();}else{recur();}
				},2000);
				}
				recur();
			 break;
			case "dict":
                            $.getScript("/js/modules/meaning.js");
                            recur();
			 break;
			case "theatre":
                               $.getScript("/js/modules/theater.js");
			 break;
			case "highway":
                               $.getScript("/js/modules/highway.js");
			 break;
			case "cricket-players":
				$.getScript("/js/modules/cricket.js");
			 break;
			 case "ministers":
				$.getScript("/js/modules/ministers.js");

			break;
			 case "bank":
				$.getScript("/js/modules/bank.js");

			break;
			case "site":
				$.getScript("/js/modules/site.js");

			break;
			case "highcourt":
				$.getScript("/js/modules/highcourt.js");

			break;
			case "discography":
				$.getScript("/js/modules/discography.js");

			break;
                            default:
                                $("#smart_answer").addClass("hide");
                            break;

                        }

                    });
                } else {

                    if ($("#search").val().trim().toLowerCase().indexOf('convert') > -1) {
                    
                            $.getScript("/js/modules/glaConv.js");
  			    $.getScript("/js/modules/metric.js");
  			     $.getScript("/js/modules/convert.js");
  			}		
                    console.log("No smart  ans questions !");
                    $("#smart_answer").addClass("hide");
   $("#smart_col").addClass("hide");
                  
                }

}
catch(err){
	  console.log("No smart  ans questions !");
                    $("#smart_answer").addClass("hide");
   $("#smart_col").addClass("hide");
		}
            });
        }

    };
  
    function getClusters() {
        if ($("#search").val().trim() !== "") {
            //console.log("getClusters q;:" + $("#search").val().trim().toLowerCase());
            $.ajax({
                async: true,
                url: "/cgi-bin/cluster/getClusters.py",
                dataType: 'text',
                type: "GET",
                data: {
                    q: $("#search").val().trim().toLowerCase()
                },
                error: function() {
                    console.log("error clusters");
                    window.clusters=[];
$(".side").removeClass("col-md-2 col-lg-2 hide");
$(".side").addClass("col-md-1 col-lg-1");
$("#centre_parent").parent().removeClass("col-lg-7 col-md-7 col-lg-pull-3 col-md-pull-3");
$("#centre_parent").parent().addClass("col-lg-8 col-md-8 col-lg-pull-3 col-md-pull-3");
$("#smart_col").parent().removeClass("col-lg-push-7 col-md-push-7 col-lg-3 col-md-3");
$("#smart_col").parent().addClass("col-lg-push-8 col-md-push-8 col-lg-3 col-md-3");
                }

            }).done(function(textt) {
		var res=JSON.parse(textt);
		window.clusterResponse=res;
		var arr=[];
		$.each(res,function(k,v){
		var map={"100":"Architecture","101":"Arts","102":"Education","103":"Entertainment","104":"Finance","105":"Food","106":"Health","107":"History","108":"News","109":"Sports","110":"Technology","111":"Religion"}
		
		
		arr.push(map[k]);});
                if (arr.length > 0) {
                    var main = $();
                    window.clusters = arr;
                    $.each(arr, function(index, element) {
if(element){
                        var li = $("<li></li>");
                        var a = $("<a></a>");
			a.attr("data-toggle","tooltip");
			a.attr("data-placement","right");
			a.attr("title",element.capitalizeMe());
                        a.on("click",function(){$(".active").toggleClass("active not_active");$(this).parent().toggleClass("not_active active");clickOnCluster(this)});
                        a.text(element.capitalizeMe());
                        li.append(a);
                        li.addClass("not_active");
                        li.css("opacity","0");
                        main = main.add(li);
$(".side").removeClass("hide");
                        navChanger(); //for nav
}

                    });
                    $(".nav-sidebar").append(main);
                    main.animate({opacity:"1",queue:false},1000,function(){});
		
                } else {
                    console.log("no clusters");
window.clusters=[];
                   $(".side").html("");
$(".side").removeClass("hide");
$(".side").removeClass("col-md-2 col-lg-2");
$(".side").addClass("col-md-1 col-lg-1");
$("#centre_parent").parent().removeClass("col-lg-7 col-md-7 col-lg-pull-3 col-md-pull-3");
$("#centre_parent").parent().addClass("col-lg-8 col-md-8 col-lg-pull-3 col-md-pull-3");
$("#smart_col").parent().removeClass("col-lg-push-7 col-md-push-7 col-lg-3 col-md-3");
$("#smart_col").parent().addClass("col-lg-push-8 col-md-push-8 col-lg-3 col-md-3");
                }


            });
        }

    }

   

function clickOnCluster(that){

                        var rmap={"Architecture":"100","Arts":"101","Education":"102","Entertainment":"103","Finance":"104","Food":"105","Health":"106","History":"107","News":"108","Sports":"109","Technology":"110","Religion":"111"};
		
                        var cluster=$(that).text();
                        if(cluster!=="News"){
                        $("#news").addClass("hide");
                        }
                        else{
                        
                        $("#news").removeClass("hide");
                        }
                        var cid=rmap[cluster];
                        var ids=window.clusterResponse[cid];
                        IDS=ids;
                        window.i=0;
                        window.j=10;
                         $.ajax({
				async: true,
				url: "/cgi-bin/queryret/getMore.py",
				dataType: 'text',
				type: "GET",
				data: {
				    q: IDS.slice(window.i,window.j).toString(),f:1
				},
				error: function() {

                    load.remove();
                    var prnt = $("<div><span></span></div>");
                    prnt.width($("#search_results").width());
                    prnt.addClass("h6 text-center no-results");
                    prnt.text("No more results available");
                    load.remove();
                    $("#search_results").append(prnt);


                }}).done(function(textt) {
                		
				var js=JSON.parse(textt);
					renderResult(js["results"],$("#search_results"),undefined,false);
				});
                     	   return false;
                     }
    //fix scroll later
    $(window).bind('scroll', bindScroll);
    getIdsResults(true);
    getIdsWiki(true);
    getIdsNews(true);
    window.getSmartAns();
    getClusters();

});

  

   String.prototype.capitalizeMe=function() {
try{
        return this.charAt(0).toUpperCase() + this.substr(1).toLowerCase();
}
catch(err){
return "";
}
    }; 
   String.prototype.filter=function() {
try{
	data = this + " ";
	data = data.replace(/®/g, " ").replace(/©/g, " ").replace(/[\.\,-\/#!<>?$%\^&\*;:\+{}=\-_`~()\[\]]/g, " ").replace(/\\u.*\s/g, " ").replace(/\\n+/g, " ").replace(/\\t+/g, " ").replace(/\\r+/g, " ").replace(/\\x.*\s/g, " ").replace(/\\/g,"").replace(/\'/g,"").replace(/\"/g,"").replace(/\\/g,"").replace(/\s+/g, " ").replace(/\|/g,' ').replace(/redirect/g,' ').replace(/[a-z][0-9]*\s/g," ").trim();

	return data;
}
catch(err){
return "";
}
    };
$.prototype.setTextValue=function(t){
if(t===""||t===undefined){
//console.log("empty");
$(this).remove();

}
else{
$(this).text(t);

}


};
$.prototype.setHtmlValue=function(t,test){

if(test===""||test===undefined){

$(this).remove();


}
else{
$(this).html(t);

}


};
window.asyncImage=function(src1,w,h){
var img=new Image();
img.width=w;
img.height=h;
img.src=src1;
return $(img);
};
