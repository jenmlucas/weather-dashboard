// GIVEN a weather dashboard with form inputs

// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index

// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
var search = document.getElementById("search");
var cityInput = document.getElementById("city");
var cityForm = document.getElementById("city-form")
var weatherContainer = document.getElementById("weather-container");
var weatherSearchTerm = document.getElementById("city-search-term");

var getCity = function (city) {
    var apiList = "https://api.openweathermap.org/data/2.5/onecall?lat=37.0902&lon=-95.7129&exclude=minutely,hourly&appid=5c71643f7754882962dd3859f2f84f94"

    //"https://api.openweathermap.org/data/2.5/forecast?q=mesa&appid=5c71643f7754882962dd3859f2f84f94";

    console.log("function was called");
    fetch(apiList).then(function (response) {
        console.log(response);
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                displayCity(data, city);
                for (var i = 0; i < data.length; i++) {
                    var weatherInfo = data[i];
                    console.log(weatherInfo);
                }
            });
        } else {
            alert("Error: City Not Found");
        }
    })
        .catch(function (error) {
            alert("Unable to Connect");
        })
};

var displayCity = function (getCity, searchTerm) {
    weatherContainer.textContent = "";
    weatherSearchTerm.textContent = searchTerm;
    console.log(getCity);
    console.log(searchTerm);
};

   

var formSearchHandler = function (event) {
    event.preventDefault();
    console.log(event);

    var cityName = cityInput.value.trim();

    if (cityName) {
        getCity(cityName);
        cityInput.value = "";
    } else {
        alert("Please enter a city.")
    }
};

getCity();

search.addEventListener("click", formSearchHandler);