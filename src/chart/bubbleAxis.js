/**
 * 
 * @returns {undefined}
 * 
 */
(function() {

    var xam = window.xam || {};

    window.xam = xam;
    xam.chart = xam.chart || {}; //stores all the possible models/components


    xam.chart.bubbleAxis = function(options) {
        this.setOptions(options);
    };


    xam.chart.bubbleAxis.prototype.setOptions = function(options) {

        if (typeof options == 'undefined') {
            var options = {};
            options.data = {};
        }

        if (typeof options.data == 'undefined') {
            options.data = {};
        }

        if (typeof options.series == 'undefined') {
            options.series = {};
        }


        this.options = options;

        if (typeof options.elem !== 'undefined') {
            this.elem = options.elem;
        }
        return this;
    };




    xam.chart.bubbleAxis.prototype.draw = function(elem) {
        this.properties = xam.getProperties(this.options);
        function truncate(str, maxLength, suffix) {
            if (str.length > maxLength) {
                str = str.substring(0, maxLength + 1);
                str = str.substring(0, Math.min(str.length, str.lastIndexOf(" ")));
                str = str + suffix;
            }
            return str;
        }

        var parseDate = d3.time.format("%y%d").parse;
        var formatDate = d3.time.format("%b-%Y");

        var formatDate2 = d3.time.format("%b %d");

        var data = this.options.series;

        var result =
                data.map(function(d) {
            return d.data;
        })
                .reduce(function(a, b) {
            return a.concat(b);
        });

        if (typeof this.options.minX === 'undefined') {
            
            var minX = d3.min(result, function(d) { return d[0];});
        } else {
            var minX = this.options.minX;
        }
        
        if (typeof this.options.maxX === 'undefined') {
            var maxX = d3.max(result, function(d) { return d[0];});
        } else {
            var maxX = this.options.maxX;
        }


        var margin = this.properties.margin;
        var width = 700,
                height = 650;

        var c = d3.scale.category20c();

        var c = d3.scale.category20b();
        var c = d3.scale.category20();
        var c = d3.scale.category10();

        var format = d3.time.format("%Y%m");

        var x = d3.time.scale()
                .domain([format.parse(minX), format.parse(maxX)])
                .range([0, width]);





        var xAxis = d3.svg.axis()
                .scale(x)
                .orient("top")
                .ticks(8)
                .tickFormat(d3.time.format("%b %y"));

        var svg = d3.select(elem).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .style("margin-left", margin.left + "px")
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        var maxValue = d3.max(result, function(d) {
            return d[1];
        });

        var xScale = d3.time.scale()
                .domain([format.parse(minX), format.parse(maxX)])
                .range([0, width]);


        svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + 0 + ")")
                .call(xAxis);

        for (var j = 0; j < data.length; j++) {
            var g = svg.append("g").attr("class", "xam-bubble-axis");

            var circles = g.selectAll("circle")
                    .data(data[j]['data'])
                    .enter()
                    .append("circle");

            var text = g.selectAll("text")
                    .data(data[j]['data'])
                    .enter()
                    .append("text");


            var rScale = d3.scale.linear()
                    .domain([0, maxValue])
                    .range([2, 20]);

            circles
                    .attr("cx", function(d, i) {
                return xScale(format.parse(d[0]));
            })
                    .attr("cy", j * 35 + 20)
                    .attr("r", function(d) {
                return rScale(d[1]);
            })
                    .style("fill", function(d) {
                return c(j);
            });

            text
                    .attr("y", j * 35 + 25)
                    .attr("x", function(d, i) {
                return xScale(format.parse(d[0])) - 5;
            })
                    .attr("class", "value")
                    .text(function(d) {
                return d[1];
            })
                    .style("fill", function(d) {
                return c(j);
            })
                    .style("display", "none");

            g.append("text")
                    .attr("y", j * 35 + 25)
                    .attr("x", width + 25)
                    .attr("class", "label")
                    .text(truncate(data[j]['name'], 30, "..."))
                    .style("fill", function(d) {
                return c(j);
            })
                    .on("mouseover", mouseover)
                    .on("mouseout", mouseout);
        }
        ;

        function mouseover(p) {
            var g = d3.select(this).node().parentNode;
            d3.select(g).selectAll("circle").style("display", "none");
            d3.select(g).selectAll("text.value").style("display", "block");
        }

        function mouseout(p) {
            var g = d3.select(this).node().parentNode;
            d3.select(g).selectAll("circle").style("display", "block");
            d3.select(g).selectAll("text.value").style("display", "none");
        }
    };

    xam.chart.bubbleAxis.prototype.tickFormat = function() {
        return d3.format("0000");
    };


})();