$(document).ready(function(){
  var arrayReturn = [];
  // Source: Jquery UI
  // https://www.youtube.com/watch?v=aRIrxQWM-kw
  $.ajax({
    // Added: https://cors-anywhere.herokuapp.com/ to secure
    url: "https://cors-anywhere.herokuapp.com/http://universities.hipolabs.com/search?name=",
    async: true,
    dataType: 'json',
    success: function (data) {
      for (var i = 0; i < data.length; i++) {
        // var place = (data[i].name).toString();
        arrayReturn.push(data[i].name);
      }
      loadSuggestions(arrayReturn);
    }
  });

  function loadSuggestions() {
    $("#textbox-search").autocomplete({
      source: arrayReturn,
      delay: 500,
      max: 30,
      // Minimum number of character before it push the places to suggestion search.
      minLength: 2
    });
  }
});