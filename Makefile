css:
	node_modules/myth/bin/myth src.css glowy.css

D3_LIBRARY_FILES = \
    node_modules/d3/src/start.js \
    node_modules/d3/src/selection/selection.js \
    node_modules/d3/src/end.js \

d3select.js: $(D3_LIBRARY_FILES)
	node_modules/.bin/smash $(D3_LIBRARY_FILES) > d3select.js

minify: d3select.js
	node_modules/uglify-js/bin/uglifyjs \
		node_modules/probable/probable.js \
		d3select.js \
		glowy.js \
		-c -m -o glowy.min.js

run:
	python -m SimpleHTTPServer
