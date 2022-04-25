// global variables
const searchHistory = [];
// const weatherApiUrl = "https://api.openweathermap.org/";
const apiKey = "5616ff509464a7cb61e0eff42d696693";
var cityInput;

//DOM references
var searchForm = document.querySelector("#search-form");
var cityHeading = document.querySelector(".city");
var currentTemp = document.querySelector(".current-temp");
var currentWind = document.querySelector(".current-wind");
var currentHumidity = document.querySelector(".current-humidity");
var currentUv = document.querySelector(".current-uv");
var forecastEl = document.querySelector("#forecast");
var submitBtn = document.querySelector(".search-button");
var searchDisplayBoxEl = document.querySelector("#search-input");

// var searchDisplayBox =

//Add timezone for Day.js
// dayjs.extend(window.dayjs_plugin_utc);
// dayjs.extend(window.dayjs_plugin_timezone);

//function to display search history
//function displaysearchhistory
//searchdisplaybox.innerhtml = "";

var savedCities = [];

function citySubmit(event) {
  event.preventDefault();
  cityInput = document.getElementById("search-input").value;

  weatherData(cityInput);

  // create local storage
  savedCities.push(cityInput);
  localStorage.setItem("city", JSON.stringify(savedCities));
  JSON.parse(localStorage.getItem("city"));

  
  var city = document.getElementById("search-input").value;
  var searchedCity = $(`
  <li class="list-group-item">${city}</li>
  `);
  $("#search-history").append(searchedCity);
}

submitBtn.addEventListener("click", citySubmit);

function weatherData(cityInput) {
  var geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}}&limit=5&appid=${apiKey}`;

  fetch(geoUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data[0].lat);
      var lat = data[0].lat;
      console.log(data[0].lon);
      var lon = data[0].lon;

      var weatherApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
      fetch(weatherApiUrl)
        .then(function (response) {
          //turns response into javascript object notation
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          // you use . since these are all objects and not arrays anymore
          // var weatherID = data.current.weather.icon;
          // console.log(weatherID);

          var date = data.current.dt;
          console.log(data);
          var currentDate = data.current.dt;
          var todaysDate = moment.unix(currentDate).format("MM/DD/YYYY");
          cityHeading.textContent = `${cityInput}  ${todaysDate}`;

          var temp = data.current.temp;
          currentTemp.textContent = "Temp: " + temp;
          var wind = data.current.wind_speed;
          console.log(wind);
          currentWind.textContent = "Wind: " + wind + " MPH";
          var humidity = data.current.humidity;
          currentHumidity.textContent = "Humidity: " + humidity + "%";
          var uv = data.current.uvi;
          currentUv.textContent = "UV Index: " + uv;

          var forecastWeatherApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=current,minutely,hourly,alerts&appid=${apiKey}`;
          fetch(forecastWeatherApiUrl)
            .then(function (response) {
              return response.json();
            })
            .then(function (forecastData) {
              console.log(forecastData);
              for (let i = 1; i < 6; i++) {
                var cityInfo = {
                  date: forecastData.daily[i].dt,
                  temp: forecastData.daily[i].temp.day,
                  wind: forecastData.daily[i].wind_speed,
                  humidity: forecastData.daily[i].humidity,
                };

                var currentDate = moment
                  .unix(cityInfo.date)
                  .format("MM/DD/YYYY");

                var futureCardTemplate = $(`
                  <div id="custom-card" class="card mr-3" style="width: 15rem;">
              <div class="card-body">
                <h5 class="card-title">${currentDate}</h5>
                <p class="card-text">Temp: ${cityInfo.temp}</p>
                <p class="card-text">Wind: ${cityInfo.wind}</p>
                <p class="card-text">Humidity: ${cityInfo.humidity}</p>
              </div>
          </div>`);

                $("#forecast").append(futureCardTemplate);
              }
            });
        });
    });
}

// need event listener function to create buttons
$(document).on("click", ".list-group-item", function () {
  var cityList = $(this).text();
  weatherData(cityList);
});
