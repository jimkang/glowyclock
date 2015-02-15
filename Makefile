css:
	node_modules/myth/bin/myth src.css glowy.css

smash:
	node_modules/uglify-js/bin/uglifyjs \
		node_modules/probable/probable.js \
		glowy.js \
		-c -m -o glowy.min.js
