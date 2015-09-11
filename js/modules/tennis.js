(function() {
    var TENNIS_STATS = $("<div class=\"wiki_module module\" id=\"tennis_players\" style=\"color:white;\">    <div class=\"row\">            <div class=\"col-md-2 col-lg-2 col-sm-12 col-xs-12\" style=\"margin-top:10px;\">            	<img alt=\"image\" class=\"tennis_img\">    	    </div>    	    <div class=\"pl_info col-md-10 col-lg-10 col-sm-12 col-xs-12\" style=\"margin-top:10px\">           </div>    </div>");
       
 TENNIS_STATS.find(".tennis_img").css({
                    "display": "block",
                    "margin-left": "auto",
                    "margin-right": "auto"
       });
    if ($("#tennis_players").length === 0) {
    $("#smart_answer").addClass("hide");
       var js=window.SA[0]["main-ans"];
       TENNIS_STATS.find(".tennis_img").attr("src",js["image"]);
       TENNIS_STATS.find(".pl_info").append("<h3 style=\"margin:0px !important;\">"+js["name"]+"</h3>");
       TENNIS_STATS.find(".pl_info").append("<h5 style=\"margin:0px !important;padding-top:5px !important;\">"+js["country"]+"</h5>");
       TENNIS_STATS.find(".pl_info").append("<hr style=\"margin-top:10px;\">");
       $.each(js,function(kk,vv){
       if(kk!=="name" && kk!=="country"  && kk!=="image" && kk!=="injuries"){
       var j=kk;
       var jj=vv;
       
       TENNIS_STATS.find(".pl_info").append("<div style=\"margin-bottom:5px;\"><h4 style=\"display:inline;\">"+j.capitalizeMe()+" :</h4><h5 style=\"display:inline;\"> <span class=\"player_team\">"+vv+"</span></h5></div>");
       }
       
       });
	$("#centre_parent").prepend(TENNIS_STATS);
        $("#smart_col").removeClass("hide");
        


    }

})();
