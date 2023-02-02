// longitude 1 mile = 0.0182
// latitude 1 mile = 0.0145

let kanLon = -95.239;
let kanLat = 38.9337;
let latChange = 0.0145;
let lonChange = 0.0182;
let radius = 1600;

// for now just add and sub change from val, check if +- must be accounted for later
let minLat = Math.round((kanLat - latChange) * 10000) / 10000;
let maxLat = Math.round((kanLat + latChange) * 10000) / 10000;
let minLong = Math.round((kanLon - lonChange) * 10000) / 10000;
let maxLong = Math.round((kanLon + lonChange) * 10000) / 10000;

// let tripQuery = "https://api.opentripmap.com/0.1/­{lang}­/tiles/{layer}­/{z}­/{x}­/{y}.pbf?kinds={kinds}&rate={rate}&apikey=" + apiKey;
// let tripQuery = "https://api.opentripmap.com/0.1/en/places/bbox?lon_min=-0.13404&lat_min=51.5000&lon_max=-0.13000&lat_max=51.5246&kinds=bars&format=geojson&apikey=" + apiKey;
let apiKeyTrip = "5ae2e3f221c38a28845f05b6e0ffe54a717dac1df5bd2ef8183fe293";
let tripQuery = `https://api.opentripmap.com/0.1/en/places/radius?radius=${radius}&lon=${kanLon}&lat=${kanLat}&kinds=churches&format=geojson&apikey=${apiKeyTrip}`;
// let tripQuery = `https://api.opentripmap.com/0.1/en/places/bbox?lon_min=${minLong}&lat_min=${minLat}&lon_max=${maxLong}&lat_max=${maxLat}&kinds=churches&format=geojson&apikey=${apiKeyTrip}`;

let tripLayer = {
    placeName: '',
    placeLat: 0,
    placeLong: 0
};

function tripAjax() {
    $.ajax({
        url: tripQuery,
        method: 'GET'
    }).then(function (response) {
        tripLayer.placeName = response.features[0].properties.name;
        tripLayer.placeLong = response.features[0].geometry.coordinates[1];
        tripLayer.placeLat = response.features[0].geometry.coordinates[0];

        return tripLayer;
    });
}
tripAjax();
// const tripArray = Object.values(tripLayer);
// console.log(tripArray);
// console.log(tripArray[1]);
// console.log(tripArray[0]);

// Leaflet.js code

let mapOptions = {
    center: [kanLat, kanLon],
    zoom: 15
};

let map = new L.map('map', mapOptions);

let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
map.addLayer(layer);

let marker = L.marker([kanLat, kanLon]);
marker.addTo(map);

let place1 = L.marker([tripArray[2], tripArray[1]], title = tripArray[0]);
place1.addTo(map);
