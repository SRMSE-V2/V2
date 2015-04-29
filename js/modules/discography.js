if($(".disc_back").length===0){
var discography=$("<div class=\"row disc_back\" style=\"height:180px;position:relative;top:70px;\"><div class=\"col-lg-12 full-height\"><ul id=\"image_slider\"></ul><span class=\"nvgt nvgt_hover\" id=\"prev_disc\"></span><span class=\"nvgt nvgt_hover\" id=\"next_disc\"></span></div></div>");
$(".top_slidder").prepend(discography);
var colors=["#2ecc71","#3498db","#e74c3c","#f1c40f"];
var count=9;
function renderCards(dic){
if($(".cards_disco").length>0){
$(".cards_disco").remove();
}
	$.each(dic,function(k,v){
	
	var card=$("<li class=\"cards_disco\"><img src=\"\"><span style=\"color:white;margin-left:2px;display:block;margin-top:5px;\" class=\"title\"></span><span style=\"color: #AFAFAF;margin-left:2px;font-size:10px;display:block;\" class=\"date\"></span></li>");
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
	});

}

renderCards(window.val.slice(0,count));
$("#prev_disc").on("click",function(){
if(count>9){
    renderCards(window.val.slice(count-18,count-9));
     count-=9;
}
});
$("#next_disc").on("click",function(){
if(count%27===0){
$.ajax({
                    async:true,
                    url: "/cgi-bin/new2/smart/getMoreDisco.py",
		    data:{query:$("#search").val().trim().toLowerCase(),num:count},
                    dataType: 'text',
                    type: "GET"
                   
                }).done(function(data){
                    var t=JSON.parse(data)["discography"];
                    if(t.length===0){
                    $("#next_disc").removeClass("nvgt_hover");
                    
                    }
                    else{
                    $("#next_disc").addClass("nvgt_hover");
                    window.val=window.val.concat(t);
                    renderCards(window.val.slice(count,count+9));
                    count+=9;
                    }
                    });
                }
                else{
                
                renderCards(window.val.slice(count,count+9));
                count+=9;
                
                }

});
}
