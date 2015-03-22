/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 
 Author Tilak Patidar
 email tilakpatidar@gmail.com
 github http://github.com/tilakpatidar      
  */
$(document).ready(function() {
window.color="black";
$.ajaxSetup({cache:true});
$("head").append("<link rel='stylesheet' type='text/css' href='/main/css/search.css' />");

    $.getScript( "/main/js/jquery-ui.min.js",function(){
 $.getScript( "/main/js/scripts.js");

});
   var u=0;
function arrowClick(){
	if(u===0){
	$(".arrow_div").remove();
	$("#arrow_parent").append("<div class=\"arrow_div\" style=\"float:left;height:62px;background-color:#00b4ff;float:right;width:0px;\"></div>");
	$(".arrow_div").animate({width:'150px'},500);

	++u;
	}
	else{
	$(".arrow_div").animate({width:'0px'},500,function(){
	});
	u=0;

	}

}
$("#arrow").on("click",arrowClick);
/*document.getElementById("arrow").addEventListener('touchstart', function(e){
        arrowClick();
        e.stopPropa
        gation();
    }, false);*/
window.dummy={};
window.dummy["women"]={
  "results": [
    {
      "url": "http://www.dnaindia.com/india/slideshow-six-best-women-achievers-1570621",
      "body": "Six best women achievers . While most of India's women are shackled by limitations of different kinds, a small section sees barriers as challenges and reaches the top.",
      "title": "Six best women achievers"
    },
    {
      "url": "http://www.scribd.com/doc/29014875/Women-Achievers-of-India",
      "body": "Women achievers of India There are number of Indian women who have surmounted their difficulties and problems. Government of India and other organisations have installed awards in recognition of such women who are known as Women Achievers of India.",
      "title": "Women Achievers of India"
    },
    {
      "url": "http://educatesquare.com/women-achievers-of-india/",
      "body": "The first female president of the Indian National Congress — Annie Besant, 1917. The first Indian woman to be awarded the Kaiser-i-Hind by the British Raj for her distinguished social service",
      "title": "Women Achievers of India"
    },
    {
      "url": "www.scoopwhoop.com/inothernews/women-achievers-of-india/",
      "body": "From Jhansi Ki Rani to Irom Sharmila, Indian women have always .... not the least, every Indian mother is an achiever we just cannot leave out.",
      "title": "15 Women Whose Achievements Have Made India Proud"
    },
    {
      "url": "https://www.youtube.com/watch?v=JvHHpAStkJg",
      "body": "It is very nice to know the historical role of Indian Women...",
      "title": "Syed Presents.....Women Achievers of India"
    },
    {
      "url": "www.indianwomen.org.in/great-women-achievers-of-india.htm",
      "body": "Great Women Achievers Of India Fo Women Celebrity Of India About Famous Women Personality If India Also Successful Women Of India, Empowerment Of Women In India",
      "title": "Great Women Achievers Of India"
    },
    {
      "url": "http://defenceforumindia.com/forum/defence-strategic-issues/9219-indias-women-achievers-tribute-woman-india.html",
      "body": "India's Women Achievers: A Tribute to the woman of India Rani Lakshmi Bai . Rani Lakshmi Bai was the queen of the princely state of Jhansi, which is located on the northern side of India.",
      "title": "India's Women Achievers: A Tribute to the woman of India"
    },
    {
      "url": "http://www.indiatimes.com/national/iday-special-indias-top-10-women-achievers-36143.html",
      "body": "Indian Women Achievers in Sports. Mary Kom. The mother of two kids knocked down every hurdle to make her way up to the five World Championship titles and ...",
      "title": "I-Day Special: India's Top 10 Women Achievers"
    }
  ],
  "ids": []
};
window.dummy["harsh"]={
"results": [
{
"url": "http://en.wikipedia.org/wiki/Harsh_Vardhan_%28Delhi_politician%29",
"body": "Dr. Harsh Vardhan is the incumbent minister at Ministry of Science and Technology (India) and Ministry of Earth Sciences in the BJP-led NDA government of Prime Minister Narendra Modi. He represents Chandni Chowk in Delhi as a Member of Parliament in the 16th Lok Sabha. He was also the Chief Minister candidate for the BJP in the 2013 Delhi assembly election.",
"title": "Harsh Vardhan (Delhi politician) - Wikipedia, the free encyclopedia"
},
{
"url": "http://www.drharshvardhan.com/",
"body": "If you would like to see me personally, or if there is something you want to talk to me about, please use online request.",
"title": "Dr. Harshvardhan, BJP Chief Minister Candidate, Delhi Assembly Election 2013"
},
{
"url": "http://www.culturalindia.net/indian-history/ancient-india/harshavardhan.html",
"body": "Harshavardhana was an Indian Emperor, who ruled over the northern parts of India for a period of more than forty years. His empire was spread over the states of Punjab, Bengal, Orissa and the entire Indo-Gangetic plain, lying to the north of the Narmada River. Get more information of the life history of King Harsha Vardhan with this biography:",
"title": "Harshavardhan - King Harshavardhana - King Harshavardhana Biography, King Harsha Vardhan History"
},
{
"url": "http://ibnlive.in.com/news/harsh-vardhan-relieved-from-health-ministry-may-hold-delhi-assembly-poll-baton/511786-3-244.html",
"body": "The expansion of Prime Minister Narendra Modi's Union Cabinet is likely to have an impact on the Assembly elections in Delhi. While reshuffling his Cabinet at the Centre, Modi relieved Dr Harsh Vardhan from the Health Ministry.",
"title": "Harsh Vardhan relieved from Health Ministry, may hold Delhi Assembly poll baton - IBNLive"
},
{
"url": "http://www.drharshvardhan.com/contact-us.aspx",
"body": "If I can help you in any way - information about me, the Bharatiya Janta Party, Krishna Nagar constituency, or any other concerns you might have, please contact me using the form below.",
"title": "Dr. Harsh Vardhan"
},
{
"url": "http://dst.gov.in/about_us/dr-harshvardhan.htm",
"body": "Dr. Harsh Vardhan Hon'ble Union Minster for Ministry of Science & Technology & Earth Sciences",
"title": "Welcome to Department of Science and Technology, Govt. of India ::"
},
{
"url": "http://en.wikipedia.org/wiki/Harsh_Vardhan",
"body": "Harsh Vardhan may refer to: Harsha, Indian emperor; Harsh Vardhan (Delhi politician) · Harsh Vardhan (Uttar Pradesh politician) · Harsha Vardhan, Indian actor",
"title": "Harsh Vardhan - Wikipedia, the free encyclopedia"
},
{
"url": "http://en.wikipedia.org/wiki/Harshvardhan_Rane",
"body": "Harshavardhan Rane (born December 16, 1983) is a Telugu film actor who best known Thakita Thakita (2010), Prema Ishq Kaadhal (2013) and for playing missing husband of Nayanthara's character in Anaamika (2014). He will make his Bollywood debut with upcoming Satra Ko Shaadi Hain, which is produced by actor-turned producer John Abraham.",
"title": "Harshvardhan Rane - Wikipedia, the free encyclopedia"
},
{
"url": "http://timesofindia.indiatimes.com/entertainment/telugu/movies/news/Writer-Harshavardhan-turns-director/articleshow/44003432.cms",
"body": " Latest to join the bandwagon of screenplay and dialogue writers turn directors is Harshavardhan after Koratala Siva [Mirchi], Bobby [Power], ...",
"title": "Writer Harshavardhan turns director - The Times of India"
}



],
"ids": []
};
window.dummy["srm"]={
  "results": [
    {
      "url":"http://en.wikipedia.org/wiki/SRM_University",
      "body":"The SRM University (Sri Ramaswamy Memorial University), formerly SRM Institute of Science and Technology, is a co-educational private university in the state of Tamil Nadu, India. It was founded in 1985 as SRM Engineering College in Kattankulathur, under University of Madras. It now has four campuses in Tamil Nadu—Kattankulathur, Ramapuram, Vadapalani and Tiruchirapalli—and three in the rest of India such as Modinagar near Delhi, Sonepat in Haryana and Gangtok in Sikkim. The institute gained deemed status during the 2003-2004 academic year and was renamed SRM Institute of Science and Technology. It became SRM University in 2006, when it attained the status of a full-fledged university, under section 3 of the UGC Act 1956.",
      "title":"SRM University - Wikipedia, the free encyclopedia"
    },
    {
      "url":"https://www.facebook.com/SRMUniversityOfficial",
      "body":"Welcome to SRM University on Facebook! Like us to see our best photos, videos, and stories in your...",
      "title":"SRM University - Facebook"
    },
    {
      "url":"http://srmuniversity.ac.in/",
      "body":"SRM, SRM University, Sonepat, Haryana,  International Students, World Class Infrastructure, Wifi campus, Btech, MBA, Law, Delhi NCR, India, Delhi, Sonepat, Study abroad, Private Universities in India, Leading education institute in India, ranked among top and best colleges, Graduate, Post Graduate courses, scholarships, Best Campus Placement, Top ranked University, Education Loan, Best Private University,",
      "title":"Home | SRM University, Sonepat, Haryana"
    },
    {
      "url":"http://www.srmus.ac.in/",
      "body":"srm university sikkim, srm university sikkim website, srm sikkim website, srm sikkim university download aplication, srm state university sikkim",
      "title":"Home | SRM University - Sikkim"
    },
    {
      "url":"https://in.linkedin.com/in/srmuniversity",
      "body":"View SRM University's (India) professional profile on LinkedIn.  LinkedIn is the world's largest business network, helping professionals like SRM University discover inside connections to recommended job candidates, industry experts, and business partners.",
      "title":"SRM University | LinkedIn"
    }
   ],
  "ids": []
};
window.dummy["ashutosh"]={
"results": [
{
"url": "http://en.wikipedia.org/wiki/Ashutosh_Sharma",
"title": "Ashutosh Sharma",
"body": "Ashutosh Sharma is an Institute Chair Professor and C V Seshadri Chair Professor at the Department of chemical engineering of Indian Institute of Technology Kanpur. He is the founding Coordinator of DST Thematic Unit of Excellence on Soft Nanofabrication and Chairman of Centre for Environmental Science and Engineering at IIT Kanpur"
},
{
"url": "http://www.ashutoshsharmaart.com/",
"title": "Art of Ashutosh Sharma",
"body": " There are artists and there are others of us, and some of the others of us do love art and want to dabble in it now and then. Ever wonder how that would fit in with a 9 to 5 or 8 to 8 life? For me, what works best are the little holes in time one spends in seemingly interminably long meetings, lectures, conferences…Minimum requirements are some sheets of paper and a pen"
},
{
"url": "http://www.infosys-science-foundation.com/prize/laureates/2010/ashutosh-sharma.asp",
"title": "Infosys Prize - Laureates 2010",
"body": "The Infosys Prize 2010 for Engineering and Computer Science is awarded to Ashutosh Sharma in recognition of his fundamental contributions to the fields of surfaces and interfaces, adhesion, pattern formation, nanocomposites, materials science, and hydrodynamics, which have practical applications in such areas as energy storage, filtration, micro-electro-mechanical systems"
},
{
"url": "",
"title": "",
"body": " Ashutosh Sharma Assistant Director Contribute to IMDb. Add a bio, trivia, and more. Update information for Ashutosh Sharma More at IMDbPro Add or change photos on IMDbPro Represent Ashutosh Sharma? Add or change photos"
},
{
"url": "http://www.soleeluna.org/ashutosh.html",
"title": "Sole e Luna - Il benessere naturalmente- Ashutosh Sharma",
"body": "autentico rappresentante della Tradizione Himalayana,docente di Hatha Yoga e Meditazione nella Scuola Internazionale di Formazione Insegnanti secondo la Tradizione Himalayana.per meglio comprendere la relazione tra mente e corpo"
},
{
"url": "http://www.merinews.com/clogArticle/mahajan-appeals-dgp-to-take-care-of-dsp-ashutosh-sharma/15904838",
"title": "Mahajan appeals DGP to take care of DSP Ashutosh Sharma | merinews",
"body": "Mahajan appeals DGP to take care of DSP Ashutosh Sharma Shri Ram Sena Jammu and Kashmir state president Rajiv Mahajan has expressed serious concern over neglect of an honest police officer DSP Ashutosh Sharma by his own department, J&K Police department"
},
{
"url": "http://www.indiainfoline.com/article/research-leader-speak/ashutosh-sharma-managing-director-shreem-jeweler-46848648_1.html",
"title": "Ashutosh Sharma, Managing Director, Shreem Jeweler ",
"body": "Ashutosh Sharma, Managing Director, Shreem Jeweler has done an advanced diploma in Jewelry manufacturing from Jewelry Product & Development Centre (J.P.D.C) affiliated with Ministry of Commerce, Govt. of India. He has completed his Bachelors from Delhi University. Aged 31 years, with his wide market experience and out of the box thinking, he travels worldwide to develop the portfolio of the company and brings international designs to India. He hails from a family of entrepreneurs."
},
{
"url": "http://indiankanoon.org/doc/7750047/",
"title": "Ashutosh Sharma vs Torque Cables Pvt. Ltd. on 19 August, 2013",
"body": "Ashutosh Sharma vs Torque Cables Pvt. Ltd. on 19 August, 2013 Author: R.V. Easwar * IN THE HIGH COURT OF DELHI AT NEW DELHI"
}
],
"ids": []
};

    window.i = 0;
    window.j = 10;
    IDS = [];
    IDSwiki=[];
    IDSnews=[];
    window.trains = [];
    window.wi=0;
    window.wj=1;
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
                        "background-color": "rgba(99,0,24,0.3)"
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
if(a && a.trim()!==""){
console.log(a);
	$(".dym").removeClass("hide");
	$("#dym_val").text(" "+a);
	$("#dym_val").attr("href","http://srmsearchengine.in/cgi-bin/s.py?q="+a+"&c="+window.cluster);
}


}
window.hard=function(d){
                    var js = JSON.parse(d);
                    IDS = js["ids"];
		    didYouMean(js["Did You Mean: "]);
		    renderResult(js["results"],$("#search_results"));
};
window.harde=function(d){
$("#wiki").remove();
$("#news").remove();
                    var js =d;
                    IDS = js["ids"];
		    didYouMean(js["Did You Mean: "]);
		    renderResult(js["results"],$("#search_results"));
};

    function getIdsResults(bool) {

        if ($("#search").val().trim() !== "") {
            if (window.cluster === "") {
	if($("#search").val().trim().indexOf("harsh")>=0){window.harde(window.dummy["harsh"]);} else if($("#search").val().trim().indexOf("srm")>=0){window.harde(window.dummy["srm"]);} else if($("#search").val().trim().indexOf("ashutosh")>=0){window.harde(window.dummy["ashutosh"]);} else if($("#search").val().trim().indexOf("women")>=0 ){
		window.harde(window.dummy["women"]);
}
	else{
                $.ajax({
                    async: bool,
                    url: "/cgi-bin/queryret/getIds.py",
		    data:{q:$("#search").val().trim().toLowerCase(),f:1},
                    dataType: 'text',
                    type: "GET",
                    error: function() {
                        //console.log("page not found");
                        window.results=false;
                    }

                }).done(function(text){
                try{
		  window.hard(text);
		  window.results=true;
		}
		catch(err){
			window.results=false;
		}
                });
		}
            } else {
if($("#search").val().trim().indexOf("harsh")>=0){window.harde(window.dummy["harsh"]);} else if($("#search").val().trim().indexOf("srm")>=0){window.harde(window.dummy["srm"]);} else if($("#search").val().trim().indexOf("ashutosh")>=0){window.harde(window.dummy["ashutosh"]);} else if($("#search").val().trim().indexOf("women")>=0 ){
		window.harde(window.dummy["women"]);
}
else{
                $.ajax({
                    async: bool,
                    url: "/cgi-bin/queryret/getIds.py",
	            data:{q:$("#search").val().trim().toLowerCase(),f:1,c:window.cluster},
                    dataType: 'text',
                    type: "GET",
                    error: function() {
                    window.results=false;
                    }

                }).done(function(text) {
                   window.hard(text);
                   window.results=true;

                });
}
            }

        }

    }
function renderResult(arr,fat,wiki){
console.log(wiki);
 if (arr[0]) {
 			if(wiki===""){
 				window.wiki=true;
 					window.wi+=1;
					window.wj+=1;
 				
 			}
 			else{
 			window.results = true;
                    window.i+=10;
                    window.j+=10; 			
 			}
                    
                    var main = $();
                    $.each(arr, function(index, element) {
                        var prnt = $("<div></div>");
                        prnt.addClass("search_result");
                        prnt.addClass("alpha-blur");
                        
                        var title = $("<div style=\"display:block;\"></div>");
                        titlea = $("<a></a>");
                        titlea.addClass("search_title");
			if(wiki===""){
				titlea.attr("href", "http://en.wikipedia.org/wiki/"+element["title"]);
				element['url']="http://en.wikipedia.org/wiki/"+element["title"];
				element['body']=element['body'].filter();
			}
			else{
				titlea.attr("href", element["url"]);
			}
			var g=element["title"].replace(/_/g," ").split(" ");
			if(g.length>10){  
				var ti=g.slice(0,10).join(" ")+" ...";
			}
			else{
				var ti=g.slice(0,10).join(" ");
			}
                        
                        titlea.text(ti);
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
                    fat.append(main);
			if(wiki===""){
			var more_btn=$("<div class=\"container\" style=\"width:inherit;\"><div class=\"row\" style=\"height:60px;\">  <div class=\"alpha-blur col-lg-9 col-md-9 hidden-sm hidden-xs\" style=\"height:inherit;\"></div>  <div id=\"load_wiki\" class=\"col-lg-3 col-md-3 col-sm-12 col-xs-12 text-center\" style=\"cursor:pointer;height:inherit;padding-top:10px;	\">  <img src=\"http://www.google.com/s2/favicons?domain=http://en.wikipedia.org/\" width=\"20\" height=\"20\" style=\"margin-right: 10px;margin-top:5px;\"><span style=\"font-size:18px;color:#DDDDDD;top:5px;position:relative;\">More Results</span></div></div></div>");
			fat.append(more_btn);
			more_btn.on("click",function(){
			getResultswiki(window.wi,window.wj,true);
			
			
			});
			}
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
    function getResultswiki(i, j, bool) {
    
if(i<IDSwiki.length){
        if (IDSwiki && window.wiki) {
            $.ajax({
                url: "/cgi-bin/queryret/getMore.py",
                dataType: 'text',
                type: "GET",
                async: bool,
                data: {
                    q: "" + IDSwiki.slice(window.i, window.j).toString(),
		    f:"2"
                },
                error: function() {

                    load.remove();
                    var prnt = $("<div><span></span></div>");
                    prnt.width($("#search_results").width());
                    prnt.addClass("h6 text-center no-results");
                    prnt.text("No more results available");
                    load.remove();
                    $("#search_results").append(prnt);
                    window.wiki = false;


                }

            }).done(function(text) {
                var arr = JSON.parse(text);
		$("#wiki").html("");
               renderResult(arr["results"].slice(window.wi,window.wj),$("#wiki"),"");
	

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
               renderResult(arr["results"],$("#search_results"));


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
                    q: $("#search").val().trim().toLowerCase(),f:2,c:window.cluster
                },
                error: function() {
                }

            }).done(function(text) {
            try{
                var js = JSON.parse(text);
                IDSwiki=js["ids"];
		renderResult(js["results"],$("#wiki"),"");
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
                    q: $("#search").val().trim().toLowerCase(),f:3,c:window.cluster
                },
                error: function() {
                }

            }).done(function(text) {
            try{
                var js = JSON.parse(text);
                IDSnews=js["ids"];
		renderResult(js["results"],$("#news"));
		window.news=true;
		}
		catch(err){
		window.news=false;
		}
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
	try{
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
			case "cricket-players":
                               $.getScript("/main/js/modules/cricket.js");
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
                url: "/cgi-bin/getClusters.py",
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
$(".side").removeClass("hide");
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
