set -x
timestamp=$(date +%s)
echo $timestamp
minify --no-comments --output ./min/auto.min.js auto.js
minify --no-comments --output ./min/first.min.js first.js
minify --no-comments --output ./min/search.min.js search.js
cp ./scripts.js ./scripts1.js
replace "SECRET_KEY" $timestamp -- ./scripts1.js
cat ./min/jquery-ui.min.js ./min/jquery.mobile.custom.min.js ./scripts1.js >> ./min/temp.min.js
minify --no-comments --output ./min/scripts$timestamp.min.js ./min/temp.min.js
rm ./min/temp.min.js
rm ./scripts1.js
cp ./search.js ./search1.js
replace "SECRET_KEY" $timestamp -- ./search1.js
cat ./min/jquery-ui.min.js ./min/jquery.mobile.custom.min.js ./auto.js  ./search1.js >> ./min/temp.min.js
minify --no-comments --output ./min/search$timestamp.min.js ./min/temp.min.js
rm ./min/temp.min.js
rm ./search1.js
minify --no-comments --output ./min/location_centric.min.js location_centric.js
minify --no-comments --output ./min/bank.min.js ./modules/bank.js
minify --no-comments --output ./min/cricket-players.min.js ./modules/cricket-players.js
minify --no-comments --output ./min/sports.min.js ./modules/sports.js
minify --no-comments --output ./min/differences.min.js ./modules/differences.js
minify --no-comments --output ./min/discography.min.js ./modules/discography.js
minify --no-comments --output ./min/exam.min.js ./modules/exam.js
minify --no-comments --output ./min/general.min.js ./modules/general.js
minify --no-comments --output ./min/glaConv.min.js ./modules/glaConv.js
minify --no-comments --output ./min/help.min.js ./modules/help.js
minify --no-comments --output ./min/highcourt.min.js ./modules/highcourt.js
minify --no-comments --output ./min/highway.min.js ./modules/highway.js
minify --no-comments --output ./min/locations.min.js ./modules/locations.js
minify --no-comments --output ./min/dict.min.js ./modules/dict.js
minify --no-comments --output ./min/minerals.min.js ./modules/minerals.js
minify --no-comments --output ./min/ministers.min.js ./modules/ministers.js
minify --no-comments --output ./min/movie.min.js ./modules/movie.js
minify --no-comments --output ./min/stocks.min.js ./modules/stocks.js
minify --no-comments --output ./min/theater.min.js ./modules/theater.js
minify --no-comments --output ./min/train.min.js ./modules/train.js
minify --no-comments --output ./min/voice.min.js ./modules/voice.js
minify --no-comments --output ./min/weather.min.js ./modules/weather.js
minify --no-comments --output ./min/wiki.min.js ./modules/wiki.js
minify --no-comments --output ./min/flight.min.js ./modules/flight.js
minify --no-comments --output ./min/tennis.min.js ./modules/tennis.js
minify --no-comments --output ./min/feedback.min.js ./modules/feedback.js
htmlminify -o ../index.html ../index1.html
replace "SECRET_KEY" $timestamp -- ../index.html
cp /usr/lib/cgi-bin/s1.py /usr/lib/cgi-bin/s.py
replace "SECRET_KEY" $timestamp -- /usr/lib/cgi-bin/s.py
cp -R ./* ../../git_cdn/js
#css files
minify --no-comments --output ../css/dark/search$timestamp.min.css ../css/dark/search.css
minify --no-comments --output ../css/light/search$timestamp.min.css ../css/light/search.css
minify --no-comments --output ../css/dark/styles$timestamp.min.css ../css/dark/styles.css
minify --no-comments --output ../css/light/styles$timestamp.min.css ../css/light/styles.css
minify --no-comments --output ../css/dark/scripts$timestamp.min.css ../css/scripts.css
cp ../bootstrap/css/bootstrap.min.css ../bootstrap/css/bootstrap$timestamp.min.css 
cp -R ../css ../../git_cdn/
cp -R ../images ../../git_cdn/
cp -R ../bootstrap ../../git_cdn/
