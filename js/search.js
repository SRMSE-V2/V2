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
        $.getScript("/js/min/jquery-ui.min.js", function() {
            $.getScript("/js/min/auto.min.js");
        });
        //end load scripts
        //global vars start
        var START_RESULT = 0;
        var END_RESULT = 10;
        var IDS = [];
        var I_CLUSTER = 0;
        var J_CLUSTER = 4;
        var HAS_RESULTS = true;
        var CLUSTERS = [];
        window.SA = {};
        var TAP = false;
        var SHOW_INFOBOX = false;
        var HIDE_INFOBOX = false;
        var CLUSTER_RESPONSE = [];
        var INFO_BOX = "";
        var MODAL_BACK="";
        
        var LOAD = $("<div id=\"loading\" style=\"background-color:#333333;\"><img src=\"/images/ajax-loader.gif\" width=\"20\" height=\"20\"/></div>");
        var ARROW_DIV_BTNS = $("<div style=\"position:relative;top:0;bottom:0;padding-top:18px;height:50px;\"><span id=\"light\" class=\"side_btns\" data-toggle=\"tooltip\" title=\"Light Theme\"><img style=\"top:0;bottom:0;margin:auto;width:31px;height:27px;\" src=\"/images/lighttheme.png\"></span><span   class=\"side_btns\" id=\"dark\" data-toggle=\"tooltip\" title=\"Dark Theme\"><img style=\"top:0;bottom:0;margin:auto;width:31px;height:27px;margin-left:5px;\" src=\"/images/darktheme.png\">   </span> <span class=\"side_btns\" data-toggle=\"tooltip\" title=\"Want Help !\">  <img style=\"top:0;bottom:0;margin:auto;width:31px;height:27px;margin-left:5px;\" src=\"/images/howtouse.png\">      </span> </div>");
        var TAP_DIV = $("<div id=\"tap\" style=\"position:absolute;top:122px;width:100%;height:46px;z-index:99;\"><button class=\"btn tap-btn\" style=\"width:100%;height:100%;\" type=\"button\">Tap to see clusters</button></div>");
        var RMAP = {
            "Architecture": "100",
            "Arts": "101",
            "Education": "102",
            "Entertainment": "103",
            "Finance": "104",
            "Food": "105",
            "Health": "106",
            "History": "107",
            "News": "108",
            "Sports": "109",
            "Technology": "110",
            "Religion": "111"
        };
        var MAP = {
            "100": "Architecture",
            "101": "Arts",
            "102": "Education",
            "103": "Entertainment",
            "104": "Finance",
            "105": "Food",
            "106": "Health",
            "107": "History",
            "108": "News",
            "109": "Sports",
            "110": "Technology",
            "111": "Religion"
        };
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
        function dispInfoBox() {
            var table = $(INFO_BOX.replace(/<img (.*?)\/>/g, ""));
            $.each(table.find("a"), function() {
                if ($(this).attr("href") && $(this).attr("href").indexOf("File") >= 0) {
                    $(this).text("");
                    var img = $("<img>");
                    var fn = $(this).attr("href").split("/");
                    img.attr("src", "http://en.wikipedia.org/wiki/en:Special:Filepath/" + fn[fn.length - 1].replace("File:", "") + "?width=140");
                    $(this).append(img);
                }
            });
            $("#smart_col").html("").append(table.addClass("module").attr("id", "wiki"));
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
            prnt.width($("#search_results").width());
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
        var img2 = $("#srmse-logo");
        img2.addClass("switch");
        if (window.color === "dark") {
            $("head").append("<link id=\"dark_theme\" rel='stylesheet' type='text/css' href='/css/dark/search.min.css' />");
            img2.attr("src", "/images/dark/srmselogo.png");
        } else {
            img2.attr("src", "/images/light/srmselogo.png");
            $("head").append("<link id=\"light_theme\" rel='stylesheet' type='text/css' href='/css/light/search.min.css' />");
        }
        img2.attr("alt", "SRM Search Engine");
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
            	$("#light_theme").remove();
                window.color = "light";
                document.cookie = "color=light;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/";
                var calls=window.switchImg();
                var fin=calls.length+1;
                var loaded=0;
                var stylesheet=$("<link id=\"light_theme\" rel='stylesheet' type='text/css' href='/css/light/search.min.css' />");
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
            	$("#dark_theme").remove();
                window.color = "dark";
                document.cookie = "color=dark;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/";
                var calls=window.switchImg();
                var fin=calls.length+1;
                var loaded=0;
                var stylesheet=$("<link id=\"dark_theme\" rel='stylesheet' type='text/css' href='/css/dark/search.min.css' />");
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
        };
