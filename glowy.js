"use strict";

var clock = {
	clocktime: {},
  dots: document.querySelectorAll('#lcd-clock .dots'),
  dotsState: false,
  colorBacking: undefined,
  colorClasses: [
  	'red',
  	'orange',
  	'yellow',
  	'green',
  	'blue',
  	'purple',
  	'white',
  	'fuchsia'
  ],
  currentColor: 'red',
  rainbowIndex: 0,
  rainbowClasses: [
  	'red',
  	'orange',
  	'yellow',
  	'green',
  	'blue',
  	'purple',
	],

  updateClock: function (){
		var time = new Date();
		var localeTimeString = time.toLocaleTimeString();
		var timeStringPieces = localeTimeString.split(':');
		clock.clocktime.hour = timeStringPieces[0];
		clock.clocktime.minute = timeStringPieces[1];

		for (var timeUnit in clock.clocktime) {
			// convert all to values to string,
			// pad single values, ie 8 to 08
	 		// split the values into an array of single characters
			if (clock.clocktime[timeUnit].length == 1) {
				clock.clocktime[timeUnit] = '0'+clock.clocktime[timeUnit];
			}
			clock.clocktime[timeUnit] = clock.clocktime[timeUnit].split('');

			// update each digit for this time unit
			for (var i = 0; i < 2; ++i) {
				var displayNumberString = clock.clocktime[timeUnit][i];
				var selector = '#lcd-clock .'+timeUnit+'.digit-'+(i+1);
				var className = 'number-is-' + displayNumberString;
				// remove any pre-existing classname
				for (var j = 0; j < 10; ++j) {
					var oldClass = 'number-is-'+j;
					document.querySelector(selector).classList.remove(oldClass);
				}
				// add the relevant classname to the appropriate clock digit.
				// Skip it if this is a padding 0 for the hour.
				if (i !== 0 || timeUnit !== 'hour' || displayNumberString !== '0') {
					document.querySelector(selector).classList.add(className);
				}
			}
		}

		clock.toggleDots();
	},

	toggleDots: function () {
		var num_dots = clock.dots.length;

		for (var i = 0; i < num_dots; i++) {
			if (clock.dotsState === false) {
				clock.dots[i].classList.add('lcd-element-active');
				continue;
			}
			else {
				clock.dots[i].classList.remove('lcd-element-active');
			}
		}

		clock.dotsState = !clock.dotsState;
	},

	shiftToRandomColor: function shiftToRandomColor() {
		var newColor = probable.pickFromArray(
			clock.without(clock.colorClasses, clock.currentColor)
		);
		clock.shiftToColor(newColor);
	},

	shiftToNextRainbowColor: function shiftToNextRainbowColor() {
		clock.rainbowIndex += 1;
		var newColor = clock.rainbowClasses[clock.rainbowIndex];
		clock.shiftToColor(newColor);
	},

	shiftColor: function shiftColor() {
		if (clock.rainbowIndex + 1 < clock.rainbowClasses.length) {
			clock.shiftToNextRainbowColor();
		}
		else {
			clock.shiftToRandomColor();
		}
	},

	shiftToColor: function shiftToColor(newColor) {
		clock.colorBacking.classList.remove(clock.currentColor);
		clock.colorBacking.classList.add(newColor);
		clock.currentColor = newColor;
	},

	without: function without(array, unwanted) {
		return array.filter(function isWanted(item) {
			return item !== unwanted;
		});
	},

	init: function () {
		clock.colorBacking = document.querySelector('#color-backing');

		clock.toggleDots();
		clock.updateClock();
		// Update to make dots flash.
		setInterval(clock.updateClock, 1000);
		setInterval(clock.shiftColor, 10 * 1000);
	}

};

clock.init();
