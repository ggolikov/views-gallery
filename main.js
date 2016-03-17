require('leaflet-ajax');

/**
** Set Mapbox
*/


var map = L.map(document.getElementsByClassName('map')[0]).setView([55.787725, 37.631181], 18);
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
    radius: 6,
    fillColor: "yellow",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};
var circleStyle2 = {
    radius: 5,
    fillColor: "yellow",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};
var circleStyle3 = {
    radius: 3,
    fillColor: "yellow",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

var Geodesic = L.geodesic([], {
    weight: 1.5,
    opacity: 0.7,
    color: 'yellow',
    steps: 50
}).addTo(map);

var centerArray = [];
var pointsArray = [];

var buildings = new L.geoJson.ajax("https://raw.githubusercontent.com/ggolikov/lookout-gallery/master/src/buildings.geo.json", {
  onEachFeature: function(feature, layer) {
  },
  style: buildingsStyle,
});

map.addLayer(buildings);

buildings.once("data:loaded", function(){
  this.eachLayer(function(feature) {
    var center = feature.getBounds().getCenter();
    centerArray.push(center);
    L.circleMarker(center, circleStyle).addTo(map);
    var points = feature.getLatLngs();
    points.push(points[0]);
    pointsArray.push(points);
  });
  for (var i = 0; i < centerArray.length; i++) {
    for (var j = 1; j < pointsArray[i].length; j++) {
      var line = L.polyline([pointsArray[i][j-1], pointsArray[i][j]]);
      var clothest = L.GeometryUtil.closest(map, line, centerArray[i]);
    console.log(clothest.lat.toFixed(12), pointsArray[i][j-1].lat.toFixed(12), pointsArray[i][j].lat.toFixed(12));
      if (+clothest.lat.toFixed(12) !== +pointsArray[i][j-1].lat.toFixed(12) &&
          +clothest.lng.toFixed(12) !== +pointsArray[i][j-1].lng.toFixed(12) &&
          +clothest.lat.toFixed(12) !== +pointsArray[i][j].lat.toFixed(12) &&
          +clothest.lng.toFixed(12) !== +pointsArray[i][j].lng.toFixed(12)){
      L.circleMarker(clothest, circleStyle3).addTo(map);
      var Geodesic = L.geodesic([], {
          weight: 1.5,
          opacity: 0.7,
          color: 'yellow',
          steps: 50
      }).addTo(map);
      Geodesic.setLatLngs([[centerArray[i], clothest]]);
    }
    }
  }
}, buildings);
