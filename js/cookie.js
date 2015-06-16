$(document).ready(function(){
var cook=document.cookie.split(";");
var co={};
if(cook.toString().indexOf("color")>-1){
$.each(cook,function(index,element){
co[element.split("=")[0].trim()]=element.split("=")[1].trim();

});
window.color=co["color"];//default theme
$.ajaxSetup({ cache: true });
}
else{
window.color=undefined;
}
if(!window.color){

if(Math.random()*10>5){
	window.color="dark";
	document.cookie="color=dark;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/";
}else{
	window.color="light";
	document.cookie="color=light;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/";
	
}
}
if(window.color==="light"){$("head").append("<link id=\"light_theme\" href=\"css/light/styles.css\" rel=\"stylesheet\"> ");}else{$("head").append("<link id=\"dark_theme\" href=\"css/dark/styles.css\" rel=\"stylesheet\"> ");}
if(window.color==="light"){
var l=$("<div id=\"prog\" class=\"progress\" style=\"margin-bottom:0;\"><div class=\"progress-bar progress-bar-danger progress-bar-striped active\" style=\"width: 100%\"></div></div>");
$("#load").append(l);
}
else{
var l=$("<div id=\"prog\" class=\"progress\" style=\"margin-bottom:0;\"><div class=\"progress-bar progress-bar-striped active\" style=\"width: 100%\"></div></div>");
$("#load").append(l);
}
    
  });
