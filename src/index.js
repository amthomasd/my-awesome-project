function formatDate(now) {
  let currentDay = days[now.getDay()];
  let currentHours = now.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }

  let currentMinutes = now.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  return `${currentDay} ${currentHours}:${currentMinutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function search(city) {
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let units = "imperial";
  let apiKey = "b67db7a1979116d28784dda40f0eb6ff";
  let apiUrl = `${apiEndpoint}?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(updateSearchOutput);
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}
        </div>
        <img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt="" width="42"/>
          <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature-max">${Math.round(
                forecastDay.temp.max
              )}°</span>
              <span> | </span>
              <span class="weather-forecast-temperature-min">${Math.round(
                forecastDay.temp.min
              )}°</span>
          </div>
        </div>
    `;
    }
  });

  forecastHtml = forecastHtml + `</div>`;

  forecastElement.innerHTML = forecastHtml;
}

function getForecast(coordinates) {
  let apiKey = "b67db7a1979116d28784dda40f0eb6ff";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}

function updateSearchOutput(response) {
  fahrenheitTemperature = Math.round(response.data.main.temp);

  document.querySelector("#temperature-for-city").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#city-name-output").innerHTML = response.data.name;
  document.querySelector("#current-day-date-time").innerHTML = formatDate(
    new Date()
  );
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity:${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} Km/H`;
  document.querySelector("#feels-like").innerHTML = `Feels like: ${Math.round(
    response.data.main.feels_like
  )}`;
  document.querySelector("#weather-text").innerHTML =
    response.data.weather[0].description;
  document
    .querySelector("#current-weather-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#current-weather-icon")
    .setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function handleSubmit(event) {
  event.preventDefault();

  let city = document.querySelector("#search-text-input").value;

  document.querySelector("#current-day-date-time").innerHTML = formatDate(
    new Date()
  );
  search(city);
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "b67db7a1979116d28784dda40f0eb6ff";
  let units = "imperial";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(updateSearchOutput);
}

let form = document.querySelector("#search-form");
let button = document.querySelector("#current-location");

form.addEventListener("submit", handleSubmit);

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
button.addEventListener("click", getCurrentPosition);

search("New York");
