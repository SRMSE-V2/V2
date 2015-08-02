(function(){
window.ls=function(filename, filetype,id){
    if (filetype=="js"){ //if filename is a external JavaScript file
        var fileref=document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src", filename);
       
    }
    else if (filetype=="css"){ //if filename is an external CSS file
        var fileref=document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
        fileref.setAttribute("id", id);
    }
    if (typeof fileref!="undefined"){
        document.getElementsByTagName("head")[0].appendChild(fileref);}
         return fileref;
}
var cook=document.cookie.split(";");
var co={};
if(cook.toString().indexOf("color")>-1){
for(var i=0;i<cook.length;i++){
co[cook[i].split("=")[0].trim()]=cook[i].split("=")[1].trim();

}
window.color=co["color"];//default theme
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
    

if(window.color==="light"){ls("css/light/styles.min.css","css","light_theme");}else{ls("css/dark/styles.min.css","css","dark_theme");}
var jquery=ls("https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js","js","");
jquery.onload=function(){
  ls("/bootstrap.fp/js/bootstrap.min.js","js");
   ls("/js/min/scripts.min.js","js");



};
 

})();
