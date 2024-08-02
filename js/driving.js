document.addEventListener("DOMContentLoaded", function() {
    function initMap() {
        // Ensure MQ and L are defined
        if (typeof MQ === 'undefined' || typeof L === 'undefined') {
            console.error('MapQuest API not loaded.');
            return;
        }

        const chapelLatLng = { lat: 40.6397, lng: -73.9680 };
        const map = L.map('map', {
            layers: MQ.mapLayer(),
            center: chapelLatLng,
            zoom: 10
        });

        const dir = MQ.routing.directions();
        const directionsRenderer = MQ.routing.routeLayer();

        document.getElementById("cemetery").addEventListener("change", function() {
            const selectedOption = this.options[this.selectedIndex];
            const cemeteryLatLng = selectedOption.value.split(",");
            const request = {
                locations: [
                    { latLng: chapelLatLng },
                    { latLng: { lat: parseFloat(cemeteryLatLng[0]), lng: parseFloat(cemeteryLatLng[1]) } }
                ],
                options: {
                    routeType: 'fastest',
                    timeType: 1
                }
            };

            dir.route(request, function(err, data) {
                if (!err) {
                    directionsRenderer.setRoute(data.route);
                    directionsRenderer.addTo(map);
                }
            });
        });
    }

    // Initialize the map on load
    initMap();
});
// JavaScript Document