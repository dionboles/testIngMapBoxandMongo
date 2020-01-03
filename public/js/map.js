mapboxgl.accessToken = 'pk.eyJ1IjoibGl2ZWRiIiwiYSI6ImNqYzB6MHFvdTAwaHMzMm85dHk2Z203bmcifQ.LtGrig3aw6ZM3t3QBsO2cg';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 9,
    center: [
        -76.603679,
        39.288637
    ]
});

// Fetch stores from API
async function getStores(){
    const  res = await fetch("/api/v1/stores")
    const data = await res.json();
    console.log(data);
    const stores = data.data.map( store =>{
        return {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [
                   store.location.coordinates[0],
                   store.location.coordinates[1]
                ]
            },
            properties: {
                storeId : store.storeId,
                icon : "shop"
            }
        }
    });
    loadMap(stores);
}
// locol
function loadMap(stores){
    map.on('load', function () {
        map.addLayer({
            'id': 'points',
            'type': 'symbol',
            'source': {
                'type': 'geojson',
                'data': {
                    type: 'FeatureCollection',
                    features: stores
                    // features: [{
                    //     type: 'Feature',
                    //     geometry: {
                    //         type: 'Point',
                    //         coordinates: [
                    //             -76.603679,
                    //             39.288637
                    //         ]
                    //     },
                    //     properties: {
                    //         storeId : '0001',
                    //         icon : "shop"
                    //     }

                    // }]
                }
            },
            layout: {
                'icon-image': '{icon}-15',
                'icon-size': 1.5,
                'text-field': '{storeId}',
                'text-font' : [
                    'Open Sans Semibold',
                    'Arial Unicode MS Bold'
                ],
                'text-offset': [0,0.9],
                'text-anchor': 'top'
                
            }
        });
    });
}

getStores();