/*
 Author Tilak Patidar
 email tilakpatidar@gmail.com
 github http://github.com/tilakpatidar      
  */
(function() {
    "use strict";
    $(document).ready(function() {
        //load scripts
        $.ajaxSetup({
            cache: true
        });
        


  		$('[data-toggle="tooltip"]').tooltip();
        function ls(filename, filetype,id){
    if (filetype=="js"){ //if filename is a external JavaScript file
        var fileref=document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src", filename);
       
    }
    else if (filetype=="css"){ //if filename is an external CSS file
        var fileref=document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
        fileref.setAttribute("id", id);
    }
    if (typeof fileref!="undefined"){
        document.getElementsByTagName("head")[0].appendChild(fileref);}
         return fileref;
}
        //end load scripts
        //global vars start
        var CURRENT_FLAG=1;
        var USER_QUERY=$("#search").val().trim();
        var START_RESULT = 0;
        var END_RESULT = 10;
        var HAS_RESULTS ={"web":false,"vidoes":false,"images":false,"news":false};
        var CURRENT_TYPE="web";
        var GOT_CLUSTERS=false;
        var CLUSTERS = [];//clusters
        window.SA = {};
        var CURRENT_PAGE=0;
        var EXTRA_SEARCH=false;
        var SHOW_INFOBOX = false;
        var HIDE_INFOBOX = false;
        var CLUSTER_RESPONSE ={};//clusters_docs
        var CLUSTER_RESULTS={};//hits
        var GENERAL_RESULTS={};//general results
        var CURRENT_RESULTS=[];
        var BREAKERS=1;//get generated hr breaker counts
        var INFO_BOX = "";
        var MODAL_BACK="";
        var KEY="";
        var OPEN_DRAWER=false;
        window.WIKI_TITLE="";
        var S_KEY="SECRET_KEY";
        var cc=1;//current images rendered count
             //check search type
        
        var cook=document.cookie.split(";");
	var co={};
	//if color present
	for(var i=0;i<cook.length;i++){
		co[cook[i].split("=")[0].trim()]=cook[i].split("=")[1].trim();

	}
	if(!co["search_type"]){
			document.cookie = "search_type=web;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/";
		
	}
	else if(co["search_type"]==="web"){
			CURRENT_TYPE="web";
			getIDSresults();
	
	}
	else if(co["search_type"]==="videos"){
			CURRENT_TYPE="videos";
			getVideos();
	
	}
	else if(co["search_type"]==="news"){
			CURRENT_TYPE="news";
			getNews();
	
	}
	else if(co["search_type"]==="images"){
			CURRENT_TYPE="images";
			getImages();
	
	}
	
         window.cacheImage=function(src,element){
         var canvasEl = document.createElement('canvas');
         element.setAttribute("src",src); //bypass
         return;
        	if(typeof(Storage) !== "undefined" && !!canvasEl.getContext) {
        		
        		var item=localStorage.getItem(src+"#image#"+element.width+"#key#"+S_KEY);
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
        			localStorage.setItem(src+"#image#"+element.width+"#key#"+S_KEY,dataURL);
        			canvas=null;
        		
        		
        		};
        		
        		
        		})(element,src);
        		
        		}
        	}
        	else{
        		element.setAttribute("src",src);
        	}
        
        
        };
        function hideFloatSearchBar(){
		$(".extra_search").css("display","inline").animate({opacity:1},500,function(){$(this).finish();});
        	$(".nav_col").animate({opacity:0},500,function(){
        	
        		$(this).css("visibility","hidden").finish();
        		 EXTRA_SEARCH=false;
        	});        
        
        
        }
        function clearCache(){
		if(typeof(Storage) !== "undefined") {
			var js=Object.keys(localStorage);
			$.each(js,function(index,element){
				if(element.indexOf(S_KEY)<0 && element.indexOf("autocomplete")<0){
				localStorage.removeItem(element);
				
				}
			
			
			});	
	
		}
	
	}
	clearCache();
        var si=function(){
        	SHOW_INFOBOX = true;
        	ls("/js/min/"+KEY+".min.js","js");
        };
        var hi=function(){
        	HIDE_INFOBOX = true;
        	ls("/js/min/"+KEY+".min.js","js");
        };
        
        var MODULES={"general":si,"sports":hi,"stock":hi,"train":hi,"weather":si,"movie":si,"exam":hi,"location":hi,"minerals":hi,"differences":si,"wiki":si,"dict":si,"theatre":si,"highway":hi,"cricket-players":si,"ministers":hi,"bank":hi,"highcourt":hi,"discography":si,"flight":hi,"tennis":si};
        //console.log(MODULES);
        var LOAD = $('<div id="loading" style="background-color:transparent;"><div class="cssload-container"><div class="cssload-jumping"><span></span><span></span><span></span><span></span><span></span></div></div>');
        function prependCss(css,id){
    elChild = document.createElement('style');
    elChild.setAttribute("id",id);
elChild.innerHTML = css;
document.getElementsByTagName("head")[0].appendChild(elChild);
}
        
        function searchQuery(q) {
            window.location = "/cgi-bin/s.py?q=" + encodeURIComponent(q);
        }
        function removeParentWiki(table){
        var childs=table.children();
        if(table.attr("class").indexOf("infobox")>=0){
        return;//if table is infobox itself
        }
        $.each(childs,function(index,elem){
        try{
        	if($(elem).attr("class").indexOf("infobox")<0){
        	$(elem).remove();
        	}
        	}
        	catch(err){$(elem).remove();}
       
        
        
        });
       $.each(table.contents(),function(i,e){
       	try{
       	if($(e).prop('tagName')!=="TABLE"){
       		$(e).remove();
       	
       	}
       	}
       	catch(err){$(e).remove();}
       
       });
        }
        function dispInfoBox() {
        //console.log("1");
            var table = $(INFO_BOX.replace(/<img (.*?)\/>/g, "").replace(/\?+/g,"").replace(/background-color:(.*?);/g,"").replace(/background:(.*?);/g,""));
            table.find(".hatnote").remove();
            table.find(".ambox").remove();
            table.find(".mediaContainer").remove();
            table.find(".error").remove();
            table.find(".infobox").attr("style","");
            table.attr("style","");//remove style of infobox
            table.find(".mw-ext-cite-error").remove();
            table.find("#softredirect").remove();
            table.find("caption.fn.org").remove();
            table.find(".fn,.org").remove();
            table.find(".summary").remove();
            table.addClass("wiki_module module").attr("id", "wiki");
            var count=0;
            $.each(table.find("tbody").children("tr"),function(index,element){
            
            if(count>8){
            //console.log(count);
            $(element).remove();
            }
            count+=1;
            
            });
            $.each(table.find("a"), function() {
            $(this).addClass("wiki_link");
                if ($(this).attr("href") && $(this).attr("href").indexOf("File") >= 0) {
                    $(this).attr("crossOrigin","Anonymous");
                    $(this).text("");
                    var img = $("<img>");
                    var fn = $(this).attr("href").split("/");
                    if($(this).parent().attr("title")==="Decrease" ||$(this).parent().attr("title")==="Increase" ||$(this).attr("title")==="File:Decrease Positive.svg"){
                    img.attr("src", "http://en.wikipedia.org/wiki/en:Special:Filepath/" + fn[fn.length - 1].replace("File:", "") + "?width=11");
                    $(this).attr("href","http://en.wikipedia.org/wiki/en:Special:Filepath/" + fn[fn.length - 1].replace("File:", "") + "?width=11");
                    }
                    else{
                    img.attr("src", "http://en.wikipedia.org/wiki/en:Special:Filepath/" + fn[fn.length - 1].replace("File:", "") + "?width=220");
                    $(this).attr("href","http://en.wikipedia.org/wiki/en:Special:Filepath/" + fn[fn.length - 1].replace("File:", "") + "?width=220");
                    }
                    $(this).append(img);
                }
                else{
                
                	$(this).attr("href",$(this).attr("href").replace("/wiki","https://en.wikipedia.org/wiki"));
                }
            });
            //console.log(table.html());
            removeParentWiki(table);
            table.find("img").on("error",function(){
            $(this).remove();
            
            });
            $("#smart_col").html("").append(table);
            $("#wiki>a").on("click", function(e) {
                e.stopPropagation();
            });
            $("#smart_answer").addClass("hide");
            if(CURRENT_TYPE==="web"){
            $("#smart_col").removeClass("hide");
            }
        }
        function CHECK_IF_INFOBOX_EXISTS() {
            setTimeout(function() {
                if (INFO_BOX && SHOW_INFOBOX) {
                    dispInfoBox();
                } else if (HIDE_INFOBOX) {} else {
                    CHECK_IF_INFOBOX_EXISTS();
                }
            }, 2000);
        }
        CHECK_IF_INFOBOX_EXISTS();
        function ADD_NO_RESULTS() {
            LOAD.remove();
            $(".no-results").remove();
            var prnt = $("<div><span></span></div>");
            prnt.addClass("h6 text-center no-results");
            prnt.text("No results available");
            return prnt;
        }
        //global vars closed
        //start of theme switch
       
        cacheImage("/images/"+window.color+"/nav_logo.png",document.getElementById("srmse-logo"));
     

       
