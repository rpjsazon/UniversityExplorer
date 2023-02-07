// Displaying map - Manual Input

// var map = L.map('map').setView([51.505, -0.09], 13);

// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

// L.marker([51.5, -0.09]).addTo(map)
//     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//     .openPopup();

// Reference: https://leafletjs.com/examples/mobile/example.html - Showing Current Location
// We can use current location to calculate distance to the places.
const map = L.map('map').fitWorld();

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);

document.getElementById("locateRel").addEventListener("click", locateMe);

function locateMe() {

	// Locate me marker.
	var homeIcon = L.icon({
		iconUrl: './assets/images/location-dot-solid.svg',
		iconSize:     [38, 95], // size of the icon
		popupAnchor:  [-3, -40] // point from which the popup should open relative to the iconAnchor

    // shadowSize:   [50, 64], // size of the shadow
    // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    // shadowAnchor: [4, 62],  // the same for the shadow
    
	})

	function onLocationFound(e) {
		var radius = e.accuracy / 2;
	
		var locationMarker = L.marker(e.latlng,{icon: homeIcon}).addTo(map).bindPopup("You are here.").openPopup();

		// var locationCircle = L.circle(e.latlng, radius).addTo(map);

		// To get the marker location and display it to html document page.
		var latLng = locationMarker.getLatLng();
		var lat = latLng.lat;
		var lng = latLng.lng;
		var location = "Latitude: " + lat + ", Longitude: " + lng;

		console.log(location);
		document.getElementById("currentLocationText").textContent = location;

	}
	
	function onLocationError(e) {
		alert(e.message);
	}

	map.on('locationfound', onLocationFound);
	map.on('locationerror', onLocationError);
	map.locate({setView: true, maxZoom: 16});

}