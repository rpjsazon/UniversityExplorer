let uniName = "kent";

let uniQuery = `http://universities.hipolabs.com/search?name=${uniName}`;
//search by university - offer Unis by name to select
function hipoUniAjax() {
    $.ajax({
        url: uniQuery,
        method: 'GET'
    }).then(function (response) {
        for (let i = 0; i < response.length; i++) {
            let data = response[i].name;
            console.log("data", data);
        }


        return data;
    });
}
hipoUniAjax();
//extract domain
//add domain into IP
// longitude 1 mile = 0.0182
// latitude 1 mile = 0.0145
// add lat & long, Min & max to Open trip
// show map in iframe

