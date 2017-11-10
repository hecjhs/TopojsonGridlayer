// require('./lib/topojson.js')

(function () {
    var console = window.console || {
        error: function () {},
        warn: function () {}
    };

    function defineLeafletGeoJSONGridLayer(L) {
        L.GeoJSONGridLayer = L.GridLayer.extend({
            initialize: function (url, options) {
                L.GridLayer.prototype.initialize.call(this);
                this._url = url;
	    },
            createTile: function(coords){
                // create a <canvas> element for drawing
                var tile = L.DomUtil.create('canvas', 'leaflet-tile');
                // setup tile width and height according to the options
                var size = this.getTileSize();
                tile.width = size.x;
                tile.height = size.y;
                // get a canvas context and draw something on it using coords.x, coords.y and coords.z
                var ctx = tile.getContext('2d');
                // return the tile so it can be rendered on screen
                var myStyle = {
                    "color": "#ff7800",
                    "weight": 5,
                    "opacity": 0.65
                };
                var otherStyle = {
                    "color": "#ff7888",
                    "weight": 5,
                    "opacity": 0.65
                };
                var counter = 0;
                $.get( L.Util.template(this._url, coords) )
                  .done(function( data ) {
			L.geoJSON(data).addTo(map).eachLayer(function (layer) {  
                        counter ++;
                        if(counter % 2 ) {
                            layer.setStyle( myStyle ) 
                        }
                        else{layer.setStyle(otherStyle)}
                    });
                  });
                return tile;
            }

        });

        L.geoJsonGridLayer = function(url, options) {
            return new L.GeoJSONGridLayer(url, options);
        };
    }

    if (typeof define === 'function' && define.amd) {
        // Try to add leaflet.loading to Leaflet using AMD
        define(['leaflet'], function (L) {
            defineLeafletGeoJSONGridLayer(L);
        });
    }
    else {
        // Else use the global L
        defineLeafletGeoJSONGridLayer(L);
    }

})();
