// API key
var APIkey = "411b4c48907f4950a9fb196156b8615a";

// displays current date into the title
var currentDate = moment().format('l');
$("#current-date").text("(" + currentDate + ")");

var searchBtn = $(".search-btn");

searchBtn.click(function() {
    var searchInput = $(".search-input").val();
    if (searchInput == "") {
    } else {
        //create a functon call here for the ajax call
        getWeather(searchInput);      

        for (var i=0; i < localStorage.length; i++) {
            localStorage.setItem("search-history",searchInput);  
            var historyList = localStorage.getItem("search-history");
            // var savedList = $("<li>");
            // $(".history-list").append(savedList);
            var btnList = $("<button>").addClass("historyBtn").text(historyList);
            console.log(historyList)
            $(".history-list").append(btnList);
        }
                
    }
})

function getWeather(urlParam){
    var weatherURL = "http://api.openweathermap.org/data/2.5/weather?q=" + urlParam + "&appid=" + APIkey + "&units=imperial";
    $.ajax({
        url:weatherURL,
        method:"GET"
    }).then(function (response) {
        // console.log(response)
        var currentTemp = response.main.temp;
        var currentWind = response.wind.speed;
        var currentHumidity = response.main.humidity;
        $("#current-temp").text(currentTemp + ' °F');
        $("#current-humidity").text(currentHumidity + ' %');
        $("#current-wind").text(currentWind + ' MPH');
        $(".current-city").text(response.name + " " + currentDate);
        
        var uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=" + APIkey;
        $.ajax({
            url:uvURL,
            method:"GET"
        }).then(function(response) {
            console.log(response)
            var currentUV = response.current.uvi;
            $("#uv-index").text(currentUV);
        })

    })
}



// WHEN I view current weather conditions for that city
// THEN I am presented  an icon representation 


// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe


// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

