(function(){
$("#smart_answer").addClass("hide");
$("#smart_col").addClass("hide");
function pretty(data){
try{
var temp=data.split("_");
var tt="";
$.each(temp,function(index,element){

	tt+=" "+element.capitalizeMe();

});
return tt.trim();
}
catch(err){
return "";
}
}
function itr(o){
if(typeof(o)==="object"){
	return itr(o[0]);

}
else{

	return o;
}

}
                                var prnt = $();
                                $.each(window.SA[0], function(k, v) {
                                if(k!=="properties"){
                                    var t = $("<td class=\"neo_key\"></td>");
                                    var d = $("<td class=\"neo_val\"></td>");
                                    var m = $("<tr></tr>");
                                    t.html("<h5>"+pretty(k)+"</h5>");
                                    if(typeof(v)==="object"){
                                    	if(v.length===1){
                                    		d.text(v[0]);
                                    	}
                                    	else{
                                    		d.html(itr(v)+"<a name=\""+k+"\" class=\"neo_more\" href=\"#\">More</a>");
                                    	
                                    	}
                                    	m.append(t).append(d);
                                    }
                                    else{
                                    d.text(v);
                                    m.append(t).append(d);
                                    }
                                    prnt = prnt.add(m);
				}

                                });
                                $("#smart_col").html("<div class=\"neo_module wiki_module module \"></div>");
                                $(".neo_module").append("<h2 class=\"neo_head\">"+window.SA[0]["properties"][0]["name"]+"</h2>").append($("<table class=\"table-responsive neo_table\"></table>").append($("<tbody></tbody>").append(prnt)));
                                    $("#smart_answer").addClass("hide");
				$("#smart_col").removeClass("hide");

})();

