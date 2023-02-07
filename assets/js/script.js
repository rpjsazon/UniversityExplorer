let uniQuery = "";
// Alert to show input of search //
const searchButton = $('#button-search');
const searchInput = $('#textbox-search');
const searchForm = $('#searchForm');
searchForm.on("submit", function (event) {
    event.preventDefault();
    let uniName = searchInput.val();
    console.log("uniName", uniName);
    // uniQuery = `http://universities.hipolabs.com/search?name=${uniName}`;

    // return uniQuery;
});

// hipoUniAjax(uniQuery)
//
// $.getJSON(
//     "http://universities.hipolabs.com/search?name=${uniName}",
//     function (data) {
//         console.log(data);

//     }
// );

//


;
// search by university - offer Unis by name to select;
// async function hipoUniAjax() {
//     await $.ajax({
//         url: uniQuery,
//         method: 'GET'
//     }).then(function (response) {
//         for (let i = 0; i < response.length; i++) {
//             let nameTown = response[i].name;
//             console.log("data", nameTown);        // return data;
//         }
//     });
// }