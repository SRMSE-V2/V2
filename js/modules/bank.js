(function() {
var BANK = $("<div class=\"wiki_module module col-lg-12\" style=\"text-align:center;\" id=\"bank\">   <div >       <div> <h3 class=\"bank_name\" style=\"text-align: center\"> </h3></div> <div>  <div class=\"row\">   <div class=\"col-lg-12 col-md-12\"><a href=\"#\">      <img class=\"bank_img\" src=\"\" alt=\"Bank\">  </a> <table class=\"table bank_table\" style=\"text-align: center \"></table> </div>   </div>   </div>  </div>");
    if ($("#bank").length === 0) {
        $("#smart_answer").addClass("hide");
        BANK.find(".bank_name").text(window.SA["main-ans"]["name"]);
        var end = "";
        $.each(window.SA["main-ans"], function(key, element) {
	   if(key==="website"){
	   end += "<tr><td class=\"td_border\"><b>" + key.capitalizeMe() + " :<a href='"+element+"'> " + element + "</a></b></td></tr> ";
	   return;
	   }
            if (key !== "name" && key !== "image source") {
                if (window.SA["required"].join(" ").indexOf(key) >= 0) {
                    end += "<tr><td class=\"td_border\"><b>" + key.capitalizeMe() + " : " + element + "</b></td></tr> ";
                } else {
                    BANK.find(".bank_table").append("<tr><td class=\"td_border\"><b>" + key.capitalizeMe() + "</b> : " + element + "</td></tr> ");
                }
            }
        });
        BANK.find(".bank_table").prepend(end);
      
                try {
                    BANK.find(".bank_img").attr("src", "http://en.wikipedia.org/wiki/en:Special:Filepath/"+window.SA["main-ans"]["image source"].split("/").pop().replace("File:","")+"?width=250");
                } catch (err) {
                    BANK.find(".bank_img").attr("src", "http://upload.wikimedia.org/wikipedia/commons/1/1b/Seal_of_the_Reserve_Bank_of_India.svg");

                }  
	$("#smart_col").html(BANK);
        $("#smart_col").removeClass("hide");
    }
})();
