//submit button on click to set date range
var start = "";
var end = "";

$("#submitButton").on("click", function (event) {
    event.preventDefault();
    start = $("#startDateInput").val().trim();
    end = $("#endDateInput").val().trim();
    initLaunchLibDateSearch();
});


//launch lib api search
function initLaunchLibDateSearch() {

    if (end == "") {

        var xhr = $.get("https://launchlibrary.net/1.4/launch/" + start);

        xhr.done(function (Info) {
            $("#display-info-divs").empty();
        
            for (i = 0; i < Info.launches.length; i++) {
                var location = Info.launches[i].location.name;
                var mission = Info.launches[i].name;
                var missionId = Info.launches[i].id;
                //var rocketImg = Info.launches[i].rocket.imageURL;
                //var description = Info.launches[i].missions[0].description;



                //create results divs
                var a = $("<div>");
                a.addClass("rocket");
                a.text(mission);
                a.attr('id', missionId)
                $("#display-info-divs").append(a);

                var br = document.createElement("br");
                $("#display-info-divs").append(br);
            };
        });


    }
    else {
        var xhr = $.get("https://launchlibrary.net/1.4/launch/" + start + "/" + end);

        xhr.done(function (Info) {
            $("#display-info-divs").empty();
        
            for (i = 0; i < Info.launches.length; i++) {
                var location = Info.launches[i].location.name;
                var mission = Info.launches[i].name;
                var missionId = Info.launches[i].id;
                //var rocketImg = Info.launches[i].rocket.imageURL;
                //var description = Info.launches[i].missions[0].description;


                //create results divs
                var a = $("<div>");
                a.addClass("rocket");
                a.text(mission);
                a.attr('id', missionId)
                $("#display-info-divs").append(a);

                var br = document.createElement("br");
                $("#display-info-divs").append(br);
            };
        });
    }
}




//on click for when a mission is selected in the search page
$("body").on('click', '.rocket', function () {
    var missionId = $(this).attr('id');
    $(location).attr('href', 'results.html?mission=' + missionId);
});


function showResults() {
    var missionResults = getParameterByName('mission');
    initLaunchLibInfoSearch(missionResults);
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


function initLaunchLibInfoSearch(string) {


    var xhr = $.get("https://launchlibrary.net/1.2/launch/" + string);

    xhr.done(function (Info) {
        $("#name").empty();
        $("#date").empty();
        $("#location").empty();
        $("#description").empty();
        $("myMap").empty();
        console.log(Info);
        var location = Info.launches[0].location.pads[0].name;
        var mission = Info.launches[0].name;
        var date = Info.launches[0].windowstart;
        var locationLat = Info.launches[0].location.pads[0].latitude;
        var locationLong = Info.launches[0].location.pads[0].longitude;
        var rocketImg = Info.launches[0].rocket.imageURL;
        var wikiURL = Info.launches[0].rocket.wikiURL;
        var infoURL = Info.launches[0].rocket.infoURL;
        var videoURL = Info.launches[0].vidURL;

        //info into results page
        $("#name").text(mission);
        var br = document.createElement("br");
        $("#name").append(br);

        //display links if defined
        if (infoURL == undefined) {

        }
        else {
            var a = document.createElement('a');
            var linkText = document.createTextNode(infoURL);
            a.appendChild(linkText);
            a.title = infoURL;
            a.href = infoURL;
            document.getElementById("name").appendChild(a);
        }

        if (wikiURL == undefined) {

        }
        else {
            var a = document.createElement('a');
            var linkText = document.createTextNode(wikiURL);
            a.appendChild(linkText);
            a.title = wikiURL;
            a.href = wikiURL;
            document.getElementById("name").appendChild(a);
        }

        $("#location").text(location);
        $("#date").text(date);

        /*  Getting cross origin read blocking error
            //video
            var vid = document.createElement('video');
            //videoURL = videoURL.replace(/^"(.*)"$/, '$1');
            vid.src = videoURL;
            document.getElementById("rocketVid").appendChild(vid);
        */

        //img
        //if image is placeholder don't display
        if (rocketImg.includes("placeholder")) {

        }
        else {
            var img = document.createElement('img');
            //img.addClass("rocketIMAGE");
            img.src = rocketImg;
            document.getElementById("rocketImg").appendChild(img);

        }

        //map
        geocodeQuery(locationLat + ", " + locationLong);
    });
}




//microsoft map api

var map, searchManager;
function GetMap() {
    map = new Microsoft.Maps.Map('#myMap', {});
}
function geocodeQuery(query) {
    //If search manager is not defined, load the search module.
    if (!searchManager) {
        //Create an instance of the search manager and call the geocodeQuery function again.
        Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
            searchManager = new Microsoft.Maps.Search.SearchManager(map);
            geocodeQuery(query);
        });
    } else {
        var searchRequest = {
            where: query,
            callback: function (r) {
                //Add the first result to the map, change the view to aerial, and zoom into it.
                if (r && r.results && r.results.length > 0) {
                    var pin = new Microsoft.Maps.Pushpin(r.results[0].location);
                    map.entities.push(pin);
                    map.setView({
                        mapTypeId: Microsoft.Maps.MapTypeId.aerial,
                        bounds: r.results[0].bestView
                    });
                }
            },
            errorCallback: function (e) {
                //If there is an error, alert the user about it.
                alert("No results found.");
            }
        };
        //Make the geocode request.
        searchManager.geocode(searchRequest);
    }
}
