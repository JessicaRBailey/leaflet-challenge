// Earthquakes above 4.5 in the past 30 days.
let quakes;
let depth;

// Create the map object
let myMap = L.map("map", {
    center: [39.7392, -104.9903], // Denver Colorado USA
    zoom: 5
    });
  
// Add a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);


// Earthquate data for all earthquakes in the past week that were at least 1.0 magnitude
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson";

d3.json(url).then(function(response) {

    quakes = response.features
        
    // Create a layer group to hold the markers
    let markers = L.layerGroup();

    // Define a markerSize() function that will give each earthquake a different radius based on its magnitude.
    function markerSize(magnitude) {
        return Math.sqrt(magnitude) * 5;
    }  

    // Define a depthColor() function that maps earthquake depth to colors.
    function depthColor(depth) {
        if (depth > 90) {
        return "#800020";  // Burgandy
        } else if (depth >= 70) {
        return "red"; // red 
        } else if (depth >= 50) {
        return "#FFA500"; // Orange
        } else if (depth >= 30) {
        return "#FFFF00"; // Yellow
        } else if (depth >= 10) {
        return "#ADFF2F"; // Yellow-green
        } else if (depth >= -10) {
        return "green"; 
        } else {
        return "gray"; // Default color for depths less than -10 (or any other cases)
        }
    }

    // Loop through the data.
    for (let i = 0; i < quakes.length; i++) {
  
        // Set the coordinate data to a variable.
        let quake = quakes[i];
        depth = quake.geometry.coordinates[2];

        // earthquakes with greater depth should appear darker in color.
        markers.addLayer(L.circleMarker([quake.geometry.coordinates[1], quake.geometry.coordinates[0]], {
            fillOpacity: 0.75,
            color: "black",
            weight: 0.5,
            fillColor: depthColor(depth),
            // Setting circle's radius to equal the output of our markerSize() function:
            // This will make our marker's size proportionate to its magnitude.
            radius: markerSize(quake.properties.mag)
        }).bindPopup(`<h2>${quake.properties.place}</h2> <hr> <h3>Magnitude: ${quake.properties.mag}</h3>     Depth: ${depth}meters`));
    };

    // Add our marker layer to the map.
    myMap.addLayer(markers);

    // // Create a legend for our depth colors.
    const legend = L.control({ position: "bottomright" });

    // Define the legend content based on the depth categories and colors
    legend.onAdd = function () {
      const div = L.DomUtil.create("div", "legend");
      const depths = ["-10 to 10", "10 to 30", "30 to 50", "50 to 70", "70 to 90", "90+"];

    
      // Add the depth ranges with corresponding colors
      for (let i = 0; i < depths.length; i++) {
        div.innerHTML +=
          '<i style="background:' + depthColor((i + 1) * 20 - 15) + '"></i> ' +
          depths[i] + '<br>';
      }
      return div;
    };
    
    // Add the legend to the map
    legend.addTo(myMap);
        
});