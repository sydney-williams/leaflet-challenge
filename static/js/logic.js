// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var myMap = L.map("mapid", {
  center: [45.52, -122.67],
  zoom: 13
});

// create a circle
L.circle([45.52, -122.69], {
  color: "green",
  fillColor: "green",
  fillOpacity: 0.75,
  radius: 500
}).addTo(myMap);

//create a marker 
L.marker([45.52, -122.67]).addTo(myMap);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// store API inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// next request the query URL by using D3.JSON
d3.json(queryUrl, function(data) {
  console.log(data);
  features = data.features
 //after creating the feautures variable see what feautres you can acquire //
  features
  console.log('data', data);
  console.log('data.features', data.features);
  console.log('data.features[0]', data.features[0]);
  console.log('data.features[0].properties', data.features[0].properties);
  console.log('data.features[0].properties.mag', data.features[0].properties.mag);
 //after this process you can start making a loop with the features variable 
 //

 var geojsonMarkerOptions = {
  radius: 2,
  fillColor: 'red',
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
};

  function getColor(mag) {
    if (mag > 3) {
      return 'red'
    } else {
      return 'blue'
    }
    if (mag > 6) {
      return 'yellow'
    } else {
      return 'green'
    }
    if (mag > 9) {
      return 'orange'
    } else {
      return 'purple'
    }
    if (mag > 12) {
      return 'red'
    } else {
      return 'black'
    }

  }

  L.geoJSON(data, {

    


    pointToLayer: function (feature, latlng) {

        geojsonMarkerOptions['fillColor'] = getColor(feature.properties.mag)
        return L.circleMarker(latlng, geojsonMarkerOptions);
    }



    }).addTo(myMap); 
});














