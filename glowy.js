((function clockScope() {
	clocktime = {};
  dots = document.querySelectorAll('#lcd-clock .dots');
  dotsState = false;
  colorBacking = undefined;
  colorClasses = [
  	'red',
  	'orange',
  	'yellow',
  	'green',
  	'blue',
  	'purple',
  	'white',
  	'fuchsia'
  ];
  currentColor = 'red';
  rainbowIndex = 0;
  rainbowClasses = [
  	'red',
  	'orange',
  	'yellow',
  	'green',
  	'blue',
  	'purple',
	];

  function updateClock(){
		var time = new Date();
		var localeTimeString = time.toLocaleTimeString();
		var timeStringPieces = localeTimeString.split(':');
		clocktime.hour = timeStringPieces[0];
		clocktime.minute = timeStringPieces[1];

		for (var timeUnit in clocktime) {
			// convert all to values to string,
			// pad single values, ie 8 to 08
	 		// split the values into an array of single characters
			if (clocktime[timeUnit].length == 1) {
				clocktime[timeUnit] = '0'+clocktime[timeUnit];
			}
			clocktime[timeUnit] = clocktime[timeUnit].split('');

			// update each digit for this time unit
			for (var i = 0; i < 2; ++i) {
				var displayNumberString = clocktime[timeUnit][i];
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

		toggleDots();
	}

	function toggleDots() {
		var num_dots = dots.length;

		for (var i = 0; i < num_dots; i++) {
			if (dotsState === false) {
				dots[i].classList.add('lcd-element-active');
				continue;
			}
			else {
				dots[i].classList.remove('lcd-element-active');
			}
		}

		dotsState = !dotsState;
	}

	function shiftToRandomColor() {
		var newColor = probable.pickFromArray(
			without(colorClasses, currentColor)
		);
		shiftToColor(newColor);
	}

	function shiftToNextRainbowColor() {
		rainbowIndex += 1;
		var newColor = rainbowClasses[rainbowIndex];
		shiftToColor(newColor);
	}

	function shiftColor() {
		if (rainbowIndex + 1 < rainbowClasses.length) {
			shiftToNextRainbowColor();
		}
		else {
			shiftToRandomColor();
		}
	}

	function shiftToColor(newColor) {
		colorBacking.classList.remove(currentColor);
		colorBacking.classList.add(newColor);
		currentColor = newColor;
	}

	function without(array, unwanted) {
		return array.filter(function isWanted(item) {
			return item !== unwanted;
		});
	}

	((function init() {
		colorBacking = document.querySelector('#color-backing');

		toggleDots();
		updateClock();
		// Update to make dots flash.
		setInterval(updateClock, 1000);
		setInterval(shiftColor, 10 * 1000);
	})());

})());
