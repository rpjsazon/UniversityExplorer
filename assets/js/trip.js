let kanLon = -95.239;
let kanLat = 38.9337;
// let latChange = 0.0145;// latitude 1 mile = 0.0145
// let lonChange = 0.0182;// longitude 1 mile = 0.0182
let mapOptions = {
    center: [kanLat, kanLon],
    zoom: 15
};

let map = new L.map('map', mapOptions);

let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
map.addLayer(layer);

let marker = L.marker([kanLat, kanLon]);
marker.addTo(map);
let radius = 1600;

// for now just add and sub change from val, check if +- must be accounted for later
let apiKeyTrip = "5ae2e3f221c38a28845f05b6e0ffe54a717dac1df5bd2ef8183fe293";
let tripQuery = `https://api.opentripmap.com/0.1/en/places/radius?radius=${radius}&lon=${kanLon}&lat=${kanLat}&kinds=churches,banks&format=geojson&apikey=${apiKeyTrip}`;

function writeTriplayer(place) {

    const tripLayer = {
        placeName: place.properties.name,
        placeLat: place.geometry.coordinates[1],
        placeLong: place.geometry.coordinates[0]
    };
    console.log("tripLayer", tripLayer);

    return tripLayer;
};

(async () => {

    const response = await $.ajax({
        url: tripQuery,
        method: 'GET'
    });
    const places = response.features;
    for (let i = 0; i < places.length; i++) {
        createMarkers(places[i]);
    }
})();

function createMarkers(place) {
    const tripOMG = writeTriplayer(place);

    // Leaflet.js Markercode 

    let place1 = L.marker([tripOMG.placeLat, tripOMG.placeLong], { title: tripOMG.placeName });
    place1.addTo(map);
    place1.bindPopup(`<b>${tripOMG.placeName}</b><br>`).openPopup();
}