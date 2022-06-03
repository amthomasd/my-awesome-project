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

function updateSearchOutput(response) {
  console.log(response);

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
  )}`;
  document.querySelector("#feels-like").innerHTML = `Feels like: ${Math.round(
    response.data.main.feels_like
  )}`;
  document.querySelector("#weather-text").innerHTML =
    response.data.weather[0].description;
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
search("Butler");
/*function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
*/
