/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 
 
 #bug 1: No more results color
 #bug 2:Create new nav bar for clusters
 */


$(document).ready(function(){
    window.i=0;
    window.j=20;
    IDS=[];
    window.trains=[]
    window.ctrain=0;
    window.results=true;
    $("#train_prev").addClass("hide");
    
    
    var load=$("<div id=\"loading\" style=\"background-color:#333333;\"><img src=\"/test1/images/ajax-loader.gif\" width=\"20\" height=\"20\"/></div>");
    
    
    $("#train").on("click","#train_next",function(){
    if(window.ctrain===(window.trains.length-2)){
    $("#train_next").addClass("hide");
    
    }
       else if(window.trains.length>0 && window.ctrain<(window.trains.length-1)){
       ++window.ctrain;
       console.log(window.ctrain);
       var val=window.trains[window.ctrain];
       $("#train_prev").removeClass("hide");
       var desc=val['Description'];
var status=val['Status'];
var status_description=val['Status Description'];
var train_name=val['Train Name'];
var source=val['Description'].replace("Departed from","").trim().split("at")[0];
var dest=val['Description'].split("Destination")[1].split("at")[0];
console.log(dest);
console.log(source);
console.log(train_name);
var src_time=val['Description'].split(' at ')[1].split('on')[0];
var dest_time=val['Description'].split(' at ')[2].split('on')[0];
$("#train_source").html(source.replace("(","<h6>(").replace(")",")</h6>"));
var date1=val['Description'].split(',')[0].split("on")[1].trim();
var month1=val['Description'].split(',')[1];
var date2=val['Description'].split(",")[2].split(" at ")[1].split("on")[1].trim();
var month2=val['Description'].split(",")[3].trim();
console.log(date2+" "+month2);
$("#dest_time").text(dest_time+" "+date2+" "+month2);
console.log(src_time);
console.log(dest_time);
$("#src_time").text(src_time+" "+date1+" "+month1);
var statustrain=val["Status Descrition"];
//Will do later
$("#train_dest").html(dest.replace("(","<h6>(").replace(")",")</h6>"));
$("#train_time").text(status);
$("#train_name").text(train_name);
                             $("#train").removeClass("hide");
                             $("#smart_answer").addClass("hide");
       }
    
    });
    
    
    $("#train").on("click","#train_prev",function(){
    
    if(window.ctrain!==(window.trains.length-1)){
    $("#train_next").removeClass("hide");
    }
    
       if(window.trains.length>0 && window.ctrain<window.trains.length && window.ctrain!==0){
       
       
       --window.ctrain;
       console.log(window.ctrain);
       val=window.trains[window.ctrain];
       var desc=val['Description'];
var status=val['Status'];
var status_description=val['Status Description'];
var train_name=val['Train Name'];
var source=val['Description'].replace("Departed from","").trim().split("at")[0];
var dest=val['Description'].split("Destination")[1].split("at")[0];
console.log(dest);
console.log(source);
console.log(train_name);
var src_time=val['Description'].split(' at ')[1].split('on')[0];
var dest_time=val['Description'].split(' at ')[2].split('on')[0];
$("#train_source").html(source.replace("(","<h6>(").replace(")",")</h6>"));
var date1=val['Description'].split(',')[0].split("on")[1].trim();
var month1=val['Description'].split(',')[1];
var date2=val['Description'].split(",")[2].split(" at ")[1].split("on")[1].trim();
var month2=val['Description'].split(",")[3].trim();
console.log(date2+" "+month2);
$("#dest_time").text(dest_time+" "+date2+" "+month2);
console.log(src_time);
console.log(dest_time);
$("#src_time").text(src_time+" "+date1+" "+month1);
var statustrain=val["Status Descrition"];
//Will do later
$("#train_dest").html(dest.replace("(","<h6>(").replace(")",")</h6>"));
$("#train_time").text(status);
$("#train_name").text(train_name);
                             $("#train").removeClass("hide");
                             $("#smart_answer").addClass("hide");
       }
       if(window.ctrain===0){
    $("#train_prev").addClass("hide");
    }
    
    });
    function navChanger(){
    //hides autocomplete dropdown on screen resize
    $(".ui-autocomplete").removeClass("show");
     if($(window).width()<=800){
       $(".side").removeClass("show");
       var newnav=$("<div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12 alpha-blur newside\"></div");
       newnav.height("150");
       $(".nav_changer").prepend(newnav);
    }
    else{
       $(".side").removeClass("hide");
       $(".newside").remove();
    }
    
    
    }
    navChanger();
    $(window).on("resize",navChanger);
    
    //clusters click event
    $(".nav-sidebar").on("click","a",function(){
    
    
    var old=$("#search").val();
    window.cluster=$(this).text();
    window.location="/cgi-bin/search.py?q="+$("#search").val().trim()+"&c="+window.cluster;
    
    });
    $("#predefined_questions").hover(function(){
        $("#collapsee").collapse('show');
        
    });
    $("#collapsee").on("mouseleave",function(){
        $("#collapsee").collapse('hide');
    });
    $("#search_btn").on("submit",function(){
        if($("#search").val().trim()!==""){
            var query=$("#search").val().trim();
            console.log("Query submitted");
            console.log(query);
            return true;
        }
    });
   
   
    $("#logo").on("click",function(){
        
        window.location="/test1/";
    });
    
    //click on suggested ques
    $("#collapsee").on("click","a",function(){
        var v=$(this).text();
        $("#search").val(v);
        $("#search").attr("value",v);
        window.location="/cgi-bin/search.py?q="+$("#search").val().trim()+"&c="+window.cluster;
    });
   /* $(".side").resizable({minWidth:10,maxWidth:200,handles:"e"});
    $(".side").resizable({
                        start: function(e, ui) {
                           $(".nav-sidebar .nav-sidebar>li>a").width($(".side").width());     
                    },
                    stop: function(e, ui) {
                           $(".nav-sidebar .nav-sidebar>li>a").width($(".side").width());     
                    },
                    resize: function(e, ui) {
                           $(".nav-sidebar .nav-sidebar>li>a").width($(".side").width());     
                    }
                });
                */
    function getIds(bool){
        
        if($("#search").val().trim()!==""){
          if(window.cluster===""){
          console.log("getIds q:"+$("#search").val().trim().toLowerCase());
                $.ajax({
                    async:bool,
                    url:"/cgi-bin/getIds.py?q="+$("#search").val().trim().toLowerCase(),
                    dataType:'text',
                    type:"GET",
                error: function() {
                  console.log( "page not found" );
                }

                }).done(function(text){
                      var arr=JSON.parse(text);
                      IDS=arr;
                     console.log(IDS);
                     

                });
          
          }
          else{
             console.log("getIds q:"+$("#search").val().trim().toLowerCase());
             console.log("getClusters c:"+$("#search").val().trim().toLowerCase());
                $.ajax({
                    async:false,
                    url:"/cgi-bin/getIds.py?q="+$("#search").val().trim().toLowerCase()+" "+window.cluster,
                    dataType:'text',
                    type:"GET",
                error: function() {
                  console.log( "page not found" );
                }

                }).done(function(text){
                      var arr=JSON.parse(text);
                      IDS=arr;
                     console.log(IDS);
                     

                });
          
          }
            
        }
        
    }          
    
    function getResults(i,j,bool){
            console.log("getResults q:"+$("#search").val().trim().toLowerCase());
            
            if(IDS && window.results){
            console.log("results   "+window.results);
                $.ajax({
                    url:"/cgi-bin/getResults.py",
                    dataType:'text',
                    type:"GET",
                    async:bool,
                    data:{q:""+IDS.slice(window.i,window.j).toString()},
                error: function() {
                  console.log( "error results" );
                  
                 load.remove();
                 var prnt=$("<div><span></span></div>");
                 prnt.width($("#search_results").width());
                               prnt.addClass("h6 text-center no-results");
                               prnt.text("No more results available");
                               load.remove();
                               $("#search_results").append(prnt);
                               window.results=false;
                   
                          
                }

                }).done(function(text){
                        console.log(text);
                      var arr=JSON.parse(text);
                      
                      if(arr[0]){
                          window.results=true;
                          window.i=window.i+20;
                          window.j=window.j+20;
                          var main=$();
                          $.each(arr,function(index,element){
                               var prnt=$("<div></div>");
                               prnt.addClass("search_result");
                               prnt.addClass("alpha-blur");
                               prnt.css("padding","20px");
                               prnt.css("clear","both");
                               var title=$("<div style=\"display:block;\"></div>");
                               title.css("padding-bottom","10px");
                               titlea=$("<a></a>");
                               titlea.addClass("search_title");
                               titlea.attr("href",element["url"]);
                               titlea.text(element["title"]);
                               title.append(titlea);
                               var hold=$("<div style=\"display:table-cell;\"></div>");
                               var imgspan=$("<div style=\"float:left;padding-right:5px;\"><img src=\"http://www.google.com/s2/favicons?domain="+element['url']+"\" width=20 height=20/></div>");
                               var span=$("<div style=\"float:left;\"></div>");
                               span.addClass("search_green truncate");
                               span.text(element["url"]);
                               hold.append(imgspan);
                               hold.append(span);
                               var p=$("<p></p>");
                               p.addClass("search_info");
                               p.text(element["description"]);
                               prnt.append(title);
                               prnt.append(hold);
                               prnt.append($("</br>"));
                               prnt.append(p);
                               prnt.append($("</br>"));
                               main=main.add(prnt);
                              
                              
                              
                          });
                          $("#search_results").append(main);
                          $("#loading").remove();
                          $(window).scroll(bindScroll);
                      }
                      else{
                          console.log("No results !");
                          if(window.results){
                              load.remove();
                              var prnt=$("<div><span></span></div>");
                              prnt.width($("#search_results").width());
                               prnt.addClass("h6 text-center no-results");
                               prnt.text("No more results available");
                               $("#search_results").append(prnt);
                               window.results=false;
                          }
                               
                      }
                     

                });
                
            }
                
        
        
    }
    function bindScroll(){
        if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
           $(window).unbind('scroll');
           if(window.results)
           {
                    $("#search_results").append(load);
                    $("#loading").width($("#search_results").width());
                  setTimeout(function(){getResults(i,j,true);},1000);
           
           }
           
    }
    
    }
    function getSuggestedQuestions(){
        if($("#search").val().trim()!==""){
            console.log("getSuggestedQuestions q:"+$("#search").val().trim().toLowerCase());
                $.ajax({
                    async:false,
                    url:"/cgi-bin/getQuestions.py",
                    dataType:'text',
                    type:"GET",
                    data:{q:$("#search").val().trim().toLowerCase()},
                error: function() {
                  console.log( "err suggested" );
                  $("#predefined_questions").removeClass("show");
                }

                }).done(function(text){
                      var arr=JSON.parse(text);
                      if(arr.length>0){
                          var prnt=$();
                          $.each(arr,function(index,element){
                              var a=$("<a></a>");
                              a.addClass("list-group-item");
                              a.addClass("list-group-item");
                              a.attr("href","#");
                              a.text(element);
                              prnt=prnt.add(a);
                          });
                          $("#collapsee").append(prnt);
                      }
                      else{
                          console.log("No suggested questions !");
                          $("#predefined_questions").removeClass("show");
                      }
                     

                });
        }
        
    }
    function getSmartAns(){
        if($("#search").val().trim()!==""){
            console.log("getSmartAns q:"+$("#search").val().trim().toLowerCase());
                $.ajax({
                    async:false,
                    url:"/cgi-bin/new2/smart/getSmartAns.py",
                    dataType:'text',
                    type:"GET",
                    data:{q:$("#search").val().trim().toLowerCase()},
                error: function() {
                  console.log( "error smart ans" );
                  $("#smart_answer").removeClass("show");
                }

                }).done(function(textt){
                      var js=JSON.parse(textt.replace(/\n/g,"").trim());
                      if(!$.isEmptyObject(js)){
                          console.log(js.length);
                          $.each(js,function(key,val){
                          
                          switch(key){
                          
                          case "general":
                              var prnt=$();
                              $.each(val,function(k,v){
                                   var t=$("<span class=\"h5\"></span>");
                                   var d=$("<span class=\"h5\"></span>");
                                   var m=$("<p></p>");
                                   t.html("<b>"+capitalizeMe(k.replace("_"," ")+" : ")+"</b>");
                                   d.text(capitalizeMe(v.replace("_"," ")));
                                   m.append(t);
                                   m.append(d);
                                   prnt=prnt.add(m);
                                   $("#smart_answer").append(prnt);
                                   $("#smart_answer").removeClass("hide");
                              
                              
                              });
                          break;
                         case "sports":
                         var patt=/\d+/;
                         console.log(val);
                             var batsmen_1_score=val["Batting"].split("&")[0].match(patt)[0];
                             var batsmen_1_name=val["Batting"].split("&")[0].replace(batsmen_1_score,"").trim();
                             var batsmen_2_score=val["Batting"].split("&")[1].match(patt)[0];
                             var batsmen_2_name=val["Batting"].split("&")[1].replace(batsmen_2_score,"").trim();
                             var team1=val["General"].split("/",1)[0].replace(val["General"].split("/",1)[0].trim().match(patt)[0],"");
                             var team2=val["General"].split(" v ")[1].replace(val["General"].split(" v ")[1].trim().match(patt)[0],"");
                             team2=team2.split("/",1)[0];
                             var team1score=val["General"].split(" v ")[0].replace(team1,"").trim();
                             var team2score=val["General"].split(" v ")[1].replace(team2,"").trim();
                             var team2=val["General"].split(" v ")[1].split(" ")[0];
                             var title1=val["General"].split(" v ")[0];
                             var title2=val["General"].split(" v ")[1];
                             var bowling=val["Bowling"];
                             var overs=val["Overs"];
                             var description="<b>"+val["Status"]+"<br/><br/>"+val["Description"];
                             $("#bat1").text(batsmen_1_name+"*");
                             $("#bat2").text(batsmen_2_name);
                             $("#bat1score").text(batsmen_1_score);
                             $("#bat2score").text(batsmen_2_score);
                             $("#sport_desc").html(description);
                             $("#bowl").text(bowling);
                             $("#overs").text("Overs "+overs);
                             $("#sport_title1").text(team1);
                             console.log(team2);
                             $("#sport_title2").text(team2);
                             $("#team1score").text(team1score);
                             $("#team2score").text(team2score);
                             $("#sports").removeClass("hide");
                             $("#smart_answer").addClass("hide");
                         break;
                         case "stocks":
                             $("#stocks").removeClass("hide");
                             $("#smart_answer").addClass("hide");
                         break;
                         case "train":
                         window.trains=val;
                        val=val[0];
                        
var desc=val['Description'];
var status=val['Status'];
var status_description=val['Status Description'];
var train_name=val['Train Name'];
var source=val['Description'].replace("Departed from","").trim().split("at")[0];
var dest=val['Description'].split("Destination")[1].split("at")[0];
console.log(dest);
console.log(source);
console.log(train_name);
var src_time=val['Description'].split(' at ')[1].split('on')[0];
var dest_time=val['Description'].split(' at ')[2].split('on')[0];
$("#train_source").html(source.replace("(","<h6>(").replace(")",")</h6>"));
var date1=val['Description'].split(',')[0].split("on")[1].trim();
var month1=val['Description'].split(',')[1];
var date2=val['Description'].split(",")[2].split(" at ")[1].split("on")[1].trim();
var month2=val['Description'].split(",")[3].trim();
console.log(date2+" "+month2);
$("#dest_time").text(dest_time+" "+date2+" "+month2);
console.log(src_time);
console.log(dest_time);
$("#src_time").text(src_time+" "+date1+" "+month1);
var statustrain=val["Status Descrition"];
//Will do later
$("#train_dest").html(dest.replace("(","<h6>(").replace(")",")</h6>"));
$("#train_time").text(status);
$("#train_name").text(train_name);
                             $("#train").removeClass("hide");
                             $("#smart_answer").addClass("hide");
                         break;
                         
                         case "weather":

var city=val['City'];
var max=val['Maximum'];
var min=val['Minimum'];
var moonrise=val['Moonrise'];
var moonset=val['Moonset'];
var rainfall=val['Rainfall'];
var today_sunset=val['Today_Sunset'];
var tomorow_sunrise=val['Tomorrow_Sunrise'];              
var forecast=val['forecast'];             $("#weather").removeClass("hide");
                             $("#smart_answer").addClass("hide");
                         break;
                         
                         default:
                             $("#smart_answer").addClass("hide");
                         
                         
                          }
                          
                          });
                      }
                      else{
                          console.log("No smart  ans questions !");
                          $("#smart_answer").addClass("hide");
                      }
                     

                });
        }
        
    }
    function getClusters(){
        if($("#search").val().trim()!==""){
            console.log("getClusters q:"+$("#search").val().trim().toLowerCase());
                $.ajax({
                    async:false,
                    url:"/cgi-bin/getClusters.py",
                    dataType:'text',
                    type:"GET",
                    data:{q:$("#search").val().trim().toLowerCase()},
                error: function() {
                  console.log( "error clusters" );
                 // $(".side").removeClass("show");
                }

                }).done(function(textt){
                      var arr=JSON.parse(textt);
                      if(arr.length>0){
                          var main=$();
                          $.each(arr,function(index,element){
                              var li=$("<li></li>");
                              var a=$("<a></a>");
                              a.attr("href","#");
                              a.text(element);
                              li.append(a);
                              main=main.add(li);
                              
                              
                          });
                          $(".nav-sidebar").append(main);
                      }
                      else{
                       //   $(".side").removeClass("show");
                      }
                     

                });
        }
        
    }
    
    function capitalizeMe(val){
return val.charAt(0).toUpperCase()+val.substr(1).toLowerCase();
}
    
    //fix scroll later
    $(window).bind('scroll',bindScroll);
    getIds(false);
    getResults(window.i,window.j,false);
    getSuggestedQuestions();
    getSmartAns();
    getClusters();
});

 $(document).ready(function(){
        $("#weather_details,#sports_details").hide();
   
    $("#weather_button").click
    (
        function()
        {
            $("#weather_details").slideToggle();
            
        }
    );
    $("#sports_button").click
    (
        function()
        {
            $("#sports_details").slideToggle();
            
        }
    );
          
    });
