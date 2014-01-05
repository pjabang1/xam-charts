/**
 * 
 * @returns {undefined}
 * 
 */
(function() {

	var xam = window.xam || {};

	window.xam = xam;
	xam.chart = xam.chart || {}; //stores all the possible models/components


	xam.chart.donut = function(options) {
		this.setOptions(options);

	};

	xam.chart.donut.prototype.info = function() {
		console.log("Name:", this.innerRadius);
	}
	xam.chart.donut.prototype.setOptions = function(options) {

		console.log(options);
		this.properties = xam.getProperties(options);
		this.options = options;
		this.start = 0;
		this.end = this.properties.totalValue;

		this.width = 400;
		this.height = 400;

		this.margin = 10;

		this.innerRadius = 0;
		this.outerRadius = Math.min(this.width, this.height) / 2;

		if (typeof options.elem !== 'undefined') {
			this.elem = options.elem;
		}
		return this;
	};


	xam.chart.donut.prototype.redraw = function(options) {
		this.setOptions(options)._draw();
		// d3.select(this.elem).html('');
		//this._draw();

	};



	xam.chart.donut.prototype.draw = function(elem) {

		if (typeof elem !== 'undefined') {
			this.elem = elem;
		}
		this.donutSvg = d3.select(this.elem).append('svg')
				.attr("width", this.width)
				.attr("height", this.width)
				.append("g")
				.attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");
		this._draw();

	};

	xam.chart.donut.prototype._draw = function() {



		var fna = function(end) {
			console.log(end);
			return end;
		};

		var scale = d3.scale.linear().domain([this.start, this.end]).range([0, 2 * Math.PI]);

		var arc = d3.svg.arc()
				.innerRadius(this.innerRadius)
				.outerRadius(this.outerRadius - this.margin)
				.startAngle(function(d) {
					return scale(d.start);
				})
				.endAngle(function(d) {
					return scale(d.end);
				});

		var arcs = this.donutSvg.selectAll('path')
				.data(this.properties.data);
		;

		arcs
				.enter()
				.append("g")
				.attr("class", "xam-arc")
				.append("path")

				// .style("fill", "transparent")
				.attr("d", arc)

				.transition()
				//	.duration(750)
				//	.ease("in")
				//	.styleTween("color", function(d, i) { return d3.interpolate("green", colors[i]); })
				.style("fill", function(d, i) {
					return d.color;
				})
				;

		arcs.append("text")
				.attr("transform", function(d) {
					return "translate(" + arc.centroid(d) + ")";
				})
				.attr("dy", ".35em")
				.style("text-anchor", "middle")
				.text(function(d, i) {
					if (typeof d.label !== 'undefined') {
						return d.label;
					}
					return '';
				});

		arcs.exit()
				.remove();
		// alert("draw");
	}

})();