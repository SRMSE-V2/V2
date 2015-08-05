(function() {
    $(document).ready(function() {
      $("#prog").remove(); 
    $(".hidden_body").removeAttr("hidden");//remove loading when script loaded
        $.ajaxSetup({
            cache: true
        });
        //globals start
        var LEFT_AUTO = -1;
        var FIRST_RESIZE = true;
        var STRLEN = 0;
        var ENABLE_BACKINPUT=true;
        var ORIGINAL_QUERY="";
        var SPACE=false;
        var DEFAULT_LEFT=0;
        var MODAL_BACK="";
	//globals end
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
        window.switchImg = function() {
        var callbacks=[];
            //To switch images path when switching themes shared by both the pages
            var imgs = $(".switch");
            $.each(imgs, function() {
                if (window.color === "dark") {
                    $(this).attr("src", $(this).attr("src").replace("/light/", "/dark/"));
                }
                if (window.color === "light") {
                    $(this).attr("src", $(this).attr("src").replace("/dark/", "/light/"));
                }
                callbacks.push($(this));

            });
	return callbacks;
        };
        //setting up backinput for shadow suggestion
        $(".backinput").remove();
        var BACKINPUT = $("#search").clone();
        BACKINPUT.removeClass("fostyle");
        BACKINPUT.removeAttr("id");
        BACKINPUT.removeAttr("placeholder");
        BACKINPUT.removeAttr("name");
        BACKINPUT.removeClass("ui-autocomplete");
        BACKINPUT.removeClass("btn2");
        BACKINPUT.addClass("btn1");
        BACKINPUT.addClass("backinput");
        BACKINPUT.attr("disabled", "");
        $("#div_for_back").append(BACKINPUT);
        

        function checkback() {

            //Fixes the issue of backinput on small devices as size is small on typing input scrolls right but backinput remains there only

            if ($(window).width() <= 600) {
                BACKINPUT.val("");
                ENABLE_BACKINPUT = false;
            } else {
                ENABLE_BACKINPUT = true;
            }
            if (($("#search").val().length * 12.5) >= $("#search").width()) {
                BACKINPUT.val("");
                ENABLE_BACKINPUT = false;

            }
        }


        $(window).on("resize", checkback); //check backinput on resize


        checkback(); //init checkback

        $("#search").on("keypress", checkback); //checks backinput when text size exceeds the input


        $("#srmse-logo").on("click", function() {
            window.location = "http://srmsearchengine.in";
        });


        //setting up autocomplete

        //the html autocomplete tweak
        (function($) {
            var proto = $.ui.autocomplete.prototype,
                initSource = proto._initSource;

            function filter(array, term) {
                var matcher = new RegExp($.ui.autocomplete.escapeRegex(term), "i");
                return $.grep(array, function(value) {
                    return matcher.test($("<div>").html(value.label || value.value || value).text());
                });
            }
            $.extend(proto, {
                _initSource: function() {
                    if (this.options.html && $.isArray(this.options.source)) {
                        this.source = function(request, response) {
                            response(filter(this.options.source, request.term));
                        };
                    } else {
                        initSource.call(this);
                    }
                },
                _renderItem: function(ul, item) {
                    return $("<li></li>").data("item.autocomplete", item).append($("<a></a>")[this.options.html ? "html" : "text"](item.label)).appendTo(ul);
                }
            });
        })(jQuery);
function cacheAutocomplete(arr,query){

if(typeof(Storage) !== "undefined") {
   localStorage.setItem("autocomplete#query#"+query,arr);
}

}
        $("#search").autocomplete({
            source: function(request,response){
            function ajaxResponse(){
		    	  $.ajax({
		  		url: "/cgi-bin/getWords.py",
		  		dataType: "text",
		  		data: {term:request.term},
		  		success: function(data) {
		      			cacheAutocomplete(data,request.term);
		      			response(JSON.parse(data));
		  		}
	      		});
            }
            	if(typeof(Storage) !== "undefined") {
    			// Code for localStorage/sessionStorage. so first check in cache
    			var item=localStorage.getItem("autocomplete#query#"+request.term);
    			if(item){
    				response(JSON.parse(item));
    			}
    			else{
    				ajaxResponse();
    			}
		}
		else{
			//no localstorage so use ajax
			ajaxResponse();
		}
            
            },
            minLength: 1,
            autoFocus: false,
            appendTo: ".search_div", //setting up the container for the rendered list from autocomplete
            html: true, //tweak done to highlight the searched text
            open: function(event, ui) {
                $('ul.ui-autocomplete').addClass('opened');
                $(".ui-helper-hidden-accessible").remove();
                $(this).autocomplete("widget").css({
                    "width": ($("#search").parent().width() + "px")
                }); //setting up the width of the list to input field useful for responsiveness
                if (LEFT_AUTO !== -1) {
                    $(".ui-autocomplete").css("postion", "relative").css("left", LEFT_AUTO + "px");
                    $(".ui-autocomplete").css("width", "");
                    $(".ui-autocomplete >li").css("width", "100%");
                    $(".ui-autocomplete >li>a").css("white-space", "nowrap");
                }
                event.preventDefault();
            },
            close: function() {
              $('.ui-menu-item').remove();
                //clearing up the autocomplete after close 
                $('ul.ui-autocomplete')
                    .removeClass('opened')
                    .css('display', 'block');
                 
            },
            focus: function(event, ui) {
                if ($("#search").val().trim() !== "") {
                    //checking for resize key in focus 
                    if (ui["item"]["resize"]) {
                        //word suggestion
                        var d = $("#search").val().split(" ");
                        if (ENABLE_BACKINPUT) {
                            BACKINPUT.val((d.slice(0, d.length - 1) + " " + ui["item"]["value"]).replace($("#search").val().toLowerCase(), $("#search").val()));
                        }
                    } else {

                        if (ui["item"]["resize"]) {
                            //sentence suggestion
                            if (ENABLE_BACKINPUT) {
                                BACKINPUT.val(ui["item"]["value"].replace($("#search").val().toLowerCase(), $("#search").val()));
                            }
                        } else {
                            $("#search").val(ui["item"]["value"]);
                            if (ENABLE_BACKINPUT) {
                                BACKINPUT.val(ui["item"]["value"]);
                            }

                        }
                    }
                }


                if (ORIGINAL_QUERY) {
                    if (ORIGINAL_QUERY !== "") {
                        event.preventDefault();
                        var arr = ORIGINAL_QUERY.split(" ");
                        var temp = arr.slice(0, arr.length - 1).join(" ");
                        $("#search").val(temp + " " + ui["item"]["value"]);

                    }
                }




            },
            response: function(event, ui) {
                if ($("#search").val().trim() !== "") {
                    if (ui.content[0]["resize"] === "true") {
                        //#DEBUGconsole.log("here");
                        var arrr = $("#search").val().trim().split(" ");
                        if (ENABLE_BACKINPUT) {
                            BACKINPUT.val(arrr.slice(0, arrr.length - 1).join(" ") + " " + ui.content[0]["value"]);
                        }
                    } else {
                        if (ENABLE_BACKINPUT) {
                            BACKINPUT.val(ui.content[0]["value"].replace($("#search").val().toLowerCase(), $("#search").val()));
                        }
                    }
                }


                //#DEBUGconsole.log(ui);
                if (ui.content[0]["resize"] === "true") {
                    //#DEBUGconsole.log("here1");
                    ORIGINAL_QUERY = $("#search").val().trim();
                    var pos;
                    if (FIRST_RESIZE) {
                        SPACE = false; //disable multiple space hits to remove of drag effect
                        DEFAULT_LEFT = parseInt($("#search").offset().left);
                        FIRST_RESIZE = false;
                        
                        pos = $("#search").val().length * parseInt($("#search").css("font-size").replace("px", ""));
                        STRLEN = parseInt(pos) * 0.7;
                        LEFT_AUTO = (DEFAULT_LEFT + parseInt(pos)) * 0.7; //setting up new left auto position
                    } else {
                        if (SPACE) {
                            pos = $("#search").val().length * parseInt($("#search").css("font-size").replace("px", ""));
                            STRLEN = parseInt(pos) * 0.7;
                            LEFT_AUTO = (DEFAULT_LEFT + parseInt(pos)) * 0.7;
                            SPACE = false;
                        }
                    }


                } else {
                    ORIGINAL_QUERY = "";
                    LEFT_AUTO = -1;
                }
            },
            select: function(e, ui) {

                e.preventDefault();

                var query = $("#search").val().trim();
                searchQuery(query);


            },
            delay: 300

        });

        function commonTest(event) {
            if ($("#search").val().indexOf(" ") === 0) {
                $("#search").val($("#search").val().replace(/\s+/g, " ").trim()); //blocking multiple spaces in the beginning
            }
            if ($("#search").val().trim() === "") {
                if (ENABLE_BACKINPUT) {
                    BACKINPUT.val("");
                }
            }
            if (event.keyCode !== 39) {
                if (ENABLE_BACKINPUT) {
                    BACKINPUT.val("");
                }
            }
        }

        function submit(event) {
            if ((event.keyCode === 13) && ($("#search").val() !== "")) {
                var query = $("#search").val().trim();
                searchQuery(query);

            }

        }
        $("#search").on("keypress", function(event) {
            commonTest(event);
            submit(event);

        });
        $("#search").on("keyup", function(event) {
            commonTest(event);
            submit(event);
        });
        $("#search").on("keydown", function(event) {
            commonTest(event);
            submit(event);

            if (event.keyCode === 39) {
                if ((document.getElementById('search').selectionStart === $("#search").val().length) && $("#search").val().length < $(".backinput").val().length) {
                    $("#search").val($(".backinput").val());
                }

            } else {
                $(".backinput").val("");
            }

        });

        $("#search_btn").on("click", function() {
            if ($("#search").val().trim() !== "") {
                var query = $("#search").val().trim();
                searchQuery(query);
            }
        });


        $(window).on("resize", function() {

            //hides autocomplete dropdown on screen resize
            $(".ui-autocomplete").hide();
            LEFT_AUTO = -1;
            FIRST_RESIZE = true;
            STRLEN = 0;

        });

        function loadLocation() {
            if (document.cookie.indexOf("latitude") < 0) {
                //location not in the cookie
                ls("/js/min/location_centric.min.js","js");
            }

        }
        loadLocation(); //init location
        $("#search").on("keyup", function(event) {
            commonTest();
            if (event.keyCode === 32) {
                SPACE = true;
            } else if (event.keyCode === 8) {
                var a = $("#search").val();
                if (a.slice(a.length - 1, a.length) === " ") {
                    if (a.slice(a.length - 2, a.length) === "  ") {
                        SPACE = false;
                    } else {
                        SPACE = true;
                    }

                }
            }
        });
       
         
         
            $("input").removeClass("hide");
            $(".input-group").removeClass("hide");
            var u = 0;
            var wait = 0;
            var dispBtns = function() {
                $(".arrow_div").css("padding-left", "20px");
                $(".arrow_div").append("<div style=\"position:relative;top:0;bottom:0;padding-top:24px;height:50px;\"><span id=\"light\" class=\"side_btns\" data-toggle=\"tooltip\" title=\"Light Theme\"><img style=\"width:31px;height:27px;top:0;bottom:0;margin:auto;\" src=\"images/lighttheme.png\"></span><span id=\"dark\" class=\"side_btns\" data-toggle=\"tooltip\" title=\"Dark Theme\"><img style=\"top:0;bottom:0;margin:auto;width:31px;height:27px;margin-left:5px;\" src=\"images/darktheme.png\">   </span> <span id=\"help\" class=\"side_btns\" data-toggle=\"tooltip\" title=\"Want Help !\">  <img style=\"top:0;bottom:0;margin:auto;width:31px;height:27px;margin-left:5px;\" src=\"images/howtouse.png\">      </span> </div>");
                $(".side_btns").css("cursor", "pointer");
function loadedLightTheme(){

$("#dark_theme").remove();
                	$('#modalSwitchTheme').fadeOut(1000,function(){
                		$(this).remove();
                	});
                	initImageStore();//storing when all the images are loaded and modal exited

}
function loadedDarkTheme(){
$("#light_theme").remove();
                	$('#modalSwitchTheme').fadeOut(1000,function(){
                		$(this).remove();
                	});
                	initImageStore();

}
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
                     var stylesheet=$("<link id=\"light_theme\" rel='stylesheet' type='text/css' href='css/light/styles.min.css' />");
                    $("head").append(stylesheet);
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
                    stylesheet.load(function(){
                    ++loaded;
                    if(loaded===fin){
                    	loadedLightTheme();
                    	}
                	
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
                    var stylesheet=$("<link id=\"dark_theme\" rel='stylesheet' type='text/css' href='/css/dark/styles.min.css' />");
                $("head").append(stylesheet);
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
                    stylesheet.load(function(){
                    ++loaded;
                    if(loaded===fin){
                    	loadedDarkTheme();
                    	}
                	
                });
                });
                var clicked = false;
                $('#help').on("click", function() {
                    if (!clicked) {
                       // $.getScript('js/modules/help.js');
                        clicked = true;
                    } else {
                        $("#help_box").animate({
                            opacity: '0'
                        }, 500, function() {
                            $("#help_box").remove();
                        });

                        clicked = false;
                    }
                });


            };
            function showArrow(){
            $(".arrow_div").remove();
                    $("#arrow_parent").append("<div class=\"arrow_div\" style=\"float:left;height:75px;float:right;width:0px;margin-top:5px;\"></div>");
                    dispBtns();
                    $(".side_btns").hide();
                    $("#arrow").css("right", "-1px");
                    wait = 1;
                    $(".arrow_div").animate({
                        width: '150px'
                    }, 500, function() {
                        $(".side_btns").fadeIn();
                        $("#arrow").css("right", "-1px");
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
                        }, 500, function() {

                            $("#arrow").css("right", "0px");
                            wait = 0;
                        });
                        u = 0;
                    });
            
            }
            $("#arrow").on("click", function() {
                if (u === 0 && wait === 0) {
                    showArrow();
                } else if (u !== 0 && wait === 0) {
                   hideArrow();
                }

            });
            

        
   
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
  function initImageStore(){     
     function storeImage(key,element){
      try {
      var backup_img=element.cloneNode(true);
	    var imgCanvas = document.createElement("canvas"),
		imgContext = imgCanvas.getContext("2d");

	    // Make sure canvas is as big as the picture
	    imgCanvas.width = element.width;
	    imgCanvas.height = element.height;

	    // Draw image into canvas element
	    imgContext.drawImage(element, 0, 0, element.width, element.height);

	    // Get canvas contents as a data URL
	    var imgAsDataURL = imgCanvas.toDataURL("image/png");
	    // Save image into localStorage
	   
		localStorage.setItem(key+"#"+window.color+"#"+element.width, imgAsDataURL);
		element.removeAttribute("hidden");
		
	    }
	    catch (e) {
		console.log("Storage failed: " + e);
		element.setAttribute("hidden","");
		element.parentNode.insertBefore(element,backup_img);
		element.remove();
	    }
	    k=null;//unload event
    }
    var img_tags=["srmse-logo","srm-logo","nixi-logo"];
    $.each(img_tags,function(index,element){
    	(function(element){
    		var el=document.getElementById(element);
    		var k=function(){
	    		if(typeof(Storage) !== "undefined") {
	    			// Code for localStorage/sessionStorage.
	    			var item=localStorage.getItem(element+"#"+window.color+"#"+element.width);
	    			if(!item){
	    				storeImage(element,el);
	    			}
	    			else{
	    				el.setAttribute("src",item);
	    			}
			}
    		};
    		el.onload=k();
    	
    	})(element);
    
    });
    }
    initImageStore();
    });


})();
(function(){
var MODAL=$('<!--  Modal  -->  <div  class="modal  fade"  id="myModal"  tabindex="-1"  role="dialog"  aria-labelledby="myModalLabel"  aria-hidden="true">  <div  class="modal-dialog">  <div  class="modal-content">  <div  class="modal-header">  <h3  class="modal-title"  id="myModalLabel">Feedback</h3>  </div>  <div  class="modal-body">  <div  class="container-fluid">  <div  class="row">  <div  class="col-lg-12">  <form class="feedback_form">  <div  class="form-group">  <label  for="Name">Name</label>  <input  type="text"  class="form-control"  id="name"  placeholder="Name">  </div>  <div  class="form-group">  <label  for="Email">Email  address</label>  <input  type="email"  class="form-control"  id="email"  placeholder="Enter  email">  </div>  <div  class="form-group">  <table  id="moreBad"  >  <tr  style="font-size:14px;">  <th>Queries  Tried</th>  <th>Satisfactory  Results?</th>  </tr>  <tr  class="td_row">  <td  style="padding-top:8px;width:70%;">  <input  type="text"  class="form-control  query"  placeholder="Query">  </td>  <td  style="padding:8px  0px  0px  10px;width:30%;">  <div  class="form-inline">  <div  class="radio">  <label><input  class="y_n"  type="radio"  name="optionsRadios1"  id="Yes"  value="Yes" checked="checked">Yes  &nbsp  &nbsp  </label>  </div>  <div  class="radio">  <label><input  class="y_n"  type="radio"  name="optionsRadios1"  id="No"  value="No">No</label>  </div>  </div>  </td>  </tr></table><table>  <tr>  <td  style="padding-top:10px;"><button  id="more_btn"  type="button"  class="btn  btn-success  glyphicon  glyphicon-plus"></button></td>  <tr>  </table>  </div>  <textarea  class="form-control"  id="feedback_comments"  placeholder="  Any  comments  !"  rows="6"  cols="72"></textarea>  </form>  </div>  </div>  </div>  </div>  <div  class="modal-footer">  <button  type="button"  class="btn  btn-default reset_form"  data-dismiss="modal">Close</button>  <button  type="button"  class="btn  btn-primary"  id="save_btn">Submit</button>  </div>  </div>  </div>  </div>');
$("body").append(MODAL);
$(".reset_form").on("click",function(){
$(".feedback_form").trigger('reset');

});
   $("#more_btn").on("click", function() {
                var num = parseInt($(".y_n").attr("name").replace("optionsRadios", "").trim()) + 1;
                $(".y_n").removeClass("y_n");
                var new_row = $("<tr> <td style=\"padding-top:8px;width:70%;\"> <input type=\"text\" class=\"form-control query\" placeholder=\"Query\"> </td> <td style=\"padding:8px 0px 0px 10px;width:30%;\"> <div class=\"form-inline\"> <div class=\"radio\"> <label><input class=\"y_n\" type=\"radio\" name=\"optionsRadios" + num + "\" id=\"Yes\" value=\"Yes\" checked=\"checked\" >Yes &nbsp &nbsp </label> </div> <div class=\"radio\"> <label><input class=\"y_n\" type=\"radio\" name=\"optionsRadios" + num + "\" id=\"No\" value=\"No\">No</label> </div> </div> </td> </tr>");
                $("#moreBad").append(new_row);
		
            });
      $("#email").on("focusout", function() {

                if (!validateEmail($(this).val())) {
                    alertBox("#fcf8e3", "<strong>Warning !</strong> Better check yourself, you're email address not looking too good.  !!!");
                    $(this).val("");
                }

            });

            
            $("#save_btn").on("click", function() {
                var fk = {};
                var queries = [];
                var i = 0;
                var EXIT=false;
                $.each($(".query"), function() {
                    i += 1;
                    var temp = {};
                    temp["status"] = $("input[name=optionsRadios" + i + "]:checked").val();
                    temp["query"] = $(this).val();
                    if(temp["query"]===""){
                	alertBox("#fcf8e3", "<strong>Warning !</strong> Better check yourself, you have empty queries  !!!");
                    $(this).val("");
                    EXIT=true;
                    return;
                
                }
                    
                    queries.push(temp);

                });
                
                fk["email"] = $("#email").val();
                   if (!validateEmail(fk["email"])) {
                    alertBox("#fcf8e3", "<strong>Warning !</strong> Better check yourself, you're email address not looking too good.  !!!");
                    $("#email").val("");
                    return;
                }

                fk["name"] = $("#name").val();
                if(fk["name"]===""){
                	alertBox("#fcf8e3", "<strong>Warning !</strong> Better check yourself, you're name not looking too good.  !!!");
                    $("#name").val("");
                    return;
                
                }
                if(EXIT){
                	return;
                }
                fk["queries"] = queries;
                fk["feedback"] = $("#feedback_comments").val();
                console.log(fk);


                $.ajax({
                    async: true,
                    url: "/cgi-bin/feedback.py",
                    data: {
                        feedback: JSON.stringify(fk)
                    },
                    dataType: 'text',
                    type: "GET",
                    error: function() {
                        //some error
                    }

                }).done(function(text) {
                    text = text.trim();
                    if (text === "SUCCESS") {
                        alertBox("#dff0d8", "<strong>Thank You !</strong> Your response has been saved !!!");

                    } else if (text === "DUPLICATE") {
                        alertBox("#f1dddd", "<strong>Duplicate!</strong> email address  !!!");
                    } else if (text === "WRONG") {
                        alertBox("#f1dddd", "<strong>Oops</strong> Something Went Wrong !!!");
                    }


                });
            });
                   function validateEmail(sEmail) {
                var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                if (filter.test(sEmail)) {

                    return true;
                } else {

                    return false;
                }
            }
        function alertBox(color, text) {
                var alert = $("<div class=\"alert\" style=\"border-radius:4px;background-color:" + color + ";opacity:0;position:absolute;padding-top:15px;z-index:1100;height:50px;text-align:center;width:40%;left:30%;top:70%;\">" + text + "</div>");

                $("body").append(alert);
                $(".alert").animate({
                    opacity: 1.0
                }, 2000, function() {

                    setTimeout(function() {
                        $(".alert").animate({
                            opacity: 0
                        }, 1000, function() {
                            $(".alert").remove();
                        });

                    }, 2000);


                });


            }

})();
