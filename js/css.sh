cat ../bootstrap.fp/css/bootstrap.min.css ../css/dark/styles.css >> ../css/dar$
minify --no-comments --output ../css/dark/styles.min.css ../css/dark/temp.css
rm ../css/dark/temp.css
cat ../bootstrap.fp/css/bootstrap.min.css ../css/light/styles.css >> ../css/li$
minify --no-comments --output ../css/light/styles.min.css ../css/light/temp.css
rm ../css/light/temp.css
minify --no-comments --output ../css/dark/scripts.min.css ../css/scripts.css
cp ../bootstrap/css/bootstrap.min.css ../bootstrap/css/bootstrap.min.css 
