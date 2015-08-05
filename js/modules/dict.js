(function(){
var DICTIONARY=$("<div class=\"module\" style=\"margin-bottom:30px;border:0px;color:white;text-align:left;\" id=\"dictionary\"> <div><h1 class=\"dict_keyword\" style=\"margin:0px;display:inline;\"></h1></div><div class=\"dict_details\" style=\"padding-top:0px\"></div> <div style=\"padding-top:0px;display:block;height:28px;\"><button class=\"btn glyphicon glyphicon-th-list dict_button\"  style=\"border:0px;background-color:transparent;\">&nbsp;Verbs, synonyms etc</button><a href=\"http://dictionary.reference.com/browse/"+window.SA["keyword"]+"\" target=\"_blank\" class=\"btn dic\" style=\"float:right;border:0px;background-color:transparent;line-height:16px;font-size:16px;\"><img src=\"http://www.google.com/s2/favicons?domain=http://dictionary.com\" height=\"16\" style=\"padding-right:5px;\"/>Dictionary.com</a> </div></div>");
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
				main=main.add($("<h5 class=\"dict_noun_meaning\" style=\"padding-left:15px;\" >"+k[0]+"</h5>"));
	main=main.add($("<h5 class=\"dict_noun_meaning\" style=\"padding-left:25px;\" >\""+k[1]+"\"</h5>"));
			}
else{
			main=main.add($("<h5 class=\"dict_noun_meaning\" style=\"padding-left:15px;\" >"+element+"</h5>"));
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
				main=main.add($("<h5 class=\"dict_noun_meaning\" style=\"padding-left:15px;\" >"+k[0]+"</h5>"));
	main=main.add($("<h5 class=\"dict_noun_meaning\" style=\"padding-left:25px;\" ><i>\""+k[1].trim()+"\"</i></h5>"));
			}
else{
			main=main.add($("<h5 class=\"dict_noun_meaning\" style=\"padding-left:15px;\" >"+e+"</h5>"));
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
DICTIONARY.find(".fs_key").before("<span class=\"glyphicon glyphicon-volume-up\" class=\"speak\" style=\"font-size:22px;padding-left:15px;cursor:pointer;\"></span>");
DICTIONARY.find(".speak").click(function(){

responsiveVoice.speak(window.SA["keyword"]);

});
$("#centre_parent").prepend(DICTIONARY);
$("#smart_col").removeClass("hide");
}
})();
