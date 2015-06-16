var WEATHER = $("<div class=\"col-md-12 module\" id=\"weather\" style=\"color:white;margin-top:20px;border:0px;\">                  <div style=\"margin-bottom:15px;\" class=\"row\">                                         <div class=\"col-lg-7 col-md-7 col-sm-7 col-xs-7\">                        <div  class=\"weather_city\"></div>                                             </div>                     <div class=\"col-lg-5 col-md-5 col-sm-5 col-xs-5\">                        <img width=\"60\" height=\"60\" class=\"img_today switch\"  src=\"\">                         <div style=\"color:white;font-size:18px;\" class=\"weather_max\"></div>                     </div>                                       </div>                                                                             <div class=\"row\" class=\"weather_details\">                   <div class=\"col-lg-12\">  <table class=\"table\">                  <tbody>                   <tr>                  <td class=\"h5\">                  Today Sunset&nbsp;                  </td>                  <td class=\"weather_today_sunset\">                  </td>                  </tr>                  <tr>                  <td class=\"h5\">                  Tomorrow Sunrise&nbsp;                  </td>                  <td class=\"weather_tomorrow_sunrise\">                  </td>                  </tr>                  <tr>                  <td class=\"h5\">                  Today Moonrise&nbsp;                  </td>                  <td class=\"weather_moonrise\">                  </td>                  </tr>                  <tr>                  <td class=\"h5\">                  Tomorrow Moonset&nbsp;                  </td>                  <td class=\"weather_moonset\">                  </td>                  </tr>                  </tbody>                  </table>                  <hr>                  </div>                                       <div class=\"col-lg-12 days_weather\">                                            </div>                                          <div class=\"col-lg-4\"></div>                     <div class=\"col-lg-4\"></div>                     <div class=\"col-lg-12\" style=\"text-align:center;\">                     </div>                  </div>                  <div class=\"row\" style=\"color:#999999;text-align:center;\">                     <button style=\"top:5px;color:white;\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Click to see more statistics\" class=\"btn btn-us glyphicon glyphicon-chevron-down weather_button\"></button>                  </div>               </div>");
var CYCLE=0;
if($("#weather").length===0){
$("#smart_answer").addClass("hide");
WEATHER.find(".weather_details").hide();
    WEATHER.find(".weather_button").click(
        function() {
		WEATHER.find(".weather_button").toggleClass("glyphicon-chevron-down glyphicon-chevron-up");

            WEATHER.find(".weather_details").slideToggle(function(){
    		if(CYCLE===0){
	    		WEATHER.find(".weather_button").attr("title","Click to see less statistics");
			++CYCLE;
			}
		else{
			WEATHER.find(".weather_button").attr("title","Click to see more statistics");

			CYCLE=0;
		}
});
});
var imgs=["clear sky","clear","haze","light rain","mainly clearly sky","mainly or generally cloudy sky","mainly or generally cloudy sky with possibility of rain","mist","moderate rain","moderate snow","partly cloud sky with possibility of rain or thunder","partly cloudy","partly cloudy sky","partly cloudy sky with thundery development","rain or snow","thunderstorm with rain","fog"];

                                $.each(imgs,function(index,element){

                                if(window.SA['forecast'].indexOf(element)>-1){
                                
                                WEATHER.find(".img_today").attr("src","/images/"+window.color+"/"+element+".png");
                                
                                WEATHER.find(".img_today").css("-webkit-filter");
WEATHER.find(".img_today").css("-moz-filter");
}




});

                                var city = window.SA['City'];
                                var maxx = window.SA['Maximum'];
                                var minn = window.SA['Minimum'];
                                var moonrise = window.SA['Moonrise'];
                                var moonset = window.SA['Moonset'];
                                var rainfall = window.SA['Rainfall'];
                                var today_sunset = window.SA['Today_Sunset'];
                                var tomorow_sunrise = window.SA['Tomorrow_Sunrise'];
                                var forecast = window.SA['forecast'];
                                var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
                                var today = days.indexOf(window.SA["day"]);
                                var future = window.SA["future"];
				WEATHER.find(".weather_city").text(city.toLowerCase().capitalizeMe());
				WEATHER.find(".weather_city").append("<br/>");
				WEATHER.find(".weather_city").append("<span style=\"font-weight:400;line-height:1.3em;max-width:200px;display:block;\">"+window.SA["forecast"].capitalizeMe()+"</span>");
                                var w = [];
                                var i = 0;
                                var row = $("<div></div>");
                                row.addClass("row");
                                while (i <= 3) {
                                    ++today;
                                    if (today > 6) {
                                        today = 0;
                                    }




                                    var d = $("<div></div>");
                                    d.addClass("col-lg-6");
                                    d.css({
                                        "font-size": "16px"
                                    });

                                    var img = $("<img></img>");
 $.each(imgs,function(index,element){

                                if(future[i]['forecast'].indexOf(element)>-1){
				img.addClass("switch");
                                img.attr("src","/images/"+window.color+"/"+element+".png");
                                img.css("-webkit-filter");

}




});
                                    img.attr("width", "60");
                                    img.attr("height", "60");
                                    img.css({
                                        "display": "block",
                                        "margin-left": "auto",
                                        "margin-right": "auto"
                                    });
                                    d.append(img);
                                    var s = $("<span style=\"display:block;text-align:center;\">" + days[today] + "</span>");
                                    d.append(s);
                                    var l = $("<span style=\"display:block;text-align:center;\">" + future[i]["maximum"] + "/" + future[i]["minimum"] + "<sup>&deg;C</sup>" + "</span>");
                                    d.append(l);
                                    row.append(d);
                                    if (i == 1) {
                                        WEATHER.find(".days_weather").append(row);
                                        var row = $("<div></div>");
                                        row.addClass("row");


                                    }



                                    ++i;

                                }
                                WEATHER.find(".days_weather").append(row);
                                WEATHER.find(".weather_max").html(maxx + "/" + minn + "<sup>&deg;C</sup>");
                                WEATHER.find(".weather_moonrise").text(moonrise);
                                WEATHER.find(".weather_moonset").text(moonset);
                                WEATHER.find(".weather_today_sunset").text(today_sunset);
                                WEATHER.find(".weather_tomorrow_sunrise").text(tomorow_sunrise);
$('head').append("<style>#weather{font-size:18px !important;text-align: left;}#weather>.weather_city{font-size:36px;}#weather>.weather_city>span{font-size:18px;}</style>");
$("#smart_col").html(WEATHER);
        $("#smart_col").removeClass("hide");
}
