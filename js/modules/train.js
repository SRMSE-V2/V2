(function(){
if($("#train").length===0){
var CTRAIN = 0;
var TRAIN=$("<div id=\"train\" class=\"wiki_module module\">                  <div class=\"row\">                     <div class=\"col-lg-12\" style=\"text-align:center;\">                        <img id=\"trainimg\" src=\"\"  height=\"62\" width=\"65\">                     </div>                  </div>                  <div class=\"row\">                     <div class=\"col-lg-5 col-md-5 col-sm-5 col-xs-5\" id=\"train_source\" style=\"font-size:20px;text-align:right;\"></div>                     <div class=\"col-lg-2 col-md-2 col-sm-2 col-xs-2\" style=\"font-size:14px;top:5px;\">To</div>                     <div class=\"col-lg-2 col-md-2 col-sm-2 col-xs-2\" id=\"train_dest\" style=\"font-size:20px;text-align:left;\"></div>                  </div>                  <div class=\"row\" id=\"\" style=\"padding:0px;font-weight:bold;\">                     <div id=\"src_time\" class=\"col-lg-6 col-md-6 col-sm-6 col-xs-6\" style=\"text-align:center;\"></div>                     <div class=\"col-lg-2\"></div>                     <div id=\"dest_time\" class=\"col-lg-6 col-md-6 col-sm-6 col-xs-6\" style=\"text-align:center;paddding-bottom:5px !important;paddding-top:5px !important;\"></div>                  </div>                  <div class=\"row\">                     <div id=\"train_name\" class=\"col-lg-12\" style=\"font-size:14px;text-align:center;word-break:none;\"></div>                  </div>                  <div class=\"row\" style=\"text-align:center;\">                     <span id=\"train_time\" style=\"color:#e74c3c;font-size:25px;\"></span>                  </div>                  <div class=\"row\" style=\"text-align:center;\">                     <div style=\"float:left;width:50&percnt;;\">                        <button id=\"train_prev\" class=\"btn btn-us glyphicon glyphicon-chevron-left\" value=\"Previous\"/>                     </div>                     <div style=\"float:left;width:50&percnt;;\">                     <button id=\"train_next\" class=\"btn btn-us glyphicon glyphicon-chevron-right\" value=\"Next\"/>                     </div>                  </div>               </div>"); 
$("#smart_col").html("").append(TRAIN);
var TRAIN_DATA=window.SA;
$("#train_next").on("click",function() {
console.log(TRAIN_DATA);
        if (TRAIN_DATA.length > 1 && CTRAIN < (TRAIN_DATA.length - 1)) {
            ++CTRAIN;
            var val = TRAIN_DATA[CTRAIN];
            console.log(val);
            $("#train_prev").removeAttr("disabled");
            var desc = val['Description'];
            var status = val['Status'];
            var status_description = val['Status Description'];
            var train_name = val['Train Name'];
            var source = val['Description'].replace("Departed from", "").trim().split("at")[0];
            var dest = val['Description'].split("Destination")[1].split("at")[0];
            var src_time = val['Description'].split(' at ')[1].split('on')[0];
            var dest_time = val['Description'].split(' at ')[2].split('on')[0];
            $("#train_source").html(source.replace("(", "<h6>(").replace(")", ")</h6>"));
            var date1 = val['Description'].split(',')[0].split("on")[1].trim();
            var month1 = val['Description'].split(',')[1];
            var date2 = val['Description'].split(",")[2].split(" at ")[1].split("on")[1].trim();
            var month2 = val['Description'].split(",")[3].trim();
            $("#dest_time").text(dest_time + " " + date2 + " " + month2);
            $("#src_time").text(src_time + " " + date1 + " " + month1);
            var statustrain = val["Status Descrition"];
            //Will do later
            $("#train_dest").html(dest.replace("(", "<h6>(").replace(")", ")</h6>"));
            $("#train_time").text(status);
            $("#train_name").text(train_name);
            $("#train").removeClass("hide");
            $("#smart_answer").addClass("hide");
        }
        if ((CTRAIN === (TRAIN_DATA.length - 1)) && (TRAIN_DATA.length !== 1)) {
            $("#train_next").attr("disabled", "disabled");
            $("#train_prev").removeAttr("disabled");

        }
    });

 $("#train_prev").attr("disabled", "disabled");
    $("#location_prev").attr("disabled", "disabled");
    $("#train_prev").on("click",function() {



        if (TRAIN_DATA.length > 1 && CTRAIN < TRAIN_DATA.length && CTRAIN !== 0) {


            --CTRAIN;
            //console.log(CTRAIN);
            val = TRAIN_DATA[CTRAIN];
            var desc = val['Description'];
            var status = val['Status'];
            var status_description = val['Status Description'];
            var train_name = val['Train Name'];
            var source = val['Description'].replace("Departed from", "").trim().split("at")[0];
            var dest = val['Description'].split("Destination")[1].split("at")[0];
            //console.log(dest);
            //console.log(source);
            //console.log(train_name);
            var src_time = val['Description'].split(' at ')[1].split('on')[0];
            var dest_time = val['Description'].split(' at ')[2].split('on')[0];
            $("#train_source").html(source.replace("(", "<h6>(").replace(")", ")</h6>"));
            var date1 = val['Description'].split(',')[0].split("on")[1].trim();
            var month1 = val['Description'].split(',')[1];
            var date2 = val['Description'].split(",")[2].split(" at ")[1].split("on")[1].trim();
            var month2 = val['Description'].split(",")[3].trim();
            //console.log(date2 + " " + month2);
            $("#dest_time").text(dest_time + " " + date2 + " " + month2);
            //console.log(src_time);
            //console.log(dest_time);
            $("#src_time").text(src_time + " " + date1 + " " + month1);
            var statustrain = val["Status Descrition"];
            //Will do later
            $("#train_dest").html(dest.replace("(", "<h6>(").replace(")", ")</h6>"));
            $("#train_time").text(status);
            $("#train_name").text(train_name);
            $("#train_next").removeAttr("disabled");
            $("#smart_answer").addClass("hide");
        }
        if (CTRAIN === 0) {
            //console.log("0s");
            $("#train_prev").attr("disabled", "disabled");
            $("#train_next").removeAttr("disabled");
        }

    });
$("#smart_answer").addClass("hide");
                               var val= TRAIN_DATA[0];
                                if (TRAIN_DATA.length === 1) {
                                    $("#train_next").attr("disabled", "disabled");
                                    $("#train_prev").attr("disabled", "disabled");
                                }
                                var desc = val['Description'];
                                var status = val['Status'];
                                var status_description = val['Status Description'];
                                var train_name = val['Train Name'];
                                var source = val['Description'].replace("Departed from", "").trim().split("at")[0];
                                var dest = val['Description'].split("Destination")[1].split(" at ")[0];
                                //console.log(dest);
                                //console.log(source);
                                //console.log(train_name);
                                var src_time = val['Description'].split(' at ')[1].split('on')[0];
                                var dest_time = val['Description'].split(' at ')[2].split('on')[0];
                                $("#train_source").html(source.replace("(", "<h6>(").replace(")", ")</h6>"));
                                var date1 = val['Description'].split(',')[0].split("on")[1].trim();
                                var month1 = val['Description'].split(',')[1];
                                var date2 = val['Description'].split(",")[2].split(" at ")[1].split("on")[1].trim();
                                var month2 = val['Description'].split(",")[3].trim();
                                //console.log(date2 + " " + month2);
                                $("#dest_time").text(dest_time + " " + date2 + " " + month2);
                                //console.log(src_time);
                                //console.log(dest_time);
                                $("#src_time").text(src_time + " " + date1 + " " + month1);
                                var statustrain = val["Status Descrition"];
                                //Will do later
$("#trainimg").attr("src","/images/train.png");
                                $("#train_dest").html(dest.replace("(", "<h6>(").replace(")", ")</h6>"));
                                $("#train_time").text(status);
                                $("#train_name").text(train_name);
                                $("#train").removeClass("hide");
                                $("#smart_answer").addClass("hide");
$("#smart_col").removeClass("hide");
}


})();

