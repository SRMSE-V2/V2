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
        var HAS_RESULTS = false;
        var GOT_CLUSTERS=false;
        var CLUSTERS = [];//clusters
        window.SA = {};
        var CURRENT_PAGE=1;
        var SHOW_INFOBOX = false;
        var HIDE_INFOBOX = false;
        var CLUSTER_RESPONSE ={};//clusters_docs
        var CLUSTER_RESULTS={};//hits
        var GENERAL_RESULTS=[];//general results
        var GENERAL_RESULTS_COPY=[];//general results copy to hold gen results when var is swapped as clusters are selected
        var BREAKERS=1;//get generated hr breaker counts
        var INFO_BOX = "";
        var MODAL_BACK="";
        var KEY="";
        var OPEN_DRAWER=false;
        window.WIKI_TITLE="";
        var S_KEY="SECRET_KEY";
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
        var LOAD = $('<div id="loading" style="background-color:transparent;">;<div class="cssload-container"><div class="cssload-jumping"><span></span><span></span><span></span><span></span><span></span></div></div>');
        var ARROW_DIV_BTNS = $("<div class='arrow_cont'><span id='light' class='side_btns' data-toggle='tooltip' title='Light Theme'><img src='/images/lighttheme.png'></span><span   class='side_btns' id='dark' data-toggle='tooltip' title='Dark Theme'><img style='margin-left:5px;' src='/images/darktheme.png'>   </span> <span class='side_btns' data-toggle='tooltip' title='Want Help !'>  <img style='margin-left:5px;' src='/images/howtouse.png'>      </span> </div>");
        function prependCss(css,id){
    elChild = document.createElement('style');
    elChild.setAttribute("id",id);
elChild.innerHTML = css;
document.getElementsByTagName("head")[0].appendChild(elChild);
}
        function showModal(){
        $("#modalSwitchTheme").remove();
        if(window.color==="dark"){
        	MODAL_BACK="rgba(241, 241, 241, 0.74)";
        }
        else if(window.color==="light"){
        	MODAL_BACK="rgba(51, 51, 51, 0.74)";
        }
        var modal=$('<div id="modalSwitchTheme"  style="width:'+$(document).width()+'px;height:'+$(document).height()+'px;position:absolute;left:0px;top:0px;z-index:1000;background-color:'+MODAL_BACK+';"></div>');
        modal.hide().appendTo('body').fadeIn(1000);	
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
                    
                    }
                    else{
                    img.attr("src", "http://en.wikipedia.org/wiki/en:Special:Filepath/" + fn[fn.length - 1].replace("File:", "") + "?width=220");
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
            $("#smart_col").removeClass("hide");
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
            prnt.text("No more results available");
            return prnt;
        }
        //global vars closed
        //start of theme switch
        window.switchImg = function() {
        var callbacks=[];
            //To switch images path when switching themes shared by both the pages
            var imgs = $(".switch");
            $.each(imgs, function() {
                 cacheImage("/images/"+window.color+"/"+$(this).attr("name"),this);
                callbacks.push($(this));

            });
	return callbacks;
        };
        cacheImage("/images/"+window.color+"/nav_logo.png",document.getElementById("srmse-logo"));
        function loadedLightTheme(){

$("#dark_theme").remove();
                	$('#modalSwitchTheme').fadeOut(1000,function(){
                		$(this).remove();
                	});

}
function loadedDarkTheme(){
$("#light_theme").remove();
                	$('#modalSwitchTheme').fadeOut(1000,function(){
                		$(this).remove();
                	});

}

        var dispBtns = function() {
            $(".arrow_div").css("padding-left", "20px");
            $(".arrow_div").append(ARROW_DIV_BTNS);
            $(".side_btns").css("cursor", "pointer");
            $("#light").on('click', function() {
            if(window.color==="light"){
                showModal();
                loadedLightTheme();
                return;
                }
            	$("#light_theme").remove();
		document.cookie = "color=light;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/";
                window.color = "light";
                var calls=window.switchImg();
                var fin=calls.length+1;
                var loaded=0;
                //console.log(KEY);
                basket.require({ url: "/css/light/search"+S_KEY+".css", execute: false,expire:168 }).then(function(responses) {
        var css = responses[0].data;
        prependCss(css,"light_theme");
                    ++loaded;
                    if(loaded===fin){
                    	loadedLightTheme();
                    	}
                	
              
        }); 
                
                showModal();
                $.each(calls,function(index,element){
                    (function(el){
                    	el.load(function(){
                    	++loaded;
                    	if(loaded===fin){
                    	loadedLightTheme();
                    	}
                    	});
                    
                    })(element);
                    });
                    
            });
            $("#dark").on('click', function() {
            if(window.color==="dark"){
                showModal();
                loadedDarkTheme();
                return;
                }
            	$("#dark_theme").remove();
			document.cookie = "color=dark;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/";
                window.color = "dark";
                var calls=window.switchImg();
                var fin=calls.length+1;
                var loaded=0;
                //console.log(KEY);
                 basket.require({ url: "/css/dark/search"+S_KEY+".css", execute: false,expire:168 }).then(function(responses) {
        var css = responses[0].data;
        prependCss(css,"dark_theme");
                    ++loaded;
                    if(loaded===fin){
                    	loadedDarkTheme();
                    	}
                	
              
        }); 
                
                showModal();
                $.each(calls,function(index,element){
                    (function(el){
                    	el.load(function(){
                    	++loaded;
                    	if(loaded===fin){
                    	loadedDarkTheme();
                    	}
                    	});
                    
                    })(element);
                    });
                   
                
            });
        };
