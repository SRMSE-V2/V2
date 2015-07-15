(function(){
$("head").append("<link rel=\"stylesheet\" href=\"/js/slider/jquery.bxslider.css\">");
$.getScript("/js/slider/jquery.bxslider.min.js",function(){
var colors=["#2ecc71","#3498db","#e74c3c","#f1c40f"];
var DISC=$("<ul class=\"bxslider\"></ul>");
if($(".disc_back").length===0){
for(var kk=0;kk<window.SA.length;++kk){
var el=window.SA[kk];
	if(el["image_link"]==="None"){
	var temp=$("<li><div><span class=\"no_cover\">"+el["album_name"][0]+"</span></div></li>");
	var col=parseInt(Math.random()*3);
	temp.find("div").css({"width":"115px","height":"115px","background-color":colors[col]});
	}
	else{
	var k=el["image_link"].split("/");
	var img="http://en.wikipedia.org/wiki/en:Special:Filepath/"+k[k.length-1].replace("File:","")+"?width=140";
	
	if(el["release_date"]==="None"){
	var date="";
	}
	else{
	var date=el["release_date"];
	}
	var temp=$("<li><a style=\"text-decoration:none;\" href="+el["album_link"]+" target=\"_blank\"><img class=\"album_cover\" src="+img+" /><div class=\"album_info\"><div>"+el["album_name"]+"</div><div>"+date+"</div></div></a></li>");
	
	
	}
	DISC.append(temp);
}
$(".nav_changer").prepend(DISC);
var slides=$(document).width()/140;
$('.bxslider').bxSlider({
  minSlides: 3,
  maxSlides: slides,
  slideWidth: 115,
  slideHeight:155,
  slideMargin: 10
});
$(".bx-wrapper").css("top","90px");
$(".bx-loading").remove();
}


});
})();
