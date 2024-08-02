document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    function showContent(sectionId) {
        console.log(`showContent called with sectionId: ${sectionId}`);
        
        document.querySelectorAll('#content section').forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none';
        });

        const sectionToShow = document.getElementById(sectionId);
        if (sectionToShow) {
            sectionToShow.classList.add('active');
            sectionToShow.style.display = 'block';
            console.log(`Showing section: ${sectionId}`);

            if (sectionId === 'directions') {
                initializeMap();
            }
        } else {
            console.error(`Section with id: ${sectionId} not found`);
        }
    }

    function initializeMap() {
        console.log('Initializing map');

        if (typeof L === 'undefined' || typeof MQ === 'undefined') {
            console.error("Leaflet or MapQuest library is not loaded");
            return;
        }

        var map = L.map('map', {
            layers: MQ.mapLayer(),
            center: [40.6397, -73.9680],
            zoom: 10
        });

        var dir = MQ.routing.directions();

        dir.route({
            locations: [
                { latLng: { lat: 40.6397, lng: -73.9680 } },
                { latLng: { lat: 40.882214, lng: -73.867011 } },
                { latLng: { lat: 40.671072, lng: -73.963764 } },
                { latLng: { lat: 40.578335, lng: -73.959645 } }
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

        console.log('Map initialized successfully');
    }

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const sectionId = this.getAttribute('onclick').replace("showContent('", "").replace("')", "");
            console.log(`Navigation link clicked, sectionId: ${sectionId}`);
            showContent(sectionId);
        });
    });

    console.log('Event listeners attached to navigation links');
    showContent('home');
});
