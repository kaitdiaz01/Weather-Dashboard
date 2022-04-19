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




// var todayBox =
// var forecastBox =
// var searchDisplayBox =
var submitBtn = document.querySelector(".search-button");

//Add timezone for Day.js
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

//function to display search history
//function displaysearchhistory
//searchdisplaybox.innerhtml = "";
var savedCities = [];

function citySubmit(event) {
  event.preventDefault();
  cityInput = document.getElementById("search-input").value;

  weatherData(cityInput);
  cityHeading.textContent = cityInput;

  // create local storage 
  // get local storage 
    // savedCities.push(cityInput);

  //set local storage





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


        var weatherApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
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
        console.log(date);
        var temp = data.current.temp;
        currentTemp.textContent = "Temp: " + temp ;
        var wind = data.current.wind_speed;
        console.log(wind);
        currentWind.textContent = "Wind: " + wind + " MPH";
        var humidity = data.current.humidity;
        currentHumidity.textContent = "Humidity: " + humidity + "%";
        var uv = data.current.uvi;
        currentUv.textContent = "UV Index: " + uv;
     



        

        
        })
    });
    
}

// need event listener function to create buttons 




