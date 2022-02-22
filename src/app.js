
let date = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[date.getDay()];
let hours = date.getHours();
if (hours<10) {hours = `0${hours}`;}
let minutes = date.getMinutes();
if (minutes<10) {minutes = `0${minutes}`;}


let currentDate = document.querySelector("#current-day");
currentDate.innerHTML =`${day}, ${hours} : ${minutes}`;


let apiKey = "302c93e3e9e39b90c8c02a8d733c82ec"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Brussels&appid=${apiKey}&units=metric`

function getWeather(response) {
    let tempElement = document.querySelector("#main-temp");
    let descriptionElement = document.querySelector("#description");
    let windElement = document.querySelector("#speed-wind");
    let cityElement = document.querySelector("#city")
    tempElement.innerHTML = Math.round(response.data.main.temp);
    descriptionElement.innerHTML = response.data.weather[0].description;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    cityElement.innerHTML = response.data.name;
    
}

axios.get(apiUrl).then(getWeather);


    