var u = 0; //toggle var 
var wait=0;
function showArrow(){
 $(".arrow_div").remove();
                $("#arrow_parent").append("<div class='arrow_div'></div>");
                dispBtns();
                $(".side_btns").hide();
                wait = 1;
                $(".arrow_div").animate({
                    width: '150px'
                }, 500, function() {
                    $(".side_btns").fadeIn();
                    wait = 0;
                });
                ++u;
                
                }
function hideArrow(){
$(".side_btns").fadeOut(function() {
                    $(".side_btns").hide();
                    $(".arrow_div").css("padding-left", "0px");
                    wait = 1;
                    $(".arrow_div").animate({
                        width: '0px'
                    }, 500, function() {wait = 0;});
                    u = 0;
                });

}
        $("#arrow,#arrow_parent").on("swipeleft",function(){
            if (u === 0 && wait === 0) {
                    showArrow();
                    }
            
            });
            $("#arrow,#arrow_parent").on("swiperight",function(){
            if (u !== 0 && wait === 0) {
                   hideArrow();
                }
            
            });
        
        
      
        function arrowClick() {
            if (u === 0) {
               showArrow();
            } else {
                hideArrow();
            }
        }
        $("#arrow").on("click", arrowClick);
        //end of theme switch
        //scroll button start
        $(function() {
    	var dir="up";
    	var position = $(window).scrollTop();
    	var displayed=false;
            $(document).on('scroll', function(e) {
            

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
            });
            $('.scroll-top-wrapper').on('click touch', function(){scrollToTop(dir);});
        });
        function getNearestElement(dir){
        	var h=$(window).scrollTop();
        	//console.log(h);
        	var diff=h;
        	
        	var elem;
        	$.each($(".pages"),function(index,element){
        	
        		if(Math.abs(h-$(element).position().top)<diff && $(element).position().top<h && dir==="up"){
        			diff=h-$(element).position().top;
        			elem=$(element);
        		}
        		else if(Math.abs(h-$(element).position().top)<diff && $(element).position().top>h && dir==="down"){
        			diff=h-$(element).position().top;
        			elem=$(element);
        		
        		}
        	
        	});
        	if(parseInt(elem.attr("name"))===CURRENT_PAGE && CURRENT_PAGE===1 && dir ==="up" ){
        		//for first time
        		return $(".page1");
        	}
        	if(parseInt(elem.attr("name"))===CURRENT_PAGE){
        		//if same page again
        		if(dir==="down"){
        			elem=$(".page"+(parseInt(elem.attr("name"))+1));
        		}
        		else if(dir==="up"){
        			elem=$(".page"+(parseInt(elem.attr("name"))-1));
        		}
        	
        	}
        	
        	return elem;
        
        }
        function scrollToTop(dir) {
        	//scrolls to nearest top page
        try{
            var elem=getNearestElement(dir);
            var verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
            var element = elem;
            var offset = element.offset();
            var offsetTop = offset.top-200;
         
            
          }
          catch(err){
          	//if desired page not exists come 
          	verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
          	if(dir==="down"){
        			elem=$(".page"+CURRENT_PAGE+1);
        		}
        		else if(dir==="up"){
        			elem=$(".page"+CURRENT_PAGE-1);
        		}
		    element = elem;
		    offset = element.offset();
		    offsetTop = offset.top-200;
        	
          	
          }
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
                searchQuery(query);
            }
            return false;
        });
        $("#logo").on("click", function() {
            window.location = "/";
        });
        function getIDSresults() {
            if ($("#search").val().trim() !== "") {
                $.ajax({
                    async: true,
                    url: "/cgi-bin/query_retrieval/ask_me.py",
                    data: {
                        q: $("#search").val().trim().toLowerCase(),
                        f: 0,
                        t:2,
                        authenticity_token:$("meta[name='csrf-token']").attr("content")
                    },
                    dataType: 'text',
                    type: "GET",
                    error: function() {
                        HAS_RESULTS = false;
                    }
                }).done(function(text) {
                    var js = JSON.parse(text);
                    if(js["error"]){
                    	HAS_RESULTS = false;
                    }
                    else{
                    renderResult(js["content"], $("#search_results"), false, true,false);
                    START_RESULT += 10;
                    END_RESULT += 10
                    }
                });
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
                    search_desc.append("<div class='col-md-3 col-xs-3 col-sm-3 col-lg-3'><img class='yt_img' src='https://i.ytimg.com/vi_webp/"+url_token+"/default.webp'/></div>");
                    search_desc.append("<div class='col-md-9 col-xs-9 col-sm-9 col-lg-9'>"+element["body"].filter()+"</div>");
                    }
                    else if(news){
                    	search_desc.text(element["body"].substr(0,200).filter());
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
                $(".search_result").on("click", function() {
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
                    window.location = $(this).find(".search_title").attr("href");
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
                    HAS_RESULTS = false;
                }
               
            }
        }
        function getMoreResults() {
            if (START_RESULT < GENERAL_RESULTS.length) {
                if (GENERAL_RESULTS && HAS_RESULTS) {
                        var arr = GENERAL_RESULTS.slice(START_RESULT,END_RESULT);
                        renderResult(arr, $("#search_results"), false, true,false);
                         START_RESULT += 10;
                    	 END_RESULT += 10;
                }
            } else {
           
            	if(GOT_CLUSTERS){
            		//check if we got more results from getClusters first before marking no more results
		        var prnt = ADD_NO_RESULTS();
		        $("#search_results").append(prnt);
                }
            }
        }
        function bindScroll(event) {
        	var curr=$(window).scrollTop();
        	$.each($(".pages"),function(index,element){
        		var elem=$(element);
        		if((elem.position().top<(curr+100)) && (elem.position().top>(curr-100))){
        		elem.tooltip('show');
		    	(function(elem){
		    		CURRENT_PAGE=parseInt(elem.attr("name"));
		    		setTimeout(function(){elem.tooltip('hide');}, 2000);
		    	
		    	})(elem);
        		return false;
        	
        		}
        	
        	});
        	
        	 if($(window).scrollTop() + $(window).height() == $(document).height()) {
            		 $(window).unbind('scroll');
		        if (HAS_RESULTS) {
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
                    q: $("#search").val().trim().toLowerCase(),
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
        function getIDSnews(bool) {
            $.ajax({
                async: bool,
                url: "/cgi-bin/queryret/getIds.py",
                dataType: 'text',
                type: "GET",
                data: {
                    q: $("#search").val().trim().toLowerCase(),
                    f: 3,
                    authenticity_token:$("meta[name='csrf-token']").attr("content")
                },
                error: function() {}
            }).done(function(text) {
                try {
                    var js = JSON.parse(text);
                    if(js["error"]){
                    }
                    else{
                    renderResult(js["results"], $("#news"), false, true,true);
                    }
                } catch (err) {}
            });
        }
       
        function getSmartAns() {
            if ($("#search").val().trim() !== "") {
                $.ajax({
                    async: true,
                    url: "/cgi-bin/new2/smart/getSmartAns.py",
                    dataType: 'text',
                    type: "GET",
                    data: {
                        q: $("#search").val().trim().toLowerCase(),
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
                                if(key==="wiki"){
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
            if ($("#search").val().trim() !== "") {
                $.ajax({
                    async: true,
                    url: "/cgi-bin/cluster_retrieval/ask_me.py",
                    dataType: 'text',
                    type: "GET",
                    data: {
                        q: $("#search").val().trim().toLowerCase(),
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
                    CLUSTER_RESULTS={};
                    var temp_gen=[];
                    $.each(res["hits"]["hits"],function(index,element){
                    	var temp={};
                    	temp["content"]=element["fields"]["content"][0];
                    	temp["url"]=element["fields"]["url"][0];
                    	temp["title"]=element["fields"]["title"][0];
                    	CLUSTER_RESULTS[element["_id"]]=temp;
                    	temp_gen.push(temp);
                    
                    });
                    GENERAL_RESULTS=temp_gen;
                    GENERAL_RESULTS_COPY=temp_gen;
                    HAS_RESULTS=true;//now we have more results
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
                                $(".active").toggleClass("active not_active");
                                    $(this).parent().toggleClass("not_active active");
                                    clickOnCluster(this);
                                
                                });
                                a.on("click", function() {
                                    $(".active").toggleClass("active not_active");
                                    $(this).parent().toggleClass("not_active active");
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
        //put window on resize if in open drawer someone resizes
        $(window).on("resize",function(){
        	var mar="";
        	if($(document).width()<=768 && OPEN_DRAWER){
        		mar="207px";
        		$(".nav_changer").css({"position":"absolute","left":mar});
        	}
        	else if($(document).width()>768 && OPEN_DRAWER){
        		mar="127px";
        		$(".nav_changer").css({"position":"absolute","left":mar});
        	}
        	
        
        });
        $(".show_cluster").on("click",function(){
        
        	var margin="127px";
        	if($(document).width()<=768){
        		margin="207px";
        	}
        	if(OPEN_DRAWER){
			//drawer is open close it
			
			$(function () {
	    				$(".show_cluster").parent().animate({
	      						 left: '-200px'
	    				}, { duration: 500, queue: false });
	    				$(".nav_changer").animate({
	       						left: '0px'
	    				}, { duration: 500, queue: false,complete:function(){
	    				
	    					$(".nav_changer").css("position","");
	    				
	    				}});
				});
			
			OPEN_DRAWER=false;
		}
		else{
			//drawer is close open it
			$(".nav_changer").css({"position":"absolute","left":"0px"});
			
			$(function () {
	    				$(".show_cluster").parent().animate({
	      						 left: '0px'
	    				}, { duration: 500, queue: false });
	    				$(".nav_changer").animate({
	       						left: margin
	    				}, { duration: 500, queue: false});
			});
			OPEN_DRAWER=true;
		}
		
        });
        function clickOnCluster(that) {
            var cluster = $(that).text();
            if (cluster !== "News") {
                $("#news").addClass("hide");
            } else {
                $("#news").removeClass("hide");
            }
            if(cluster=="General"){
            	$("#news").removeClass("hide");
            	START_RESULT=0;
            	END_RESULT=10;
            	GENERAL_RESULTS=GENERAL_RESULTS_COPY;//load general results back
            	renderResult(GENERAL_RESULTS.slice(0,10), $("#search_results"), false, false,false);
            	START_RESULT+=10;
            	END_RESULT+=10;
            }
            else{
            START_RESULT=0;
            END_RESULT=10;
            var ids = CLUSTER_RESPONSE[cluster];
            var js=[];
            $.each(ids,function(index,element){
            	js.push(CLUSTER_RESULTS[element]);
            
            });
            	GENERAL_RESULTS=js;//swap
            	renderResult(js.slice(0,10), $("#search_results"), false, false,false);//just send 10 results to render
            	START_RESULT+=10;
            	END_RESULT+=10;
            }
           
            return false;
        }
        //fix scroll later
        $(window).bind('scroll',bindScroll);
        getIDSresults();
        getIDSwiki();
        getIDSnews();
        getSmartAns();
        getClusters();
    });
    
    $("#search").on("keypress",function(){
    	if($(this).val().length>0){
    		if($(window).width()<991){
    			$(".mob_close").css("display","inline");
    		}
    	
    	}
    });
    $(".mob_close").on("click touch",function(){
    	$("#search,.backinput").val("");
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
   
})();
