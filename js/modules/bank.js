(function() {
var BANK = $("<div class=\"module col-lg-12\" style=\"margin-top:20px;border:0px;text-align:center\" id=\"bank\">   <div class=\"panel panel-primary\" style=\"margin-bottom:0px;\">       <div class=\"panel-heading btn-us\" > <h3 class=\"panel-title bank_name\" style=\"text-align: center\"> </h3></div> <div class=\"panel-body\" style=\"color:#474747;\">  <div class=\"row\">   <div class=\"col-lg-12 col-md-12 col-sm-4 col-xs-4\"><a href=\"#\" class=\"thumbnail\">      <img class=\"bank_img\" src=\"\" alt=\"Bank\">  </a></div>  <div class=\"col-lg-12 col-md-12 col-sm-8 col-xs-8\"> <table class=\"table bank_table\" style=\"text-align: center \"></table> </div>   </div>   </div>  </div>");
    if ($("#bank").length === 0) {
        $("#smart_answer").addClass("hide");
        BANK.find(".bank_name").text(window.SA["main-ans"]["name"]);
        var end = "";
        $.each(window.SA["main-ans"], function(key, element) {

            if (key !== "name" && key !== "image source") {
                if (window.SA["required"].join(" ").indexOf(key) >= 0) {
                    end += "<tr><td class=\"td_border\"><b>" + key.capitalizeMe() + " : " + element + "</b></td></tr> ";
                } else {
                    BANK.find(".bank_table").append("<tr><td class=\"td_border\"><b>" + key.capitalizeMe() + "</b> : " + element + "</td></tr> ");
                }
            }
        });
        BANK.find(".bank_table").prepend(end);
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: "http://commons.wikimedia.org/w/api.php?action=query&titles=" + window.SA["main-ans"]["image source"].split("/").pop() + "&prop=imageinfo&iiprop=url&format=json",
            crossDomain: true,
            success: function(data) {

                try {
                    var js = data;
                    var a = Object.keys(js["query"]["pages"])[0];
                    BANK.find(".bank_img").attr("src", js["query"]["pages"][a]["imageinfo"][0]["url"]);
                } catch (err) {
                    BANK.find(".bank_img").attr("src", "http://upload.wikimedia.org/wikipedia/commons/1/1b/Seal_of_the_Reserve_Bank_of_India.svg");

                }
            }

        });
	$("#smart_col").html(BANK);
        $("#smart_col").removeClass("hide");
    }
})();
