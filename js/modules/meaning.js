var meaning=$("<div class=\"well alpha-blur\" style=\"border:0px;color:white;text-align:left;\" id=\"dictionary\"> <h2 id=\"dict_keyword\" style=\"margin:0px;\"></h2><div id=\"dict_details\" style=\"padding-top:0px\"></div> <button class=\"btn-group btn-group-xs\" id=\"dict_button\" style=\"color:white;border:0px;background-color:transparent;\"> <span class=\"glyphicon glyphicon-th-list\" aria-hidden=\"true\"></span> Verbs, synonyms etc</button> </div>");
$("#predefined_questions").before(meaning);
once=1;
$("#dict_keyword").html("<b>"+window.val["keyword"]+"</b>");
var count=0;
$.each(window.val,function(key,element){
	if(key!=="keyword"){
	if(once===1){
	$("#dict_keyword").after("<h4 id=\"fs_key\"><i>"+key+"</i></h4>");
			var main=$();
		$.each(element,function(k,element){
			if(element.indexOf(":")>=0){
				var k=element.split(":");
				main=main.add($("<h5 id=\"dict_noun_meaning\" style=\"padding-left:15px;\" >"+k[0]+"</h5>"));
	main=main.add($("<h5 id=\"dict_noun_meaning\" style=\"padding-left:25px;color:#c2cebf;\" >\""+k[1]+"\"</h5>"));
			}
else{
			main=main.add($("<h5 id=\"dict_noun_meaning\" style=\"padding-left:15px;\" >"+element+"</h5>"));
}
		});
		$("#fs_key").after(main);
	once=2;
	}
	else{
	var t=$("#dict_details").append("<h4 id=\""+key+"\"><i>"+key+"</i></h4>");
		var main=$();
		var rem=false;
		$.each(element,function(k,e){
			if(e===""){
				rem=true;
			}
else{
		if(e.indexOf(":")>=0){
				var k=e.split(":");
				main=main.add($("<h5 id=\"dict_noun_meaning\" style=\"padding-left:15px;\" >"+k[0]+"</h5>"));
	main=main.add($("<h5 id=\"dict_noun_meaning\" style=\"padding-left:25px;color:#c2cebf;\" ><i>\""+k[1].trim()+"\"</i></h5>"));
			}
else{
			main=main.add($("<h5 id=\"dict_noun_meaning\" style=\"padding-left:15px;\" >"+e+"</h5>"));
}
rem=false;
}
		});
			if(rem===true){
			console.log(t);
			$("#"+key).remove();
			}
else{
$("#dict_details").append(main);

}
		
	}
}
count++;
});

if(count===2){

$("#dict_details").remove();
$("#dict_button").remove();
}
else{
$("#dict_details").prepend("<hr>");
$("#dict_details").hide();
$("#dict_button").click ( function() { $("#dict_details").slideToggle(); } );
}

$("#smart_answer").addClass("hide");
$("#smart_col").removeClass("hide");
