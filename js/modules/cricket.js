(function() {
    var CYCLE = 0;
    var CS = "";
    var BOWL = "";
    var BAT = "";
    var RECENT = "";
    var CRICKET_STATS = $("<div class=\"module\" id=\"cricket_players\" style=\"border:0px;color:white;\">                <!-- Player info -->                  <div class=\"row player_info\">                        <div class=\"col-xs-12 col-sm-3 col-md-3 col-lg-3\" style=\"margin-top:10px;\">                            <img class=\"cric_img media-object img-responsive\"  alt=\"image\">                        </div>                        <div class=\"pl_info col-xs-12 col-sm-9 col-md-9 col-lg-9\" style=\"margin-top:10px\">                                                                             </div>                  </div>                <!-- /Player info -->                             <div class=\"row\">  <div class=\"col-lg-6\">                   </div>  <div class=\"col-lg-6\"> <button type=\"button\" class=\"btn btn-us alpha-blur cricket_players_button\" style=\"float:right;font-size:20px;color:white;border:0px\" aria-label=\"Left Align\">                    <span class=\"glyphicon glyphicon-stats\" aria-hidden=\"true\"></span> Click for more information                </button>           </div>  <div class=\"row cricket_players_details\" style=\"margin:0px\">                  <div id=\"pl_other_info\" class=\"col-xs-12 alpha-blur\" style=\"border:0px solid;margin-bottom:5px>                                                                                                            </div>                                    </div>              </div>  </div>");

    function returnValue(k, v) {
        var returnString = "";
        $.each(v, function(key, element) {
            if (JSON.stringify(element).slice(0, 1) === "{") {
                if (Object.keys(element).length !== 0) {

                    returnString = returnString + "<h5>" + key + "</h5><ul class=\"nav nav-pills\">";

                    $.each(element, function(kk, ee) {
                        if (kk != "10")
                            returnString = returnString + "<li class=\"alert alpha-blur\" style=\"padding:5px\">" + kk + " <span class=\"badge\">" + ee + "</span></li>";
                    });
                    returnString = returnString + "</ul>";
                }
            } else {
                returnString = returnString + "<p><b>" + key + "</b> : " + element + "</p>";
            }
        });

        return returnString;

    }

    function changeDiv(typ) {

        CRICKET_STATS.find(".cricket_cont").empty();
        CRICKET_STATS.find(".cricket_cont").append(typ);
    }


    if ($("#cricket_players").length === 0) {
    $("#smart_answer").addClass("hide");
        CRICKET_STATS.find(".cricket_players_details").hide();
        CRICKET_STATS.find(".cricket_players_details").append("<ul class=\"nav nav-tabs\"><li role=\"presentation\" class=\"active\"><a class=\"cricket_stats\" href=\"#\">Career Statistics</a></li><li role=\"presentation\"><a href=\"#\" class=\"cricket_bowl\">Bowling</a></li><li role=\"presentation\"><a class=\"cricket_bat\" href=\"#\">Batting</a></li></ul><div class=\"row cricket_cont\"></div>");
        CRICKET_STATS.find(".cricket_bowl").on("click",function(){changeDiv(BOWL);return false;});
        CRICKET_STATS.find(".cricket_stats").on("click",function(){changeDiv(CS);return false;});
        CRICKET_STATS.find(".cricket_bat").on("click",function(){changeDiv(BAT);return false;});


        CRICKET_STATS.find(".cricket_players_button").on("click", function() {

            CRICKET_STATS.find(".cricket_players_details").slideToggle(function() {
                if (CYCLE === 0) {
                    CRICKET_STATS.find(".cricket_players_button").attr("title", "Click to see less statistics");
                    CRICKET_STATS.find(".cricket_players_button").text("Click to see less statistics");
                    ++CYCLE;
                } else {
                    CRICKET_STATS.find(".cricket_players_button").attr("title", "Click to see more statistics");
                    CRICKET_STATS.find(".cricket_players_button").text("Click to see more statistics");
                    CRICKET_STATS.find(".cricket_cont").empty();
		    CRICKET_STATS.find(".cricket_cont").append(CS);
                    CYCLE = 0;
                }
            });


        });
        $.each(window.SA["main-ans"], function(k, v) {

            if (k === "player-info") {
                CRICKET_STATS.find(".pl_info").append("<h3 style=\"margin:0px !important;\">" + window.SA["main-ans"]["name"] + "</h3>");
                CRICKET_STATS.find(".pl_info").append("<h4 style=\"margin:0px !important;padding-top:5px !important;\">" + window.SA["main-ans"]["team"] + "</h4><hr style=\"margin-top:8px !important;\">");
                $.each(v, function(k1, v1) {

                    CRICKET_STATS.find(".pl_info").append("<div style=\"margin-bottom:5px;\"><h4 style=\"display:inline;\">" + k1 + " :</h4><h5 style=\"display:inline;\"> <span class=\"player_team\">" + v1 + "</span></h5></div>");


                });
            } else if (k === "img") {
                CRICKET_STATS.find(".cric_img").attr("src", window.SA["main-ans"]["img"]);
                CRICKET_STATS.find(".cric_img").css({
                    "display": "block",
                    "margin-left": "auto",
                    "margin-right": "auto"
                });
            } else if (k === "CAREER STATISTICS") {

                CS = "";
                CS = "<div class =\"col-sm-12\">" + returnValue(k, v) + "</div>";
            } else if (k === "BATTING") {

                BAT = "<div class =\"col-sm-12\">" + returnValue(k, v) + "</div>";


            } else if (k === "BOWLING") {
                BOWL = "<div class =\"col-sm-12\">" + returnValue(k, v) + "</div>";
            } else if (k !== "name" && k !== "team" && k !== "link") {

                $.each(v, function(key, element) {
                    if (JSON.stringify(element).slice(0, 1) === "{") {

                        var temp = "";
                        $.each(element, function(kk, ee) {
                            temp += "<li class=\"alert alpha-blur\" style=\"padding:5px\">" + kk + " <span class=\"badge\">" + ee + "</span></li>";
                        });
                        $("#" + k).append("<ul class=\"nav nav-pills\">" + temp + "</ul>");
                        if (k === "CAREER STATISTICS") {
                            CS = "<ul class=\"nav nav-pills\">" + temp + "</ul>";
                            CRICKET_STATS.find(".cricket_cont").append(temp);
                        }
                        if (k == "BOWLING") {
                            BOWL = "<ul class=\"nav nav-pills\">" + temp + "</ul>";
                        }
                        if (k === "BATTING") {
                            BAT = "<ul class=\"nav nav-pills\">" + temp + "</ul>";
                        }
                        if (k === "RECENT") {
                            RECENT = "<ul class=\"nav nav-pills\">" + temp + "</ul>";
                        }


                    } else {
                        $("#" + k).append("<p>" + element + "</p>");
                    }


                });
            }



        });
	$("#centre_parent").prepend(CRICKET_STATS);
        $("#smart_col").removeClass("hide");
        


    }

})();
