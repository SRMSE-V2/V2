var countries=['Mauritian Rupee', 'Bruneian Dollar', 'Botswana Pula', 'Bulgarian Lev', 'Chinese Yuan Renminbi', 'Thai Baht', 'Japanese Yen', 'Swedish Krona', 'Croatian Kuna', 'Brazilian Real', 'Nepalese Rupee', 'US Dollar', 'Qatari Riyal', 'Mexican Peso', 'Indonesian Rupiah', 'Taiwan New Dollar', 'Canadian Dollar', 'Polish Zloty', 'Icelandic Krona', 'Trinidadian Dollar', 'Iranian Rial', 'Omani Rial', 'Malaysian Ringgit', 'Euro', 'Philippine Peso', 'Saudi Arabian Riyal', 'Libyan Dinar', 'Hungarian Forint', 'Australian Dollar', 'Venezuelan Bolivar', 'Indian Rupee', 'Argentine Peso', 'Swiss Franc', 'Kuwaiti Dinar', 'New Zealand Dollar', 'Chilean Peso', 'Pakistani Rupee', 'Singapore Dollar', 'Czech Koruna', 'Norwegian Krone', 'Danish Krone', 'Hong Kong Dollar', 'Bahraini Dinar', 'Russian Ruble', 'Romanian New Leu', 'Turkish Lira', 'Kazakhstani Tenge', 'South Korean Won', 'Emirati Dirham', 'Colombian Peso', 'Sri Lankan Rupee', 'Israeli Shekel', 'South African Rand', 'British Pound'];
to = "";
from = "";
data = {};

function showDetails(response)
{
	$("#qnt").html(response["value"]);
	$("#from_name").html(response["from"]);

	to = response["to"];
	from = response["from"];

	var c = response[response["from"]]["convert"][response["to"]];
	data[response["from"]]= response[response["from"]]["convert"];
	data[response["to"]]= response[response["to"]]["convert"];

	$("#cnv_val").html(c);
	$("#to_name").html(response["to"]);
	appendToSelection("from",response["from"],response["to"]);
	appendToSelection("to",response["to"],response["from"]);
	$("#from").val(response["value"]);
	$("#to").val(c);



}

function appendToSelection(type,start,ignore)
{
	var to="<option value='"+start+"' onclick='javascript:call_fun(\""+start+"\",this)'>"+start+"</option>";
	for(i=0;i<countries.length;i++)
	{
		if (countries[i]!=start && countries[i]!=ignore)
			to+="<option value='"+countries[i]+"' onclick='javascript:call_fun(\""+countries[i]+"\",this)'>"+countries[i]+"</option>";
	}
	$("#"+type+"_select").html(to);
}

function changeValue(value)
{
	performChange(value.id,value.value);
	
}

function performChange(changed,value)
{ 
	var tochange= "";
	
	if (changed=="to")
	{
		tochange="from";
	}
	else{
		tochange="to";
	}
	var new_from= $("#"+changed+"_select").val();
	var new_to=$("#"+tochange+"_select").val();
	$("#"+tochange).val(value*data[new_from][new_to]);
}

function repaint()
{
		$("#qnt").html($("#from").val());
		$("#from_name").html(from);
		$("#to_name").html(to);
		$("#cnv_val").html($("#to").val());

}


function call_fun(name,ref)
{
	var parent =ref.parentElement.id ;
	
	changed="";
	//alert(parent);
	if(parent.indexOf("from")>=0)
		{
			//alert("from changed");
			changed = "from";
			from  = name;
		}
	else
		{			
			//alert("to change");
			changed="to";
			to = name;
		}

	if(name in data)
		{
			performChange(changed,$("#"+changed).val());
			repaint();

		}

	else{
		//alert("here");
		$.get('/cgi-bin/getParticular.py',{'name':name},function(data_values)
			{
				content = JSON.parse(data_values);
				data[name]= content;
				performChange(changed,$("#"+changed).val());
				repaint();
			});
		
	}

	appendToSelection("from",from,to);
	appendToSelection("to",to,from);
//	repaint();

}
