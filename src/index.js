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

function search(city) {
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let units = "imperial";
  console.log(city);
  let apiKey = "b67db7a1979116d28784dda40f0eb6ff";
  let apiUrl = `${apiEndpoint}?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(updateSearchOutput);
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHtml = `<div class="row">`;
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}
        </div>
        <img src="http://openweathermap.org/img/wn/50d@2x.png" alt="" width="42"/>
          <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature-max">18</span>
              <span class="weather-forecast-temperature-min">12</span>
          </div>
        </div>
    `;
  });

  forecastHtml = forecastHtml + `</div>`;

  forecastElement.innerHTML = forecastHtml;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "b67db7a1979116d28784dda40f0eb6ff";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
}

function updateSearchOutput(response) {
  console.log(response);

  fahrenheitTemperature = Math.round(response.data.main.temp);

  displayForecast();

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
  //debugger;
  let city = document.querySelector("#search-text-input").value;

  //document.querySelector("#city-name-output").innerHTML = searchInput;

  document.querySelector("#current-day-date-time").innerHTML = formatDate(
    new Date()
  );
  search(city);
  /* let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let units = "imperial";
  let apiKey = "b67db7a1979116d28784dda40f0eb6ff";
  let apiUrl = `${apiEndpoint}?q=${searchInput}&units=${units}&appid=${apiKey}`;*/

  //axios.get(apiUrl).then(updateSearchOutput);
}

/*function updateElementsForCurrentLocation(event) {
  let temperatureOutput = document.querySelector("#temperature-for-city");
  let units = "imperial";
  let apiKey = "b67db7a1979116d28784dda40f0eb6ff";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
}*/

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
  //debugger;
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "b67db7a1979116d28784dda40f0eb6ff";
  let units = "imperial";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(updateSearchOutput);
}

let form = document.querySelector("#search-form");
let button = document.querySelector("#current-location");

form.addEventListener("submit", handleSubmit); //don't use parenthesis

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
button.addEventListener("click", getCurrentPosition);

function convertToFahrenheit(event) {
  event.preventDefault();
  document.querySelector("#temperature-for-city").innerHTML =
    fahrenheitTemperature;

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function convertToCelsius(event) {
  event.preventDefault();
  document.querySelector("#temperature-for-city").innerHTML = Math.round(
    ((fahrenheitTemperature - 32) * 5) / 9
  );
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let fahrenheitTemperature = null;

search("New York");
