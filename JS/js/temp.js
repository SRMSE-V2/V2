$(document).ready(function(){

	$.get('/cgi-bin/getCurrency.py',{},function(data){
		var response = JSON.parse(data);
		showDetails(response);
	});
});
