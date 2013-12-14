(function(){

	var xam = window.xam || {};

	window.xam = xam;
	xam.chart = xam.chart || {}; //stores all the possible models/components

	xam.chart.funnelChart = function(options) {
		
		var DEFAULT_HEIGHT = 400,
		DEFAULT_WIDTH = 600, 
		DEFAULT_BOTTOM_PERCENT = 1/3;
		var data = options.series[0].data;
		this.data = data;
		this.totalEngagement = 0;
		for(var i = 0; i < data.length; i++){
			this.totalEngagement += data[i][1];
		}
		this.width = typeof options.width !== 'undefined' ? options.width : DEFAULT_WIDTH;
		this.height = typeof options.height !== 'undefined' ? options.height : DEFAULT_HEIGHT;
		this.bottomPct = typeof options.bottomPct !== 'undefined' ? options.bottomPct : DEFAULT_BOTTOM_PERCENT;
		this.slope = 2*this.height/(this.width - this.bottomPct*this.width);
		this.totalArea = (this.width+this.bottomPct*this.width)*this.height/2;
	}
	
	xam.chart.funnelChart.prototype.getLabel = function(ind){
		/* Get label of a category at index 'ind' in this.data */
		return this.data[ind][0]
	}

	xam.chart.funnelChart.prototype.getEngagementCount = function(ind){
		/* Get engagement value of a category at index 'ind' in this.data */
		return this.data[ind][1]
	}

	xam.chart.funnelChart.prototype.createPaths = function(){
		/* Returns an array of points that can be passed into d3.svg.line to create a path for the funnel */
		trapezoids = []

		function findNextPoints(chart, prevLeftX, prevRightX, prevHeight, dataInd){
			// reached end of funnel
			if(dataInd >= chart.data.length) return;

			// math to calculate coordinates of the next base
			area = chart.data[dataInd][1]*chart.totalArea/chart.totalEngagement;
			prevBaseLength = prevRightX - prevLeftX;
			nextBaseLength = Math.sqrt((chart.slope * prevBaseLength * prevBaseLength - 4 * area)/chart.slope);
			nextLeftX = (prevBaseLength - nextBaseLength)/2 + prevLeftX; 
			nextRightX = prevRightX - (prevBaseLength-nextBaseLength)/2;
			nextHeight = chart.slope * (prevBaseLength-nextBaseLength)/2 + prevHeight;

			points = [[nextRightX, nextHeight]]
			points.push([prevRightX, prevHeight]);
			points.push([prevLeftX, prevHeight]);
			points.push([nextLeftX, nextHeight]);
			points.push([nextRightX, nextHeight]);
			trapezoids.push(points);

			findNextPoints(chart, nextLeftX, nextRightX, nextHeight, dataInd+1);
		}

		findNextPoints(this, 0, this.width, 0, 0);
		// console.log(trapezoids)
		return trapezoids;
	}

	xam.chart.funnelChart.prototype.draw = function(elem){
		var funnelSvg = d3.select(elem).append('svg')
		.attr('width', this.width)
		.attr('height', this.height)
		.append('g');

		// Creates the correct d3 line for the funnel
		var funnelPath = d3.svg.line()
		.x(function(d) {
			return d[0];
		})
		.y(function(d) {
			return d[1];
		});

		// Automatically generates colors for each trapezoid in funnel
		var colorScale = d3.scale.category20c()

		var paths = this.createPaths();

		function drawTrapezoids(funnel, i){
			var trapezoid = funnelSvg
			.append('svg:path')
			.attr("d", function(d){
				return funnelPath(paths[i])
			})
			.attr("fill", function(d){
				return colorScale(i)
			});

			nextHeight = paths[i][[paths[i].length]-1];

			var totalLength = trapezoid.node().getTotalLength();

			funnelSvg
			.append('text')
			.text(funnel.getLabel(i) + ': ' + funnel.getEngagementCount(i))
			.attr("x", function(d){
				return funnel.width/2
			})
			.attr("y", function(d){
				return (paths[i][0][1] + paths[i][1][1])/2
			}) // Average height of bases
			.attr("text-anchor", "middle")
			.attr("class", "funnel-label")
			.attr("dominant-baseline", "middle")
			.attr("fill", "#fff");

			if(i < paths.length - 1){
				drawTrapezoids(funnel, i+1)
			}
		}

		drawTrapezoids(this, 0);
	}
})();



