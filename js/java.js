// Wait for the DOM to be fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Function to show the specified content section
    function showContent(sectionId) {
        // Hide all sections
        document.querySelectorAll('#content section').forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none';
        });

        // Show the selected section
        const sectionToShow = document.getElementById(sectionId);
        if (sectionToShow) {
            sectionToShow.classList.add('active');
            sectionToShow.style.display = 'block';

            // Initialize map if the Directions section is shown
            if (sectionId === 'directions') {
                initializeMap();
            }
        }
    }

    // Function to initialize the map
    function initializeMap() {
        if (typeof L === 'undefined' || typeof MQ === 'undefined') {
            console.error("Leaflet or MapQuest library is not loaded");
            return;
        }

        var map = L.map('map', {
            layers: MQ.mapLayer(),
            center: [40.6397, -73.9680], // Coordinates for the chapel
            zoom: 10
        });

        var dir = MQ.routing.directions();

        dir.route({
            locations: [
                { latLng: { lat: 40.6397, lng: -73.9680 } }, // Chapel location: 1032 East 22nd Street, Brooklyn, NY 11210
                { latLng: { lat: 40.882214, lng: -73.867011 } }, // Example cemetery location 1
                { latLng: { lat: 40.671072, lng: -73.963764 } }, // Example cemetery location 2
                { latLng: { lat: 40.578335, lng: -73.959645 } }  // Example cemetery location 3
            ]
        });

        var CustomRouteLayer = MQ.Routing.RouteLayer.extend({
            createStartMarker: function(location) {
                var custom_icon = L.icon({
                    iconUrl: 'https://assets.mapquestapi.com/icon/v2/circle@2x.png',
                    iconSize: [20, 29],
                    iconAnchor: [10, 29],
                    popupAnchor: [0, -29]
                });

                return L.marker(location.latLng, { icon: custom_icon }).addTo(map);
            },

            createEndMarker: function(location) {
                var custom_icon = L.icon({
                    iconUrl: 'https://assets.mapquestapi.com/icon/v2/circle@2x.png',
                    iconSize: [20, 29],
                    iconAnchor: [10, 29],
                    popupAnchor: [0, -29]
                });

                return L.marker(location.latLng, { icon: custom_icon }).addTo(map);
            }
        });

        map.addLayer(new CustomRouteLayer({
            directions: dir,
            fitBounds: true
        }));
    }

    // Attach event listeners to navigation links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            showContent(this.getAttribute('onclick').replace("showContent('", "").replace("')", ""));
        });
    });

    // Initialize the default view
    showContent('home');
});
