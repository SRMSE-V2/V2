

var convert= ["convert","conv","meters","meter","metre","m","centimeter","picometer","millimeter","mm","cm","pm","nanometer","nm","yard","mile","inch","foot","ft","m2","cm2","meter-square","square-meter","square-centimeter","centimeter-square","cm-square","m-square","m-sq","cm-sq","sq-m","sq-cm","min","sec","ms","minutes","minute","second","millisecond","seconds","milliseconds","farenheit","kelvin","celcius","c","f","k","km","kilometer","byte","kilobyte","megabyte","gigabyte","terabyte","kb","mb","gb","tb"];
var length= ["meters","m","meter","metre","centimeter","centimetre","picometer","millimeter","mm","cm","pm","nanometer","nm","yard","mile","inch","foot","ft","km","kilometer"];
var area = ["m2","cm2","meter-square","square-meter","square-centimeter","centimeter-square","cm-square","m-square","m-sq","cm-sq","sq-m","sq-cm"];
var time = ["min","sec","ms","minutes","seconds","milliseconds","minute","second","millisecond"];
var mass = ["kg","kilogram","ton","gram","ounce","milligram","mg","pound"];
var temperature = ["farenheit","kelvin","celcius","c","f","k"];
var digital = ["byte","kilobyte","megabyte","gigabyte","terabyte","kb","mb","gb","tb"];
var getType = {4:"Length",9:"Area",16:"Time",25:"Mass",36:"Temperature",49:"DigitalStorage"};
var getMetricType = {"m":"meter","meter":"meter","metre":"meter","centimeter":"centimeter","mm":"millimeter","km":"kilometer","kilo meter":"kilometer","ft":"foot","foot":"foot","yard":"yard","inch":"inch","kelvin":"kelvin","k":"kelvin","c":"celcius","celcius":"celcius","farenheit":"farenheit","f":"farenheit","sec":"second","seconds":"second","min":"minute","minutes":"minute","kg":"kilogram","kilogram":"kilogram","gram":"gram","g":"gram","mg":"milligram","milligram":"milligram","pound":"pound","ounce":"ounce","ton":"metric_ton","byte":"byt_","kilobyte":"kilobyte","megabyte":"megabyte","gigabyte":"gigabyte","terabyte":"terabyte","kb":"kilobyte","mb":"megabyte","gb":"gigabyte","tb":"terabyte"};
var modules = [length,area,time,mass,temperature,digital];


function getWords(query){

query=query.toLowerCase();
subQuery = query.replace(/\d+/g,"");

var splitString = subQuery.split(" ");
var flag=0;
var digit = 1;
var determine =1;
var finalReturn = {};

for (i=0;i<=splitString.length;i++)
{

	if (convert.indexOf(splitString[i])>=0)
	{

		flag+=1;
		if (flag==2)
		{
		break;
		}
	}
}

if (flag == 2){
	var storeLis =[];
	
	var pattern =/convert (\d+)\s?(.*) to (.*)|(\d+)\s?(.*) to (.*)|convert (.*) to (.*)|from (.*) to (.*)|(.*) to (.*)|(\d+)\s?(.*) to (.*)|(.*) - (.*)/i;
	
	var val = query.match(pattern);
	console.log(query);
	if (val!=null)
	{
	for (i=0;i<val.length;i++)
	{
		if (! (typeof val[i] == "undefined"))
		{	
			if(val[i].trim().indexOf(" ")<0)
			{
			storeLis.push(val[i]);			
			}
		}
	}

	for(j=0;j<modules.length;j++)
		{
			for (i=0;i<splitString.length;i++)
			{

				if (modules[j].indexOf(splitString[i])>=0) 
				{
					console.log(splitString[i]);
					determine = determine*(j+2);
				}
			}
		}

		if (Object.keys(getType).indexOf(""+determine)>=0)
		{
		if (storeLis.length==2)
		{
			finalReturn = {"type":getType[determine],"value":digit,"from":getMetricType[storeLis[0]],"to":storeLis[1]};
		}

		else if(storeLis.length==3)
		{

			if (parseInt(storeLis[0]) != "NaN")
				digit=parseInt(storeLis[0]);

			finalReturn = {"type":getType[determine],"value":digit,"from":getMetricType[storeLis[1]],"to":storeLis[2]};			

		}
		}
	}
console.log(finalReturn);
return finalReturn;
}
}

window.conv=getWords($("#search").val().trim().toLowerCase());
$.getScript("/main/js/modules/metric.js", function( data ){ from_gla( window.conv["type"], window.conv["value"], window.conv["from"]) ;}) ;

