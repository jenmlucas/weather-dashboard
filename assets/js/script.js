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
// var latitude = 37.0902;
// var longitude = -95.7129;
var weather = document.getElementById("display-forecast");

var getCity = function (city) {
    var apiList = "https://api.openweathermap.org/data/2.5/onecall?&lat=37.0902&lon=-95.7129&exclude=minutely,hourly&appid=5c71643f7754882962dd3859f2f84f94&units=imperial"
    //"https://api.openweathermap.org/data/2.5/forecast?q=mesa&appid=5c71643f7754882962dd3859f2f84f94";
    console.log("function was called");
    fetch(apiList).then(function (response) {
        console.log(response);
        if (response.ok) {
            response.json().then(function (data) {
                displayCity(data, city);
                console.log(data);
                
                weather.innerHTML= "";
            
                var currentTemp = data.current.temp;
                console.log(currentTemp);
                var temp = document.createElement("p")
                temp.textContent= "Tempature" + " " + currentTemp;
                weather.appendChild(temp);          
              
                var currentHumidity = data.current.humidity;
                console.log(currentHumidity);
                var humidity = document.createElement("p")
                humidity.textContent= "Humidity" + " " + currentHumidity;
                weather.appendChild(humidity);    

                var currentWindSpeed = data.current.wind_speed;
                console.log(currentWindSpeed);
                var wind = document.createElement("p")
                wind.textContent= "Wind-Speed" + " " +  currentWindSpeed;
                weather.appendChild(wind);    

                var currentUvi = data.current.uvi;
                console.log(currentUvi);
                var uvi = document.createElement("p")
                uvi.textContent= "Uvi" + " " + currentUvi;
                weather.appendChild(uvi);    
                
            });
        } else {
            alert("Error: City Not Found");
        }
    })
        .catch(function (error) {
            alert("Unable to Connect");
        })
};

//to display city infor into correct areas 
var displayCity = function (getCity, searchTerm) {
    weatherContainer.textContent = "";
    weatherSearchTerm.textContent = searchTerm;
    console.log(getCity);
    console.log(searchTerm);
};



// //save city to local storage
// var saveCityInfo = function() {
//     var weather = $(this).siblings(".displayForecast").val();
//     var weatherContent = $(this).siblings(".displayForecast").attr("class");

//     var storage = localStorage.setItem(weatherContent, JSON.stringify(weather));


// }   

//to use search button
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