(function() {


	xam.chart.pie = function(options) {

	};

	xam.chart.pie.prototype = new xam.chart.donut(options);

	xam.chart.pie.prototype.setOptions = function(options) {

		this.properties = xam.getProperties(options);
		this.options = options;
		this.start = 0;
		this.end = this.properties.totalValue;
		
		this.width = 400;
		this.height = 400;

		this.margin = 10;

		this.innerRadius = 50;
		this.outerRadius = Math.min(this.width, this.height) / 2;

		if (typeof options.elem !== 'undefined') {
			this.elem = options.elem;
		}
		return this;
	};

})();