let UniArrayToChoose = [];
let uniQuery = "";
// Alert to show input of search //
const searchButton = $('#button-search');
const searchInput = $('#textbox-search');
const searchForm = $('#searchForm');
const uniList = $('#uniList');
const dropdown = $('#dropdown');
$(document).ready(function () {
    uniList.on('click', 'option', function () {
        let dns = $(this).val();
        console.log("dns");
    });
});
searchForm.on("submit", function (event) {
    event.preventDefault();
    let uniName = searchInput.val();
    uniQuery = `http://universities.hipolabs.com/search?name=${uniName}`;
    hipoUniAjax(uniQuery);
});
// search by university - offer Unis by name to select;
async function hipoUniAjax(uniQuery) {
    await $.ajax({
        url: uniQuery,
        method: 'GET'
    }).then(function (response) {
        for (let i = 0; i < response.length; i++) {
            let nameTown = response[i].name;
            UniArrayToChoose.push(nameTown);
        }
        generateDropdown(UniArrayToChoose);
    });
}
function generateDropdown(array) {
    // loop through array creating options
    array.forEach(element => {
        let createDropdown = $(`<option >${element}</option>`);
        uniList.append(createDropdown);
    });
}

// let uniName = "kent";

// let uniQuery = `http://universities.hipolabs.com/search?name=${uniName}`;
// //search by university - offer Unis by name to select
// async function hipoUniAjax() {
//     await $.ajax({
//         url: uniQuery,
//         method: 'GET'
//     }).then(function (response) {
//         for (let i = 0; i < response.length; i++) {
//             let nameTown = response[i].name;
//             let dns = response[i].domains[0];
//             console.log("dns", dns);
//             console.log("data", nameTown);
//         }


//         // return data;
//     });
// }

// hipoUniAjax();
// //extract domain
// //add domain into IP
// // longitude 1 mile = 0.0182
// // latitude 1 mile = 0.0145
// // add lat & long, Min & max to Open trip
// // show map in iframe

