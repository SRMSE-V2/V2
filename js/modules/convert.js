var convert=$('<div class="well alpha-blur row" style="border:0px;color:white;" id="convertor"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="col-lg-4 col-md-4 col-sm-4 col-xs-4"></div><div class="col-lg-4 col-md-4 col-sm-4 col-xs-4"><select id="metric" class="form-control" style="border:0px;"><option >Temperature</option><option >Speed</option><option >Mass</option><option >DigitalStorage</option><option >Time</option><option >FuelConsumption</option><option >Length</option></select><br></div><div class="col-lg-4 col-md-4 col-sm-4 col-xs-4"></div></div><div id="Temperature" class=+"convert"><table class="table"><tr><td><b>Farenheit</b><br><input type="text" id="farenheit" class="form-control"></input></td><td><b>Celcius</b><br><input type="text" id="celcius" class="form-control"></input><br></td><td><b>Kelvin</b><br><input type="text" id="kelvin" class="form-control"></input></td></tr></table></div><div id="Speed" class="convert"><table class="table"><tr><td><b>Miles/hour</b><br><input type="text" id="mph" class="form-control"></input></td><td><b>Feet/second</b><br><input type="text" id="fs" class="form-control"></input></td><td><b>Metres/second</b><br><input type="text" id="ms" class="form-control"></input></td></tr><tr><td><b>Km/hour</b><br><input type="text" id="kmph" class="form-control"></input></td><td><b>Knot</b><br><input type="text" id="knot" class="form-control"></input></td></tr></table></div><div class="convert" id="Mass"><table class="table"><tr><td><b>Metric Ton</b><br><input type="text" id="metric_ton" class="form-control"></input></td><td><b>Kilogram</b><br><input type="text" id="kilogram" class="form-control"></input></td><td><b>Gram</b><br><input type="text" id="gram" class="form-control"></input></td></tr><tr><td><b>Milligram</b><br><input type="text" id="milligram" class="form-control"></input></td><td><b>Pound</b><br><input type="Pound" id="pound" class="form-control"></input></td><td><b>Ounce</b><br><input type="text" id="ounce" class="form-control"></input></td></tr></table></div><div class="convert" id="DigitalStorage"><table class="table"><tr><td><b>Byte</b><br><input type="text" id="byt_" class="form-control"></input></td><td><b>Kilobyte</b><br><input type="text" id="kilobyte" class="form-control"></input></td><td><b>Megabyte</b><br><input type="text" id="megabyte" class="form-control"></td></tr><td><b>Gigabyte</b><br><input type="text" id="gigabyte" class="form-control"></input></td><td><b>Terabyte</b><br><input type="text" id="terabyte" class="form-control"></input></td></table></div><div class="convert" id="Time" width="100%" border="0" cellspacing="0" cellpadding="0"><table class="table"><tr><td><b>Second</b><br><input type="text" id="second" class="form-control"></input></td><td><b>Minute</b><br><input type="text" id="minute" class="form-control"></input></td><td><b>Hour</b><br><input type="text" id="hour" class="form-control"></input></td></tr><tr><td><b>Day</b><br><input type="text" id="day" class="form-control"></input></td><td><b>Month</b><br><input type="text" id="month" class="form-control"></input></td><td><b>Year</b><br><input type="text" id="year" class="form-control"></input></td></tr><tr class="more"><td><b>Decade</b><br><input type="text" id="decade" class="form-control"></input></td><td><b>Century</b><br><input type="text" id="century" class="form-control"></input></td></tr></table></div><div class = "convert" id = "FuelConsumption" width="100%" border = "0" cellspacing="0" cellpadding="0"><table class="table"><tr><td><b>Km/Litre</b><br><input type="text" id="km_litre" class="form-control"/></td><td><b>Litre/100Km</b><br><input type = "text" id="litre_100" class="form-control"/></td><td><b>MPG</b><br><input type="text" id="MPG"/ class="form-control"></td></tr></table></div><div class = "convert" id = "Length" width= "100%" border="0" cellspacing = "0" cellpadding = "0"><table class="table"><tr><td><b>Kilometre</b><br><input type= "text" id = "kilometre" class="form-control" /></td><td><b>Metre</b><br><input type= "text" id = "metre" class="form-control"/></td><td><b>Mile</b><br><input type= "text" id = "mile" class="form-control"/></td></tr><tr><td><b>Foot</b><br><input type= "text" id = "foot" class="form-control"/></td><td><b>Yard</b><br><input type= "text" id = "yard" class="form-control"/></td><td><b>Inch</b><br><input type= "text" id = "inch" class="form-control"/></td></tr></table></div></div><!-- /convertor -->")');
$("#smart_col").html("").append(convert);
$("#smart_answer").addClass("hide");



