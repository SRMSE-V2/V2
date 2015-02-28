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
    window.i = 0;
    window.j = 20;
    IDS = [];
    window.trains = []
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


    var load = $("<div id=\"loading\" style=\"background-color:#333333;\"><img src=\"/ver1/images/ajax-loader.gif\" width=\"20\" height=\"20\"/></div>");
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

}
else{
$("#smart_col").css("margin-top","62px");
}     
       $(".side").addClass("hide");



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

                        window.location = "/cgi-bin/search.py?q=" + $("#search").val().trim() + "&c=" + window.cluster;

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
        window.location = "/cgi-bin/search.py?q=" + $("#search").val().trim() + "&c=" + window.cluster;

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

        window.location = "/ver1/";
    });

    //click on suggested ques
    $("#collapsee").on("click", "a", function() {
        var v = $(this).text();
        $("#search").val(v);
        $("#search").attr("value", v);
        window.location = "/cgi-bin/search.py?q=" + $("#search").val().trim() + "&c=" + window.cluster;
    });
    
    function getIds(bool) {

        if ($("#search").val().trim() !== "") {
            if (window.cluster === "") {
                $.ajax({
                    async: bool,
                    url: "/cgi-bin/getIds.py?q=" + $("#search").val().trim().toLowerCase(),
                    dataType: 'text',
                    type: "GET",
                    error: function() {
                        //console.log("page not found");
                    }

                }).done(function(text) {
                    var arr = JSON.parse(text);
                    IDS = arr;

                    //console.log(IDS);


                });

            } else {
                $.ajax({
                    async: false,
                    url: "/cgi-bin/getIds.py?q=" + $("#search").val().trim().toLowerCase() + " " + window.cluster,
                    dataType: 'text',
                    type: "GET",
                    error: function() {
                    }

                }).done(function(text) {
                    var arr = JSON.parse(text);
                    IDS = arr;


                });

            }

        }

    }

    function getResults(i, j, bool) {

        if (IDS && window.results) {
            $.ajax({
                url: "/cgi-bin/getResults.py",
                dataType: 'text',
                type: "GET",
                async: bool,
                data: {
                    q: "" + IDS.slice(window.i, window.j).toString()
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

                if (arr[0]) {
                    window.results = true;
                    window.i = window.i + 20;
                    window.j = window.j + 20;
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
                        titlea.attr("href", element["url"]);
                        titlea.text(element["title"]);
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
                        p.text(element["description"]);
                        prnt.append(title);
                        prnt.append(imgspan);
                        
                        prnt.append(p);
                        main = main.add(prnt);



                    });
                    $("#search_results").append(main);
                    $("#loading").remove();
                    $(window).scroll(bindScroll);
                } else {
                    if (window.results) {
                        load.remove();
                        var prnt = $("<div><span></span></div>");
                        prnt.width($("#search_results").width());
                        prnt.addClass("h6 text-center no-results");
                        prnt.text("No more results available");
                        $("#search_results").append(prnt);
                        window.results = false;
                    }

                }


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
                    getResults(i, j, true);
                }, 1000);

            }

        }

    }

    function getSuggestedQuestions() {
        if ($("#search").val().trim() !== "") {
            //console.log("getSuggestedQuestions q:" + $("#search").val().trim().toLowerCase());
            $.ajax({
                async: false,
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
                async: false,
                url: "/cgi-bin/new2/smart/getSmartAns.py",
                dataType: 'text',
                type: "GET",
                data: {
                    q: $("#search").val().trim().toLowerCase()
                },
                error: function() {
                    //console.log("error smart ans");
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

                                $.getScript("/ver1/js/modules/general.js");
                                break;
                            case "sports":
                                $.getScript("/ver1/js/modules/sports.js");
                                break;
                            case "stock":
                                $.getScript("/ver1/js/modules/stocks.js");
                                break;
                            case "train":
                                $.getScript("/ver1/js/modules/train.js");
                                break;

                            case "weather":

                              $.getScript("/ver1/js/modules/weather.js");
                                break;
                            case "movie":
                               $.getScript("/ver1/js/modules/movie.js"); 
                            break;
                            case "exam":
			       $.getScript("/ver1/js/modules/exam.js");
				 
                            break;
                           case "location":
                              $.getScript("/ver1/js/modules/locations.js");
                            break;
                           case "minerals":
                               $.getScript("/ver1/js/modules/minerals.js");
			 break;
			 case "differences":
                               $.getScript("/ver1/js/modules/differences.js");	
			break;
			case "wiki":
                               $.getScript("/ver1/js/modules/wiki.js");
			 break;
                            default:
                                $("#smart_answer").addClass("hide");
                            

                        }

                    });
                } else {
  
                    if ($("#search").val().trim().toLowerCase().indexOf('convert') > -1) {
  					$.getScript("/ver1/js/modules/convert.js");}
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
                async: false,
                url: "/cgi-bin/getClusters.py",
                dataType: 'text',
                type: "GET",
                data: {
                    q: $("#search").val().trim().toLowerCase()
                },
                error: function() {
                    //console.log("error clusters");
                    // $(".side").removeClass("show");
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
			a.attr("data-toggle","tooltip");
			a.attr("data-placement","right");
			a.attr("title",element.capitalizeMe());
                        a.attr("href", "/cgi-bin/search.py?q="+window.query+"&c="+element);
                        a.text(element.capitalizeMe());
                        li.append(a);
                        main = main.add(li);
                        navChanger(); //for nav
}

                    });
                    $(".nav-sidebar").append(main);
                } else {
                    //console.log("no clusters");
window.clusters=[];
                    $(".side").addClass("hide");
$("#centre_parent").parent().removeClass("col-lg-7 col-md-7");
$("#centre_parent").parent().addClass("col-lg-9 col-md-9");
$("#smart_col").parent().removeClass("col-lg-push-7 col-md-push-7");
$("#smart_col").parent().addClass("col-lg-push-9 col-md-push-9");
                }


            });
        }

    }

   


    //fix scroll later
    $(window).bind('scroll', bindScroll);
    getIds(false);
    getResults(window.i, window.j, false);
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
    } 

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
