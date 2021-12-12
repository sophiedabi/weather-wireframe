function changeCity(event) {
  event.preventDefault();
  let h1 = document.querySelector("h1");
  let cityInput = document.querySelector("#search");
  h1.innerHTML = `weather${cityInput.value}`;
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `Last updated on ${currentDay}, ${currentHour}:${minutes}`;
}

let now = new Date();
let currently = document.querySelector(".currentDT");
currently.innerHTML = formatDate(now);

function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "53551bbf2ab7d7e68f94a20c22d68b6b";
  let apiUrlCoords = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrlCoords).then(showWeather);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "53551bbf2ab7d7e68f94a20c22d68b6b";
  let apiUrlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrlForecast);
  axios.get(apiUrlForecast).then(showForecast);
}

function showWeather(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `weather in <br/> ${response.data.name}`;
  let temperature = Math.round(response.data.main.temp);
  let tempNow = document.querySelector("#tempNow");
  tempNow.innerHTML = `${temperature}`;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let weatherdescr = document.querySelector("#weatherdescr");
  weatherdescr.innerHTML = `currently: ${response.data.weather[0].description}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `humidity: ${response.data.main.humidity}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `wind: ${Math.round(response.data.wind.speed)}km/h`;

  celsiusTemp = response.data.main.temp;

  getForecast(response.data.coord);
}

let currentButton = document.querySelector(".currentB");
currentButton.addEventListener("click", searchGeolocation);

function searchGeolocation() {
  console.log(navigator.geolocation.getCurrentPosition);
  navigator.geolocation.getCurrentPosition(getPosition);
}

function searchCity(city) {
  let apiKey = "53551bbf2ab7d7e68f94a20c22d68b6b";
  let units = "metric";
  let apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlWeather).then(showWeather);
}

function submitting(event) {
  event.preventDefault();
  let city = document.querySelector("#search").value;
  searchCity(city);
}

let searchbar = document.querySelector("#searchForm");
searchbar.addEventListener("submit", submitting);

let searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", submitting);

searchCity("Braunschweig");

let celsiusTemp = null;

function convertToFahrenheit(event) {
  event.preventDefault();

  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let temperatureConvert = document.querySelector("#tempNow");
  temperatureConvert.innerHTML = Math.round(fahrenheitTemp);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureConvert = document.querySelector("#tempNow");
  temperatureConvert.innerHTML = Math.round(celsiusTemp);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
                <div class="col-2">
                  <div class="weather-forecast-date">${formatDay(
                    forecastDay.dt
                  )}</div>
                  <img
                    src="http://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png"
                    alt="forecast weather icon"
                    width="30px"
                  />
                  <div class="weather-forecast-temperatures">
                    <span class="weather-forecast-temperatures-max">${Math.round(
                      forecastDay.temp.max
                    )}°</span>
                    <span class="weather-forecast-temperatures-min">${Math.round(
                      forecastDay.temp.min
                    )}°</span>
                  </div>
                </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

showForecast();
