if($("#site").length===0){
var site=$("<div class=\"well alpha-blur\"><div class=\"row\"><div class=\"col-lg-12\"><div class=\"col-lg-4 col-lg-push-8\"><a href=\"flipkart\"><img src=\"download.jpg\"alt=\"logo\" style=\"display:block;margin-left:auto;margin-right:auto;\"></a></div><div class=\"col-lg-8 col-lg-pull-4\" style=\"\"><div class=\"page-header\"><h1>Flipkart</br><small>Company</small></h1></div></div></div></div><div class=\"row\"><div class=\"col-lg-12\"><p class=\"wrap\">Flipkart,isanE-Commercecompanyestablishedin2007bySachinBansalandBinnyBansal.ItoperatesexclusivelyinIndia,withheadquartersatBangalore,Karnataka.<a href=\"wiki\">Wikipedia</a></p><p class=\"wrap\">Founded:February4,2004,<a href=\"foundedOn\">Cambridge,Massachusetts,UnitedStates</a></p><p class=\"wrap\">CEO:<a href=\"CEO\">MarkZuckerberg</a></p><p class=\"wrap\">Founders:<a href=\"founder\">MarkZuckerberg,</a><a href=\"founder\">DustinMoskovitz,</a><a href=\"founder\">EduardoSaverin,</a><a href=\"founder\">AndrewMcCollum,</a><a href=\"founder\">ChrisHughes</a></div></div></div>");
$("#predefined_questions").before(site);
$(".wrap").css({"word-break":"normal","word-wrap":"break-word"});
$("#smart_answer").addClass("hide");
$("#smart_col").removeClass("hide");
}
