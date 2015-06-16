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
    
  });
