(function(){
var HIGHWAY=$("<div id=\"highway\" class=\"wiki_module module\"> <div class=\"row\" style=\"text-align:center\"> <img src=\"/images/highway.png\" height=\"62\" width=\"65\"> </div> <div class=\"row\" style=\"text-align:center;padding-top:10px\"> <h4 class=\"highway_highway\"></h4> <h5><span class=\"highway_route\"></span></h5> <h6 class=\"highway_length_state\"></h6> <h5><b>Total Length - </b><span class=\"highway_length_total\"></span></h5> </div><div class=\"row\" style=\"padding-top:20px;text-align:center;\">                     <div style=\"float:left;width:50&percnt;;\">                        <button class=\"btn btn-us btn-us-round glyphicon glyphicon-chevron-left highway_prev\" value=\"Previous\"/>                     </div>                     <div style=\"float:left;width:50&percnt;;\">                     <button class=\"btn btn-us btn-us-round glyphicon glyphicon-chevron-right highway_next\" value=\"Next\"/>                     </div>                  </div>          </div>");
var HIGHWAY_ARR=window.SA["ans"];
var HIGHWAY_CUR=0;
if($("#highway").length===0){
$("#smart_answer").addClass("hide");
HIGHWAY.find(".highway_prev").attr("disabled", "disabled");
HIGHWAY.find(".highway_length_state").text(window.SA["ans"][0]["length_state"]);
HIGHWAY.find(".highway_length_total").text(window.SA["ans"][0]["length_total"]);
var k=window.SA["ans"][0]["route"];
var cities=[];
$.each(k,function(index,element){
if($("#search").val().trim().toLowerCase().indexOf(element)>=0 && (element!==k[0] && element!==k[k.length-1])){
cities.push(element);

}

});
if(cities.length!==0){HIGHWAY.find(".highway_route").text(k[0]+" - "+cities.join(" - ")+" - "+k[k.length-1]);}else{HIGHWAY.find(".highway_route").text(k[0]+" - "+k[k.length-1]);}
$("#smart_col").removeClass("hide");
HIGHWAY.find(".highway_prev").on("click", function() {

   if (HIGHWAY_ARR.length > 1 && HIGHWAY_CUR < HIGHWAY_ARR.length && HIGHWAY_CUR !== 0) {
	--HIGHWAY_CUR;
	var val=window.SA["ans"][HIGHWAY_CUR];
	var k=val["route"];
var cities=[];
$.each(k,function(index,element){
if($("#search").val().trim().toLowerCase().indexOf(element)>=0 && (element!==k[0] && element!==k[k.length-1])){
cities.push(element);

}

});
	HIGHWAY.find(".highway_length_state").text(val["length_state"]);
	HIGHWAY.find(".highway_length_total").text(val["length_total"]);
	if(cities.length!==0){HIGHWAY.find(".highway_route").text(k[0]+" - "+cities.join(" - ")+" - "+k[k.length-1]);}else{HIGHWAY.find(".highway_route").text(k[0]+" - "+k[k.length-1]);}
	 HIGHWAY.find(".highway_next").removeAttr("disabled");
	 
}
 if (HIGHWAY_CUR === 0) {
            HIGHWAY.find(".highway_prev").attr("disabled", "disabled");
            HIGHWAY.find(".highway_next").removeAttr("disabled");
        }

});
HIGHWAY.find(".highway_next").on("click", function() {
	if (HIGHWAY_ARR.length > 1 && HIGHWAY_CUR < (HIGHWAY_ARR.length - 1)) {
		++HIGHWAY_CUR;
		HIGHWAY.find(".highway_prev").removeAttr("disabled");
		var val=window.SA["ans"][HIGHWAY_CUR];
			var k=val["route"];
var cities=[];
$.each(k,function(index,element){
if($("#search").val().trim().toLowerCase().indexOf(element)>=0 && (element!==k[0] && element!==k[k.length-1])){
cities.push(element);

}

});
		HIGHWAY.find(".highway_length_state").text(val["length_state"]);
		HIGHWAY.find(".highway_length_total").text(val["length_total"]);
		if(cities.length!==0){HIGHWAY.find(".highway_route").text(k[0]+" - "+cities.join(" - ")+" - "+k[k.length-1]);}else{HIGHWAY.find(".highway_route").text(k[0]+" - "+k[k.length-1]);}
		HIGHWAY.find(".highway").removeClass("hide");
	}
	 if ((HIGHWAY_CUR === (HIGHWAY_ARR.length - 1)) && (HIGHWAY_ARR.length !== 1)) {
		    HIGHWAY.find(".highway_next").attr("disabled", "disabled");
		    HIGHWAY.find(".highway_prev").removeAttr("disabled");

		}


});
$("#smart_col").html(HIGHWAY);
$("#smart_col").removeClass("hide");
}

})();

