var differences=$('<div class="well alpha-blur row" style="border:0px;color:white;text-align:left" id="differences"><h3>Difference between <span id="dif_title1"></span> and <span id="dif_title2"></span></h3><h6 id="dif_text"></h6><h5><a href="#" style="color:green" id="dif_link"></a></h5></div>');
$("#smart_col").html("").append(differences);
$("#smart_answer").addClass("hide");
console.log(window.val);
$("#dif_title1").setTextValue(window.val["title1"]);
$("#dif_title2").setTextValue(window.val["title2"]);
$("#dif_link").setTextValue(window.val["link"]);
$("#dif_text").setTextValue(window.val["description"]);
$("#smart_col").removeClass("hide");


