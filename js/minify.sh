set -x
minify --output ./min/auto.min.js auto.js
minify --output ./min/first.min.js first.js
minify --output ./min/search.min.js search.js
minify --output ./min/location_centric.min.js location_centric.js
minify --output ./min/bank.min.js ./modules/bank.js
minify --output ./min/cricket.min.js ./modules/cricket.js
minify --output ./min/cric_score.min.js ./modules/cric_score.js
minify --output ./min/differences.min.js ./modules/differences.js
minify --output ./min/discography.min.js ./modules/discography.js
minify --output ./min/exam.min.js ./modules/exam.js
minify --output ./min/general.min.js ./modules/general.js
minify --output ./min/glaConv.min.js ./modules/glaConv.js
minify --output ./min/help.min.js ./modules/help.js
minify --output ./min/highcourt.min.js ./modules/highcourt.js
minify --output ./min/highway.min.js ./modules/highway.js
minify --output ./min/locations.min.js ./modules/locations.js
minify --output ./min/meaning.min.js ./modules/meaning.js
minify --output ./min/minerals.min.js ./modules/minerals.js
minify --output ./min/ministers.min.js ./modules/ministers.js
minify --output ./min/movie.min.js ./modules/movie.js
minify --output ./min/stocks.min.js ./modules/stocks.js
minify --output ./min/theater.min.js ./modules/theater.js
minify --output ./min/train.min.js ./modules/train.js
minify --output ./min/voice.min.js ./modules/voice.js
minify --output ./min/weather.min.js ./modules/weather.js
minify --output ./min/wiki.min.js ./modules/wiki.js
#css files
minify ../css/dark/search.css
minify ../css/light/search.css
minify ../css/dark/styles.css
minify ../css/light/styles.css