var u = 0; //toggle var
var wait=0;
function showArrow(){
 $(".arrow_div").remove();
                $("#arrow_parent").append("<div class=\"arrow_div\"></div>");
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
 $.getScript("/js/min/jquery.mobile.custom.min.js",function(){
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
        
        
        });//load swipe event
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
            $(document).on('scroll', function() {
                if ($(window).scrollTop() > 100) {
                    $('.scroll-top-wrapper').addClass('show');
                    setTimeout(function() {
                        $('.scroll-top-wrapper').removeClass('show');
                    }, 4000);
                } else {
                    $('.scroll-top-wrapper').removeClass('show');
                }
            });
            $('.scroll-top-wrapper').on('click', scrollToTop);
        });
        function scrollToTop() {
            var verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
            var element = $('body');
            var offset = element.offset();
            var offsetTop = offset.top;
            $('html, body').animate({
                scrollTop: offsetTop
            }, 500, 'linear');
        }
        //scroll button ends
        function navChanger() {
            $(".newside").remove();
            //hides autocomplete dropdown on screen resize
            $(".ui-autocomplete").removeClass("show");
            if ($(window).width() <= 1000) {
                if ($(".disc_back")) {
                    $(".disc_back").css("top", "180px");
                }
                if ($("#tap").length <= 0 && !TAP && CLUSTERS.length > 0) {
                    $("body").append(TAP_DIV);
                    TAP_DIV.on("click", function() {
                        $(this).slideUp("fast", function() {
                            $(this).hide();
                        });
                    });
                    TAP = true;
                } else if (TAP) {} else {
                    $("#tap").show();
                }
                if (CLUSTERS.length === 0) {
                    $("#smart_answer").css("margin-top", "102px");
                    $(".side").removeClass("full-height");
                } else {
                    $("#smart_col").css("margin-top", "62px");
                    $(".side").addClass("full-height");
                }
                $(".side").addClass("hide");
                $("#centre_parent").css("margin-top", "20px");
                var newnav = $("<div class=\"newside\" style=\"width:" + $(".nav_changer").width() + "px;\"></div");
                var lbtn = $("<button style=\"\" class=\"cluster_lbtn btn glyphicon glyphicon-chevron-left\"></button>");
                var rcol = $("<div style=\"float:left;height:100%;width:40px;\" class=\"\"></div>");
                var lcol = $("<div style=\"float:left;height:100%;width:40px;\" class=\"\"></div>");
                var rbtn = $("<button style=\"\" class=\"cluster_rbtn btn glyphicon glyphicon-chevron-right\"></button>");
                var r = $("<div style=\"width:100%;height:100%;padding-top:5px;padding-bottom:5px;\"></div>");
                var main = $("<div style=\"padding:0px !important;height:50px;width:" + ($(".nav_changer").width() - 80) + "px;\" class=\"col-lg-10 col-md-10 col-sm-10 col-xs-10\"></div>");
                rcol.append(rbtn);
                lcol.append(lbtn);
                r.append(lcol);
                if (CLUSTERS.length > 0) {
                    var m = $();
                    $.each(CLUSTERS.slice(I_CLUSTER, J_CLUSTER), function(index, element) {
                        var h = ($(".nav_changer").width() - 105) / 4;
                        var temp;
                        if (index === J_CLUSTER) {
                            temp = $("<div data-toggle=\"tooltip\" data-placement=\"bottom\" class=\"cluster_btn\" title=\"" + element.capitalizeMe() + "\" style=\"width:" + h + "px;\"></div>");
                            temp.text(element.capitalizeMe());
                            m = m.add(temp);
                        } else {
                            temp = $("<div data-toggle=\"tooltip\" data-placement=\"bottom\" class=\"cluster_btn\" title=\"" + element.capitalizeMe() + "\" style=\"width:" + h + "px;\"></div>");
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
                        if (I_CLUSTER !== 0) {
                            I_CLUSTER -= 3;
                            J_CLUSTER -= 3;
                            $(".navside").remove();
                            navChanger();
                        }
                    });
                    rbtn.on("click", function() {
                        if ((J_CLUSTER + 3) <= CLUSTERS.length) {
                            I_CLUSTER += 3;
                            J_CLUSTER += 3;
                            $(".navside").remove();
                            navChanger();
                        }
                    });
                } else {
                    getClusters();
                }
                $(".newside").css("margin-top", "122px");
            } else {
                $("#tap").hide();
                $("#centre_parent").css("margin-top", "82px");
                $(".newside").css("margin-top", "82px");
                $("#smart_col").css("margin-top", "82px");
                if (CLUSTERS.length > 0) {
                    $(".side").removeClass("hide");
                } else {
                    $("#smart_answer").css("margin-top", "22px");
                }
            }
        }
        navChanger();
        $(window).on("resize", navChanger);
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
                    url: "/cgi-bin/queryret/getIds.py",
                    data: {
                        q: $("#search").val().trim().toLowerCase(),
                        f: 1
                    },
                    dataType: 'text',
                    type: "GET",
                    error: function() {
                        HAS_RESULTS = false;
                    }
                }).done(function(text) {
                    var js = JSON.parse(text);
                    IDS = js["ids"];
                    renderResult(js["results"], $("#search_results"), false, true);
                    HAS_RESULTS = true;
                });
            }
        }
        function renderResult(arr, fat, wiki, isappend) {
            if (arr[0]) {
                if (wiki) {
                    INFO_BOX = arr[0]["infobox"];
                } else {
                    HAS_RESULTS = true;
                    START_RESULT += 10;
                    END_RESULT += 10;
                }
                var main = $();
                $.each(arr, function(index, element) {
                    var prnt = $("<div></div>");
                    var title = $("<div style=\"display:block;\"></div>");
                    var titlea = $("<a></a>");
                    title.append(titlea);
                    prnt.addClass("search_result effect"); //remove effect class to remove fadeIn
                    titlea.addClass("search_title");
                    //Adding ... to long titles
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
                    //fav loading
                    var imgspan = $("<div></div>");
                    imgspan.addClass("search_green");
                    imgspan.append(element["url"]);
                    var img = new Image();
                    var url = "http://www.google.com/s2/favicons?domain=" + element['url'];
                    img.src = url;
                    img.width = 15;
                    img.height = 15;
                    $(img).css("margin-right", "10px");
                    img.onload = function() {
                        imgspan.prepend(img);
                        prnt.find(".search_info").after(imgspan);
                    };
                    var search_desc = $("<p></p>");
                    search_desc.addClass("search_info");
                    if (wiki) {
                        //as wiki as desc in html in db
                        search_desc.html(element["body"]);
                    } else {
                        search_desc.text(element["body"]);
                    }
                    prnt.append(title);
                    prnt.append(search_desc);
                    main = main.add(prnt);
                });
                //to add a line break hr
                main = main.add("<hr class=\"hr_breaker\">");
                //to check if results is more or first
                if (isappend) {
                    fat.append(main);
                } else {
                    fat.html(main);
                }
                $(".search_result").on("click", function() {
                    window.location = $(this).find(".search_title").attr("href");
                });
                //hover on titles
                $(".search_result").on("mouseenter", function() {
                    if (window.color === "light") {
                        $(this).find(".search_title").css("color", "rgba(71, 71, 71, 0.85)");
                        $(this).find(".search_title").css("text-decoration", "underline");
                    } else if (window.color === "dark") {
                        $(this).find(".search_title").css("color", "#DDDDDD");
                        $(this).find(".search_title").css("text-decoration", "underline");
                    }
                });
                $(".search_result").on("mouseleave", function() {
                    if (window.color === "light") {
                        $(".search_title").css("color", "#474747");
                        $(".search_title").css("text-decoration", "none");
                    } else if (window.color === "dark") {
                        $(".search_title").css("color", "#DFDDDD");
                        $(".search_title").css("text-decoration", "none");
                    }
                });
                //end hover titles
                //effect on render
                $(".effect").animate({
                    opacity: 1.0,
                    queue: false
                }, 1000, function() {});
                $(".effect").removeClass("effect");
                $("#loading").remove();
                $(window).scroll(bindScroll);
            } else {
           
                var prnt = ADD_NO_RESULTS();
                
                if (!wiki) {
                    HAS_RESULTS = false;
                }
                else{
               		fat.append(prnt);
                }
            }
        }
        function getMoreResults(i, j) {
            if (START_RESULT < IDS.length) {
                if (IDS && HAS_RESULTS) {
                    $.ajax({
                        url: "/cgi-bin/queryret/getMore.py",
                        dataType: 'text',
                        type: "GET",
                        async: true,
                        data: {
                            q: "" + IDS.slice(START_RESULT, END_RESULT).toString(),
                            f: "1"
                        },
                        error: function() {
                            $("#search_results").append(prnt);
                            HAS_RESULTS = false;
                        }
                    }).done(function(text) {
                        var arr = JSON.parse(text);
                        renderResult(arr["results"], $("#search_results"), false, true);
                    });
                }
            } else {
                var prnt = ADD_NO_RESULTS();
                $("#search_results").append(prnt);
                HAS_RESULTS = false;
            }
        }
        function bindScroll() {
            if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
                $(window).unbind('scroll');
                if (HAS_RESULTS) {
                    $("#search_results").append(LOAD);
                    $("#loading").width($("#search_results").width());
                    setTimeout(function() {
                        getMoreResults(START_RESULT, END_RESULT, true);
                    }, 1000);
                }
            }
        }
        function getIDSwiki() {
            $.ajax({
                async: true,
                url: "/cgi-bin/queryret/getIds.py",
                dataType: 'text',
                type: "GET",
                data: {
                    q: $("#search").val().trim().toLowerCase(),
                    f: 2
                },
                error: function() {}
            }).done(function(text) {
                try {
                    var js = JSON.parse(text);
                    renderResult(js["results"], $("#wikiMain"),true, true);
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
                    f: 3
                },
                error: function() {}
            }).done(function(text) {
                try {
                    var js = JSON.parse(text);
                    renderResult(js["results"], $("#news"), false, true);
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
                        q: $("#search").val().trim().toLowerCase()
                    },
                    error: function() {
                        $("#smart_answer").removeClass("show");
                        $("#smart_col").addClass("hide");
                    }
                }).done(function(textt) {
                    try {
                        var js = JSON.parse(textt.replace(/\n/g, "").trim());
                        if (!$.isEmptyObject(js)) {
                            $.each(js, function(key, val) {
                                window.SA = val;
                                switch (key) {
                                    case "general":
                                        $.getScript("/js/min/general.min.js");
                                        SHOW_INFOBOX = true;
                                        break;
                                    case "sports":
                                        $.getScript("/js/min/cric_score.min.js");
                                        HIDE_INFOBOX = true;
                                        break;
                                    case "stock":
                                        $.getScript("/js/min/stocks.min.js");
                                        HIDE_INFOBOX = true;
                                        break;
                                    case "train":
                                        $.getScript("/js/min/train.min.js");
                                        HIDE_INFOBOX = true;
                                        break;
                                    case "weather":
                                        $.getScript("/js/min/weather.min.js");
                                        HIDE_INFOBOX = true;
                                        break;
                                    case "movie":
                                        $.getScript("/js/min/movie.min.js");
                                        SHOW_INFOBOX = true;
                                        break;
                                    case "exam":
                                        $.getScript("/js/min/exam.min.js");
                                        HIDE_INFOBOX = true;
                                        break;
                                    case "location":
                                        $.getScript("/js/min/locations.min.js");
                                        HIDE_INFOBOX = true;
                                        break;
                                    case "minerals":
                                        $.getScript("/js/min/minerals.min.js");
                                        HIDE_INFOBOX = true;
                                        break;
                                    case "differences":
                                        $.getScript("/js/min/differences.min.js");
                                        SHOW_INFOBOX = true;
                                        break;
                                    case "wiki":
                                        SHOW_INFOBOX = true;
                                        break;
                                    case "dict":
                                        $.getScript("/js/min/meaning.min.js");
                                        SHOW_INFOBOX = true;
                                        break;
                                    case "theatre":
                                        $.getScript("/js/min/theater.min.js");
                                        SHOW_INFOBOX = true;
                                        break;
                                    case "highway":
                                        $.getScript("/js/min/highway.min.js");
                                        HIDE_INFOBOX = true;
                                        break;
                                    case "cricket-players":
                                        $.getScript("/js/min/cricket.min.js");
                                        SHOW_INFOBOX = true;
                                        break;
                                    case "ministers":
                                        $.getScript("/js/min/ministers.min.js");
                                        HIDE_INFOBOX = true;
                                        break;
                                    case "bank":
                                        $.getScript("/js/min/bank.min.js");
                                        HIDE_INFOBOX = true;
                                        break;
                                    case "highcourt":
                                        $.getScript("/js/min/highcourt.min.js");
                                        HIDE_INFOBOX = true;
                                        break;
                                    case "discography":
                                        $.getScript("/js/min/discography.min.js");
                                        SHOW_INFOBOX = true;
                                        break;
                                    default:
                                        $("#smart_answer").addClass("hide");
                                        SHOW_INFOBOX = true;
                                        break;
                                }
                            });
                        } else {
                            if ($("#search").val().trim().toLowerCase().indexOf('convert') > -1) {
                                $.getScript("/js/min/glaConv.min.js");
                                $.getScript("/js/min/metric.min.js");
                                $.getScript("/js/min/convert.min.js");
                            }
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
        function getClusters() {
            if ($("#search").val().trim() !== "") {
                $.ajax({
                    async: true,
                    url: "/cgi-bin/cluster/getClusters.py",
                    dataType: 'text',
                    type: "GET",
                    data: {
                        q: $("#search").val().trim().toLowerCase()
                    },
                    error: function() {
                        CLUSTERS = [];
                        $(".side").removeClass("col-md-2 col-lg-2 hide");
                        $(".side").addClass("col-md-1 col-lg-1");
                        $("#centre_parent").parent().removeClass("col-lg-7 col-md-7 col-lg-pull-3 col-md-pull-3");
                        $("#centre_parent").parent().addClass("col-lg-8 col-md-8 col-lg-pull-3 col-md-pull-3");
                        $("#smart_col").parent().removeClass("col-lg-push-7 col-md-push-7 col-lg-3 col-md-3");
                        $("#smart_col").parent().addClass("col-lg-push-8 col-md-push-8 col-lg-3 col-md-3");
                    }
                }).done(function(textt) {
                    var res = JSON.parse(textt);
                    CLUSTER_RESPONSE = res;
                    var arr = [];
                    $.each(res, function(k, v) {
                        arr.push(MAP[k]);
                    });
                    if (arr.length > 0) {
                        var main = $();
                        CLUSTERS = arr;
                        $.each(arr, function(index, element) {
                            if (element) {
                                var li = $("<li></li>");
                                var a = $("<a></a>");
                                a.attr("data-toggle", "tooltip");
                                a.attr("data-placement", "right");
                                a.attr("title", element.capitalizeMe());
                                a.on("click", function() {
                                    $(".active").toggleClass("active not_active");
                                    $(this).parent().toggleClass("not_active active");
                                    clickOnCluster(this);
                                });
                                a.text(element.capitalizeMe());
                                li.append(a);
                                li.addClass("not_active");
                                li.css("opacity", "0");
                                main = main.add(li);
                                $(".side").removeClass("hide");
                                navChanger(); //for nav
                            }
                        });
                        $(".nav-sidebar").append(main);
                        main.animate({
                            opacity: "1",
                            queue: false
                        }, 1000, function() {});
                    } else {
                        console.log("no clusters");
                        CLUSTERS = [];
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
        function clickOnCluster(that) {
            var cluster = $(that).text();
            if (cluster !== "News") {
                $("#news").addClass("hide");
            } else {
                $("#news").removeClass("hide");
            }
            var cid = RMAP[cluster];
            var ids = CLUSTER_RESPONSE[cid];
            IDS = ids;
            START_RESULT = 0;
            END_RESULT = 10;
            $.ajax({
                async: true,
                url: "/cgi-bin/queryret/getMore.py",
                dataType: 'text',
                type: "GET",
                data: {
                    q: IDS.slice(START_RESULT, END_RESULT).toString(),
                    f: 1
                },
                error: function() {
                    var prnt = ADD_NO_RESULTS();
                    $("#search_results").append(prnt);
                }
            }).done(function(textt) {
                var js = JSON.parse(textt);
                renderResult(js["results"], $("#search_results"), false, false);
            });
            return false;
        }
        //fix scroll later
        $(window).bind('scroll', bindScroll);
        getIDSresults();
        getIDSwiki();
        getIDSnews();
        getSmartAns();
        getClusters();
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
            data = data.replace(/\\[a-z](.*?)\s/g, " ").replace(/\\n+/g, " ").replace(/\\t+/g, " ").replace(/\\r+/g, " ").replace(/\\/g, " ").replace(/&#(.*?)\s;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/<(.*?)>(.*?)<\/(.*?)>/g, " ").replace(/\s+/g, " ").trim();
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
