if($("#highway").length===0){
var highway=$("<div id=\"highway\" class=\"module col-md-12 well alpha-blur\" style=\"border:0px;margin-top:20px;color:white;\"> <div class=\"row\" style=\"text-align:center\"> <img src=\"/ver1/images/highway.png\" height=\"62\" width=\"65\"> </div> <div class=\"row\" style=\"text-align:center;padding-top:5px\"> <h4 id=\"highway_highway\"></h4> <h5><span id=\"route\"></span></h5> <h6 id=\"highway_length_state\"></h6> <h6><b>Total Length - </b><span id=\"highway_length_total\"></span></h6> </div> </div>");
$("#smart_col").html("").append(highway);
$("#smart_answer").addClass("hide");
$("#highway_length_state").text(window.val["length_state"]);
$("#highway_length_total").text(window.val["length_total"]);
$("#route").text(window.val["route"]);
console.log(window.val);
$("#smart_col").removeClass("hide");
}