var TOP_DRAWER = true; //toggle var
function openTopDrawer(){
$(".top_drawer").css("z-index","20100");
       			$(".top_drawer").animate({opacity:"1",height:"40px"},500);
       			
       			TOP_DRAWER=false;

} 
function closeTopDrawer(){
$(".top_drawer").animate({opacity:"0",height:"0px"},500,function(){$(".top_drawer").css("z-index","-10");});
       			
       			TOP_DRAWER=true;


}
       $(".arrow_glyph").on("touch click",function(){
      
       		if($(window).width()<991){
       		if(TOP_DRAWER){
       			hideFloatSearchBar();
       			closeClusterDrawer();
       			openTopDrawer();
       		}
       		else{
       			closeTopDrawer();
       		
       		}
       		}
       
       
       
       });
        //end of theme switch
        //scroll button start
        $(function() {
    	var dir="up";
    	var position = $(window).scrollTop();
    	var displayed=false;
            $(document).on('scroll', function(e) {
            
if(CURRENT_TYPE!=="images"){
		  var scroll = $(window).scrollTop();
		  if (scroll > position) {
		    	$(".switch_arrow").removeClass("glyphicon glyphicon-arrow-up");
		    	$(".switch_arrow").addClass("glyphicon glyphicon-arrow-down");
	     		dir="down";
		  } else {
		    	$(".switch_arrow").removeClass("glyphicon glyphicon-arrow-down");
		    	$(".switch_arrow").addClass("glyphicon glyphicon-arrow-up");
		    	dir="up"; 
		  }
		  position = scroll;

           
                if ($(window).scrollTop() > 100 && !displayed) {
                    $('.scroll-top-wrapper').addClass('show');
                    displayed=true;
                    setTimeout(function() {
                        $('.scroll-top-wrapper').removeClass('show');
                        displayed=false;
                    }, 8000);
                }
                } 
            });
            $('.scroll-top-wrapper').on('click touch', function(){scrollToTop(dir);});
        });
        var SAME_PAGE=false;//bool to see if same page selected on nav
        function getNearestElement(dir){
        	
        	var elem;
				if(dir==="down"){
					elem=$(".page"+(CURRENT_PAGE+1));
					CURRENT_PAGE+=1;
					if(elem.length===0){
						  $('html, body').animate({
								scrollTop: $(document).height()
							    }, 500, 'linear',function(){
							    	
							    	
							    });
							   return -1;
											}
				}
				else if(dir==="up"){
					elem=$(".page"+(CURRENT_PAGE-1));
					CURRENT_PAGE-=1;
					if(elem.length===0){
						  $('html, body').animate({
								scrollTop: 0
							    }, 500, 'linear',function(){
							    	
							    	
							    });
							   return -1;
											}
				}
        		
        	
        	
        	
        	
        	return elem;
        
        }
        function scrollToTop(dir) {
        	//scrolls to nearest top page
       
            var elem=getNearestElement(dir);
            if(elem===-1){
            return;
            
            }
            var verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
            var element = elem;
            var offset = element.offset();
            var offsetTop = offset.top-200;
             $('html, body').animate({
                scrollTop: offsetTop
            }, 500, 'linear',function(){
            	elem.tooltip('show');
            	(function(elem){
            		setTimeout(function(){elem.tooltip('hide');}, 2000);
            	
            	})(elem);
            	
            });
        }
     
        $("#search_btn").on("submit", function() {
            if ($("#search").val().trim() !== "") {
                var query = $("#search").val().trim();
                $(".extra_search_bar").val($(event.target).parent().text());
                searchQuery(query);
            }
            return false;
        });
        $("#search_btn_extra").on("focusin click touch",function(){
           if ($("#search").val().trim() !== "") {
                var query = $("#search").val().trim();
                $(".extra_search_bar").val($(event.target).parent().text());
                searchQuery(query);
            }
            return false;
        
        });
        $("#logo").on("click", function() {
            window.location = "/";
        });
        function getIDSresults() {
          if(USER_QUERY!==""){
          getSmartAns();//get smart ans
          getIDSwiki();
          getIDSnews();
          getClusters();
              START_RESULT = 0;
    END_RESULT = 10;
    CURRENT_RESULTS=[];
    CURRENT_TYPE="web";
    showResults("web");
    $(".desktop_pills").find(".active").removeClass("active");
    $(".web_search").parent().addClass("active");
    var k=GENERAL_RESULTS["web"];
    if(!k){
     	$.ajax({
                    async: true,
                    url: "/cgi-bin/query_retrieval/ask_me.py",
                    data: {
                        q: USER_QUERY,
                        f: 0,
                        t:2,
                        authenticity_token:$("meta[name='csrf-token']").attr("content")
                    },
                    dataType: 'text',
                    type: "GET",
                    error: function() {
                        HAS_RESULTS[CURRENT_TYPE] = false;
                    }
                }).done(function(text) {
                    var js = JSON.parse(text);
                    if(js["error"]){
                    	HAS_RESULTS[CURRENT_TYPE] = false;
                    }
                    else{
                    BREAKERS=1;
                    GENERAL_RESULTS["web"]=js["content"];
                    CURRENT_RESULTS=js["content"];
                    HAS_RESULTS[CURRENT_TYPE]=true;
                    renderResult(js["content"].slice(0,10), $("#search_results"),false, true,false);
                    START_RESULT += 10;
                    END_RESULT += 10;
                    }
                });
    
    	}
    	else{
    
      		    BREAKERS=1;
      		    CURRENT_RESULTS=k;
      		    HAS_RESULTS[CURRENT_TYPE]=true;
                    renderResult(k.slice(0,10), $("#search_results"),false, true,false);
                    //$("#videos>hr").remove();
                    START_RESULT += 10;
                    END_RESULT += 10;
                    }
           document.cookie = "search_type=web;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/";
           $("#blur_back").fadeOut();
            hideSpinner();
           
           }
        }
        function renderResult(arr, fat, wiki, isappend,news,isVideos) {
            if (arr[0]) {
                if (wiki) {
                    INFO_BOX = arr[0]["infobox"];
                }
                var main = $();
                //to add a line break hr
                if(!news && !wiki){
                	main = main.add("<hr name='"+BREAKERS+"' class='hr_breaker pages page"+BREAKERS+"' data-toggle='tooltip' data-animation=true data-placement='bottom' title='page"+BREAKERS+"'>");
                ++BREAKERS;
                }
                else if(!wiki){
                	main = main.add("<hr class='hr_breaker'>");
                	if(news){
                	 main=main.add('<a id="more_news" class="news_search" href="#">In the news</a>');
                	
                	}
                	
                }
                $.each(arr, function(index, element) {
                    var prnt = $("<div><div class='search_result_1'></div></div>");
                    var title = $("<div style='display:block;'></div>");
                    var titlea = $("<a></a>");
                    title.append(titlea);
                    prnt.addClass("search_result effect"); //remove effect class to remove fadeIn
                    titlea.addClass("search_title");
                    //Adding ... to long titles
                     window.WIKI_TITLE=element["title"];
                    var g = element["title"].replace(/_/g, " ").split(" ");
                    var stripped_title = "";
                    if (g.length > 10) {
                        stripped_title = g.slice(0, 10).join(" ") + " ...";
                    } else {
                        stripped_title = g.slice(0, 10).join(" ");
                    }
                    if (wiki) {
                        titlea.text(stripped_title.capitalizeMe() + " - Wikipedia, the free encyclopedia");
                        titlea.attr("href", "http://en.wikipedia.org/wiki/" + element["title"]);
                        element['url'] = "http://en.wikipedia.org/wiki/" + element["title"];
                  
                        
                    } else {
                        titlea.text(stripped_title.capitalizeMe());
                        titlea.attr("href", element["url"]);
                    }
                    
                    
                    //for visited links
                           if(typeof(Storage)!==undefined){
                    
                    	//use local storage
                    	var item=localStorage.getItem("visited");
                    	if(item){
                    		var t=JSON.parse(item);
                    		if(t[titlea.attr("href")]){
                    		//visited
                    		prnt.addClass("search_result_visited");
                    		
                    		}
                    	
                    	}
                    	else{
                    	
                    		localStorage.setItem("visited",JSON.stringify({}));
                    	
                    	}
                    }
                    //fav loading
                    var imgspan = $("<div></div>");
                    imgspan.addClass("search_green");
                    imgspan.append(element["url"]);
                    var img = new Image();
                    var url = "http://www.google.com/s2/favicons?domain=" + element['url'];
                    img.src = url;
                    img.className="img_fav";
                    $(img).css("margin-right", "10px");
                    img.onload = function() {
                        imgspan.prepend(img);
                        prnt.find(".search_info").after(imgspan);
                    };
                    var search_desc = $("<p></p>");
                    search_desc.addClass("search_info");
                    if (wiki) {
                        //as wiki as desc in html in db
                        var wiki_desc=$(element["body"]);
                        wiki_desc.find(".ambox").remove();
                        wiki_desc.find(".error").remove();
                        wiki_desc.find("img").remove();
                        wiki_desc.find(".mw-ext-cite-error").remove();
                        $.each(wiki_desc.find("a"),function(index,element){
                        
                        
                        $(this).attr("href",$(this).attr("href").replace("/wiki","https://en.wikipedia.org/wiki"));
                        
                        });
                        search_desc.html($("<div/>").append(wiki_desc).html());
                    } 
                    else if(isVideos){
		            search_desc = $("<div></div>");
		            search_desc.addClass("search_info container-fluid");
		            var url_token=element["url"].replace("https://www.youtube.com/watch?v=","");
			    if(element["domain"]==="youtube"){
				search_desc.append("<div class='col-md-3 col-xs-3 col-sm-3 col-lg-3'><img class='yt_img' src='https://i.ytimg.com/vi/"+url_token+"/mqdefault.jpg'/></div>");
				}
			    else{
				search_desc.append("<div class='col-md-3 col-xs-3 col-sm-3 col-lg-3'><img class='yt_img' src='"+element["img"]+"'/></div>");
				}
			    search_desc.append("<div class='col-md-9 col-xs-9 col-sm-9 col-lg-9'>"+element["description"].filter()+"</div>");
                    }
                    else if(news){
                    	if(element["img"]===""){
		            	if(element["meta_description"]!==""){
		            		search_desc.text(element["meta_description"].substr(0,200).filter());
		            	}
		            	else{
		            		search_desc.text(element["body"].substr(0,200).filter());
		            	
		            	}
                    	}
                    	else{
                    		search_desc = $("<div></div>");
                    		search_desc.addClass("search_info container-fluid");
                    		search_desc.append("<div class='col-md-3 col-xs-3 col-sm-3 col-lg-3'><img class='yt_img' src='"+element["img"]+"'/></div>");
                    		if(element["meta_description"]!==""){
                    			search_desc.append("<div class='col-md-9 col-xs-9 col-sm-9 col-lg-9'>"+element["meta_description"].filter()+"</div>");
                    		}
                    		else{
                    			search_desc.text(element["body"].substr(0,200).filter());
                    		
                    		}
                    	}
                    	
                    }
                    else {
                        search_desc.text(element["content"].substr(0,200).filter());
                    }
                    prnt.find(".search_result_1").append(title);
                    prnt.find(".search_result_1").append(search_desc);
                    main = main.add(prnt);
                });
                
                //to check if results is more or first
                if (isappend) {
                    fat.append(main);
                } else {
                    fat.html(main);
                }
                $(".search_result").on("click", function(e) {
                    $(this).addClass("search_result_visited");
                    if(typeof(Storage)!==undefined){
                   
                    	//use local storage
                    	var item=localStorage.getItem("visited");
                    	if(item){
                    		var t=JSON.parse(item);
                    		t[$(this).find(".search_title").attr("href")]=true;
                    		localStorage.setItem("visited",JSON.stringify(t));
                    	
                    	}
                    	else{
                    		var t=[];
                    		t[$(this).find(".search_title").attr("href")]=true;
                    		localStorage.setItem("visited",JSON.stringify(t));
                    	
                    	}
                    }
                    if(e.which!==2){
                    window.location = $(this).find(".search_title").attr("href");
                    }
                });
                //hover on titles
               
                //end hover titles
                //effect on render
                $(".effect").animate({
                    opacity: 1.0,
                    queue: false
                }, 1000, function() {});
                $(".effect").removeClass("effect");
                $("#loading").remove();
                $(window).scroll(bindScroll);//we unbinded scroll in bindScroll after rendering bind it again
            } else {
                
                if (!wiki && !news) {
                    HAS_RESULTS[CURRENT_TYPE] = false;
                }
               
            }
            $(".cluster_drawer").height($(document).height());
            $("#blur_back").height($(document).height());
        }
        function getMoreResults() {
        console.log(START_RESULT);
        console.log(CURRENT_RESULTS.length);
            if (START_RESULT < CURRENT_RESULTS.length) {
            console.log(CURRENT_RESULTS );
            console.log(HAS_RESULTS[CURRENT_TYPE]);
                if (CURRENT_RESULTS && HAS_RESULTS[CURRENT_TYPE]) {
                        var arr = CURRENT_RESULTS.slice(START_RESULT,END_RESULT);
                        console.log(arr);
                        var t=10;
                        if(CURRENT_TYPE==="web"){
                        renderResult(arr, $("#search_results"), false, true,false);
                        }
                        else if(CURRENT_TYPE==="videos"){
                        renderResult(arr, $("#videos"),false,true,false,true);
                        
                        }
                        else if(CURRENT_TYPE==="news"){
                        renderResult(arr, $("#news"),false,true,true,false);
                        
                        }
                         else if(CURRENT_TYPE==="images"){
                        renderImages(arr);
                        t=20;
                        }
                         START_RESULT += t;
                    	 END_RESULT += t;
                    	  $("#blur_back").css("height",$(document).height()+"px");
       			  $("#blur_back").css("width",$(document).width()+"px");
       			  $(".cluster_drawer").css("height",$(document).height()+"px");
       			  return true;
                }
            } else {
           
            	if(GOT_CLUSTERS || CURRENT_TYPE!=="web"){
            		//check if we got more results from getClusters first before marking no more results
		        var prnt = ADD_NO_RESULTS();
		        $("#search_results").append(prnt);
		        HAS_RESULTS[CURRENT_TYPE]=false;
		        return false;
                }
            }
        }
        function bindScroll(event) {
        
        	//hiding search bar
        	//console.log(event);
        	if($(window).width()<991){
        	if(EXTRA_SEARCH){
        		hideFloatSearchBar();
        	
        	}
        	}
        	
        	//clearing autocomplete
        	$('.ui-menu-item').remove();
                $('ul.ui-autocomplete')
                    .removeClass('opened')
                    .css('display', 'block');
        	var curr;
        	curr=parseInt($("#dummy").offset().top);
        	$.each($(".pages"),function(index,element){
        		var elem=$(this);
        		if((elem.offset().top<(curr+200)) && (elem.offset().top>(curr-200))){
        		elem.tooltip('show');
		    	(function(elem){
		    		setTimeout(function(){elem.tooltip('hide');}, 2000);
		    	
		    	})(elem);
        		return false;
        	
        		}
        	
        	});
        	 if(($(window).scrollTop() + $(window).height() == $(document).height())&& $("#blur_back").css("display")==="none") {
            		 $(window).unbind('scroll');
		        if (HAS_RESULTS[CURRENT_TYPE]) {
		            $("#search_results").append(LOAD);
		            setTimeout(function() {
		                getMoreResults();
		            }, 3000);
                	}
   		}
        	/*if($(window).scrollTop() + $("#centre_parent").innerHeight() >= that.scrollHeight) {
            		
        	}*/
        }
        function getIDSwiki() {
            $.ajax({
                async: true,
                url: "/cgi-bin/queryret/getIds.py",
                dataType: 'text',
                type: "GET",
                data: {
                    q: USER_QUERY,
                    f: 2,
                    authenticity_token:$("meta[name='csrf-token']").attr("content")
                },
                error: function() {}
            }).done(function(text) {
                try {
                    var js = JSON.parse(text);
                    if(js["error"]){
                    }
                    else{
                    renderResult(js["results"], $("#wikiMain"),true, true,false);
                    }
                } catch (err) {}
            });
        }
        function getIDSnews() {
            $.ajax({
                async: true,
                url: "/cgi-bin/query_retrieval/ask_me.py",
                dataType: 'text',
                type: "GET",
                data: {
                    q: USER_QUERY,
                    t:3,
                    f:0,
                    authenticity_token:$("meta[name='csrf-token']").attr("content")
                },
                error: function() {}
            }).done(function(text) {
                try {
                    var js = JSON.parse(text);
                    if(js["error"]){
                    }
                    else{
                    GENERAL_RESULTS["news"]=js["content"];
                    HAS_RESULTS["news"]=true;
                    renderResult(js["content"].slice(0,1), $("#news"), false, true,true);
                    }
                } catch (err) {}
            });
        }
       
        function getSmartAns() {
            if (USER_QUERY !== "") {
                $.ajax({
                    async: true,
                    url: "/cgi-bin/new2/smart/getSmartAns.py",
                    dataType: 'text',
                    type: "GET",
                    data: {
                        q: USER_QUERY,
                        authenticity_token:$("meta[name='csrf-token']").attr("content")
                    },
                    error: function() {
                        $("#smart_answer").removeClass("show");
                        $("#smart_col").addClass("hide");
                    }
                }).done(function(textt) {
                    try {
                        var js = JSON.parse(textt.replace(/\n/g, "").trim());
                        if(js["error"]){
                        $("#smart_answer").removeClass("show");
                        $("#smart_col").addClass("hide");
                        return
                    }
                    
                        if (!$.isEmptyObject(js)) {
                            $.each(js, function(key, val) {
                                window.SA = val;
                                try{
                                if(key==="wiki" || key==="neo"){
                                SHOW_INFOBOX=true;
                                }
                                else{
		                        KEY=key;
		                      MODULES[key]();
                                }
                                
                              }catch(err){
                              console.log(err);
                              SHOW_INFOBOX=true;
                              }
                            });
                        } else {
                            console.log("No smart  ans questions !");
                            $("#smart_answer").addClass("hide");
                            $("#smart_col").addClass("hide");
                        }
                    } catch (err) {
                        console.log("No smart  ans questions !");
                        $("#smart_answer").addClass("hide");
                        $("#smart_col").addClass("hide");
                    }
                });
            }
        }
        function clustersError(){
        CLUSTERS = [];
                        $(".side").removeClass("hide");
                        $(".nav-sidebar").addClass("hide");
        }
        function getClusters() {
            if (USER_QUERY !== "" && !GOT_CLUSTERS) {
                $.ajax({
                    async: true,
                    url: "/cgi-bin/cluster_retrieval/ask_me.py",
                    dataType: 'text',
                    type: "GET",
                    data: {
                        q: USER_QUERY,
                        authenticity_token:$("meta[name='csrf-token']").attr("content")
                    },
                    error: function() {
                        clustersError();
                        GOT_CLUSTERS=true;
                    }
                }).done(function(textt) {
                    var res = JSON.parse(textt);
                    if(res["error"]){
                    clustersError();
                    return
                    }
                    CLUSTER_RESPONSE = res["cluster_docs"];
                    $(".cluster_num").text(""+Object.keys(res["cluster_docs"]).length);
                    $(".cluster_cur").text("General");
                    CLUSTER_RESULTS={};
                    var temp_gen=[];
                    $.each(res["hits"]["hits"],function(index,element){
                    	var temp={};
                    	try{
                    	temp["content"]=element["fields"]["meta_description"][0];
                    	}
                    	catch(err){
                    	temp["content"]="";
                    	}
                    	try{
                    	temp["url"]=element["fields"]["url"][0];
                    	temp["title"]=element["fields"]["title"][0];
                    	CLUSTER_RESULTS[element["_id"]]=temp;
                    	temp_gen.push(temp);
                    	}
                    	catch(err){
                    	
                    	}
                    
                    });
                    CURRENT_RESULTS=temp_gen;
                    GENERAL_RESULTS["web"]=temp_gen;
                    HAS_RESULTS[CURRENT_TYPE]=true;//now we have more results
                    GOT_CLUSTERS=true;//now mark that we have clusters
                    var arr = res["clusters"];
                    if (arr.length > 0) {
                        var main = $();
                        
                        CLUSTERS = arr;
                        //arr.push("Videos"); for old
                        $.each(arr, function(index, element) {
                       
                            if (element) {
                                var li = $("<li role='presentation' class='cluster'></li>");
                                var a = $("<a></a>");
                                a.attr("data-toggle", "tooltip");
                                a.attr("data-placement", "right");
                                a.attr("title", element.capitalizeMe());
                                $(".gen_cluster").on("click",function(){
                                $(".active_c").toggleClass("active_c not_active");
                                    $(this).parent().toggleClass("not_active active_c");
                                    clickOnCluster(this);
                                
                                });
                                a.on("click", function() {
                                    $(".active_c").toggleClass("active_c not_active");
                                    $(this).parent().toggleClass("not_active active_c");
                                    clickOnCluster(this);
                                });
                                a.text(element);
                                li.append(a);
                                li.addClass("not_active");
                                main = main.add(li);
                                 //console.log(element);
                            }
                        });
                       $(".cluster_li").append(main);
                       
                    } else {
                        console.log("no clusters");
                        clustersError();
                    }
                });
            }
        }
        $(document).on("click",".ui-menu-item",function(event){
        	if(event.target.tagName==="SPAN"){
			if($(event.target).attr("class")==="pen"){
			$("#search").val($(event.target).parent().text());
			}
			else{
			
			$("#search").val($(event.target).parent().parent().text());
			}
			event.stopPropagation();
			return false;
        	}
        	else{
        		window.searchQuery($("#search").val().trim());
        	}
        
        });
        //put window on resize if in open drawer someone resizes
        $(window).bind( 'orientationchange', function(e){
	e.stopPropagation();
	});
	var resizeTimer;
	var waitForFinalEvent = (function() {
  var timers = {};
  return function(callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout(timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();
        $(window).on("resize",function(e){
       
		  waitForFinalEvent(function() {
		     var mar="";
	   closeClusterDrawer();
	   $(".mob_close").css("display","none");
        	$(".cluster_drawer").css("height",$(document).height()+"px");
        	$("#blur_back").height($(document).height()).width($(document).width());
        	$(".top_drawer").animate({opacity:"0",height:"0px"},500,function(){$(".top_drawer").css("z-index","-10");});
       			TOP_DRAWER=true;
        	console.log($(document).width());
        	if($(document).width()<=991){
        		//hideFloatSearchBar();
        		 EXTRA_SEARCH=true;
        	}
        	else{
        		 EXTRA_SEARCH=false;
        		$(".nav_col").css("opacity","1").css("visibility","visible");
        		$(".extra_search").css("display","none");
        		
        	}
		  }, 500, "some unique string");
	  
        
		    
	  
        	
        
        });
        function closeClusterDrawer(){
        	$("#blur_back").fadeOut();
			$(function () {
	    				$(".show_cluster").parent().animate({
	      						 left: '-250px'
	    				}, { duration: 300, queue: false,complete:function(){
	    				$(".show_cluster").removeClass("hide");
	    				
	    				} });
				});
			
			OPEN_DRAWER=false;
        
        
        }
        function showClusterDrawer(){
        	//drawer is close open it
			if(EXTRA_SEARCH){
        		hideFloatSearchBar();
        	
        	}
        		closeTopDrawer();
			$(".show_cluster").addClass("hide");
			$("#blur_back").fadeIn();
			$(function () {
	    				$(".show_cluster").parent().animate({
	      						 left: '0px'
	    				}, { duration: 500, queue: false });
			});
			OPEN_DRAWER=true;
        
        }
         $("#blur_back").on("click touch",function(){
   closeClusterDrawer();
  });
        $(".show_cluster").on("click",function(){
		$("#blur_back").css("height",$(document).height()+"px").css("width",$(document).width()+"px");
		$(".cluster_drawer").css("height",$(document).height()+"px");
        	if(OPEN_DRAWER){
			//drawer is open close it
			closeClusterDrawer();
			
		}
		else{
			showClusterDrawer();
		}
		
        });
        $(".cluster_drawer,#blur_back").on("swipeleft",function(){
        	if(OPEN_DRAWER){
			//drawer is open close it
			closeClusterDrawer();
			
		}
        
        
        });
         $(".cluster_drawer,#blur_back").on("swiperight",function(){
        	if(!OPEN_DRAWER){
			//drawer is open close it
			showClusterDrawer();
			
		}
        
        
        });
        $(".extra_search").on("click touch",function(){
        
      
        	if(!EXTRA_SEARCH){
        	closeClusterDrawer();
        	closeTopDrawer();
        	$(this).animate({opacity:0},500,function(){
        		$(".extra_search").css("display","none").finish();
        	
        	});
        	$(".nav_col").css("visibility","visible").animate({opacity:1},500,function(){ EXTRA_SEARCH=true;$(this).finish();$("#search").focus();});
        	
        	}
        
        });
        function clickOnCluster(that) {
         $('html, body').animate({
                scrollTop: 0
            }, 500, 'linear',function(){
            	
            });
        CURRENT_PAGE=0;
            var cluster = $(that).text();
            $(".cluster_cur").text(cluster);
            if (cluster !== "News") {
                $("#news").addClass("hide");
            } else {
                $("#news").removeClass("hide");
            }
            if(cluster=="General"){
            	$("#news").removeClass("hide");
            	START_RESULT=0;
            	END_RESULT=10;
            	BREAKERS=1;
            	CURRENT_TYPE="web";
            	renderResult(GENERAL_RESULTS["web"].slice(0,10), $("#search_results"), false, false,false);
            	CURRENT_RESULTS=GENERAL_RESULTS["web"];
      	    	HAS_RESULTS[CURRENT_TYPE]=true;
            	START_RESULT+=10;
            	END_RESULT+=10;
            }
            else{
		    START_RESULT=0;
		    END_RESULT=10;
		    var js=[];
		    var tempp=GENERAL_RESULTS[cluster];
		    BREAKERS=1;
	      	    CURRENT_TYPE=cluster;
           	    if(!tempp){
           	    	//getting results if not present in general_results
			    var ids = CLUSTER_RESPONSE[cluster];
			   
			    $.each(ids,function(index,element){
			    	js.push(CLUSTER_RESULTS[element]);
			    
			    });
			    	GENERAL_RESULTS[cluster]=js;//swap
            		}
            	     else{
            		js=tempp;
            	
            		}
            	renderResult(js.slice(0,10), $("#search_results"), false, false,false);//just send 10 results to render
            	GENERAL_RESULTS[cluster]=js;//swap
      	    	CURRENT_RESULTS=js;
      	    	HAS_RESULTS[CURRENT_TYPE]=true;
            	START_RESULT+=10;
            	END_RESULT+=10;
            }
            //drawer is open close it
			$("#blur_back").fadeOut();
			$(function () {
	    				$(".show_cluster").parent().animate({
	      						 left: '-250px'
	    				}, { duration: 500, queue: false,complete:function(){
	    					$(".show_cluster").removeClass("hide");
	    				
	    				} });
				});
			OPEN_DRAWER=false;
            return false;
        }
        //fix scroll later
        $(window).bind('scroll',bindScroll);
        
        
          function getNews(fromLink){
        if(USER_QUERY!==""){
    START_RESULT = 0;
    END_RESULT = 10;
    CURRENT_RESULTS=[];
    CURRENT_TYPE="news";
    showResults("news");
    $(".desktop_pills").find(".active").removeClass("active");
    if(!fromLink){
    	$(".news_search").parent().addClass("active");
    }
    else{
    	$(".news_search.d_a").parent().addClass("active");
    
    }
    var k=GENERAL_RESULTS["news"];
    if(!k){
     	$.ajax({
                    async: true,
                    url: "/cgi-bin/query_retrieval/ask_me.py",
                    data: {
                        q: USER_QUERY,
                        f: 0,
                        t:3,
                        authenticity_token:$("meta[name='csrf-token']").attr("content")
                    },
                    dataType: 'text',
                    type: "GET",
                    error: function() {
                        HAS_RESULTS[CURRENT_TYPE] = false;
                    }
                }).done(function(text) {
                    var js = JSON.parse(text);
                    if(js["error"]){
                    	HAS_RESULTS[CURRENT_TYPE] = false;
                    }
                    else{
                    BREAKERS=1;
                    GENERAL_RESULTS["news"]=js["content"];
                    CURRENT_RESULTS=js["content"];
                    HAS_RESULTS[CURRENT_TYPE]=true;
                    renderResult(js["content"].slice(0,10), $("#news"),false,false,true,false);
                    $("#news>hr").remove();
                    START_RESULT += 10;
                    END_RESULT += 10;
                    }
                });
    
    	}
    	else{
    
      		    BREAKERS=1;
      		     CURRENT_RESULTS=k;
      		    HAS_RESULTS[CURRENT_TYPE]=true;
                    renderResult(k.slice(0,10), $("#news"),false,false,true,false);
                    $("#news>hr").remove();
                    START_RESULT += 10;
                    END_RESULT += 10;
                    
                    }
        document.cookie = "search_type=news;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/";
         $("#blur_back").fadeOut();
            hideSpinner();
        }
        }
        function renderImages(js){
        var count=1;
        var main=$();
        var row=$("<div class=\"row\"></div>");
       $.each(js,function(index,element){
      var template=$('<div class="img_gallery_responsive gallery_card"><img src="'+element["url"]+'" class="img-thumbnail img-responsive gallery_img gallery_img_before_load" alt="'+element["title"]+'" name="'+cc+'"/><div class="gallery_desc" style="display:none;">'+element["title"]+'</div></div>');
      template.find("img").on("load",function(){
      	$(this).removeClass("gallery_img_before_load");
      
      });
         template.find("img").on("error",function(){
      	$(this).attr("src","http://i1.wp.com/tatehoozark.com/wp-content/uploads/2014/05/image-not-available-grid.jpg");
      
      });
      row.append(template);
        if(count===5){
        main=main.add(row);
       count=0;
       row=$("<div class=\"row\"></div>");
       }
       ++count;
       ++cc;
       });
       var current_image;
       function dispImage(that){
       var url=that.find("img").attr("src");
       var title=that.find("img").attr("alt");
       $(".img-single-view-head").text(title);
       current_image=parseInt(that.find("img").attr("name"));
       if((current_image-1)===0){
       $(".btn-single-view-left").attr("disabled","disabled");
       }
       else{
       	$(".btn-single-view-left").removeAttr("disabled","");
       
       }
       if((current_image+1)>cc){
       if(getMoreResults()){
         		dispImage($('.gallery_img[name="'+(current_image+1)+'"]').parent());
         		}
        else{
       $(".btn-single-view-right").attr("disabled","disabled");
       }
       }
       else{
       	$(".btn-single-view-right").removeAttr("disabled","");
       
       }
       $(".img-single-v-cont").remove();
       var template=$('<div class="container img-single-v-cont" style=" position: fixed; top: 20%;width:100%; "><div class="row"><div class="col-md-2 col-lg-2 col-xs-2 col-sm-2"></div><div class="col-md-8 col-lg-8 col-xs-8 col-sm-8"> <img class="img-thumbnail img-responsive" src="'+url+'"> </div><div class="col-md-2 col-lg-2 col-xs-2 col-sm-2"></div></div></div>');
       $(".gallery-single-view").append(template);
       }
        $(".img-container").append(main);
          $(".gallery_card").hover(function(){
        	$(this).find(".gallery_desc").fadeIn();
        
        },function(){
        	$(this).find(".gallery_desc").fadeOut();
        
        });
        $(".gallery_card").on("click",function(){
        
        	$(".gallery-single-view").fadeIn();
        	dispImage($(this));
        
        });
        $(".btn-single-view").on("click",function(){
        
        	$(".gallery-single-view").fadeOut();
        });
         $(".btn-single-view-left").on("click",function(){
        	if((current_image-1)!==0){
        		dispImage($('.gallery_img[name="'+(current_image-1)+'"]').parent());
        	}
        	else{
        		$(this).attr("disabled","disabled");
        	
        	}
        });
         $(".btn-single-view-right").on("click",function(){
         	if((current_image+1)>cc){
         		//render more images and then disp image
         		if(getMoreResults()){
         			dispImage($('.gallery_img[name="'+(current_image+1)+'"]').parent());
         		}
         		else{
         			$(this).attr("disabled","disabled");
         		
         		}
		}
		else{
				dispImage($('.gallery_img[name="'+(current_image+1)+'"]').parent());
		}
        });
        $(window).on("keyup",function(e){
        	if(e.keyCode===27){
        	
        	$(".gallery-single-view").fadeOut();
        	
        	}
        
        
        });
        }
        function showSpinner(){
        	var spin=$('<div class="sk-fading-circle"> <div class="sk-circle1 sk-circle"></div> <div class="sk-circle2 sk-circle"></div> <div class="sk-circle3 sk-circle"></div> <div class="sk-circle4 sk-circle"></div> <div class="sk-circle5 sk-circle"></div> <div class="sk-circle6 sk-circle"></div> <div class="sk-circle7 sk-circle"></div> <div class="sk-circle8 sk-circle"></div> <div class="sk-circle9 sk-circle"></div> <div class="sk-circle10 sk-circle"></div> <div class="sk-circle11 sk-circle"></div> <div class="sk-circle12 sk-circle"></div> </div>');
        	$("#blur_back").append(spin);
        
        }
        function hideSpinner(){
        	$(".sk-fading-circle").remove();
        
        }
        function showResults(typ){
        	if(typ==="web"){
        		$(".img-container,#videos,.gallery-single-view").attr("style","display:none;");
        		$("#search_results,#wikiMain,#news,.module").attr("style","");
        		$("#smart_col,.cluster_drawer").removeClass("hide");
        	}
        	else if(typ==="videos"){
        		$(".img-container,#news,#search_results,.gallery-single-view,#wikiMain,.module").attr("style","display:none;");
        		$("#videos").attr("style","");
        		$("#smart_col").addClass("hide");
        		$(".cluster_drawer").addClass("hide");
        	}
        	else if(typ==="news"){
        		$(".img-container,#search_results,#videos,.gallery-single-view,#wikiMain,.module").attr("style","display:none;");
        		$("#news").attr("style","");
        		$("#smart_col").addClass("hide");
        		$(".cluster_drawer").addClass("hide");
        	}
        	else if(typ==="images"){
        		$(".img-container,.gallery-single-view").attr("style","");
        		$("#videos,#news,#search_results,#wikiMain,.module").attr("style","display:none;");
        		$("#smart_col").addClass("hide");
        		$(".cluster_drawer").addClass("hide");
        		$('.scroll-top-wrapper').removeClass('show');
        	}
        	showSpinner();
        	$("#blur_back").fadeIn();
        	$(".no-results").remove();
        	closeClusterDrawer();
        
        
        }
         function getImages(){
         
        if(USER_QUERY!==""){
    START_RESULT = 0;
    END_RESULT = 20;
    CURRENT_RESULTS=[];
    CURRENT_TYPE="images";
    showResults("images");
    $(".desktop_pills").find(".active").removeClass("active");
    $(".images_search").parent().addClass("active");
    var k=GENERAL_RESULTS["images"];
    if(!k){
     	$.ajax({
                    async: true,
                    url: "/cgi-bin/query_retrieval/ask_me.py",
                    data: {
                        q: USER_QUERY,
                        f:0,
                        t:4,
                        authenticity_token:$("meta[name='csrf-token']").attr("content")
                    },
                    dataType: 'text',
                    type: "GET",
                    error: function() {
                        HAS_RESULTS[CURRENT_TYPE] = false;
                    }
                }).done(function(text) {
                    var js = JSON.parse(text);
                    if(js["error"]){
                    	HAS_RESULTS[CURRENT_TYPE] = false;
                    }
                    else{
                    BREAKERS=1;
                    GENERAL_RESULTS["images"]=js["content"];
                    CURRENT_RESULTS=js["content"];
                    HAS_RESULTS[CURRENT_TYPE]=true;
                    renderImages(js["content"].slice(0,20));
                    $(".images>hr").remove();
                    START_RESULT += 20;
                    END_RESULT += 20;
                    }
                });
    
    	}
    	else{
    
      		    BREAKERS=1;
      		     CURRENT_RESULTS=k;
      		    HAS_RESULTS[CURRENT_TYPE]=true;
                    renderImages(k.slice(0,20));
                    $(".images>hr").remove();
                    START_RESULT += 20;
                    END_RESULT += 20;
                    
                    }
        document.cookie = "search_type=images;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/";
         $("#blur_back").fadeOut();
            hideSpinner();
        }
        }
        function getVideos(){
        if(USER_QUERY!==""){
    START_RESULT = 0;
    END_RESULT = 10;
    CURRENT_RESULTS=[];
    CURRENT_TYPE="videos";
    showResults("videos");
    $(".desktop_pills").find(".active").removeClass("active");
    $(".videos_search").parent().addClass("active");
    var k=GENERAL_RESULTS["videos"];
    console.log(k);
    if(!k){
     	$.ajax({
                    async: true,
                    url: "/cgi-bin/query_retrieval/ask_me.py",
                    data: {
                        q: USER_QUERY,
                        f: 0,
                        t:1,
                        authenticity_token:$("meta[name='csrf-token']").attr("content")
                    },
                    dataType: 'text',
                    type: "GET",
                    error: function() {
                        HAS_RESULTS[CURRENT_TYPE] = false;
                    }
                }).done(function(text) {
                    var js = JSON.parse(text);
                    if(js["error"]){
                    	HAS_RESULTS[CURRENT_TYPE] = false;
                    }
                    else{
                    BREAKERS=1;
                    GENERAL_RESULTS["videos"]=js["content"];
                    CURRENT_RESULTS=js["content"];
                    HAS_RESULTS[CURRENT_TYPE]=true;
                    renderResult(js["content"].slice(0,10), $("#videos"),false,false,false,true);
                    $("#videos>hr").remove();
                    START_RESULT += 10;
                    END_RESULT += 10;
                    }
                });
    
    	}
    	else{
    
      		    BREAKERS=1;
      		     CURRENT_RESULTS=k;
      		    HAS_RESULTS[CURRENT_TYPE]=true;
                    renderResult(k.slice(0,10), $("#videos"),false,false,false,true);
                    $("#videos>hr").remove();
                    START_RESULT += 10;
                    END_RESULT += 10;
                    
                    }
        document.cookie = "search_type=videos;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/";
        $("#blur_back").fadeOut();
        hideSpinner();
        }
        }
              $(".web_search").on("click",function(){
 		getIDSresults();
 		var f=true;
 		$.each($("#news>.search_result"),function(index,element){
 			if(f){
 			f=false;
 			}
 			else{
 			$(this).remove();
 			}
 		});
 		$(".active_c").removeClass("active_c");
		$(".gen_cluster").parent().removeClass("not_active").addClass("active_c");
		$(".images").addClass("hide");
           return false;
           
    
    });
          $(".videos_search").on("click",function(){
		getVideos();
		$(".active_c").removeClass("active_c");
		$(".gen_cluster").parent().removeClass("not_active").addClass("active_c");
		$(".images").addClass("hide");
    	return false;
    });
    $(".images_search").on("click",function(){
		getImages();
		$(".active_c").removeClass("active_c");
		$(".gen_cluster").parent().removeClass("not_active").addClass("active_c");
    	return false;
    });
    $(document).on("click",".news_search",function(e){
    
    	if($(e.target).attr("id")==="more_news"){
		getNews(true);
	}
	else{
		getNews(false);
	}
	$(".active_c").removeClass("active_c");
	$(".gen_cluster").parent().removeClass("not_active").addClass("active_c");
    	return false;
    });
    });
    
    $("#search").on("keyup focusout focusin",function(){
    $(".extra_search_bar").val($(this).val());
    	if($(this).val().length>0){
    		
    		if($(window).width()<991){
    			$(".mob_close").css("display","inline");
    		}
    	
    	}
    	else{
    		if($(window).width()<991){
    			$(".mob_close").css("display","none");
    		}
    	
    	}
    	
    });
    $(".mob_close").on("click touch",function(){
    	$("#search,.backinput,.extra_search_bar").val("");
    	$(".mob_close").css("display","none");
    
    });
 
    //prototypes
    String.prototype.capitalizeMe = function() {
        try {
            return this.charAt(0).toUpperCase() + this.substr(1).toLowerCase();
        } catch (err) {
            return "";
        }
    };
    String.prototype.filter = function() {
        try {
            var data = this + " ";
            data = data.replace(/\\[a-z](.*?)\s/g, " ").replace(/\n+/g, " ").replace(/\t+/g, " ").replace(/\r+/g, " ").replace(/\\/g, " ").replace(/&#(.*?)\s;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/<(.*?)>(.*?)<\/(.*?)>/g, " ").replace(/<(.*?)>/g, " ").replace(/\s+/g, " ").trim();
            return data;
        } catch (err) {
            return "";
        }
    };
    $.prototype.setTextValue = function(t) {
        if (t === "" || t === undefined) {
            $(this).remove();
        } else {
            $(this).text(t);
        }
    };
    $.prototype.setHtmlValue = function(t, test) {
        if (test === "" || test === undefined) {
            $(this).remove();
        } else {
            $(this).html(t);
        }
    };
           $(window).on("keyup",function(e){
    if ($.isWindow(e.target) || $(e.target).prop("tagName")==="BODY")
    {
   	$("#search").focus().val(String.fromCharCode(e.keyCode));
    }

            
            
            });
   
})();
