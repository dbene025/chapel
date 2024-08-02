// JavaScript Document
document.addEventListener("DOMContentLoaded", function() {
    // Function to show content
    function showContent(sectionId) {
        // Hide all sections
        document.querySelectorAll('section').forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none';
        });

        // Show the selected section
        const activeSection = document.getElementById(sectionId);
        activeSection.classList.add('active');
        activeSection.style.display = 'block';

        // If the selected section is about us, load the essay content
        if (sectionId === 'about-us') {
            fetch('shocinc/about-us-content.html')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('about-us-content').innerHTML = data;
                });
        }

        // If the selected section is directions, initialize the map
        if (sectionId === 'directions') {
            initMap();
        }
    }

    // Initialize the first section as active
    showContent('home');

    // Function to toggle work letter details
    window.toggleWorkLetter = function() {
        const workLetterDetails = document.getElementById('work-letter-details');
        if (document.getElementById('work-letter').checked) {
            workLetterDetails.style.display = 'block';
        } else {
            workLetterDetails.style.display = 'none';
        }
    };

    // Function to initialize the map
    window.initMap = function() {
        const map = L.map('map', {
            layers: MQ.mapLayer(),
            center: [40.6397, -73.9680], // Coordinates for the chapel
            zoom: 10
        });

        const dir = MQ.routing.directions();
        dir.route({
            locations: [
                { latLng: { lat: 40.6397, lng: -73.9680 } }, // Chapel location: 1032 East 22nd Street, Brooklyn, NY 11210
                { latLng: { lat: 40.882214, lng: -73.867011 } }, // Example cemetery location 1
                { latLng: { lat: 40.671072, lng: -73.963764 } }, // Example cemetery location 2
                { latLng: { lat: 40.578335, lng: -73.959645 } }  // Example cemetery location 3
            ]
        });

        const CustomRouteLayer = MQ.Routing.RouteLayer.extend({
            createStartMarker: function(location) {
                const custom_icon = L.icon({
                    iconUrl: 'https://assets.mapquestapi.com/icon/v2/circle@2x.png',
                    iconSize: [20, 29],
                    iconAnchor: [10, 29],
                    popupAnchor: [0, -29]
                });

                return L.marker(location.latLng, { icon: custom_icon }).addTo(map);
            },
            createEndMarker: function(location) {
                const custom_icon = L.icon({
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
    };

    // Attach showContent function to global scope
    window.showContent = showContent;
});
