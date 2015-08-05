(function() {
    var DIFFERENCES = $('<div class="module" style="border:0px;color:white;text-align:left" id="differences"><h3 style="margin-top:0px;">Difference between <span class="dif_title1"></span> and <span class="dif_title2"></span></h3><h6 class="dif_text"></h6><h5><a href="#" style="color:#7f8c8d !important;" class="dif_link"></a></h5></div>');
    if ($("#differences").length === 0) {
    $("#smart_answer").addClass("hide");
        DIFFERENCES.find(".dif_title1").setTextValue(window.SA["title1"]);
        DIFFERENCES.find(".dif_title2").setTextValue(window.SA["title2"]);
        DIFFERENCES.find(".dif_link").setTextValue(window.SA["link"]);
        DIFFERENCES.find(".dif_link").css('color', '#2ECC40');
        var re1 = new RegExp(window.SA["title1"], "g");
        var re2 = new RegExp(window.SA["title2"], "g");
        DIFFERENCES.find(".dif_text").html(window.SA["description"].replace(re1, "<b>" + window.SA["title1"] + "</b>").replace(re2, "<b>" + window.SA["title2"] + "</b>"));
        DIFFERENCES.find(".dif_text").append("<span><a style=\"padding-left:5px; color: #7f8c8d !important;\" target=\"_blank\" href=\"" + window.SA["link"] + "\" >...</a></span>");

        DIFFERENCES.find(".dif_text >span>a").css('text-decoration', 'none');
        DIFFERENCES.find(".dif_link").attr("href", window.SA["link"]);
        DIFFERENCES.find(".dif_link").attr("target", "_blank");
        DIFFERENCES.find(".dif_link").css('font-size', '14px');
        DIFFERENCES.find(".dif_text").css('font-size', '16px');
        $("#centre_parent").prepend(DIFFERENCES);
        $("#smart_col").removeClass("hide");

    }
})();
