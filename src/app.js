let date = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[date.getDay()];
let hours = date.getHours();
if (hours<10) {hours = `0${hours}`;}
let minutes = date.getMinutes();
if (minutes<10) {minutes = `0${minutes}`;}

let currentDate = document.querySelector("#current-day");
currentDate.innerHTML =`${day}, ${hours} : ${minutes}`;

function formatDay(timeStamp) {
    let date = new Date(timeStamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];    
}

function forecastWeather(response) {
    let forecast = response.data.daily;
    let displayForecast = document.querySelector("#forecast");
    let forecastHTML = `<div class ="row">`;
    forecast.forEach(function (forecastDay, index) {
        if (index < 6) {  forecastHTML += `<div class="col-2">
        <div class="day-temp">${formatDay(forecastDay.weather[0].icon)} </div>
            <img src= `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`  alt=" " width="36"/>
            <div class="temp-forecast">
                <span class="temp-forecast-max">18°</span>
            <span class="temp-forecast-min">11°</span>
            </div>
            
        </div>`        
        }
        ;
                
    });

    forecastHTML = forecastHTML + `</div>`;
    displayForecast.innerHTML = forecastHTML;
    
}
function getForecast(coordinates) {
    let apiKey = "302c93e3e9e39b90c8c02a8d733c82ec";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}`;
    
    axios.get(apiUrl).then(forecastWeather);
}

function getWeather(response) {
    let tempElement = document.querySelector("#main-temp");
    let descriptionElement = document.querySelector("#description");
    let windElement = document.querySelector("#speed-wind");
    let cityElement = document.querySelector("#city")
    let iconELement = document.querySelector("#icon")

    celsiusTemp = response.data.main.temp;

    tempElement.innerHTML = Math.round(response.data.main.temp);
    descriptionElement.innerHTML = response.data.weather[0].description;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    cityElement.innerHTML = response.data.name;
    iconELement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconELement.setAttribute("alt", response.data.weather[0].description);
    
    getForecast(response.data.coord);
}

function search(city) {
    let apiKey = "302c93e3e9e39b90c8c02a8d733c82ec"
    let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

    axios.get(apiUrlCity).then(getWeather);
}

function handleSubmit(event) {event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
    
}

function displayFahr(event) {event.preventDefault();
        let fahrTemp = (celsiusTemp * 1.8) + 32;
    let temperatureElement = document.querySelector("#main-temp");
    temperatureElement.innerHTML = Math.round(fahrTemp);
}

function displayCel(event) {event.preventDefault();
    let CelTemp = document.querySelector("#main-temp");
    CelTemp.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrLink = document.querySelector("#fahr-value");
fahrLink.addEventListener("click", displayFahr);

let celsuisLink = document.querySelector("#celsius-value");
celsuisLink.addEventListener("click", displayCel);

search("New York");

