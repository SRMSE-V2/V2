$(document).ready(function(){
    
    //-----------------------------Vertical 1--------------------------
         
            
              var v1 = '[{"name":"Ketul Patani","img":"images/v1/ketul.jpg","desc":"Vertical Head"},{"name":"Devaraj Phukan","img":"images/v1/devaraj.jpg","desc":""},{"name":"Tasdik Rahman","img":"images/v1/tasdik.JPG","desc":""},{"name":"Lokendra Singh","img":"images/loki.jpg","desc":""}]';
              var lang1 = '';
              var obj = $.parseJSON(v1);
              $.each(obj, function() 
              {
                  lang1 += '<div class="col s8 offset-s2 m4 offset-m1 l3 animated fadeIn"><div class="card"><div class="card-image waves-effect waves-block waves-light"><img class="activator responsive-img" src="' + this['img'] + '"><span class="card-title"><h6>' + this['desc'] + '</h6></span></div><div class="card-content"><span class="activator grey-text text-darken-4">' + this['name'] + '</span></div></div></div>';
                  
              });
            var v1c=0;
            $(".sid1").hide();
            $('.sid1').html(lang1);
            $(".sid1").find("img").on("load",function(){
                  v1c+=1;
                  if(v1c===JSON.parse(v1).length){
                    $(".sid1-loader").hide();
                    $(".sid1").show();
                }
            });
            
            
    
    //----------------------------Vertical 2-----------------------------  
     $('#b2').click(function(){
         
              var v2 = '[{"name":"Tilak Patidar","img":"images/v2/tilak.jpg","desc":"Vertical Head"},{"name":"Siddharth Kulkarni","img":"images/v2/sid.jpg","desc":"Web Design"},{"name":"Andrew Gates","img":"images/v2/gates.jpg","desc":"Web Design"},{"name":"Pratik Shenoy","img":"images/v2/pratik.jpg","desc":"Web Design"},{"name":"Varun Dey","img":"images/v2/varun.jpg","desc":"Web Development"}]';
              var lang2 = '';
              var obj = $.parseJSON(v2);
              $.each(obj, function() 
              {
                  lang2 += '<div class="col s8 offset-s2 m4 offset-m1 l3 animated fadeIn"><div class="card"><div class="card-image waves-effect waves-block waves-light"><img class="activator responsive-img" src="' + this['img'] + '"><span class="card-title"><h6>' + this['desc'] + '</h6></span></div><div class="card-content"><span class="activator grey-text text-darken-4">' + this['name'] + '</span></div></div></div>';
              });
               var v2c=0;
            $(".sid2").hide();
            $('.sid2').html(lang2);
            $(".sid2").find("img").on("load",function(){
                  v2c+=1;
                  if(v2c===JSON.parse(v2).length){
                    $(".sid2-loader").hide();
                    $(".sid2").show();
                }
            });
     });
    
    //-----------------------------Vertical 3--------------------------------
    $('#b3').click(function(){
        
        var v3 = '[{"name":"B Sudershan","img":"images/v3/sudershan.jpg","desc":""},{"name":"Chinmay Kapoor","img":"images/v3/chinmay.jpg","desc":""},{"name":"Sai Prashanth","img":"images/v3/prashant.jpg","desc":"Vertical Head"},{"name":"Vageeswaran","img":"images/v3/vagee.jpg","desc":""},{"name":"Tilak Patidar","img":"images/v2/tilak.jpg","desc":""},{"name":"Anmol Sachan","img":"images/v3/anmol.jpg","desc":""},{"name":"Akhil Gupta","img":"images/v3/akhil.jpg","desc":""}]';
              var lang3 = '';
              var obj = $.parseJSON(v3);
              $.each(obj, function() 
              {
                  lang3 += '<div class="col s8 offset-s2 m4 offset-m1 l3 animated fadeIn"><div class="card"><div class="card-image waves-effect waves-block waves-light"><img class="activator responsive-img" src="' + this['img'] + '"><span class="card-title"><h6>' + this['desc'] + '</h6></span></div><div class="card-content"><span class="activator grey-text text-darken-4">' + this['name'] + '</span></div></div></div>';
              });
              var v3c=0;
            $(".sid3").hide();
            $('.sid3').html(lang3);
            $(".sid3").find("img").on("load",function(){
                  v3c+=1;
                  if(v3c===JSON.parse(v3).length){
                    $(".sid3-loader").hide();
                    $(".sid3").show();
                }
            });
    });
    
      //-----------------------------Vertical 4--------------------------------
    $('#b4').click(function(){
        
        var v4 = '[{"name":"Vageeswaran","img":"images/v3/vagee.jpg","desc":"Vertical Head"},{"name":"Sai Prashanth","img":"images/v3/prashant.jpg","desc":""},{"name":"Akshay Gugnani","img":"images/v4/akshayg.jpg","desc":""},{"name":"Ayush Aggarwal","img":"images/v4/ayushagg.jpg","desc":""},{"name":"Rishav Medhi","img":"images/v4/rishav.jpg","desc":""}]';
              var lang4 = '';
              var obj = $.parseJSON(v4);
              $.each(obj, function() 
              {
                  lang4 += '<div class="col s8 offset-s2 m4 offset-m1 l3 animated fadeIn"><div class="card"><div class="card-image waves-effect waves-block waves-light"><img class="activator responsive-img" src="' + this['img'] + '"><span class="card-title"><h6>' + this['desc'] + '</h6></span></div><div class="card-content"><span class="activator grey-text text-darken-4">' + this['name'] + '</span></div></div></div>';
              });
             var v4c=0;
            $(".sid4").hide();
            $('.sid4').html(lang4);
            $(".sid4").find("img").on("load",function(){
                  v4c+=1;
                  if(v4c===JSON.parse(v4).length){
                    $(".sid4-loader").hide();
                    $(".sid4").show();
                }
            });
    });
    
    
      //-----------------------------Vertical 5--------------------------------
    $('#b5').click(function(){
        
        var v5 = '[{"name":"Shrijata Mukherjee","img":"images/pr/shrijata.jpg","desc":""},{"name":"G Chaitanya Sai","img":"images/pr/chaitanya.jpg","desc":""},{"name":"Vaibhav Sharma","img":"images/pr/vaibhav.jpg","desc":""},{"name":"Shreya Surana","img":"images/pr/shreyasurana.jpg","desc":""},{"name":"Parth Dixit","img":"images/pr/parth.jpg","desc":""},{"name":"Ihit Srivastava","img":"images/ihit.jpg","desc":""}]';
              var lang5 = '';
              var obj = $.parseJSON(v5);
              $.each(obj, function() 
              {
                  lang5 += '<div class="col s8 offset-s2 m4 offset-m1 l3 animated fadeIn"><div class="card"><div class="card-image waves-effect waves-block waves-light"><img class="activator responsive-img" src="' + this['img'] + '"><span class="card-title"><h6>' + this['desc'] + '</h6></span></div><div class="card-content"><span class="activator grey-text text-darken-4">' + this['name'] + '</span></div></div></div>';
              });
              var v5c=0;
            $(".sid5").hide();
            $('.sid5').html(lang5);
            $(".sid5").find("img").on("load",function(){
                  v5c+=1;
                  if(v5c===JSON.parse(v5).length){
                    $(".sid5-loader").hide();
                    $(".sid5").show();
                }
            });
    });
      
});
