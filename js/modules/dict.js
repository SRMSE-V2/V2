(function(){
var DICTIONARY=$("<div class=\"wiki_module module\" id=\"dictionary\"> <div><h2 class=\"dict_keyword\"></h2></div><div class=\"dict_details\" style=\"padding-top:0px\"></div><div class=\"row\"><div class=\"col-md-6 col-xs-6 col-sm-6 col-lg-6\" style=\"padding-top:15px;\"><button class=\"btn btn-us dict_button\"><span style=\"margin-right:8px;\" class=\"glyphicon glyphicon-th-list\"></span>Verbs, synonyms etc</button></div><div class=\"col-md-6 col-xs-6 col-sm-6 col-lg-6\" style=\"padding-top:15px;\"> <a href=\"http://dictionary.reference.com/browse/"+window.SA["keyword"]+"\" target=\"_blank\" class=\"btn btn-us dic\" style=\"float:right;border:0px;font-size:16px;text-decoration:none !important;\"><img src=\"http://www.google.com/s2/favicons?domain=http://dictionary.com\" height=\"16\" style=\"padding-right:5px;\"/>Dictionary.com</a> </div></div></div></div>");
var COUNT=0;
var ONCE=1;
if($("#dictionary").length===0){
$("#smart_answer").addClass("hide");
$.getScript("/js/modules/voice.js");
DICTIONARY.find(".dict_keyword").html(window.SA["keyword"]);
var keys=Object.keys(window.SA);
keys.sort();
$.each(keys,function(index,el){
	key=el;
	element=window.SA[el];
	if(key!=="keyword"){
	if(ONCE===1){
	DICTIONARY.find(".dict_keyword").after("<h4 class=\"fs_key\"><i>"+key+"</i></h4>");
			var main=$();
		$.each(element,function(k,element){
			if(element.indexOf(":")>=0){
				var k=element.split(":");
				main=main.add($("<h4 style=\"padding-left:15px;\" >"+k[0]+"</h4>"));
	main=main.add($("<h5 style=\"padding-left:25px;\" ><i>\""+k[1]+"\"</i></h5>"));
			}
else{
			main=main.add($("<h5 style=\"padding-left:15px;\" >"+element+"</h5>"));
}
		});
		DICTIONARY.find(".fs_key").after(main);
	ONCE=2;
	}
	else{
	var t=DICTIONARY.find(".dict_details").append("<h4 class=\""+key+"\"><i>"+key+"</i></h4>");
		var main=$();
		var rem=false;
		$.each(element,function(k,e){
			if(e===""){
				rem=true;
			}
else{
		if(e.indexOf(":")>=0){
				var k=e.split(":");
				main=main.add($("<h4 style=\"padding-left:15px;\" >"+k[0]+"</h4>"));
	main=main.add($("<h5 style=\"padding-left:25px;\" ><i>\""+k[1].trim()+"\"</i></h5>"));
			}
else{
			main=main.add($("<h5 style=\"padding-left:15px;\" >"+e+"</h5>"));
}
rem=false;
}
		});
			if(rem===true){
			DICTIONARY.find("."+key).remove();
			}
else{
DICTIONARY.find(".dict_details").append(main);

}
		
	}
}
COUNT++;
});

if(COUNT===2){

DICTIONARY.find(".dict_details").remove();
DICTIONARY.find(".dict_button").remove();
}
else{
DICTIONARY.find(".dict_details").prepend("<hr>");
DICTIONARY.find(".dict_details").hide();
DICTIONARY.find(".dict_button").click ( function() { $(".dict_details").slideToggle(); } );
}
DICTIONARY.find(".fs_key").before("<button  style=\"margin-left: 15px;margin-top: -7px;\" class=\"btn btn-us btn-us-round speak\"><span class=\"glyphicon glyphicon-volume-up\" style=\"font-size:22px;  right: 3px; top: 2px;\"></span></button>");
DICTIONARY.find(".speak").click(function(){

responsiveVoice.speak(window.SA["keyword"]);

});
   $('head').append("<style>.dict_keyword{margin:0px;display:inline;}</style>");
$("#centre_parent").prepend(DICTIONARY);
$("#smart_col").removeClass("hide");
}
})();
