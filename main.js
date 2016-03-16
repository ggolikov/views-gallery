require('leaflet-ajax');

/**
** Set Mapbox
*/


var map = L.map(document.getElementsByClassName('map')[0]).setView([55.787725, 37.631181], 16);
var basemap = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',{
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});
map.addLayer(basemap);

var buildingsStyle = {
  weight: 1,
  color: "red",
  fillColor: "white",
  opacity: 1,
  fillOpacity: 0
};
var circleStyle = {
    radius: 3,
    fillColor: "#FFFF00",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

var llArray = [];
var pointsArray = [];

var buildings = new L.geoJson.ajax("https://raw.githubusercontent.com/ggolikov/lookout-gallery/master/src/buildings.geo.json", {
  onEachFeature: function(feature, layer) {
    // var center = layer.getBounds().getCenter();
    // var points = layer.getLatLngs();
    // L.circleMarker(center, circleStyle).addTo(map);
    // for (var i = 0; i < points.length; i++){
    //   return (function(i){
    //     return function(i) {
    //       var clothest = L.closestOnSegment(map, center, points[i], points[i+1]);
    //       L.circleMarker(clothest, circleStyle).addTo(map);
    //       console.log(points[i], points[i+1]);
    //     };
    //   })(i);
    // }
  },
  style: buildingsStyle,
});

map.addLayer(buildings);

buildings.once("data:loaded", function(){
  this.eachLayer(function(feature, layer) {
    var center = feature.getBounds().getCenter();
    var points = feature.getLatLngs();
    L.circleMarker(center, circleStyle).addTo(map);
    var arr = [];
      for (var i = 0; i < points.length; i++){
          arr.push([points[i], points[i+1]]);
      };
      var clothest = closestOnSegment(map, center, [56, 36], [57,37]);
      console.log(clothest);
        // L.circleMarker(clothest, circleStyle).addTo(map);
  });
}, buildings);
