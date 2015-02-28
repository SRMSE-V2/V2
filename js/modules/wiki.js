var stocks=$("	<div class=\"wiki\"><div class=\"panel panel-primary\"><div class=\"panel-heading\">	<h3 class=\"panel-title\"></h3></div><div class=\"panel-body\"><div class=\"row\"><div class=\"col-xs-12 col-md-12 col-lg-3\" style=\"text-align: center;\"><a href=\"#\" class=\"thumbnail\"><img src=\"\"><button type=\"button\" class=\"btn btn-default\" style=\" margin-top: 5px;\"><span class=\"glyphicon glyphicon-chevron-left\" aria-hidden=\"true\"></span></button><button type=\"button\" class=\"btn btn-default\" style=\" margin-top: 5px;\"><span class=\"glyphicon glyphicon-chevron-right\" aria-hidden=\"true\"></span></button></a></div><div class=\"col-xs-6 col-md-9 col-lg-9\"><table class=\"table\"></table></div></div><div id=\"desciption\"></div></div></div></div>\");

$("#smart_col").html("").append(wiki);
$("#smart_answer").addClass("hide");

console.log(window.val);
$("#panel panel-primary").setTextValue(window.val["panel_heading"]);
$("img").attr("src",value);
$("table").attr("src",value);
$("#description").setTextValue(window.val["description"]);

$("#smart_col").removeClass("hide");
