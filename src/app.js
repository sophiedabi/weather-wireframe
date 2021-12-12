function changeCity(event) {
  event.preventDefault();
  let h1 = document.querySelector("h1");
  let cityInput = document.querySelector("#search");
  h1.innerHTML = `weather in ${cityInput.value}`;
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

function showWeather(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `weather in <br/> ${response.data.name}`;
  let temperature = Math.round(response.data.main.temp);
  let tempNow = document.querySelector("#tempNow");
  tempNow.innerHTML = `${temperature}`;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherdescr.innerHTML = `currently: ${response.data.weather[0].description}`;
  humidity.innerHTML = `humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `wind: ${Math.round(response.data.wind.speed)}km/h`;

  celsiusTemp = response.data.main.temp;
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

searchCity("Brunswick");

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
  let forecastDay1 = document.querySelector(".forecastDay1");
  forecastDay1.innerHTML = `min.${Math.round(
    response.daily.temp.min
  )}°C|max.${Math.round(response.daily.temp.max)}°C`;
  let forecastDay2 = document.querySelector(".forecastDay2");
  forecastDay2.innerHTML = `min.${Math.round(
    response.daily.temp.min
  )}°C|max.${Math.round(response.daily.temp.max)}°C`;
  let forecastDay3 = document.querySelector(".forecastDay3");
  forecastDay3.innerHTML = `min.${Math.round(
    response.daily.temp.min
  )}°C|max.${Math.round(response.daily.temp.max)}°C`;
  let forecastDay4 = document.querySelector(".forecastDay4");
  forecastDay4.innerHTML = `min.${Math.round(
    response.daily.temp.min
  )}°C|max.${Math.round(response.daily.temp.max)}°C`;
  let forecastDay5 = document.querySelector(".forecastDay5");
  forecastDay5.innerHTML = `min.${Math.round(
    response.daily.temp.min
  )}°C|max.${Math.round(response.daily.temp.max)}°C`;
}

function getForecast(coordinates) {
  let apiKey = "53551bbf2ab7d7e68f94a20c22d68b6b";
  let apiForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiForecast).then(showForecast);
}
