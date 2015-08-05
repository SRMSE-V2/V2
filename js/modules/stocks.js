(function(){
var STOCKS=$("<div id=\"stocks\" class=\"col-lg-12 module\" style=\"color:white;margin-top:20px;border:0px;\">               <h4 style=\"position:relative;left:10px;\" class=\"stocks_name\"></h4>                 <h6 style=\"position:relative;left:10px;top:-7px;margin:0px;\" class=\"stocks_code\"></h6>                <h5 style=\"position:relative;left:10px;top:-5px;margin:0px;\">Pre-market:               <span class=\"stocks_previous\"></span>               </h5>               <h2 style=\"position:relative;margin:5px;color:white;text-align:center;\">               <span class=\"stocks_current\" ></span>               <span style=\"color:#e74c3c\">               <span class=\"stocks_status\" style=\"position:relative;font-size:28px;top:-5px;left:6px;\"></span>               <span class=\"stocks_percentage\"></span></span>               </h2>               </div>");
if($("#stocks").length===0){
$("#smart_answer").addClass("hide");
STOCKS.find("#stocks2").attr("src","/images/stocks2.png");
                                if(window.SA["Status"]==="Gain")
{
STOCKS.find(".status_color").css("color","#01DF01");
STOCKS.find(".stocks_status").html("&uarr;");
}
else{
STOCKS.find(".status_color").css("color","#e74c3c");
STOCKS.find(".stocks_status").html("&#8595;");


}
STOCKS.find(".stocks_percentage").html(window.SA["Percentage Change"].replace("+","").replace("-",""));
STOCKS.find(".stocks_current").text(window.SA["Present Value"]);
STOCKS.find(".stocks_name").text(window.SA["Company Name"]);
STOCKS.find(".stocks_previous").text(window.SA["Previous Value"]);
$("#smart_col").html(STOCKS);
$("#smart_col").removeClass("hide");
}

})();
