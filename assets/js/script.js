let UniArrayToChoose = [];
let uniQuery = "";

// Alert to show input of search //
const searchButton = $('#button-search');
const searchInput = $('#textbox-search');
const searchForm = $('#searchForm');
const uniList = $('#uniList');
const dropdown = $('#dropdown');
const uniArray = [];

searchForm.on("submit", function (event) {
    event.preventDefault();
    let uniName = searchInput.val();
    uniQuery = `https://cors-anywhere.herokuapp.com/http://universities.hipolabs.com/search?name=${uniName}`;
    hipoUniAjax(uniQuery);
});

// search by university - offer Unis by name to select;
async function hipoUniAjax(uniQuery) {
    await $.ajax({
        url: uniQuery,
        method: 'GET'
    }).then(function (response) {
        for (let i = 0; i < response.length; i++) {
            let uniObject = response[i];
            uniArray.push(uniObject);
            UniArrayToChoose.push(uniObject.name);
        }
        generateDropdown(UniArrayToChoose);
        // releaseUniArray(UniArrayToChoose);
    });
}

function generateDropdown(array) {
    // loop through array creating options
    array.forEach(element => {
        let createDropdown = $(`<option value=${element} >${element}</option>`);
        uniList.append(createDropdown);
    });
}


// function passDNS(string) {
//     console.log(string);
// }
// -----------------mapping section-----------------------------

let IP = "";
const geo = {};
const latLong = [];
const mapOptions = {
    center: [],
    zoom: 15
};
let radius = 1600;

const ipGeoApiKey = "5f9bbb64079640a4bd6561979f9b3747";
let ipGeoApiQuery = "";
const apiKeyTrip = "5ae2e3f221c38a28845f05b6e0ffe54a717dac1df5bd2ef8183fe293";

// let tripQuery = "";

//use dns query to get IP
let dataFromDns = async (url) => {
    await Promise.resolve($.getJSON(url)).then(response => {
        // console.log("response", response);

        IP = response.records.A[0].address;
        ipGeoApiQuery = `https://api.ipgeolocation.io/ipgeo?apiKey=${ipGeoApiKey}&ip=${IP}`;
    });
};
// use IP to get Geodata
let geoFromIp = async (ipGeoApiQuery) => {
    await Promise.resolve($.getJSON(ipGeoApiQuery)).then(response => {
        geo.latitude = parseFloat(response.latitude);
        geo.longitude = parseFloat(response.longitude);
    });
};

let getLatFromGeo = (geo) => {
    latitude = geo.latitude;
    return latitude;
};

let getLongFromGeo = (geo) => {
    longitude = geo.longitude;
    return longitude;
};

let getLatLongArrayFromGeo = (geo) => {
    getLatFromGeo(geo);
    getLongFromGeo(geo);
    // console.log("latitude", latitude);
    // console.log("longitude", longitude);
    latLong.push(latitude, longitude);
    // console.log("latLong", latLong);
    return latLong;
};

let createMapOptions = (latLong) => {
    // console.log("latLong0", latLong[0]);
    // console.log("latLong1", latLong[1]);
    mapOptions.center.push(latLong[0], latLong[1]);
    // console.log("mapOptions", mapOptions);
    return mapOptions;
};

let createTripQuery = (radius, latitude, longitude, apiKeyTrip) => {
    // console.log("longitude", longitude);
    // console.log("latitude", latitude);
    return `https://api.opentripmap.com/0.1/en/places/radius?radius=${radius}&lat=${latitude}&lon=${longitude}&kinds=churches,banks,bars&format=geojson&apikey=${apiKeyTrip}`;
};


async function geoDataToMapFin(dns) {
    //dns from clicked choice
    let aQueryIP = `https://networkcalc.com/api/dns/lookup/${dns}`;
    await dataFromDns(aQueryIP);
    await geoFromIp(ipGeoApiQuery);
    getLatLongArrayFromGeo(geo);
    createMapOptions(latLong);
    const tripQuery = createTripQuery(radius, latitude, longitude, apiKeyTrip);
    console.log("end of geo data");
    let map = new L.map('map', mapOptions);

    let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    map.addLayer(layer);

    let marker = L.marker(latLong);

    marker.addTo(map);
    markerMaker(tripQuery, map);
}
$("select")
    .change(function () {
        var str = "";
        $("select option:selected").each(function () {
            str += $(this).text();
        });
        let UniPosition = UniArrayToChoose.indexOf(str);
        console.log("str", str);
        console.log("UniPosition", UniPosition);
        (async (str) => {
            let dns = await uniArray[UniPosition].domains[0];
            geoDataToMapFin(dns);
        })();

    });
//

// local information layers

function writeTriplayer(place) {
    let tripLayer = {
        placeName: place.properties.name,
        placeLat: place.geometry.coordinates[1],
        placeLong: place.geometry.coordinates[0]
    };
    return tripLayer;
};

let markerMaker = async (tripQuery, map) => {

    let response = await $.ajax({
        url: tripQuery,
        method: 'GET'
    });

    // console.log("tripQuery", tripQuery);
    // console.log("response", response);
    let places = response.features;
    for (let i = 0; i < places.length; i++) {
        createMarkers(map, places[i]);
    }
};

function createMarkers(theMap, place) {
    let tripOMG = writeTriplayer(place);
    // console.log("place", place);
    // console.log("tripOMG", tripOMG);

    // Leaflet.js Markercode 
    let place1 = L.marker([tripOMG.placeLat, tripOMG.placeLong], { title: tripOMG.placeName });
    // console.log("place1", place1);

    place1.addTo(theMap);
    // console.log("map", theMap);
    place1.bindPopup(`<b>${tripOMG.placeName}</b><br>`).openPopup();
}