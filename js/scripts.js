$("#prog").remove();
$(document).ready(function(){
$.ajaxSetup({cache:true,dataType:"jsonp",crossDomain:true});

window.leftauto=-1;
window.firstresize=true;
window.strlen=0;
function searchQuery(q){
 window.location="/cgi-bin/s.py?q="+encodeURIComponent(q);
}
//setting up backinput for shadow suggestion
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
inp.attr("disabled","");




if(window.location.toString().indexOf("s.py")>0){
//code for search page
inp.css("margin-top","8px");
inp.css("width","80%");
inp.attr("id","input_back");
}
$("#div_for_back").append(inp);
window.switchImg=function(){
//To switch images path when switching themes shared by both the pages
var imgs=$(".switch");
$.each(imgs,function(i){
	if(window.color==="dark")
	{
		$(this).attr("src",$(this).attr("src").replace("/light/","/dark/"));
	}
	if(window.color==="light")
	{
		$(this).attr("src",$(this).attr("src").replace("/dark/","/light/"));
	}
	
});

}
function checkback(){

//Fixes the issue of backinput on small devices as size is small on typing input scrolls right but backinput remains there only

	if($(window).width()<=600){
		inp.val("");
		enable_backinput=false;
	}
	else{
		enable_backinput=true;
	}
	if(($("#search").val().length*12.5)>=$("#search").width()){
		inp.val("");
		enable_backinput=false;

	}
}


$(window).on("resize",checkback);//check backinput on resize


checkback();//init checkback

$("#search").on("keypress",checkback); //checks backinput when text size exceeds the input


$("#srmse-logo").on("click",function(){
	window.location="http://srmsearchengine.in";
});


//setting up autocomplete

//the html autocomplete tweak
(function($){var proto = $.ui.autocomplete.prototype,	initSource = proto._initSource;function filter( array, term ) {	var matcher = new RegExp( $.ui.autocomplete.escapeRegex(term), "i" );	return $.grep( array, function(value) {		return matcher.test( $( "<div>" ).html( value.label || value.value || value ).text() );	});}$.extend( proto, {	_initSource: function() {		if ( this.options.html && $.isArray(this.options.source) ) {			this.source = function( request, response ) {				response( filter( this.options.source, request.term ) );			};		} else {			initSource.call( this );		}	},	_renderItem: function( ul, item) {		return $( "<li></li>" )			.data( "item.autocomplete", item )			.append( $( "<a></a>" )[ this.options.html ? "html" : "text" ]( item.label ) )			.appendTo( ul );	}});})( jQuery );
    
    $("#search").autocomplete({
            source: "/cgi-bin/getWords.py",
            minLength: 1,
            autoFocus: false,
            appendTo:".search_div",//setting up the container for the rendered list from autocomplete
            html:true,//tweak done to highlight the searched text
            open: function(event, ui) {
            $('ul.ui-autocomplete').addClass('opened');
            $(".ui-helper-hidden-accessible").remove();
            $(this).autocomplete("widget").css({
                "width": ($("#search").parent().width() + "px")
            });//setting up the width of the list to input field useful for responsiveness
		if(leftauto!==-1){
		$(".ui-autocomplete").css("postion","relative").css("left",leftauto+"px");
		$(".ui-autocomplete").css("width","");
		$(".ui-autocomplete >li").css("width","100%");
		$(".ui-autocomplete >li>a").css("white-space","nowrap");
		}
            event.preventDefault();
        },close: function () {
        //clearing up the autocomplete after close 
    $('ul.ui-autocomplete')
      .removeClass('opened')
      .css('display','block'); 
  },
            focus: function (event, ui) {
              //#DEBUGconsole.log(ui);
              if($("#search").val().trim()!==""){
              //checking for resize key in focus 
		      if(ui["item"]["resize"]){
		      //word suggestion
			      var d=$("#search").val().split(" ");
			      if(enable_backinput){inp.val((d.slice(0,d.length-1)+" "+ui["item"]["value"]).replace($("#search").val().toLowerCase(),$("#search").val()));}
		      }else{
		      
		      if(ui["item"]["resize"]){
		     //sentence suggestion
			if(enable_backinput){inp.val(ui["item"]["value"].replace($("#search").val().toLowerCase(),$("#search").val()));}
	}
	else{
	$("#search").val(ui["item"]["value"]);
	if(enable_backinput){inp.val(ui["item"]["value"]);}

	}
	}
}
               
              
if(window.originalquery){
              if(window.originalquery!==""){
event.preventDefault();
var arr=window.originalquery.split(" ");
		var temp=arr.slice(0,arr.length-1).join(" ");
              $("#search").val(temp+" "+ui["item"]["value"]);
              
              }
             }




        },
response:function(event,ui){

          if($("#search").val().trim()!==""){
		if(ui.content[0]["resize"]==="true"){
		//#DEBUGconsole.log("here");
		var arrr=$("#search").val().trim().split(" ");
				if(enable_backinput){inp.val(arrr.slice(0,arrr.length-1).join(" ")+" "+ui.content[0]["value"]);}
		}
		else{
			if(enable_backinput){inp.val(ui.content[0]["value"].replace($("#search").val().toLowerCase(),$("#search").val()));}
		}
}
                 

//#DEBUGconsole.log(ui);
if(ui.content[0]["resize"]==="true"){
//#DEBUGconsole.log("here1");
window.originalquery=$("#search").val().trim();
	if(firstresize){
		window.space=false;//disable multiple space hits to remove of drag effect
		window.defaultleft=parseInt($("#search").offset().left);
		firstresize=false;
		var pos=$("#search").val().length*parseInt($("#search").css("font-size").replace("px",""));
strlen=parseInt(pos)*0.7;
		leftauto=(window.defaultleft+parseInt(pos))*0.7;//setting up new left auto position
	}
	else{
		if(window.space){
				var pos=$("#search").val().length*parseInt($("#search").css("font-size").replace("px",""));
		strlen=parseInt(pos)*0.7;
				leftauto=(window.defaultleft+parseInt(pos))*0.7;
		window.space=false;
		}	
}


}
else{
window.originalquery="";
leftauto=-1;
}
},
            select:function (e, ui) {
            
               e.preventDefault();
              
                    var query=$("#search").val().trim();
                   searchQuery(query);
                   
                
        }
        ,delay:300
        
    });
    
function commonTest(event){
	if($("#search").val().indexOf(" ")===0){
	$("#search").val($("#search").val().replace(/\s+/g," ").trim());//blocking multiple spaces in the beginning
	}
	if($("#search").val().trim()===""){
	if(enable_backinput){inp.val("");}
	}
	if(event.keyCode!==39){if(enable_backinput){inp.val("");}}
}
function submit(event){
    if((event.keyCode===13) && ($("#search").val()!=="")){
            var query=$("#search").val().trim();
             searchQuery(query);
    
    }

}
$("#search").on("keypress",function(event){
commonTest(event);
	submit(event);
    
});
$("#search").on("keyup",function(event){
commonTest(event);
	submit(event);
});
$("#search").on("keydown",function(event){
	commonTest(event);
	submit(event);
	
	if(event.keyCode===39){
	if((document.getElementById('search').selectionStart===$("#search").val().length)&&$("#search").val().length<$(".backinput").val().length){
	$("#search").val($(".backinput").val());
	}

	}
	else{
	$(".backinput").val("");
	}

});

    $("#search_btn").on("click",function(){
        if($("#search").val().trim()!==""){
            var query=$("#search").val().trim();
             searchQuery(query);
        }
    });
    
    
    $(window).on("resize",function(){
    
    //hides autocomplete dropdown on screen resize
    $(".ui-autocomplete").hide();
    leftauto=-1;
firstresize=true;
strlen=0;
    
    });
function loadLocation(){
if(document.cookie.indexOf("latitude")<0){
//location not in the cookie
$.getScript("/js/location_centric.js");
}

};
loadLocation();//init location
 $("#search").on("keyup",function(event){
commonTest();
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
if(window.location.toString().indexOf("s.py")<0){
//feedback form
function validateEmail(sEmail) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(sEmail)) {
       
        return true;
    }
    else {
         
        return false;
    }
}

$("#email").on("focusout",function(){

if(!validateEmail($(this).val())){
alertBox("#fcf8e3","<strong>Warning !</strong> Better check yourself, you're email address not looking too good.  !!!");
$(this).val("");
}

});
function alertBox(color,text){
var alert=$("<div class=\"alert\" style=\"border-radius:4px;background-color:"+color+";opacity:0;position:absolute;padding-top:15px;z-index:1100;height:50px;text-align:center;width:40%;left:30%;top:70%;\">"+text+"</div>");
                  	
                  	$("body").append(alert);
                  	$(".alert").animate({opacity:1.0},2000,function(){
                  	
                  	setTimeout(function(){
                  	$(".alert").animate({opacity:0},1000,function(){
                  	$(".alert").remove();
                  	});
                  	
                  	},2000);
                  	
                  	
                  	});


}
$("#save_btn").on("click",function(){
var fk={};
var queries=[];
var i=0;
$.each($(".query"),function(){
	i+=1;
	var temp={};
	temp["query"]=$(this).val();
	temp["status"]=$("input[name=optionsRadios"+i+"]:checked").val();
	queries.push(temp);

});
fk["email"]=$("#email").val();
fk["name"]=$("#name").val();
fk["queries"]=queries;
fk["feedback"]=$("#feedback_comments").val();
console.log(fk);


                $.ajax({
                    async: true,
                    url: "/cgi-bin/feedback.py",
	            data:{feedback:JSON.stringify(fk)},
                    dataType: 'text',
                    type: "GET",
                    error: function() {
                    //some error
                    }

                }).done(function(text) {
                text=text.trim();
                  if(text==="SUCCESS"){
                  alertBox("#dff0d8","<strong>Thank You !</strong> Your response has been saved !!!");
                  	
                  }
                  
                  else if(text==="DUPLICATE"){
                  alertBox("#f1dddd","<strong>Duplicate!</strong> email address  !!!");
                  }
                  else if(text==="WRONG"){
                  alertBox("#f1dddd","<strong>Oops</strong> Something Went Wrong !!!");}
                  

                });
});
$("#more_btn").on("click",function(){
var num=parseInt($(".y_n").attr("name").replace("optionsRadios","").trim())+1;
$(".y_n").removeClass("y_n");
var new_row=$("<tr> <td style=\"padding-top:8px;width:70%;\"> <input type=\"text\" class=\"form-control query\" placeholder=\"Query\"> </td> <td style=\"padding:8px 0px 0px 10px;width:30%;\"> <div class=\"form-inline\"> <div class=\"radio\"> <label><input class=\"y_n\" type=\"radio\" name=\"optionsRadios"+num+"\" id=\"Yes\" value=\"Yes\" >Yes &nbsp &nbsp </label> </div> <div class=\"radio\"> <label><input class=\"y_n\" type=\"radio\" name=\"optionsRadios"+num+"\" id=\"No\" value=\"No\">No</label> </div> </div> </td> </tr>");
$(".td_row").last().after(new_row);

})
$("input").removeClass("hide");
$(".input-group").removeClass("hide");
var img2=$("#srmse-logo");
img2.addClass("switch");
if(window.color==="dark"){img2.attr("src","images/dark/srmselogo.png");}else{img2.attr("src","images/light/srmselogo.png");}

img2.attr("alt","SRM Search Engine");
var img1=$("#nixi-logo");
if(window.color==="dark"){img1.attr("src","images/dark/nixi.png");}else{img1.attr("src","images/light/nixi.png");}
img1.addClass("switch");
img1.attr("alt","Nixi");
img1.attr("width","103px");
img1.attr("height","36px");
var img=$("#srm-logo");
if(window.color==="dark"){img.attr("src","images/dark/srm.png");}else{img.attr("src","images/light/srm.png");}
img.addClass("switch");
img.attr("alt","SRM University");
img.attr("width","93px");
img.attr("height","36px");
var u=0;
var wait=0;
var dispBtns=function(){$(".arrow_div").css("padding-left","20px");$(".arrow_div").append("<div style=\"position:relative;top:0;bottom:0;padding-top:24px;height:50px;\"><span id=\"light\" class=\"side_btns\" data-toggle=\"tooltip\" title=\"Light Theme\"><img style=\"width:31px;height:27px;top:0;bottom:0;margin:auto;\" src=\"images/lighttheme.png\"></span><span id=\"dark\" class=\"side_btns\" data-toggle=\"tooltip\" title=\"Dark Theme\"><img style=\"top:0;bottom:0;margin:auto;width:31px;height:27px;margin-left:5px;\" src=\"images/darktheme.png\">   </span> <span id=\"help\" class=\"side_btns\" data-toggle=\"tooltip\" title=\"Want Help !\">  <img style=\"top:0;bottom:0;margin:auto;width:31px;height:27px;margin-left:5px;\" src=\"images/howtouse.png\">      </span> </div>");$(".side_btns").css("cursor","pointer");

$("#light").on('click',function(){

	document.cookie="color=light;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/";
	window.color="light";
	$("#dark_theme").remove();
	$("#light_theme").remove();
	window.switchImg();

	$("head").append("<link id=\"light_theme\" rel='stylesheet' type='text/css' href='css/light/styles.css' />");
	$("head").on("load",function(){
		$("#myModal").addClass("hide");
	});
});

$("#dark").on('click',function(){
	document.cookie="color=dark;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/";
	window.color="dark";
	$("#light_theme").remove();
	$("#dark_theme").remove();
	window.switchImg();
	$("head").append("<link id=\"dark_theme\" rel='stylesheet' type='text/css' href='css/dark/styles.css' />");
});
var clicked=false;
$('#help').on("click",function(){
if(!clicked){
$.getScript('js/modules/help.js');
clicked=true;
}
else{
$("#help_box").animate({opacity:'0'},500,function(){
$("#help_box").remove();
});

clicked=false;
}
});


};
$("#arrow").on("click",function(){
if(u===0 && wait===0){
$(".arrow_div").remove();
$("#arrow_parent").append("<div class=\"arrow_div\" style=\"float:left;height:75px;float:right;width:0px;margin-top:5px;\"></div>");
dispBtns();
$(".side_btns").hide();
$("#arrow").css("right","-1px");
wait=1;
$(".arrow_div").animate({width:'150px'},500,function(){$(".side_btns").fadeIn();$("#arrow").css("right","-1px");
wait=0;
});

++u;
}
else if(u!==0 && wait===0){
$(".side_btns").fadeOut(function(){$(".side_btns").hide();$(".arrow_div").css("padding-left","0px");
wait=1;
$(".arrow_div").animate({width:'0px'},500,function(){

$("#arrow").css("right","0px");
wait=0;
});
u=0;});
	


}

});

}
$.getScript("bootstrap.fp/js/bootstrap.min.js");
});

