(function(){
var HC=$("<div class=\"col-lg-12 module\" style=\"margin-top:20px;border:0px;text-align:center\" id=\"high_court\">   <div class=\"panel panel-primary\" style=\"margin-bottom:0px;\">       <div class=\"panel-heading\"> <h3 class=\"panel-title highcourt_name\"  style=\"text-align: center\"> </h3></div> <div class=\"panel-body\" style=\"color:#474747;\">  <div class=\"row\">   <div class=\"col-lg-12 col-md-12 col-sm-4 col-xs-4\"><a href=\"#\" class=\"thumbnail\">      <img class=\"highcourt_img\" src=\"\" alt=\"...\">  </a></div>  <div class=\"col-lg-12 col-md-12 col-sm-8 col-xs-8\"> <table class=\"highcourt_table\"></table> </div>   </div>   </div>  </div>");
if($("#high_court").length===0){
$("#smart_answer").addClass("hide");
var dic=window.SA["main-ans"];
HC.find(".highcourt_name").text(dic["name"].capitalizeMe());
HC.find(".highcourt_img").attr("src",dic["image"]);
$.each(dic,function(k,v){
 if(k.indexOf("image")<0 && k!=="name"){

 if(window.SA["required"][0]===k){ HC.find(".highcourt_table").append("<tr style=\"padding-top:15px;\"> <td><b>"+k.replace(/_/g,' ').capitalizeMe()+"</b>: <u><b>"+v+"</b></b></br> </td> </tr> ");}else{
		HC.find(".highcourt_table").append("<tr style=\"padding-top:15px;\"> <td><b>"+k.replace(/_/g,' ').capitalizeMe()+"</b>: "+v+"</br> </td> </tr> ");
		}
}
	
});
$("#smart_col").html("").append(HC);
$("#smart_col").removeClass("hide");
}
})();
