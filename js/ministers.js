if($("#ministers").length===0){
var ministers=$("<div class=\"col-lg-12 well alpha-blur alpha-shadow\" style=\"margin-top:20px;border:0px;text-align:center\" id=\"ministers\">   <div class=\"panel panel-primary\" style=\"margin-bottom:0px;\">       <div class=\"panel-heading\" style=\"background-color:#00B4FF;\"> <h3 class=\"panel-title\" id=\"name\" style=\"text-align: center\"> </h3></div> <div class=\"panel-body\" style=\"color:#474747;\">  <div class=\"row\">   <div class=\"col-lg-12 col-md-12 col-sm-4 col-xs-4\"><a href=\"#\" class=\"thumbnail\">      <img id=\"min_pic\" src=\"\" alt=\"...\">  </a></div>  <div class=\"col-lg-12 col-md-12 col-sm-8 col-xs-8\"> <table class=\"table\" style=\"text-align: center \">  <tr><td class=\"td_border\" id=\"department\"></td></tr> <tr><td class=\"td_border\" id=\"term\">10 November 2014 - Present</td></tr>      <tr><td class=\"td_border\" id=\"party\"> </td></tr>  </table> </div>   </div>   </div>  </div>");
console.log(ministers);
$("#smart_col").html("").append(ministers);
$("#smart_answer").addClass("hide");
$("#name").text(window.val["name"]);
$.ajax({
type:"GET",
dataType:"jsonp",
url:"http://commons.wikimedia.org/w/api.php?action=query&titles="+window.val["imagelink"].split("/").pop()+"&prop=imageinfo&iiprop=url&format=json",
crossDomain:true,
success:function(data){
try{
var js=data;
var a=Object.keys(js["query"]["pages"])[0];
$("#min_pic").attr("src",js["query"]["pages"][a]["imageinfo"][0]["url"]);
}
catch(err){
$("#min_pic").attr("src","http://upload.wikimedia.org/wikipedia/commons/archive/5/55/20100309050907%21Emblem_of_India.svg");

}
}

});
$("#department").text(window.val["ministry"]);
$("#party").text(window.val["party"]);
$("#term").text(window.val["term_start"]+" - "+window.val["term_end"]);
$("#smart_col").removeClass("hide");
}
