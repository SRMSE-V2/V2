(function(){
var MODAL=$('<!--  Modal  -->  <div  class="modal  fade"  id="myModal"  tabindex="-1"  role="dialog"  aria-labelledby="myModalLabel"  aria-hidden="true">  <div  class="modal-dialog">  <div  class="modal-content">  <div  class="modal-header">  <h3  class="modal-title"  id="myModalLabel">Feedback</h3>  </div>  <div  class="modal-body">  <div  class="container-fluid">  <div  class="row">  <div  class="col-lg-12">  <form>  <div  class="form-group">  <label  for="Name">Name</label>  <input  type="text"  class="form-control"  id="name"  placeholder="Name">  </div>  <div  class="form-group">  <label  for="Email">Email  address</label>  <input  type="email"  class="form-control"  id="email"  placeholder="Enter  email">  </div>  <div  class="form-group">  <table  id="moreBad"  >  <tr  style="font-size:14px;">  <th>Queries  Tried</th>  <th>Satisfactory  Results?</th>  </tr>  <tr  class="td_row">  <td  style="padding-top:8px;width:70%;">  <input  type="text"  class="form-control  query"  placeholder="Query">  </td>  <td  style="padding:8px  0px  0px  10px;width:30%;">  <div  class="form-inline">  <div  class="radio">  <label><input  class="y_n"  type="radio"  name="optionsRadios1"  id="Yes"  value="Yes" checked="checked">Yes  &nbsp  &nbsp  </label>  </div>  <div  class="radio">  <label><input  class="y_n"  type="radio"  name="optionsRadios1"  id="No"  value="No">No</label>  </div>  </div>  </td>  </tr></table><table>  <tr>  <td  style="padding-top:10px;"><button  id="more_btn"  type="button"  class="btn  btn-success  glyphicon  glyphicon-plus"></button></td>  <tr>  </table>  </div>  <textarea  class="form-control"  id="feedback_comments"  placeholder="  Any  comments  !"  rows="6"  cols="72"></textarea>  </form>  </div>  </div>  </div>  </div>  <div  class="modal-footer">  <button  type="button"  class="btn  btn-default"  data-dismiss="modal">Close</button>  <button  type="button"  class="btn  btn-primary"  id="save_btn">Submit</button>  </div>  </div>  </div>  </div>');
$("body").append(MODAL);
   $("#more_btn").on("click", function() {
                var num = parseInt($(".y_n").attr("name").replace("optionsRadios", "").trim()) + 1;
                $(".y_n").removeClass("y_n");
                var new_row = $("<tr> <td style=\"padding-top:8px;width:70%;\"> <input type=\"text\" class=\"form-control query\" placeholder=\"Query\"> </td> <td style=\"padding:8px 0px 0px 10px;width:30%;\"> <div class=\"form-inline\"> <div class=\"radio\"> <label><input class=\"y_n\" type=\"radio\" name=\"optionsRadios" + num + "\" id=\"Yes\" value=\"Yes\" checked=\"checked\" >Yes &nbsp &nbsp </label> </div> <div class=\"radio\"> <label><input class=\"y_n\" type=\"radio\" name=\"optionsRadios" + num + "\" id=\"No\" value=\"No\">No</label> </div> </div> </td> </tr>");
                $("#moreBad").append(new_row);
		
            });
      $("#email").on("focusout", function() {

                if (!validateEmail($(this).val())) {
                    alertBox("#fcf8e3", "<strong>Warning !</strong> Better check yourself, you're email address not looking too good.  !!!");
                    $(this).val("");
                }

            });

            
            $("#save_btn").on("click", function() {
                var fk = {};
                var queries = [];
                var i = 0;
                var EXIT=false;
                $.each($(".query"), function() {
                    i += 1;
                    var temp = {};
                    temp["status"] = $("input[name=optionsRadios" + i + "]:checked").val();
                    temp["query"] = $(this).val();
                    if(temp["query"]===""){
                	alertBox("#fcf8e3", "<strong>Warning !</strong> Better check yourself, you have empty queries  !!!");
                    $(this).val("");
                    EXIT=true;
                    return;
                
                }
                    
                    queries.push(temp);

                });
                
                fk["email"] = $("#email").val();
                   if (!validateEmail(fk["email"])) {
                    alertBox("#fcf8e3", "<strong>Warning !</strong> Better check yourself, you're email address not looking too good.  !!!");
                    $("#email").val("");
                    return;
                }

                fk["name"] = $("#name").val();
                if(fk["name"]===""){
                	alertBox("#fcf8e3", "<strong>Warning !</strong> Better check yourself, you're name not looking too good.  !!!");
                    $("#name").val("");
                    return;
                
                }
                if(EXIT){
                	return;
                }
                fk["queries"] = queries;
                fk["feedback"] = $("#feedback_comments").val();
                console.log(fk);


                $.ajax({
                    async: true,
                    url: "/cgi-bin/feedback.py",
                    data: {
                        feedback: JSON.stringify(fk)
                    },
                    dataType: 'text',
                    type: "GET",
                    error: function() {
                        //some error
                    }

                }).done(function(text) {
                    text = text.trim();
                    if (text === "SUCCESS") {
                        alertBox("#dff0d8", "<strong>Thank You !</strong> Your response has been saved !!!");

                    } else if (text === "DUPLICATE") {
                        alertBox("#f1dddd", "<strong>Duplicate!</strong> email address  !!!");
                    } else if (text === "WRONG") {
                        alertBox("#f1dddd", "<strong>Oops</strong> Something Went Wrong !!!");
                    }


                });
            });
                   function validateEmail(sEmail) {
                var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                if (filter.test(sEmail)) {

                    return true;
                } else {

                    return false;
                }
            }
        function alertBox(color, text) {
                var alert = $("<div class=\"alert\" style=\"border-radius:4px;background-color:" + color + ";opacity:0;position:absolute;padding-top:15px;z-index:1100;height:50px;text-align:center;width:40%;left:30%;top:70%;\">" + text + "</div>");

                $("body").append(alert);
                $(".alert").animate({
                    opacity: 1.0
                }, 2000, function() {

                    setTimeout(function() {
                        $(".alert").animate({
                            opacity: 0
                        }, 1000, function() {
                            $(".alert").remove();
                        });

                    }, 2000);


                });


            }

})();


