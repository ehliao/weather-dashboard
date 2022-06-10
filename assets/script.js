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
        //creates <li> to <ul>, saves searched city to local storage and retreives from local storage
        getWeather(searchInput);      

        for (var i=0; i < localStorage.length; i++) {
            localStorage.setItem("search-history",searchInput);  
            var historyList = localStorage.getItem("search-history");
            var btnList = $("<button>").addClass("historyBtn col-12").text(historyList);
            $(".history-list").append(btnList);
        }
                
    }
})
// provides current weather data for selected city
function getWeather(urlParam){
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + urlParam + "&appid=" + APIkey + "&units=imperial";
    $.ajax({
        url:weatherURL,
        method:"GET"
    }).then(function (response) {
        var currentTemp = response.main.temp;
        var tempIcon = $("<img>").attr("src","https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
        var currentWind = response.wind.speed;
        var currentHumidity = response.main.humidity;
        $("#current-temp").text(currentTemp + ' °F ');
        $("#current-wind").text(currentWind + ' MPH');
        $("#current-humidity").text(currentHumidity + '%');
        $(".current-city").text(response.name + " " + "(" + currentDate + ")").append(tempIcon);
        // needed separate URL to obtain UV index
        var forecastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=" + APIkey + "&units=imperial";
        $.ajax({
            url:forecastURL,
            method:"GET"
        }).then(function(response) {
            var currentUV = response.current.uvi;
            $("#uv-index").text(currentUV);
            // loop for 5 day forecast
            for (var i = 1; i <= 5; i++) {
                var date = new Date(response.daily[i].dt*1000)
                var forecastDate = moment(date).format("l");
                var forecastCard = $("<div>").addClass("forecast-body");
                var forecastTitle = $("<h6>");
                var forecastImg = $("<img>");
                var forecastTemp = $("<p>").addClass("forecast-temp");
                var forecastWind = $("<p>").addClass("forecast-wind");
                var forecastHumidity = $("<p>").addClass("forecast-humidity");                
               
                $(".forecast").append(forecastCard);
                forecastCard.append(forecastTitle).append(forecastDate);
                forecastCard.append(forecastImg);
                forecastCard.append(forecastTemp).append("Temp: " + response.daily[i].temp.day + " °F");
                forecastCard.append(forecastWind).append("Wind: " + response.daily[i].wind_speed + " MPH");
                forecastCard.append(forecastHumidity).append("Humidity: " + response.daily[i].humidity + "%");     

                forecastImg.attr("src","https://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + "@2x.png");
            }
        })
    })
}

