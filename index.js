function updateWeather(response) {
let temperatureElement = document.querySelector("#current-temperature");
let temperature = response.data.temperature.current;
let cityElement = document.querySelector("#current-city");
let descriptionElement = document.querySelector("#description");
let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind");
let timeElement = document.querySelector("#time");
let date = new Date(response.data.time * 1000);
let iconElement = document.querySelector("#icon");


iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon"/>`;
cityElement.innerHTML = response.data.city;
timeElement.innerHTML = formatDate(date);
descriptionElement.innerHTML = response.data.condition.description;
humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
windElement.innerHTML = `${response.data.wind.speed}mph`;
temperatureElement.innerHTML = Math.round(temperature);
}

function formatDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    
    return `${day} ${hours}:${minutes}`; 
}


function searchCity(city) {
    let apiKey = "531077td81140facaaffabofa45af54d";
    let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
    axios.get(apiURL).then(updateWeather);
}



function handleSearchSubmit(event) {
    event.preventDefault();
let searchInput = document.querySelector("#search-input");

searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Seattle");
