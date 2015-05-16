

//var x = document.getElementById("coords");
		var latitude, longitude, data;
        window.locentric = "";
        function getLocation() {
    		if (navigator.geolocation) {
        		navigator.geolocation.getCurrentPosition(showPosition);
    	} 	
    	else { 
        	alert("Geolocation is not supported by this browser.");
    		}
    		
		}

       


		
        function showPosition(position) {
    		
    			
                latitude = position.coords.latitude;//Getting latitude.
    			longitude = position.coords.longitude;//Getting Longitude.
var now=new Date();
		var time=now.getTime();
	time+=3600*1000;
now.setTime(time);
    		document.cookie="latitude="+latitude+";expires="+now.toUTCString();
    		document.cookie="longitude="+longitude+";expires="+now.toUTCString();	
		

                var data_pass = {"lat":latitude, "long":longitude};

                if(window.getSmartAns){window.getSmartAns();}//calling smart ans again if location was not with us beforehand
		}
		$(document).ready(function(){
                getLocation(); 
        });
        
