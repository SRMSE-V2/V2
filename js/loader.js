$(document).ready(function(){
if(window.color==="light"){$("head").append("<link id=\"light_theme\" href=\"css/light/styles.css\" rel=\"stylesheet\"> ");}else{$("head").append("<link id=\"dark_theme\" href=\"css/dark/styles.css\" rel=\"stylesheet\"> ");}
if(window.color==="light"){
var l=$("<div id=\"prog\" class=\"progress\" style=\"margin-bottom:0;\"><div class=\"progress-bar progress-bar-danger progress-bar-striped active\" style=\"width: 100%\"></div></div>");
$("#load").append(l);
}
else{
var l=$("<div id=\"prog\" class=\"progress\" style=\"margin-bottom:0;\"><div class=\"progress-bar progress-bar-striped active\" style=\"width: 100%\"></div></div>");
$("#load").append(l);
}
$.getScript( "js/jquery-ui.min.js",function(){
    $.getScript( "js/scripts.js",function(){

 $("#prog").remove();
});
});
});
