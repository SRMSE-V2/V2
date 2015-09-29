(function(){
var MOVIE=$("<div class=\"row wiki_module module\" id=\"movie\">                     <div class=\"row\">                        <div class=\"col-lg-5 col-md-5 col-sm-5\" ><img src=\"\" class=\"movie_poster full-height full-width\">                        </div>                         <div class=\"col-lg-7 col-md-7 col-sm-7\">                           <div class=\"well no-back movie_name\">                              <h3><b></b></h3>                           </div>                           <ul class=\"list-group \" style=\"border:0px;text-align:left;\"> <li class=\"list-group-item no-back movie_rating\"></li>                              <li class=\"list-group-item no-back movie_director\"></li>                              <li class=\"movie_producer list-group-item no-back\" ></li>                              <li class=\"list-group-item no-back movie_writer\"></li>                              <li class=\"list-group-item no-back movie_editor\"></li>                              <li class=\"list-group-item no-back movie_cinematography\"></li>                              <li class=\"list-group-item no-back movie_music\"></li>                           </ul>                           <ul class=\"list-group \" style=\"border:0px;text-align:left;\">                              <li class=\"list-group-item no-back movie_country\"></li>                              <li class=\"list-group-item no-back movie_runtime\"></li>                              <li class=\"list-group-item no-back movie_lang\"></li><li class=\"list-group-item no-back movie_distributor\"></li>                              <li class=\"list-group-item no-back\">                                 <button type=\"button\" class=\"btn btn-us movie_button\" style=\"border:0px;\">More</button>                              </li>                           </ul>                        </div>                     </div>                     <div class=\"row alpha-blur well movie_extra\" >                        <p class=\"movie_plot\"></p>                        <div class=\"table-responsive movie_cast\">                           <table class=\"table well alpha-blur\" style=\"color:white;text-align:center;border:0px;\">                              <thead>                                 <tr>                                    <th style=\"text-align:center\" colspan=\"4\">                                       <h4>Cast</h4>                                    </th>                                 </tr>                              </thead>                              <tbody class=\"movie_cast1\">                              </tbody>                           </table>                        </div>                        <div class=\"col-lg-12 col-md-12 col-sm-12\" style=\"text-align:center;\">                           <div class=\"btn-group\" role=\"group\" aria-label=\"...\">                              <button type=\"button\" class=\"btn btn-us movie_plot_button\" style=\"border:0px;\">Plot</button>                              <button type=\"button\" class=\"btn btn-us movie_cast_button\" style=\"border:0px;\" >Cast</button>                           </div>                        </div>                     </div></div>");
if($("#movie").length===0){
$("#smart_answer").addClass("hide");

                                MOVIE.find(".movie_name").setHtmlValue("<h2>" + window.SA["name"] + "</h2>",window.SA["name"]);
                                MOVIE.find(".movie_director").setHtmlValue("<b>Director : </b> <span>"+window.SA["director"]+"</span>",window.SA["director"]);
                                MOVIE.find(".movie_producer").setHtmlValue("<b>Producer : </b> <span>"+window.SA["producer"]+"</span>",window.SA["producer"]);
MOVIE.find(".movie_runtime").setHtmlValue("<b>Runtime : </b> <span>"+window.SA["runtime"]+"</span>",window.SA["runtime"]);

MOVIE.find(".movie_writer").setHtmlValue("<b>Writer : </b> <span>"+window.SA["writer"]+"</span>",window.SA["writer"]);
                                MOVIE.find(".movie_music").setHtmlValue("<b>Music : </b> <span>"+window.SA["music"]+"</span>",window.SA["music"]);
                                MOVIE.find(".movie_editor").setHtmlValue("<b>Editor : </b> <span>"+window.SA["editor"]+"</span>",window.SA["editor"]);
                                MOVIE.find(".movie_cinematography").setHtmlValue("<b>Cinematography : </b> <span>"+window.SA["cinematography"]+"</span>",window.SA["cinematography"]);
                                MOVIE.find(".movie_country").setHtmlValue("<b>Country : </b> <span>"+window.SA["country"]+"</span>",window.SA["country"]);

                                MOVIE.find(".movie_lang").setHtmlValue("<b>Language : </b> <span>"+window.SA["language"]+"</span>",window.SA["language"]);
MOVIE.find(".movie_distributor").setHtmlValue("<b>Distributor : </b> <span>"+window.SA["distributor"]+"</span>",window.SA["distributor"]);
MOVIE.find(".movie_rating").setHtmlValue("<b>Rating : </b> <span>"+window.SA["rating"]+"</span>",window.SA["rating"]);
                                MOVIE.find(".movie_plot").setTextValue(window.SA["plot"]);
MOVIE.find(".movie_poster").attr("src",window.SA["image"]);

                                var cast = window.SA["cast"].split("\t");
                                var prnt = $();
                                var tr = $("<tr></tr>");
                                var tdd = [];
                                var count = 1;
                                $.each(cast, function(index, element) {
                                    //console.log(index);
                                    if (count % 4 === 0) {
                                        var t = $("<td></td>");
                                        t.html("<a class=\"cast_link\" target=\"_blank\" href=\"http://en.wikipedia.org/wiki/" + element + "\">" +element + "</a>");
                                        tdd.push(t);

                                        $.each(tdd, function(i, e) {
                                            tr.append(e);

                                        });
                                        tdd = [];
                                        prnt = prnt.add(tr);
                                        tr = $("<tr></tr>");

                                    } else {
                                        //console.log("else");
                                        var t = $("<td></td>");
                                        t.html("<a class=\"cast_link\" target=\"_blank\" href=\"http://en.wikipedia.org/wiki/" + element + "\">" + element + "</a>");
                                        tdd.push(t);
                                        //console.log(tdd);



                                    }
                                    count++;

                                });
                                MOVIE.find(".movie_cast1").append(prnt);

cycle3=0;
MOVIE.find(".movie_cast").hide();

    MOVIE.find(".movie_extra").hide();
    MOVIE.find(".movie_cast_button").click(
        function() {
            MOVIE.find('.movie_plot').slideToggle();
            MOVIE.find('.movie_cast').slideToggle();
        }
    );
    MOVIE.find(".movie_plot_button").click(
        function() {
            MOVIE.find('.movie_plot').slideToggle();
            MOVIE.find('.movie_cast').slideToggle();
        }
    );
    MOVIE.find(".movie_button").click(
        function() {

if(cycle3===0){
	    		MOVIE.find('.movie_extra').slideToggle();
                        $(this).text("Less");
			++cycle3;
			}
		else{
			MOVIE.find('.movie_extra').slideToggle();
$(this).text("More");
			cycle3=0;
		}


        }
    );
    $("#centre_parent").prepend(MOVIE);
    $("#smart_col").removeClass("hide");
}

})();
