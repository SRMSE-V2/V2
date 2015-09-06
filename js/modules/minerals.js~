(function(){
var MINERALS=$('<div class="module" style="text-align:center" id="minerals"><div class="col-lg-12" style="text-align:center;"><img src="/images/minerals.png" width="58px" height="55px"></div><h3 class="commodity">Gold</h3><h4>Live Price : <span class="live_price"></span></h4></div>');
if($("#minerals").length===0){
$("#smart_answer").addClass("hide");
MINERALS.find(".commodity").setTextValue(window.SA["name"].capitalizeMe());
MINERALS.find(".live_price").setTextValue(window.SA["value"].replace("Rs.","₹ "));
$("#smart_col").html("").append(MINERALS);
$("#smart_col").removeClass("hide");
}
})();


