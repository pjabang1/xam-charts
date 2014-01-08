/**
 * 
 * @returns {undefined}
 * 
 */
(function() {

    var xam = window.xam || {};

    window.xam = xam;

    xam.map = function(options) {
        this.data = options.series;
        this.markers = new Array();
    };

    xam.map.prototype.draw = function(elem) {
        
        if(typeof this.map === 'undefined') {
            this.map = L.map(elem);
                 L.tileLayer('http://{s}.tile.cloudmade.com/89a9770d56e8425d89cbca75efebf81a/997/256/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
            maxZoom: 18
        }).addTo(this.map);
        
        this.map.setZoom(9);
        
        }
        
        
        
        var data = this.data;

        var result = data.map(function(d) {
            return d.data;
        }).reduce(function(a, b) {
            return a.concat(b);
        });

        var maxValue = d3.max(result, function(d) {
            return d[1];
        });


        var topData = data[0];
        
        // var c = d3.scale.category20c();
        // var c = d3.scale.category20b();
        // var c = d3.scale.category20();
        var c = d3.scale.category10();

        for(var i = 0; i < this.markers.length; i++) {
            this.map.removeLayer(this.markers[i]);
        }

        var map = this.map;
        map.setView([topData.latitude, topData.longitude]);
        
        var rScale = d3.scale.linear()
                .range([100, 900])
                .domain([0, maxValue]);

        this.markers = new Array();
        for (var j = 0; j < data.length; j++) {
            if(data[j].latitude && data[j].longitude) {
            this.markers[j] = L.circle([data[j].latitude, data[j].longitude], rScale(data[j].total), {
                color: c(j),
                fillColor: c(j),
                fillOpacity: 0.9
            }).addTo(map);
            }
        }

    };


})();