(function() {
//test cache busting
    $(document).ready(function() {
      $(".load_msg").remove(); 
    $(".hidden_body").removeAttr("hidden");//remove loading when script loaded
            $('[data-toggle="tooltip"]').tooltip(); 
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
        var LAST_WORD_WIDTH=0;
         var S_KEY="SECRET_KEY";
	//globals end
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
	    function prependCss(css,id){
    elChild = document.createElement('style');
    elChild.setAttribute("id",id);
elChild.innerHTML = css;
document.getElementsByTagName("head")[0].appendChild(elChild);
}
	
        function searchQuery(q) {
            window.location = "/cgi-bin/s.py?q=" + encodeURIComponent(q);
        }
        
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
		  		url: "/cgi-bin/ac/getWords.py",
		  		dataType: "text",
		  		data: {q:request.term},
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
            $('html,body').animate({scrollTop: $("#search").offset().top});
              if($(window).width()<=767){
            	$('.feedback').fadeOut();
            }
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
                if($(window).width()<767){
                var big;
                var small;
                	if(LEFT_AUTO!==-1){
                		big=((LAST_WORD_WIDTH)*(0.90)) + "px";
                		small=((LAST_WORD_WIDTH)*(0.10)) + "px";
                	
                	}
                	else{
                		big=($("#search").parent().width()*(0.90)) + "px";
                		small=($("#search").parent().width()*(0.10)) + "px";
                	
                	}
		        $(".ui-menu-item >a").css("width",big).css("float","left");
		        $(".ui-menu-item >a").after("<span class='pen'><span class='glyphicon glyphicon-arrow-up copy_g'></span></span>");
		        $(".pen").css("width",small);
		        $.each($(".pen"),function(index,element){
		        	$(this).css("height",parseInt($(this).parent().find("a").height())+"px");
		        
		        
		        });
                }
                else{
                
                if(LEFT_AUTO!==-1){
				 $(".ui-menu-item >a").css("width",(LAST_WORD_WIDTH) + "px").css("float","left");                	
                	}
                	else{
                	 	$(".ui-menu-item >a").css("width",($("#search").parent().width()) + "px").css("float","left");
                	
                	}
                
                }
            },
            close: function() {
             //clearing up the autocomplete after close 
                $('.ui-menu-item').remove();
                $('ul.ui-autocomplete')
                    .removeClass('opened')
                    .css('display', 'block');
              if($(window).width()<=767){
		     $('.feedback').fadeIn();
		     $("#search").focus();//to disable bottom feed
             }
               
                 
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
            var arrr =[];
                if ($("#search").val().trim() !== "") {
                    if (ui.content[0]["resize"] === "true") {
                        //#DEBUGconsole.log("here");
                        arrr = $("#search").val().trim().split(" ");
                        if (ENABLE_BACKINPUT) {
                            BACKINPUT.val(arrr.slice(0, arrr.length - 1).join(" ") + " " + ui.content[0]["value"]);
                        }
                    } else {
                        if (ENABLE_BACKINPUT) {
                            BACKINPUT.val(ui.content[0]["value"].replace($("#search").val().toLowerCase(), $("#search").val()));
                        }
                    }
                }


               // console.log(ui);
                if (ui.content[0]["resize"] === "true") {
                    //#DEBUGconsole.log("here1");
                    ORIGINAL_QUERY = $("#search").val().trim();
                    var pos;
                    if (FIRST_RESIZE) {
                        SPACE = false; //disable multiple space hits to remove of drag effect
                        DEFAULT_LEFT = parseInt($("#search").offset().left);
                        FIRST_RESIZE = false;
                        
                        pos = arrr.slice(0,arrr.length-1).join(" ").length * parseInt($("#search").css("font-size").replace("px", ""));
                        var temp=arrr.pop().length * parseInt($("#search").css("font-size").replace("px", ""));
                        LAST_WORD_WIDTH=temp+100; //adding a 100 px assuming biggest word
                        STRLEN = parseInt(pos) * 0.7;
                        LEFT_AUTO = DEFAULT_LEFT + pos; //setting up new left auto position
                    } else {
                        if (SPACE) {
                            pos = arrr.slice(0,arrr.length-1).join(" ").length * parseInt($("#search").css("font-size").replace("px", ""));
                            var temp=arrr.pop().length * parseInt($("#search").css("font-size").replace("px", ""));
                        LAST_WORD_WIDTH=temp+100;
                            STRLEN = pos * 0.7;
                            LEFT_AUTO =DEFAULT_LEFT + pos;
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

               // var query = $("#search").val().trim();
               // searchQuery(query);


            },
            delay: 300

        });
 $(document).on("click",".ui-menu-item",function(event){
        	if(event.target.tagName==="SPAN"){
        		if($(event.target).attr("class")==="pen"){
			$("#search").val($(event.target).parent().text());
			}
			else{
			
			$("#search").val($(event.target).parent().parent().text());
			}
			event.stopPropagation();
			$("#search").focus();
			return false;
        	}
        	else{
        		searchQuery($("#search").val().trim());
        	}
        
        });
        $("#search").on("focusin",function(){
        	  if($(window).width()<=767){
        		$(".feedback").hide();
        	}
        	
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
        $("#search").on("click touch",function(event){
          if($(window).width()<=767){
        	$('.feedback').fadeOut();
        	$('html,body').animate({scrollTop: $("#search").offset().top});
        	}
        });
        $("#search").on("focusout",function(event){
          if($(window).width()<=767){
        	$('.feedback').fadeIn();
        	}
        });
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
                $.getScript("/js/min/location_centric.min.js");
            }

        }
        loadLocation(); //init location
        $("#search").on("keyup", function(event) {
            commonTest(event);
            if (event.keyCode === 32) {
                SPACE = true;
            } else if (event.keyCode === 8) {
                var a = $("#search").val();
                if (a.slice(a.length - 1, a.length) === " ") {//single space rem on backspace
                    if (a.slice(a.length - 2, a.length) === "  ") {//double space rem on backspace
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
            
            $(window).on("keyup",function(e){
    if ($.isWindow(e.target) || $(e.target).prop("tagName")==="BODY")
    {
   	$("#search").focus().val(String.fromCharCode(e.keyCode));
    }

            
            
            });
    });


})();
(function(){
var toggle=true;
$(".feedback_btn").on("click",function(){
if(toggle){
$("#feedback_form").removeClass("hide");
$("#feedback_form").animate({"height":"+=500px"},500,function(){});
$("#blur_back").removeClass("hide");
toggle=false;
}
else{
$("#blur_back").addClass("hide");
$("#feedback_form").animate({"height":"-=500px"},200,function(){$(this).addClass("hide");$(this).css('height','0px');});
toggle=true;
}

});
$(".reset_form").on("click",function(){
if(!toggle){
$(".feed_frm").trigger('reset');
$("#blur_back").addClass("hide");
$("#feedback_form").animate({"height":"-=500px"},200,function(){$(this).addClass("hide");$(this).css('height','0px');});
toggle=true;
}
});
$(":not(#feedback_form)").on("click touch",function(e){
var container = $("#feedback_form");
    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0 && $(e.target).attr("class").indexOf("feedback_btn")<0) // ... nor a descendant of the container
    {
    $("#blur_back").addClass("hide");
        $("#feedback_form").animate({"height":"-=500px"},200,function(){$(this).addClass("hide");$(this).css('height','0px');});
toggle=true;
    }





});

      $("#email").on("focusout", function() {

                if (!validateEmail($(this).val())) {
                    alertBox("#6889ff", "<strong>Warning !</strong> Better check yourself, you're email address not looking too good.  !!!");
                    $(this).val("");
                }

            });

            
            $("#save_button").on("click", function() {
                var fk = {};
                var queries = [];
                var i = 0;
                var EXIT=false;
                
                fk["email"] = $("#email").val();
                   if (!validateEmail(fk["email"])) {
                    alertBox("#6889ff", "<strong>Warning !</strong> Better check yourself, you're email address not looking too good.  !!!");
                    $("#email").val("");
                    return;
                }
		if($("#frm_query").val()===""){
                	alertBox("#6889ff", "<strong>Warning !</strong> Better check yourself, you have empty queries  !!!");
                    $("#frm_query").val("");
                    return;
                
                }
                  
               
                fk["queries"] = $("#frm_query").val()
                fk["feedback"] = $("#feedback_comments").val();


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
                        alertBox("#259b24","<strong>Thank You !</strong> Your response has been saved !!!");

                    } else if (text === "DUPLICATE") {
                        alertBox("#e51c23", "<strong>Duplicate!</strong> email address  !!!");
                    } else if (text === "WRONG") {
                        alertBox("#e51c23", "<strong>Oops</strong> Something Went Wrong !!!");
                    }


                });
                return false;
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
                var alert = $("<div class=\"alert\" style=\"border-radius:4px;background-color:" + color + ";opacity:0;position:absolute;padding-top:15px;z-index:1100;height:50px;text-align:center;width:40%;left:30%;top:70%;color:white;\">" + text + "</div>");

                $("body").append(alert);
                $(".alert").animate({
                    opacity: 1.0
                }, 1000, function() {

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
