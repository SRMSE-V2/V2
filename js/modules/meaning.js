var meaning=$("<div class=\"well alpha-blur\" style=\"border:0px;color:white;text-align:left;\" id=\"dictionary\"> <h2 id=\"dict_keyword\" style=\"margin:0px;\"><b>zoneless</b></h2> <h4 id=\"dict_noun\"><i>noun</i><h5 id=\"dict_noun_meaning\"></h5> <h5 id=\"dict_noun_meaning\"></h5> <h5 id=\"dict_noun_meaning\"></h5> <h5 id=\"dict_noun_meaning\"></h5> </h4> <div id=\"dict_details\" style=\"padding-top:0px\"> <hr></div> <button class=\"btn-group btn-group-xs btn btn-primary\" id=\"dict_button\" style=\"color:white;\"> <span class=\"glyphicon glyphicon-th-list\" aria-hidden=\"true\"></span> Verbs, synonyms etc</button> </div>");
$("#predefined_questions").before(meaning);
$("#dict_details").hide();
$("#dict_button").click ( function() { $("#dict_details").slideToggle(); } );
$("#smart_answer").addClass("hide");
$("#smart_col").removeClass("hide");
