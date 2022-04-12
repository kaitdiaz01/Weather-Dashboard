// global variables
const searchHistory = [];
// const weatherApiUrl = "https://api.openweathermap.org/";
const apiKey = "5616ff509464a7cb61e0eff42d696693";
var cityInput;

//DOM references
var searchForm = document.querySelector("#search-form");

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


        var weatherApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
        fetch(weatherApiUrl)
        .then(function (response) {
            //turns response into javascript object notation
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        // you use . since these are all objects and not arrays anymore
        var clouds = data.current.clouds
        console.log(clouds);
            
        })
    });
    
}

// need event listener function to create buttons 




//i can query select the class for the cards which will return an array to run in for loop with i=0
// weatherData(weatherApiUrl);
//make a request to the one call and show them howw to make api key
// fetch coordinates
// fetch weather
//functio renderitems(city,data) {}
