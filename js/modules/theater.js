function main(){
if($("#theater").length===0){
var theater=$("<div class=\"well alpha-blur\" style=\"border:0px;color:white;text-align:left;\" id=\"theater\">    <div class=\"container box\">        <div class=\"row\" style=\"height:100%;\">            <div class=\"col-lg-2 col-md-2\" style=\"height:100%;padding-left:0px;\"><img id=\"img_link\" style=\"display:block;margin-left:auto;margin-right:auto;\" class=\"\"/>            </div>            <div class=\"col-lg-5 col-md-5\" style=\"height:100%;margin-left:15px;\">                <div class=\"topcrop2\">                        <div class=\"moviedesc\">                            <div class=\"movietitle\"></div>     <div class=\"theatre_name\"></div>                     </div>                                                       <table class=\"minfo\" style=\"padding-top:10px;\"><td>Locations Available</td><td> <select id=\"loc\" style=\"margin-bottom:10px;\"> </select> </td></table>                    </div>                               <div class=\"\" style=\"padding-top:20px;\">                    <div class=\"table-responsive\">                        <table style=\"width:100%;\">                            <tbody class=\"time-table\">                                <tr style=\"height:30px;\">                                    <td>Theatre</td><td>                                    <td>Show Times</td><td>                                </td><td>                                <tr style=\"border-top:1px solid;width:100%;\">                                    <td>Udhayam</td><td>                                    <td>10.20am</td><td>                                    <td></td><td>                                    <td>2.30pm</td><td>                                    <td>4.30pm</td><td>                                    <td>6.00pm</td><td>                                </td><td>                                <tr style=\"height:30px;\">                                    <td>AGS</td><td>                                    <td></td><td>                                    <td>10.20am</td><td>                                    <td></td><td>                                    <td>4.30am</td><td>                                </td><td>                                <tr style=\"height:30px;\">                                    <td>Albert</td><td>                                    <td>8.20am</td><td>                                    <td>10.00am</td><td>                                    <td>1.30pm</td><td>                                    <td>3.30pm</td><td>                                    <td>6.00pm</td><td>                                </td><td>                            </tbody>                        </table>                    </div>                </div>            </div>        </div>    </div>");
var m=window.val[0];
$("#predefined_questions").before(theater);
$("#loc").css({'color':'whitesmoke','background-color':'#2d2d2d'});
$("#img_link").attr("src",m["img_link"]);
$(".minfo").append("<tr style=\"height:30px;\"><td style=\"width:100px;\">Rating </td><td>"+m["rating"]+"</td></tr>");
$(".minfo").append("<tr style=\"height:30px;\"><td style=\"width:100px;\">Director </td><td>"+m["director"]+"</td></tr>");
+$(".minfo").append("<tr style=\"height:30px;\"><td style=\"width:100px;\">Duration </td><td>"+m["duration"]+"</td></tr>");
$(".minfo").append("<tr style=\"height:30px;\"><td style=\"width:100px;\">Release Date </td><td>"+m["rel_date"]+"</td></tr>");
$(".minfo").append("<tr style=\"height:30px;\"><td style=\"width:100px;\">Genre </td><td>"+m["genre"]+"</td></tr>");
$(".minfo").append("<tr style=\"height:30px;\"><td style=\"width:100px;\">City </td><td>"+m["city"]+"</td></tr>");
$(".minfo").append("<tr style=\"height:30px;\"><td style=\"width:100px;\">Language </td><td>"+m["language"]+"</td></tr>");
//$(".minfo").append("<tr style=\"height:30px;\"><td>Time </td><td>"+JSON.parse(m["times"].replace(/\\/g,"")).join(" ")+"</td></tr>");
$(".minfo").append("<tr style=\"height:30px;\"><td>Cast </td><td>"+m["cast"]+"</td></tr>");
console.log(m["avai_cities"]);

$("#loc").on('click',function(){

var city=$("#search").val().replace(m["city"],$("#loc option:selected").val());
	$.ajax({
                    async: true,
                    url: "/cgi-bin/new2/smart/getSmartAns.py",
		    data:{q:city},
                    dataType: 'text',
                    type: "GET",
                    error: function() {
                        //console.log("page not found");
                    }

                }).done(function(text){
			$("#theater").remove();
		        window.val=JSON.parse(text)["theatre"];
			main();


                });
});
$.each(m["avai_cities"].sort(),function(index,e){
if(e===m["city"]){
$("#loc").append("<option selected=\"\" value=\""+e+"\">"+e.capitalizeMe()+"</option>");
}
else{
$("#loc").append("<option value=\""+e+"\">"+e.capitalizeMe()+"</option>");
}
});
$(".minfo").parent().append("<div style=\"margin-top:35px;\">"+m["synopsis"]+"</div>");
$(".movietitle").css({'font-size':'25px','font-weight':'400','padding-bottom':'10px'});
$(".theatre_name").css({'font-size':'18px','font-weight':'400','padding-bottom':'10px'});

$(".movietitle").text(m["moviename"].capitalizeMe());
$(".theatre_name").text(m["theatrename"].filter().capitalizeMe());
$(".time-table").find("td").css({'padding-top':'10px','padding-bottom':'10px'});
$("#smart_answer").addClass("hide");
$("#smart_col").removeClass("hide");
}
}
main();
