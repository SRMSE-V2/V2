(function() {
var FLIGHT = $("<div id=\"flight\" style=\"margin:20px;\" class=\"container-fluid\"> <div class=\"row\"> <div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\" style=\"margin-bottom: 15px;\"> <span style=\"font-size: 16px;font-weight: 500;\" class=\"flight_head\"><span class=\"flight_from\"></span> <span class=\"glyphicon glyphicon-arrow-right\" style=\"margin-left: 5px;margin-right: 5px;\" aria-hidden=\"true\"></span> <span class=\"flight_to\"></span> <span style=\"float:right\" class=\"flight_date\"></span> <span></span> <span></span></span> </div> </div> <div class=\"row\"> <div class=\"col-lg-12\"> <div style=\"border:0;\" class=\"table-responsive\"> <table class=\"table\"> <tbody class=\"flight_body\"></tbody> </table> </div><div class=\"flight_more table-responsive\" style=\"border:0;\"><table class=\"table\"> <tbody class=\"flight_body1\"></tbody> </table></div><div style=\"text-align:center;\" class=\"row\"><button data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Click to see more flights\" class=\"btn btn-us btn-us-round glyphicon glyphicon-chevron-down flight_button\"></button></div> </div> </div> </div>");
    if ($("#flight").length === 0) {
        $("#smart_col").addClass("hide");
        FLIGHT.find(".flight_to").text(window.SA[0]["destination"].capitalizeMe());
        FLIGHT.find(".flight_from").text(window.SA[0]["source"].capitalizeMe());
        FLIGHT.find(".flight_date").text(window.SA[0]["flight_details"][0]["depart_date"].capitalizeMe());
        var count=0;
        $.each(window.SA,function(index,element){
         var row=$("<tr></tr>");
        if(element["flight_details"][0]["airlines"]){
        row.append("<td>"+element["flight_details"][0]["depart_time"]+"&nbsp;&nbsp;&nbsp;&#8594;&nbsp;&nbsp;&nbsp;"+element["flight_details"][0]["arrival_time"]+"</td>");
        row.append("<td>"+element["flight_details"][0]["airlines"]+" "+element["flight_details"][0]["flight_no"]+"  <span class=\"flight_code\" style=\"font-weight: 300;font-size: 10px;margin-left: 10px;\">"+element["source_code"]+"-"+element["destination_code"]+"</span></td>");
        row.append("<td>&#8377;"+element["total_fare"]+"</td>");
        
        count++;
       }
        if(count<5){
       		FLIGHT.find(".flight_body").append(row);
       }
       else{
       		FLIGHT.find(".flight_body1").append(row);
       
       }
        });
        FLIGHT.find(".flight_more").hide();
var CYCLE=0;
    FLIGHT.find(".flight_button").click(
        function() {
		FLIGHT.find(".flight_button").toggleClass("glyphicon-chevron-down glyphicon-chevron-up");

            FLIGHT.find(".flight_more").slideToggle(function(){
    		if(CYCLE===0){
	    		FLIGHT.find(".flight_button").attr("title","Click to see less statistics");
			++CYCLE;
			}
		else{
			FLIGHT.find(".flight_button").attr("title","Click to see more statistics");

			CYCLE=0;
		}
});
});
        $("head").append("<style>.flight_body>tr>td,.flight_body1>tr>td{border-top:0 !important;}</style>");
	$("#smart_answer").html(FLIGHT);
        $("#smart_answer").removeClass("hide");
    }
})();
