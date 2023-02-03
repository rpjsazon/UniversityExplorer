const apiKey = "5ae2e3f221c38a28845f05b6b42147a616a1f65641534f42bb6be75f";

// function apiGet (method, query) {
//   return new Promise(function(resolve, reject) {
//     var myAPI = "https://api.opentripmap.com/0.1/en/places/" + method + "?apikey=" + apiKey;
//     if (query !==undefined) {
//       myAPI += "&" + query;
//   }
//   fetch(myAPI)
//   .then(response => response.json())
//   .then(data => resolve(data))
//   .catch(function(err) {
//     console.log("Fetch Error :-S", err);
//     });
//   });
// }

// function displayPlaces() {

//   var placesMarker = $(this).attr("data-name");
//   var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=" + apiKey;

//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(response) {
//     $("#movies-view").text(JSON.stringify(response));
//   });
// }