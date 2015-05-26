
if($(".disc_back").length===0){
var discography=$("<div class=\"row disc_back\"><div class=\"col-lg-12 full-height\"><ul id=\"image_slider\"></ul><span class=\"nvgt nvgt_hover\" id=\"prev_disc\"></span><span class=\"nvgt nvgt_hover\" id=\"next_disc\"></span></div></div>");
$("body").append(discography);

var colors=["#2ecc71","#3498db","#e74c3c","#f1c40f"];
var ulimit=parseInt(($("body").width()-($("body").width()*14/100))/120);//115+5(margin)
console.log(ulimit);
var count=ulimit;
function renderCards(dic,dir){
if($(".cards_disco").length>0){
$(".cards_disco").remove();
}

	$.each(dic,function(k,v){
	
	var st="";
	if(dir==="next"){
	
	st="left:+"+$("body").width()+"px";
	}
	var card=$("<li class=\"cards_disco hide\" style=\"position:relative;"+st+"\"><img src=\"\"><span style=\"color:white;margin-left:2px;display:block;margin-top:5px;\" class=\"title\"></span><span style=\"color: #AFAFAF;margin-left:2px;font-size:10px;display:block;\" class=\"date\"></span></li>");
	card.find("img").attr("src",v["image_link"]);
	if(v["album_name"].length>26){
	card.attr("data-toggle","tooltip");
	card.attr("title",v["album_name"]);
	card.find(".title").text(v["album_name"].substr(0,23)+"...");
	}
	else{
	card.attr("data-toggle","tooltip");
	card.attr("title",v["album_name"]);
	card.find(".title").text(v["album_name"]);
	}
	card.find(".date").text(v["release_date"]);
	if(v["image_link"]!=="None"){
	var path=v["image_link"].replace("File:","").replace(/ /g,"_").split("/");
	card.find("img").attr("src","http://en.wikipedia.org/wiki/en:Special:Filepath/"+path[path.length-1]+"?width=140");
	card.find("img").on("error",function(){
	card.find("img").attr("src","http://en.wikipedia.org/wiki/en:Special:Filepath/Wikipedia_wordmark.svg?width=140");
	card.find("img").off("error");

	});
	}
	else{
	card.find("img").remove();
	card.prepend("<div class=\"no_image\"><span>"+v["album_name"][0]+"</span></div>");
	var col=parseInt(Math.random()*3);

	card.find(".no_image").append();
	card.find(".no_image").css({"width":"115px","height":"115px","background-color":colors[col]});
	}
	card.on("click",function(){

	window.location=v["album_link"];

	});
	$("#image_slider").append(card);
	
	$(".cards_disco").removeClass("hide");
	if(dir==="next"){
	  var l=$(".cards_disco").length;
                var counter=0;
	$(".cards_disco").animate({left:"0px",queue:false},1000,function(){
	
	});
	}
	
	
	});

}


$("#prev_disc").on("click",function(){

  $("#next_disc").css("pointer","pointer");
  $("#next_disc").on("click",nextEvent);
  $("#next_disc").removeClass("nvgt_hover");

if(count!==ulimit){
$(".cards_disco").animate({left:"+"+$("body").width()+'px',position:"absolute",queue:false},1000,function(){
if(count>ulimit){
    renderCards(window.val.slice(count-(ulimit*2),count-ulimit),"prev");
     count-=9;
}});
}


});
function nextEvent(){


if(count%27===0){
$.ajax({
                    async:true,
                    url: window.domain+"/cgi-bin/new2/smart/getMoreDisco.py",
		    data:{query:$("#search").val().trim().toLowerCase(),num:count},
                    dataType: 'text',
                    type: "GET"
                   
                }).done(function(data){
                    var t=JSON.parse(data)["discography"];
                    if(t.length===0){
                    $("#next_disc").css("pointer","arrow");
                    $("#next_disc").off("click");
                    $("#next_disc").removeClass("nvgt_hover");
                    
                    }
                    else{
                    $("#next_disc").addClass("nvgt_hover");
                    window.val=window.val.concat(t);
                    renderCards(window.val.slice(count,count+ulimit),"next");
                    count+=9;
                    }
                    });
                }
                else{
                var l=$(".cards_disco").length;
                var counter=0;
                
                
                
                $(".cards_disco").animate({left:"-"+$("body").width()+'px',position:"absolute",queue:false},1000,function(){
        ++counter;
        if(counter===l){
$(".cards_disco").remove();
                renderCards(window.val.slice(count,count+ulimit),"next");
                count+=9;
                }
                });
                }
                






}
$("#next_disc").on("click",nextEvent);
var wait=true;
function reduce(){
//14 bec 7 7 padding
if($(".disc_back").width()<(115*ulimit+((14*($("body").width()))/100)+(5*ulimit)+30)){
ulimit-=1;
if($(".disc_back").width()<(115*ulimit+((14*($("body").width()))/100)+(5*ulimit)+30)){
	return reduce();

}
else{
	return true;
}


}
else{return false;}
}
function grow(){
if($(".disc_back").width()+230>(115*ulimit+((14*($("body").width()))/100)+(5*ulimit)+30)){
ulimit+=1;
if($(".disc_back").width()+230>(115*ulimit+((14*($("body").width()))/100)+(5*ulimit)+30)){
	return reduce();

}
else{
	return true;
}


}
else{return false;}
}
function onResize(){
if($(".disc_back").length===1){
$("#centre_parent").css("margin-top","82px");
}
else{
$("#centre_parent").css("margin-top","150px");
}
 if ($(window).width() < 1000) {
        $(".disc_back").css("top","180px");
        $(".padded_body").css("margin-top","100px");
        
        }
        else{
        $(".disc_back").css("top","90px");
        $(".padded_body").css("margin-top","200px");
         $(".side").css("margin-top","200px");
        }
if(reduce()){
renderCards(window.val.slice(count,count+ulimit));
}

else if(grow()){
renderCards(window.val.slice(count,count+ulimit));

}
else{
renderCards(window.val.slice(0,count+ulimit));
}


}
onResize();
$(window).resize(onResize);
}
