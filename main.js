require('leaflet-ajax');

/**
** Set Mapbox
*/


var map = L.map(document.getElementsByClassName('map')[0]).setView([55.787725, 37.631181], 15);
var basemap = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',{
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});
map.addLayer(basemap);

var myStyle = {
  weight: 1,
  color: "red",
  fillColor: "white",
  opacity: 1,
  fillOpacity: 0
};

var buildings = new L.geoJson.ajax("https://raw.githubusercontent.com/ggolikov/cities-comparison/master/src/moscow.geo.json", {
  // onEachFeature: function(feature, layer) {
  // },
  style: myStyle,
});

map.addLayer(buildings);


/**
** Set GeoJSON
** &
** search-box
*/
