(function() {


	xam.chart.pie = function(options) {
		// 
		//xam.chart.donut.call(this);
		//this.prototype = Object.create(xam.chart.donut.prototype);
		this.options = options;
		
		xam.chart.pie.prototype = new xam.chart.donut(this.options);
	
	return xam.chart.pie;
		
	};
	
	xam.chart.pie.prototype.setOption = function(options) {

		this.properties = xam.getProperties(options);
		this.options = options;
		this.start = 0;
		this.end = this.properties.totalValue;
		
		this.width = 400;
		this.height = 400;

		this.margin = 10;

alert('je');
		this.innerRadius = 0;
		this.outerRadius = Math.min(this.width, this.height) / 2;

		if (typeof options.elem !== 'undefined') {
			this.elem = options.elem;
		}
		return this;
	};

	
	//xam.chart.pie.prototype.constructor = xam.chart.pie;
	

	

	

})();