(function() {
    if ($("#location").length === 0) {
    $("#smart_answer").addClass("hide");
        LOCATIONS_ARR = window.SA;
        CURRENT_LOC = 0;
        window.SA = window.SA[0];
        var LOCATION = $("<div id=\"location\" class=\"col-lg-12 wiki_module module\">                  <div class=\"row\">                     <div class=\"col-lg-12 cent\">                        <img class=\"location_img\" src=\"\"  height=\"62\" width=\"65\">                     </div>                  </div>                                                     <div class=\"row\">                     <div class=\"col-lg-12 cent location_name\" style=\"font-size:14px;word-break:none;\"></div>                  </div>                  <div class=\"row cent\"><div class=\"col-lg-12\">                     <span class=\"location_city\" style=\"font-size:25px;\"></span><span class=\"location_state\" style=\"font-size:25px;\"></span>      </div>            </div><div class=\"row cent\">   <div class=\"col-lg-12\">                    <span class=\"location_address\" style=\"font-size:25px;\"></span></span>            </div>      </div><div class=\"row cent\">  <div class=\"col-lg-12\">                     <span class=\"location_description\"></span></span>     </div>             </div><div class=\"cent\">                    </span></br>                  </div>                  <div class=\"row cent\">                     <div style=\"float:left;width:50&percnt;;\">                        <button class=\"btn btn-us btn-us-round glyphicon glyphicon-chevron-left location_prev\" value=\"Previous\"/>                     </div>                     <div style=\"float:left;width:50&percnt;;\">                     <button class=\"btn btn-us btn-us-round glyphicon glyphicon-chevron-right location_next\" value=\"Next\"/>                     </div>                  </div>               </div>");

       
        LOCATION.on("click", ".location_next", function() {

            if (LOCATIONS_ARR.length > 1 && CURRENT_LOC < (LOCATIONS_ARR.length - 1)) {
                ++CURRENT_LOC;
                var val = LOCATIONS_ARR[CURRENT_LOC];
                LOCATION.find(".location_prev").removeAttr("disabled");
                var name = val['name'];
                var city = val['city'];
                var state = val['state'];
                var loc = val["loc"];
                var description = val["description"];
                var address = val["address"];
                var type = loc["type"];
                var co = loc["coordinates"];
                LOCATION.find(".location_img").attr("src", "/images/hotel.png");
                LOCATION.find(".location_name").setHtmlValue("<h3>" + name.capitalizeMe() + "</h3>", name);
                LOCATION.find(".location_city").setHtmlValue("<h4>" + city.capitalizeMe() + "</h4>", city);
                LOCATION.find(".location_state").setHtmlValue("<h4>" + state.capitalizeMe() + "</h4>", state);
                LOCATION.find(".location_address").setHtmlValue("<h5>" + address.capitalizeMe() + "</h5>", address);

                LOCATION.find(".location_description").setHtmlValue(description.capitalizeMe(), description);
                LOCATION.removeClass("hide");
                $("#smart_answer").addClass("hide");
            }
            if ((CURRENT_LOC === (LOCATIONS_ARR.length - 1)) && (LOCATIONS_ARR.length !== 1)) {
                LOCATION.find(".location_next").attr("disabled", "disabled");
                LOCATION.find(".location_prev").removeAttr("disabled");

            }
        });
        LOCATION.on("click", ".location_prev", function() {



            if (LOCATIONS_ARR.length > 1 && CURRENT_LOC < LOCATIONS_ARR.length && CURRENT_LOC !== 0) {


                --CURRENT_LOC;
                val = LOCATIONS_ARR[CURRENT_LOC];
                var name = val['name'];
                var city = val['city'];
                var state = val['state'];
                var loc = val["loc"];
                var description = val["description"];
                var address = val["address"];
                var type = loc["type"];
                var co = loc["coordinates"];
                LOCATION.find(".location_img").attr("src", "/images/hotel.png");
                LOCATION.find(".location_name").setHtmlValue("<h3>" + name.capitalizeMe() + "</h3>", name);
                LOCATION.find(".location_city").setHtmlValue("<h4>" + city.capitalizeMe() + "</h4>", city);
                LOCATION.find(".location_state").setHtmlValue("<h4>" + state.capitalizeMe() + "</h4>", state);
                LOCATION.find(".location_address").setHtmlValue("<h5>" + address.capitalizeMe() + "</h5>", address);
                LOCATION.find(".location_description").setHtmlValue(description.capitalizeMe(), description);
                //$(".location_co").setHtmlValue("<h5>"+(type+" "+co).capitalizeMe()+"</h5>",type+co);
                LOCATION.find(".location_next").removeAttr("disabled");
                $("#smart_answer").addClass("hide");
            }
            if (CURRENT_LOC === 0) {
                LOCATION.find(".location_prev").attr("disabled", "disabled");
                LOCATION.find(".location_next").removeAttr("disabled");
            }

        });



        if (LOCATIONS_ARR.length === 1) {
            LOCATION.find(".location_next").attr("disabled", "disabled");
            LOCATION.find(".location_prev").attr("disabled", "disabled");
        }
        var name = window.SA['name'];
        var city = window.SA['city'];
        var state = window.SA['state'];
        var loc = window.SA["loc"];
        var description = window.SA["description"];
        var address = window.SA["address"];
        var type = loc["type"];
        var co = loc["coordinates"];

        LOCATION.find(".location_img").attr("src", "/images/hotel.png");

        LOCATION.find(".location_name").setHtmlValue("<h3>" + name.capitalizeMe() + "</h3>", name);

        LOCATION.find(".location_city").setHtmlValue("<h4>" + city.capitalizeMe() + "</h4>", city);

        LOCATION.find(".location_state").setHtmlValue("<h4>" + state.capitalizeMe() + "</h4>", state);
        //problem with db $(".location_address").setHtmlValue("<h5>"+address.capitalizeMe()+"</h5>",address);
        LOCATION.find(".location_description").setHtmlValue(description, description);
        LOCATION.append('<div class="row"> <div class="col-md-12 col-sm-12 col-lg-12 col-xs-12"><hr><a href="" class="se_rest">See restaurants near you</a></div> </div>');
        LOCATION.find(".se_rest").on("click touch",function(){
        	window.location="http://srmsearchengine.in/cgi-bin/s.py?q=restaurants%20near%20me";
        	return false;
        });
        $("#smart_col").html("").append(LOCATION);
        $("#smart_col").removeClass("hide");
        $("head").append("<style>.cent{text-align:center;}");
    }
})();
