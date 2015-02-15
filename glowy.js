((function clockScope() {
  var clocktime = {};
  var colorBacking = undefined;

  var colorGroups = {
    reds: [
      'red',
      'flamingo-pink',
      'raspberry-pink',
      'worm-pink',
      'pepperoni-red',
      'strawberry-red',
    ],
    oranges: [
      'orange',
      'candlelight-orange',
      'melon-orange',
      'soap-orange'
    ],
    yellows: [
      'yellow',
      'ducking-yellow',
      'corn-yellow'
    ],
    greens: [
      'green',
      'lettuce-green',
      'eel-green',
      'moss-green'
    ],
    blues: [
      'blue',
      'sapphire-blue',
      'sky-blue',
      'pool-blue'
    ],
    purples: [
      'purple',
      'fuchsia',
      'onion-purple',
      'eggplant-purple'
    ],
    grays: [
      'white'
    ]
  }

  var colorClasses = [];
  for (var group in colorGroups) {
    colorClasses = colorClasses.concat(colorGroups[group]);
  }

  var currentColor = 'red';
  var rainbowIndex = 0;
  var rainbowGroups = [
    'reds',
    'oranges',
    'yellows',
    'greens',
    'blues',
    'purples',
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
        var digit = d3.select(selector);
        var className = 'number-is-' + displayNumberString;

        // remove any pre-existing classname
        for (var j = 0; j < 10; ++j) {
          var oldClass = 'number-is-'+j;
          digit.classed(oldClass, false);
        }
        // add the relevant classname to the appropriate clock digit.
        // Skip it if this is a padding 0 for the hour.
        if (i !== 0 || timeUnit !== 'hour' || displayNumberString !== '0') {
          digit.classed(className, true);
        }
      }
    }
  }

  function shiftToRandomColor() {
    var newColor = probable.pickFromArray(
      without(colorClasses, currentColor)
    );
    shiftToColor(newColor);
  }

  function shiftToNextRainbowColor() {
    rainbowIndex += 1;
    var newGroup = rainbowGroups[rainbowIndex];
    var newColor = probable.pickFromArray(colorGroups[newGroup]);
    shiftToColor(newColor);
  }

  function shiftColor() {
    if (rainbowIndex + 1 < rainbowGroups.length) {
      shiftToNextRainbowColor();
    }
    else {
      shiftToRandomColor();
    }
  }

  function shiftToColor(newColor) {
    d3.select(colorBacking)
      .classed(currentColor, false)
      .classed(newColor, true);

    currentColor = newColor;
  }

  function without(array, unwanted) {
    return array.filter(function isWanted(item) {
      return item !== unwanted;
    });
  }

  ((function init() {
    colorBacking = document.querySelector('#color-backing');

    updateClock();
    setInterval(updateClock, 1000);
    setInterval(shiftColor, 10 * 1000);
  })());

})());
