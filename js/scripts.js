$(document).ready(function(){
$.ajaxSetup({cache:true});
window.leftauto=-1;
window.firstresize=true;
window.strlen=0;
//shadowing parthere
$("#search").css("z-index","10");
$(".backinput").remove();
var inp=$("#search").clone();
inp.removeClass("fostyle");
inp.removeAttr("id");
inp.removeAttr("placeholder");
inp.removeAttr("name");
inp.removeClass("ui-autocomplete-input");
inp.removeClass("btn2");
inp.addClass("btn1");
inp.addClass("backinput");
inp.css("z-index","0");
inp.attr("disabled","");
inp.css("position","absolute");
inp.css("left","0px");

$(".input-group").append(inp);
    $("#search").autocomplete({
                  
            source: "/cgi-bin/getWords.py",
            minLength: 1,
            autoFocus: false,
            appendTo:".search_div",
            html:true,
            open: function(event, ui) {
                $(".ui-helper-hidden-accessible").remove();
                    $(this).autocomplete("widget").css({
                "width": ($("#search").parent().width() + "px")
            });
if(window.leftauto!==-1){
            $(".ui-autocomplete").css("postion","relative").css("left",window.leftauto+"px");
$(".ui-autocomplete").css("width","");
$(".ui-autocomplete >li").css("width","100%");
$(".ui-autocomplete >li>a").css("white-space","nowrap");//,($("#search").width()-window.strlen)+"px");
}
            event.preventDefault();
        },
            focus: function (event, ui) {
              
               inp.val("");
              
if(window.originalquery){
              if(window.originalquery!=""){
event.preventDefault();
var arr=window.originalquery.split(" ");
		var temp=arr.slice(0,arr.length-1).join(" ");
              $("#search").val(temp+" "+ui["item"]["value"]);
              
              }
             }





        },
response:function(event,ui){
inp.val(ui.content[0]["value"]);
console.log(ui);
if(ui.content[0]["resize"]==="true"){
window.originalquery=$("#search").val().trim();
	if(window.firstresize){
window.space=false;
		window.defaultleft=parseInt($("#search").offset().left);
		window.firstresize=false;
		var pos=$("#search").val().length*parseInt($("#search").css("font-size").replace("px",""));
window.strlen=parseInt(pos)*0.7;
		window.leftauto=(window.defaultleft+parseInt(pos))*0.7;
	}
	else{
if(window.space){
		var pos=$("#search").val().length*parseInt($("#search").css("font-size").replace("px",""));
window.strlen=parseInt(pos)*0.7;
		window.leftauto=(window.defaultleft+parseInt(pos))*0.7;
window.space=false;
}	
}


}
else{
window.originalquery="";
window.leftauto=-1;
}
},
            select:function (e, ui) {
            
               e.preventDefault();
               if(e.keyCode===13){
                    var query=$("#search").val().trim();
                    console.log("Query submitted");
                    console.log(query);
                    window.location="/cgi-bin/search.py?q="+query;
               }
               
               else{
                  var query=ui.item.value;
                    console.log("Query submitted");
                    console.log(ui.item.value);
                    window.location="/cgi-bin/search.py?q="+ui.item.value;
               }
                    
               
              
        }
        ,delay:300
        
                               
                               

    });
    $("#search").on("keypress",function(event){


if($("#search").val().trim()===""){
inp.val("");
}
    console.log($("#search").val());
    if((event.keyCode===13) && ($("#search").val()!=="")){
            var query=$("#search").val().trim();
            console.log("Query submitted");
            console.log(query);
            window.location="/cgi-bin/search.py?q="+query;
    
    }
    
    });

$("#search").on("keydown",function(event){
if(event.keyCode===39){
if(document.getElementById('search').selectionStart===$("#search").val().length){
$("#search").val($(".backinput").val());
}

}

if($("#search").val().trim()===""){
inp.val("");
}
});
    $("#search_btn").on("click",function(){
        if($("#search").val().trim()!==""){
            var query=$("#search").val().trim();
            console.log("Query submitted");
            console.log(query);
            window.location="/cgi-bin/search.py?q="+query;
        }
    });
    
    
    $(window).on("resize",function(){
    
    //hides autocomplete dropdown on screen resize
    $(".ui-autocomplete").hide();
    window.leftauto=-1;
window.firstresize=true;
window.strlen=0;
    
    });
window.connect=function(data_pass){
            var data = data_pass;
            $.ajax({
                type: 'get',
                url:'/cgi-bin/locentric.py',
                data: data,
                success : function(response){
                    window.locentric = response;
                    console.log(response);
                }
            });
        };
window.loadLocation=function(){
if(document.cookie.indexOf("latitude")>=0){
var obj={};
var arr=document.cookie.split(";");
$.each(arr,function(index,element){
var t=element.split("=");
obj[t[0].trim()]=t[1].trim();
});
window.connect({"lat":obj["latitude"], "long":obj["longitude"]});

}
else{
$.getScript("/ver1/js/location_centric.js");
}

};
   window.loadLocation();
 $("#search").on("keyup",function(event){


if($("#search").val().trim()===""){
inp.val("");
}
if(event.keyCode===32)

{window.space=true;}
else if(event.keyCode===8){
var a=$("#search").val();
if(a.slice(a.length-1,a.length)===" "){
if(a.slice(a.length-2,a.length)==="  "){window.space=false;}
else{
window.space=true;
}

}
}
});   
var img1=$("#nixi-logo");
img1.attr("src","/ver1/images/nixi.png");
img1.attr("alt","Nixi");
img1.attr("width","60");
img1.attr("height","30");
var img=$("#srm-logo");
img.attr("src","/ver1/images/srm-logo.png");
img.attr("alt","SRM University");
img.attr("width","30");
img.attr("height","30");
});
