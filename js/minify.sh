set -x
minify --no-comments --output ./min/auto.min.js auto.js
minify --no-comments --output ./min/first.min.js first.js
minify --no-comments --output ./min/search.min.js search.js
minify --no-comments --output ./min/scripts.min.js scripts.js
minify --no-comments --output ./min/location_centric.min.js location_centric.js
minify --no-comments --output ./min/bank.min.js ./modules/bank.js
minify --no-comments --output ./min/cricket.min.js ./modules/cricket.js
minify --no-comments --output ./min/cric_score.min.js ./modules/cric_score.js
minify --no-comments --output ./min/differences.min.js ./modules/differences.js
minify --no-comments --output ./min/discography.min.js ./modules/discography.js
minify --no-comments --output ./min/exam.min.js ./modules/exam.js
minify --no-comments --output ./min/general.min.js ./modules/general.js
minify --no-comments --output ./min/glaConv.min.js ./modules/glaConv.js
minify --no-comments --output ./min/help.min.js ./modules/help.js
minify --no-comments --output ./min/highcourt.min.js ./modules/highcourt.js
minify --no-comments --output ./min/highway.min.js ./modules/highway.js
minify --no-comments --output ./min/locations.min.js ./modules/locations.js
minify --no-comments --output ./min/meaning.min.js ./modules/meaning.js
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
#css files
minify --no-comments ../css/dark/search.css
minify --no-comments ../css/light/search.css
minify --no-comments ../css/dark/styles.css
minify --no-comments ../css/light/styles.css
