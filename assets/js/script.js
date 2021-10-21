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
var weather = document.getElementById("display-forecast");
var day = document.getElementById("day1");
var date = document.getElementById("date1");
// var storage= [];
// var loadStorage= [];
var searches= document.getElementById("searches");
var btnSearch = document.getElementsByClassName("button");

var fiveDayForecast = function (forecast) {
    console.log(forecast);

    currentForecast.innerHTML= "";
    var currentDate = document.createElement("p")
    var currentItem = new Date(forecast[0].dt * 1000).toLocaleDateString("en-US");
    currentDate.textContent = currentItem;
    document.getElementById("currentForecast").appendChild(currentDate);
    console.log(dateItem);

    for (let i = 0; i < 5; i++) {
        
        var dateList = document.getElementById(`date${i + 1}`)
        dateList.innerHTML="";

        var dayList = document.getElementById(`day${i + 1}`);
        dayList.innerHTML="";

        //put moment function here
        var dateInfo = document.createElement("div")
        var dateItem = new Date(forecast[i + 1].dt * 1000).toLocaleDateString("en-US");
        dateInfo.textContent = dateItem;
        document.getElementById(`date${i + 1}`).appendChild(dateInfo);
        console.log(dateItem);

        // console.log(forecast[i].dt)
        //something like this 
        // console.log(moment(forecast[i].dt.dateItem));
        var five = document.createElement("p");
        console.log(forecast[i].temp.day);
        five.textContent = "Tempature:" + " " + forecast[i].temp.day;
        document.getElementById(`day${i + 1}`).appendChild(five);

        var hum = document.createElement("p")
        console.log(forecast[i].humidity);
        hum.textContent = "Humidity:" + " " + forecast[i].humidity;
        document.getElementById(`day${i + 1}`).appendChild(hum);

        var windSpeed = document.createElement("p")
        console.log(forecast[i].wind_speed);
        windSpeed.textContent = "Wind Speed:" + " " + forecast[i].wind_speed;
        document.getElementById(`day${i + 1}`).appendChild(windSpeed);
    }

};

var getCity = function (latitude, longitude) {
    var apiList = "https://api.openweathermap.org/data/2.5/onecall?&lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly&appid=5c71643f7754882962dd3859f2f84f94&units=imperial"

    // console.log("function was called");
    fetch(apiList).then(function (response) {
        // console.log(response);
        if (response.ok) {
            response.json().then(function (data) {
                displayCity(data, cityInput.value);
                console.log(data);
                weather.innerHTML = "";

                var currentTemp = data.current.temp;
                // console.log(currentTemp);
                var temp = document.createElement("p")
                temp.textContent = "Tempature" + " " + currentTemp + " " + "°F";
                weather.appendChild(temp);

                var currentHumidity = data.current.humidity;
                // console.log(currentHumidity);
                var humidity = document.createElement("p")
                humidity.textContent = "Humidity" + " " + currentHumidity + " " + "%";
                weather.appendChild(humidity);

                var currentWindSpeed = data.current.wind_speed;
                // console.log(currentWindSpeed);
                var wind = document.createElement("p")
                wind.textContent = "Wind-Speed" + " " + currentWindSpeed + " " + "MPH";
                weather.appendChild(wind);

                var currentUvi = data.current.uvi;
                // console.log(currentUvi);
                var uvi = document.createElement("p")
                uvi.textContent = "Uvi" + " " + currentUvi;
                weather.appendChild(uvi);

                fiveDayForecast(data.daily);
                saveStorage();
            });
        } else {
            alert("Error: City Not Found");
        }
    })
        .catch(function (error) {
            alert("Unable to Connect");
        })
};

var getCityName = function () {
    var cityName = cityInput.value;
    // console.log(cityName);
    var apiCity = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=5c71643f7754882962dd3859f2f84f94";

    fetch(apiCity).then(function (response) {
        // console.log(response);
        if (response.ok) {
            response.json().then(function (data) {
                // console.log(data);
                var lat = data.coord.lat;
                var lon = data.coord.lon;
                // console.log(lat, lon)
                getCity(lat, lon);
            })
        }
    })
};

//to display city infor into correct areas 
var displayCity = function (city, searchTerm) {
    weatherContainer.textContent = "";
    weatherSearchTerm.textContent = searchTerm; 
    var saveButton= document.createElement("button");
    saveButton.textContent= searchTerm;
    saveButton.classList.add("row", "mt-2");
    terms.append(saveButton);
};

//to use search button
var formSearchHandler = function (event) {
    event.preventDefault();
    // console.log(event);

    var cityName = cityInput.value.trim();

    if (cityName) {
        getCity(cityName);
        cityInput.value = "";
    } else {
        alert("Please enter a city.")
    }
};

var saveStorage = function () {
    var storage= localStorage.setItem(getCity);
    console.log("this", storage);
}

var loadStorage = function () {

}

search.addEventListener("click", getCityName);