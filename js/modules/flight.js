(function() {
var FLIGHT = $("<div id=\"flight\" class=\"well module col-lg-12\" style=\"margin-top:20px;border:0px;text-align:center\"> <div class=\"row\" style=\"position:relative;top:-15px\"> <img src=\"/images/planebg.jpg\" width=\"100%\" class=\"img-rectangle\" style=\"border-radius:3px\"> </div> <div class=\"row\" style=\"position:relative;top:-90px;left:10px;\"> <div class=\"col-lg-10 col-md-10 col-sm-10 col-xs-10\"> <h3 class=\"flight_head\"><span class=\"flight_from\"></span> <span class=\"glyphicon glyphicon-arrow-right\" aria-hidden=\"true\"></span> <span class=\"flight_to\"></span> <span style=\"float:right\" class=\"flight_date\"></span> <span></span> <span></span></h3> </div> </div> <div class=\"row\" style=\"position:relative;top:-90px;padding:20px;\"> <div class=\"row\"> <div class=\"table-responsive\"> <table class=\"table\"> <thead> <tr> <th>Airline</th> <th>Flight</th><th>Source</th><th>Destination</th> <th>Depart</th> <th>Arrive</th> <th>Duration</th> <th>Price</th> </tr> </thead> <tbody class=\"flight_body\"></tbody> </table> </div> </div> </div> </div>");
    if ($("#flight").length === 0) {
        $("#smart_answer").addClass("hide");
        FLIGHT.find(".flight_to").text(window.SA[0]["destination"].capitalizeMe());
        FLIGHT.find(".flight_from").text(window.SA[0]["source"].capitalizeMe());
        FLIGHT.find(".flight_date").text(window.SA[0]["flight_details"][0]["depart_date"].capitalizeMe());
        $.each(window.SA,function(index,element){
        
        var row=$("<tr></tr>");
        row.append("<td>"+element["flight_details"][0]["airlines"]+"</td>");
        row.append("<td>"+element["flight_details"][0]["flight_no"]+"</td>");
        row.append("<td>"+element["source"].capitalizeMe()+"</td>");
        row.append("<td>"+element["destination"].capitalizeMe()+"</td>");
        row.append("<td>"+element["flight_details"][0]["depart_time"]+"</td>");
        row.append("<td>"+element["flight_details"][0]["arrival_time"]+"</td>");
        row.append("<td>"+element["total_duration"]+"</td>");
        row.append("<td>"+element["total_fare"]+"</td>");
        FLIGHT.find(".flight_body").append(row);
       
        });
	$("#smart_col").html(FLIGHT);
        $("#smart_col").removeClass("hide");
    }
})();