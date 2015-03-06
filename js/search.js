/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 
 Author Tilak Patidar
 email tilakpatidar@gmail.com
 github http://github.com/tilakpatidar      
  */
$(document).ready(function() {
$.ajaxSetup({cache:true});
$("head").append("<link rel='stylesheet' type='text/css' href='http://fonts.googleapis.com/css?family=Quicksand:400,700' />");
$("head").append("<link rel='stylesheet' type='text/css' href='/main/css/search.css' />");
$.getScript("/main/js/jquery-ui.min.js",function(){
$.getScript("/main/js/jquery.ui.autocomplete.html.js",function(){
$.getScript("/main/js/scripts.js",function(){


});

});


});

    window.i = 0;
    window.j = 10;
    IDS = [];
    IDSwiki=[];
    IDSnews=[];
    window.trains = [];
    window.ctrain = 0;
    window.icluster = 0;
    window.jcluster = 4;
    window.results = true;
    window.clusters = [];
    window.locations=[];
    window.clocation=0;
    window.val={};
window.tap=false;


//caching scripts
   $.ajaxSetup({
  cache: true
});


    var load = $("<div id=\"loading\" style=\"background-color:#333333;\"><img src=\"/main/images/ajax-loader.gif\" width=\"20\" height=\"20\"/></div>");
    function navChanger() {
        $(".newside").remove();
//fixing affix
$("#smart_col").width($("#smart_col").parent().width());
$(".nav-sidebar").css("width","inherit");

        //hides autocomplete dropdown on screen resize
        $(".ui-autocomplete").removeClass("show");
        if ($(window).width() <= 1000) {

if($("#tap").length<=0 && !window.tap && window.clusters.length>0){
var tap=$("<div id=\"tap\" style=\"position:absolute;top:122px;width:100%;height:40px;z-index:99;\"><button class=\"btn btn-danger\" style=\"width:100%;height:100%;\" type=\"button\">Tap to see clusters</button></div>");
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
$(".side").addClass("hide");
}     
       



$("#centre_parent").css("margin-top","20px");
console.log("resize");
            var newnav = $("<div class=\"alpha-blur newside\" style=\"width:"+$(".nav_changer").width()+"px;\"></div");
            var lbtn = $("<button style=\"color:white;border:none;\" class=\"btn alpha-blur glyphicon glyphicon-chevron-left\"></button>");
            var rcol = $("<div style=\"float:left;height:100%;width:40px;\" class=\"\"></div>");
            var lcol = $("<div style=\"float:left;height:100%;width:40px;\" class=\"\"></div>");
            var rbtn = $("<button style=\"color:white;border:none;\" class=\"btn alpha-blur glyphicon glyphicon-chevron-right\"></button>");
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
var temp = $("<div data-toggle=\"tooltip\" data-placement=\"bottom\" class=\"\" title=\""+element.capitalizeMe()+"\" style=\"display:box;border-radius:8px;box-shadow: inset 0 0 2px 2px rgba(51,51,51,.5);line-height:40px;overflow: hidden;text-overflow: ellipsis;color:#e2e2e2;text-align:center;height:40px;width:"+h+"px;float:left;margin-left:5px;margin-right:5px;cursor:pointer;font-size:0.9em;\"></div>");

                    temp.text(element.capitalizeMe());
                    m = m.add(temp);
}
else{
                    var temp = $("<div data-toggle=\"tooltip\" data-placement=\"bottom\" class=\"\" title=\""+element.capitalizeMe()+"\" style=\"display:box;border-radius:8px;box-shadow: inset 0 0 2px 2px rgba(51,51,51,.5);line-height:40px;overflow: hidden;text-overflow: ellipsis;color:#e2e2e2;text-align:center;height:40px;width:"+h+"px;float:left;margin-left:5px;cursor:pointer;font-size:0.9em;\"></div>");

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
                        "background-color": "rgba(189,0,24,0.3)"
                    });

                });
                main.on("mouseleave", "div", function() {
                    $(this).css({
                        "color": "#e2e2e2",
                        "background-color": "transparent"
                    });
                    main.on("click", "div", function() {

                        $(this).addClass("active");
                        var old = $("#search").val();
                        window.cluster = $(this).text();

                        window.location = "/cgi-bin/s.py?q=" + $("#search").val().trim() + "&c=" + window.cluster;

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

    //clusters click event
    $(".nav-sidebar").on("click", "a", function() {

        $(this).addClass("active");
        var old = $("#search").val();
        window.cluster = $(this).text();
        window.location = "/cgi-bin/s.py?q=" + $("#search").val().trim() + "&c=" + window.cluster;

    });
    $("#predefined_questions").hover(function() {
        $("#collapsee").collapse('show');

    });
    $("#collapsee").on("mouseleave", function() {
        $("#collapsee").collapse('hide');
    });
    $("#search_btn").on("submit", function() {
        if ($("#search").val().trim() !== "") {
            var query = $("#search").val().trim();
            return true;
        }
    });


    $("#logo").on("click", function() {

        window.location = "/main/";
    });

    //click on suggested ques
    $("#collapsee").on("click", "a", function() {
        var v = $(this).text();
        $("#search").val(v);
        $("#search").attr("value", v);
        window.location = "/cgi-bin/s.py?q=" + $("#search").val().trim() + "&c=" + window.cluster;
    });
    function didYouMean(a){
if(a.trim()!==""){
console.log(a);
	$(".dym").removeClass("hide");
	$("#dym_val").text(" "+a);
	$("#dym_val").attr("href","http://srmsearchengine.in/cgi-bin/s.py?q="+a+"&c="+window.cluster);
}


}
    function getIdsResults(bool) {

        if ($("#search").val().trim() !== "") {
            if (window.cluster === "") {
                $.ajax({
                    async: bool,
                    url: "/cgi-bin/queryret/getIds.py",
		    data:{q:$("#search").val().trim().toLowerCase(),f:1},
                    dataType: 'text',
                    type: "GET",
                    error: function() {
                        //console.log("page not found");
                    }

                }).done(function(text){
                    var js = JSON.parse(text);
                    IDS = js["ids"];
		    didYouMean(js["Did You Mean: "]);
		    renderResult(js["results"],$("#search_results"));


                });

            } else {
                $.ajax({
                    async: bool,
                    url: "/cgi-bin/queryret/getIds.py",
	            data:{q:$("#search").val().trim().toLowerCase(),f:1,c:window.cluster},
                    dataType: 'text',
                    type: "GET",
                    error: function() {
                    }

                }).done(function(text) {
                    var js = JSON.parse(text);
                    IDS = js["ids"];
		    didYouMean(js["Did You Mean: "]);
		    renderResult(js["results"],$("#search_results"));
                   

                });

            }

        }

    }
function renderResult(arr,fat,wiki){
console.log(wiki);
 if (arr[0]) {
                    window.results = true;
                    window.i = window.i + 10;
                    window.j = window.j + 10;
                    var main = $();
                    $.each(arr, function(index, element) {
                        var prnt = $("<div></div>");
                        prnt.addClass("search_result");
                        prnt.addClass("alpha-blur");
                        prnt.css("padding", "20px");
                        prnt.css("clear", "both");
                        var title = $("<div style=\"display:block;\"></div>");
                        title.css("padding-bottom", "5px");
                        titlea = $("<a></a>");
                        titlea.addClass("search_title");
			if(wiki===""){
				titlea.attr("href", "http://en.wikipedia.org/wiki/"+element["title"]);
				element['url']="http://en.wikipedia.org/";
				element['body']=element['body'].filter();
			}
			else{
				titlea.attr("href", element["url"]);
			}
                        
                        titlea.text(element["title"].replace(/_/g," "));
                        title.append(titlea);
                        var imgspan = $("<div></div>");
imgspan.addClass("search_green");
                        imgspan.append(element["url"]);
var img=new Image();
var u="http://www.google.com/s2/favicons?domain=" + element['url'];
img.onload=function(){imgspan.prepend(img);prnt.find("p").before(imgspan);};
img.src=u;
img.width=20;
img.height=20;
$(img).css("margin-right","10px");
                       
                        var p = $("<p></p>");
                        p.addClass("search_info");
                        p.text(element["body"]);
                        prnt.append(title);
                        prnt.append(imgspan);
                        
                        prnt.append(p);
                        main = main.add(prnt);



                    });
                    fat.append(main);
                    $("#loading").remove();
                    $(window).scroll(bindScroll);
                } else {
                    if (window.results) {
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
               renderResult(arr["results"],$("#search_results"));


            });

        }



    }

    function bindScroll() {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            $(window).unbind('scroll');
            if (window.results) {
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
                    q: $("#search").val().trim().toLowerCase(),f:2,c:window.cluster
                },
                error: function() {
                }

            }).done(function(text) {
                var js = JSON.parse(text);
                IDSwiki=js["ids"];
		renderResult(js["results"],$("#wiki"),"");

            });



}
function getIdsNews(bool){
 $.ajax({
                async: bool,
                url: "/cgi-bin/queryret/getIds.py",
                dataType: 'text',
                type: "GET",
                data: {
                    q: $("#search").val().trim().toLowerCase(),f:3,c:window.cluster
                },
                error: function() {
                }

            }).done(function(text) {
                var js = JSON.parse(text);
                IDSnews=js["ids"];
		renderResult(js["results"],$("#news"));

            });



}
    function getSuggestedQuestions() {
        if ($("#search").val().trim() !== "") {
            //console.log("getSuggestedQuestions q:" + $("#search").val().trim().toLowerCase());
            $.ajax({
                async: true,
                url: "/cgi-bin/getQuestions.py",
                dataType: 'text',
                type: "GET",
                data: {
                    q: $("#search").val().trim().toLowerCase()
                },
                error: function() {
                    //console.log("err suggested");
                    $("#predefined_questions").removeClass("show");
                }

            }).done(function(text) {
                var arr = JSON.parse(text);
              //  console.log(arr);
                if (arr.length > 0) {
                    var prnt = $();
                    $.each(arr.slice(0,5), function(index, element) {
                        var a = $("<a></a>");
                        a.addClass("list-group-item");
                        a.addClass("list-group-item");
                        a.attr("href", "#");
                        a.text(element.capitalizeMe());
                        prnt = prnt.add(a);
                    });
                    $("#collapsee").append(prnt);
                    $("#predefined_questions").removeClass("hide");
                } else {
                    //console.log("No suggested questions !");
                    $("#predefined_questions").removeClass("show");
                }


            });
        }

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

                var js = JSON.parse(textt.replace(/\n/g, "").trim());
                if (!$.isEmptyObject(js)) {
                    $.each(js, function(key, val) {
                       window.val=val;
                        switch (key) {

                            case "general":
				$.getScript("/main/js/modules/general.js");
                                break;
                            case "sports":
                                $.getScript("/main/js/modules/sports.js");
                                break;
                            case "stock":
                                $.getScript("/main/js/modules/stocks.js");
                                break;
                            case "train":
                                $.getScript("/main/js/modules/train.js");
                                break;

                            case "weather":

                              $.getScript("/main/js/modules/weather.js");
                                break;
                            case "movie":
                               $.getScript("/main/js/modules/movie.js"); 
                            break;
                            case "exam":
			       $.getScript("/main/js/modules/exam.js");
				 
                            break;
                           case "location":
                              $.getScript("/main/js/modules/locations.js");
                            break;
                           case "minerals":
                               $.getScript("/main/js/modules/minerals.js");
			 break;
			 case "differences":
                               $.getScript("/main/js/modules/differences.js");	
			break;
			case "wiki":
                               $.getScript("/main/js/modules/wiki.js");
			 break;
			case "dict":
                            $.getScript("/main/js/modules/meaning.js");
			 break;
			case "theatre":
                               $.getScript("/main/js/modules/theater.js");
			 break;
			case "highway":
                               $.getScript("/main/js/modules/highway.js");
			 break;
                            default:
                                $("#smart_answer").addClass("hide");
                            break;

                        }

                    });
                } else {

                    if ($("#search").val().trim().toLowerCase().indexOf('convert') > -1) {
  			$.getScript("/main/js/modules/convert.js");}		
                    console.log("No smart  ans questions !");
                    $("#smart_answer").addClass("hide");
   $("#smart_col").addClass("hide");
                  
                }


            });
        }

    };
    function getClusters() {
        if ($("#search").val().trim() !== "") {
            //console.log("getClusters q:" + $("#search").val().trim().toLowerCase());
            $.ajax({
                async: true,
                url: "/cgi-bin/getClusters.py",
                dataType: 'text',
                type: "GET",
                data: {
                    q: $("#search").val().trim().toLowerCase()
                },
                error: function() {
                    console.log("error clusters");
                    window.clusters=[];
                   $(".side").html("");
$(".side").removeClass("col-md-2 col-lg-2");
$(".side").addClass("col-md-1 col-lg-1");
$("#centre_parent").parent().removeClass("col-lg-7 col-md-7 col-lg-pull-3 col-md-pull-3");
$("#centre_parent").parent().addClass("col-lg-9 col-md-9 col-lg-pull-2 col-md-pull-2");
$("#smart_col").parent().removeClass("col-lg-push-7 col-md-push-7 col-lg-3 col-md-3");
$("#smart_col").parent().addClass("col-lg-push-9 col-md-push-9 col-lg-2 col-md-2");
                }

            }).done(function(textt) {

                var arr = JSON.parse(textt);
                if (arr.length > 0) {
                    var main = $();
                    window.clusters = arr;
                    $.each(arr, function(index, element) {
if(element){
                        var li = $("<li></li>");
                        var a = $("<a></a>");
			li.addClass("alpha-blur");
			a.attr("data-toggle","tooltip");
			a.attr("data-placement","right");
			a.attr("title",element.capitalizeMe());
                        a.attr("href", "/cgi-bin/s.py?q="+window.query+"&c="+element);
                        a.text(element.capitalizeMe());
                        li.append(a);
                        main = main.add(li);
$(".side").removeClass("hide");
                        navChanger(); //for nav
}

                    });
                    $(".nav-sidebar").append(main);
		
                } else {
                    console.log("no clusters");
window.clusters=[];
                   $(".side").html("");
$(".side").removeClass("col-md-2 col-lg-2");
$(".side").addClass("col-md-1 col-lg-1");
$("#centre_parent").parent().removeClass("col-lg-7 col-md-7 col-lg-pull-3 col-md-pull-3");
$("#centre_parent").parent().addClass("col-lg-9 col-md-9 col-lg-pull-2 col-md-pull-2");
$("#smart_col").parent().removeClass("col-lg-push-7 col-md-push-7 col-lg-3 col-md-3");
$("#smart_col").parent().addClass("col-lg-push-9 col-md-push-9 col-lg-2 col-md-2");
                }


            });
        }

    }

   


    //fix scroll later
    $(window).bind('scroll', bindScroll);
    getIdsResults(true);
    getIdsWiki(true);
    getIdsNews(true);
    getSuggestedQuestions();
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
	//approved by sai prashanth
	data = data.replace(/®/g, " ").replace(/©/g, " ").replace(/[\.\,-\/#!<>?$%\^&\*;:\+{}=\-_`~()\[\]]/g, " ").replace(/\\u.*\s/g, " ").replace(/\\n+/g, " ").replace(/\\t+/g, " ").replace(/\\r+/g, " ").replace(/\\x.*\s/g, " ").replace(/\\/g,"").replace(/\'/g,"").replace(/\"/g,"").replace(/\\/g,"").replace(/\s+/g, " ").replace(/\|/g,' ').replace(/redirect/g,' ').trim();

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
