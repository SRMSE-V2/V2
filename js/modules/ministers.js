(function(){
var MINISTERS=$("<div class=\"col-lg-12\" style=\"margin-top:20px;border:0px;text-align:center\" id=\"ministers\">   <div class=\"panel panel-primary\" style=\"margin-bottom:0px;\">       <div class=\"panel-heading\" style=\"background-color:#00B4FF;\"> <h3 class=\"panel-title minister_name\" style=\"text-align: center\"> </h3></div> <div class=\"panel-body\" style=\"color:#474747;\">  <div class=\"row\">   <div class=\"col-lg-12 col-md-12 col-sm-4 col-xs-4\"><a href=\"#\" class=\"thumbnail\">      <img class=\"minister_pic\" src=\"\" alt=\"...\">  </a></div>  <div class=\"col-lg-12 col-md-12 col-sm-8 col-xs-8\"> <table class=\"table\" style=\"text-align: center \">  <tr><td class=\"td_border minister_dept\"></td></tr> <tr><td class=\"td_border minister_term\"></td></tr>      <tr><td class=\"td_border minister_party\"> </td></tr>  </table> </div>   </div>   </div>  </div>");
if($("#ministers").length===0){
$("#smart_answer").addClass("hide");
MINISTERS.find(".minister_name").text(window.SA["name"]);
var img="";
if(window.SA["imagelink"]!=="None"){
img=window.SA["imagelink"].split("/").pop();
$.ajax({
type:"GET",
dataType:"jsonp",
url:"http://commons.wikimedia.org/w/api.php?action=query&titles="+img+"&prop=imageinfo&iiprop=url&format=json",
crossDomain:true,
success:function(data){
try{
var js=data;
var a=Object.keys(js["query"]["pages"])[0];
MINISTERS.find(".minister_img").attr("src",js["query"]["pages"][a]["imageinfo"][0]["url"]);
}
catch(err){
MINISTERS.find(".minister_img").attr("src","http://upload.wikimedia.org/wikipedia/commons/archive/5/55/20100309050907%21Emblem_of_India.svg");

}
}

});
}
else{
img=window.SA["name"].replace(/ /g,"_");

$.ajax({
type:"GET",
dataType:"jsonp",
url:"http://en.wikipedia.org/w/api.php?action=query&titles="+img+"&prop=pageimages&format=json&continue=",
crossDomain:true,
success:function(data){
try{
var js=data;
console.log(data);
var temp=Object.keys(js["query"]["pages"])[0];
var i=js["query"]["pages"][temp]["thumbnail"]["source"];
i=i.replace(/\d+px/g,"144px");
MINISTERS.find(".minister_img").attr("src",i);
}
catch(err){
MINISTERS.find(".minister_img").attr("src","http://upload.wikimedia.org/wikipedia/commons/archive/5/55/20100309050907%21Emblem_of_India.svg");

}
}

});
}

MINISTERS.find(".minister_dept").text(window.SA["ministry"]);
MINISTERS.find(".minister_party").text(window.SA["party"]);
MINISTERS.find(".minister_term").text(window.SA["term_start"]+" - "+window.SA["term_end"]);
MINISTERS.find("#smart_col").html("").append(MINISTERS);
$("#smart_col").removeClass("hide");
}
})();
