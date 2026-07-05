    const mapContainer = document.getElementById('map');
    const fallbackCoordinates = [-71.06776, 42.35816];
    const mapToken = mapContainer?.dataset?.mapToken || '';
    const parsedCoordinates = mapContainer?.dataset?.coordinates;
    const markerCoordinates = parsedCoordinates
        ? JSON.parse(parsedCoordinates)
        : fallbackCoordinates;

    if (typeof mapboxgl !== 'undefined' && mapToken && mapContainer) {
        mapboxgl.accessToken = mapToken;

        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: markerCoordinates,
            zoom: 9
        });

        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        map.on('load', () => {
            new mapboxgl.Marker({ color: '#ff5a5f' })
                .setLngLat(markerCoordinates)
                .addTo(map);
        });
    }
