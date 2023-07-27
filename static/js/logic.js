// Earthquakes above 4.5 in the past 30 days.
let quakes;

// Create the map object
let myMap = L.map("map", {
    center: [30, 20], //near Jalu Libya
    zoom: 1.75
  });
  
  // Add a tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


// Earthquate data for all earthquakes in the past month that were at least 4.5 magnitude
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";

d3.json(url).then(function(response) {

    quakes = response.features
        
    // Create a layer group to hold the markers
    let markers = L.layerGroup();

  
    // Loop through the data.
    for (let i = 0; i < quakes.length; i++) {
  
        // Set the coordinate data to a variable.
        let quake = quakes[i];


        // Your data markers should reflect the magnitude of the earthquake 
        // by their size and the depth of the earthquake by color. 
        // Earthquakes with higher magnitudes should appear larger, and 
        // earthquakes with greater depth should appear darker in color.

        // Include popups that provide additional information about the 
        // earthquake when its associated marker is clicked.

        // Create a legend that will provide context for your map data.

        // Also, I may need to use a data set with mag 2.5 or higher 
        // to make my visualization closer to the assignment's.  
        // Maybe only for the past 7 days.
        // This will also show greater variation in size of circles.

        // Fix below.
  
        // Add a new marker to the markers group, and bind a popup.
        markers.addLayer(L.marker([quake.geometry.coordinates[1], quake.geometry.coordinates[0]])
        .bindPopup(`<h2>${quakes[i].properties.place}</h2> <hr> <h3>Magnitude: ${quake.properties.mag}</h3>`));
    }

    // Add our marker layer to the map.
    myMap.addLayer(markers);
});