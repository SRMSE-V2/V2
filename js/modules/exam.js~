(function(){
var EXAM=$("<div id=\"exams\" class=\"wiki_module module\" style=\"margin-top:20px;border:0px;color:white;\"><div class=\"row\"><div class=\"col-lg-12\" style=\"text-align:center;\"><img class=\"book\" src=\"\" height=\"62\" width=\"65\"></div></div><div class=\"row\" class=\"exam_name\" style=\"text-align:center;\"><h3><span></span></h3></div><div class=\"row exam_full_name\" style=\"text-align:center;\"><span><b></b></span></div><div class=\"exam_course\" style=\"text-align:center;\"><b>Course - </b><span></span></div><div class=\"row exam_pattern\" style=\"text-align:center;\"><b>Pattern - </b><span></span></div> <div class=\"row exam_date\" style=\"text-align:center;\"><b>Date - </b><span></span></div><div class=\"row\" style=\"text-align:center;\"><div class=\"col-lg-12 colleges\"><ul class=\"list-group\"><br></ul></div></br><button style=\"color:white;\" class=\"btn-group btn-group-xs btn btn-us glyphicon glyphicon-chevron-down exams_button\" style=\"color:black;top:5px;\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Click to see more\"></button> </div></div>");
if($("#exams").length===0){
EXAM.find(".book").attr("src","/images/book.png");
                            EXAM.find("#smart_answer").addClass("hide");
                            
                                EXAM.find(".exam_name > h3 >span").text(window.SA["name"]);
                                EXAM.find(".exam_full_name >span >b").text(window.SA["fullform"]);
                                EXAM.find(".exam_course>span").text(window.SA["course"]);
                                EXAM.find(".exam_pattern>span").text(window.SA["pattern"]);
                                EXAM.find(".exam_date>span").text(window.SA["date"]);
                                $.each(JSON.parse(window.SA["colleges"]),function(index,element){

                                EXAM.find(".colleges >ul").append($("<li class=\"list-group-item alpha-blur\">"+element.capitalizeMe()+"</li>"));




});
cycle2=0;
 EXAM.find(".exams_button").click(
        function() {
		EXAM.find(".exams_button").toggleClass("glyphicon-chevron-down glyphicon-chevron-up");

            EXAM.find(".colleges").slideToggle(function(){
    		if(cycle2===0){
	    		EXAM.find(".exams_button").attr("title","Click to see less");
			++cycle2;
			}
		else{
			EXAM.find(".exams_button").attr("title","Click to see more");

			cycle2=0;
		}
});
});
$("#smart_col").html("").append(EXAM);
$("#smart_col").removeClass("hide");
}
})();

