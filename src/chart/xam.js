/**
 * 
 * @returns {undefined}
 * 
 */
(function() {

	var xam = window.xam || {};

	window.xam = xam;
	xam.chart = xam.chart || {}; //stores all the possible models/components

	xam.defaultColors = d3.scale.category20c();
	
	xam.getTotalValue = function(options) {
		var totalValue = 0;
		for (var i = 0; i < options.data.length; i++) {
			totalValue += options.data[i].value;
		}
		return totalValue;
	},

	xam.getProperties = function(options) {
		var properties = {};

		properties.values = new Array();
		properties.data = new Array();
		properties.maxValue = 0;
		properties.minValue = 0;
		properties.totalValue = 0;
		var start = 0;
		var end = 0;

		for (var i = 0; i < options.data.length; i++) {

			// data
			properties.totalValue += options.data[i].value;
			end = start + options.data[i].value;
			options.data[i].start = start;
			options.data[i].end = end;
			
			start = end;
			// end data

			// colors
			if (typeof options.data[i].color === 'undefined') {
				if (xam.defaultColors.constructor === Array) {
					options.data[i].color = xam.defaultColors[i];
				} else {
					options.data[i].color = xam.defaultColors(i);
				}
			}
			// end colors
			
			properties.data[i] = options.data[i];
			properties.values[i] = [start, end]
		}
		//console.log(properties.data);
		return properties;
	};


	xam.setDefaultColors = function(colors) {
		xam.defaultColors = colors;
	};


})();