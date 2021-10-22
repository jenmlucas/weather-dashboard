// GIVEN a weather dashboard with form inputs

// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history- Done

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name-Done, the date-Done, an icon representation of weather conditions, the temperature- Done, the humidity- Done, the wind speed,- Done and the UV index

// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe- done 

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date- done, an icon representation of weather conditions, the temperature- done, the wind speed- done, and the humidity- done

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city- done 
var search = document.getElementById("search");
var cityInput = document.getElementById("city");
var cityForm = document.getElementById("city-form")
var weatherContainer = document.getElementById("weather-container");
var weatherSearchTerm = document.getElementById("city-search-term");
var weather = document.getElementById("display-forecast");
var day = document.getElementById("day1");
var date = document.getElementById("date1");
var searches = document.getElementById("searches");
var deleteEl = document.getElementById("deleteSearches");
var terms = document.getElementById("terms");


var fiveDayForecast = function (forecast) {
    console.log(forecast);

    currentForecast.innerHTML = "";
    var currentDate = document.createElement("p")
    var currentItem = new Date(forecast[0].dt * 1000).toLocaleDateString("en-US");
    currentDate.textContent = currentItem;
    currentDate.classList.add("date");
    document.getElementById("currentForecast").appendChild(currentDate);
    console.log(dateItem);

    for (let i = 0; i < 5; i++) {

        var dateList = document.getElementById(`date${i + 1}`)
        dateList.innerHTML = "";

        var dayList = document.getElementById(`day${i + 1}`);
        dayList.innerHTML = "";

        //put moment function here
        var dateInfo = document.createElement("div")
        var dateItem = new Date(forecast[i + 1].dt * 1000).toLocaleDateString("en-US");
        dateInfo.textContent = dateItem;
        dateInfo.classList.add("date");
        document.getElementById(`date${i + 1}`).appendChild(dateInfo);
        console.log(dateItem);

        var currentWeatherIconUrl = `https://openweathermap.org/img/w/${forecast[i].weather[0].icon}.png`
        console.log(currentWeatherIconUrl);
        var weatherIcon = document.createElement("img")
        weatherIcon.setAttribute("src", currentWeatherIconUrl);
        weatherIcon.classList.add("icons");
        document.getElementById(`day${i + 1}`).appendChild(weatherIcon);

        // console.log(forecast[i].dt)
        //something like this 
        // console.log(moment(forecast[i].dt.dateItem));
        var five = document.createElement("p");
        console.log(forecast[i].temp.day);
        five.textContent = "Tempature:" + " " + forecast[i].temp.day;
        five.classList.add("infoContent");
        document.getElementById(`day${i + 1}`).appendChild(five);

        var hum = document.createElement("p")
        console.log(forecast[i].humidity);
        hum.textContent = "Humidity:" + " " + forecast[i].humidity;
        hum.classList.add("infoContent");
        document.getElementById(`day${i + 1}`).appendChild(hum);

        var windSpeed = document.createElement("p")
        console.log(forecast[i].wind_speed);
        windSpeed.textContent = "Wind Speed:" + " " + forecast[i].wind_speed;
        windSpeed.classList.add("infoContent");
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
                console.log(data);
                weather.innerHTML = "";

                var currentWeatherIconUrl = `https://openweathermap.org/img/w/${data.current.weather[0].icon}.png`
                console.log(currentWeatherIconUrl);
                var weatherIcon = document.createElement("img")
                weatherIcon.setAttribute("src", currentWeatherIconUrl);
                weatherIcon.classList.add("icon");
                weather.appendChild(weatherIcon);

                // create current weather
                var currentTemp = data.current.temp;
                // console.log(currentTemp);
                var temp = document.createElement("p")
                temp.textContent = "Tempature:" + " " + currentTemp + " " + "°F";
                temp.classList.add("infoContent");
                weather.appendChild(temp);

                var currentHumidity = data.current.humidity;
                // console.log(currentHumidity);
                var humidity = document.createElement("p")
                humidity.textContent = "Humidity:" + " " + currentHumidity + " " + "%";
                humidity.classList.add("infoContent");
                weather.appendChild(humidity);

                var currentWindSpeed = data.current.wind_speed;
                // console.log(currentWindSpeed);
                var wind = document.createElement("p")
                wind.textContent = "Wind Speed:" + " " + currentWindSpeed + " " + "MPH";
                wind.classList.add("infoContent");
                weather.appendChild(wind);

                var currentUvi = data.daily[0].uvi;
                // console.log(currentUvi);
                var uvi = document.createElement("p");
                uvi.classList.add("infoContent");
                uvi.textContent = "UV Index:" + " " + currentUvi;
                if (currentUvi < 3) {
                    uvi.classList.add("bg-success");
                } else if (currentUvi < 7) {
                    uvi.classList.add("bg-warning");
                } else {
                    uvi.classList.add("bg-danger");
                }
                weather.appendChild(uvi);

                fiveDayForecast(data.daily);
            });
        } else {
            alert("Error: City Not Found");
        }
    })
        .catch(function (error) {
            alert("Unable to Connect");
        })
};

var getCityName = function (cityName) {
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
var displayCity = function (searchTerm) {
    weatherContainer.textContent = "";
    weatherSearchTerm.textContent = searchTerm;
    var saveButton = document.createElement("button");
    saveButton.textContent = searchTerm;
    saveButton.classList.add("row", "mt-2", "savedCity", "btn", "d-grid", "gap-2", "col", "rounded", "mb-2" );
    saveButton.addEventListener("click", function () {
        console.log("this is some text", this);
        weatherSearchTerm.textContent = this.textContent;
        getCityName(this.textContent);
        console.log(this.textContent);
    });
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
    var savedCities = JSON.parse(localStorage.getItem("cities")) || [];
    savedCities.push(cityInput.value);
    localStorage.setItem("cities", JSON.stringify(savedCities));
    console.log("this", savedCities);
};

var displaySavedStorage = function () {
    var savedCities = JSON.parse(localStorage.getItem("cities")) || [];
    for (var i = 0; i < savedCities.length; i++) {
        var citiesButton = document.createElement("button");
        citiesButton.textContent = savedCities[i];
        citiesButton.classList.add("row", "mt-2", "savedCity", "btn", "d-grid", "gap-2", "col", "rounded", "mb-2" );
        citiesButton.addEventListener("click", function () {
        console.log("this is some text", this);
        weatherSearchTerm.textContent = this.textContent;
        getCityName(this.textContent);
        });
        terms.append(citiesButton);
    }

};

var deleteSearches = function () {
    console.log("delete button clicked");
    localStorage.removeItem("cities");
    terms.innerHTML = "";
};

displaySavedStorage();
search.addEventListener("click", function () {
    getCityName(cityInput.value);
    displayCity(cityInput.value);
    saveStorage();
});

deleteEl.addEventListener("click", deleteSearches);
