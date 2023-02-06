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

document.getElementById("locateRel").addEventListener("click", locateMe)

function locateMe() {

	function onLocationFound(e) {
		const radius = e.accuracy / 2;
	
		const locationMarker = L.marker(e.latlng).addTo(map)
		.bindPopup("You are here - Test ( Patrick )").openPopup();
	
		const locationCircle = L.circle(e.latlng, radius).addTo(map);
	}
	
	function onLocationError(e) {
		alert(e.message);
	}

	map.on('locationfound', onLocationFound);
	map.on('locationerror', onLocationError);
	map.locate({setView: true, maxZoom: 16});
	
}


