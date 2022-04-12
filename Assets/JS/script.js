// global variables
const searchHistory = [];
// const weatherApiUrl = "https://api.openweathermap.org/";
const apiKey = "5616ff509464a7cb61e0eff42d696693";
var cityInput = "";


//DOM references
var searchForm = document.querySelector('#search-form');
var cityInput = document.getElementById("search-input").value;
// var todayBox =
// var forecastBox = 
// var searchDisplayBox = 
var submitBtn = document.querySelector('.search-button');

//Add timezone for Day.js
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

//function to display search history
//function displaysearchhistory
//searchdisplaybox.innerhtml = "";



var weatherApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${apiKey}`;
console.log(weatherApiUrl);

function weatherData(weatherApi) {

    
    fetch(weatherApiUrl)
    .then(function(response) {
        return response.json()
    })
    .then(function (data) {
        console.log(data);
    })
    
}

weatherData(weatherApiUrl);
//make a request to the one call and show them howw to make api key
// fetch coordinates
// fetch weather 
//functio renderitems(city,data) {}

// submitBtn.addEventListener('click',citySubmit);