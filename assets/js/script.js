// Alert to show input of search //
const searchButton = document.getElementById('button-search');
const searchInput = document.getElementById('textbox-search');
searchButton.addEventListener('click', () => {
  const uniName = searchInput.value;
  alert(uniName);
});
//
$.getJSON(
    "http://universities.hipolabs.com/search?name=${uniName}",
    function(data) {
        console.log(data);
        
    }
);

//
let uniQuery = `http://universities.hipolabs.com/search?name=${uniName}`;
//search by university - offer Unis by name to select
async function hipoUniAjax() {
    await $.ajax({
        url: uniQuery,
        method: 'GET'
    }).then(function (response) {
        for (let i = 0; i < response.length; i++) {
            let nameTown = response[i].name;
            let dns = response[i].domains[0];
            console.log("dns", dns);
            console.log("data", nameTown);
        }


        // return data;
    });
}
hipoUniAjax();