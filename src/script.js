let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let hours = now.getHours();
let minutes = now.getMinutes();

let actualTime = document.querySelector("#today");
actualTime.innerHTML = `${day} ${hours}:${minutes}`;

//Add a search engine, when searching for a city (i.e. Paris)
// display the city name on the page after the user submits the form.

//In your project, when a user searches for a city (example: New York), it should
//display the name of the city on the result page and the current temperature of the city.

let selectSearchButton = document.querySelector("#search-button");
selectSearchButton.addEventListener("click", handleSearchCity);

let apiKey = "3e7e8fd8cf76af676ed5110468b54fe1";

function handleSearchCity(displayCity) {
  displayCity.preventDefault();
  let showCity = document.querySelector("#exampleInputEmail1");
  let h3 = document.querySelector("h3");
  h3.innerHTML = `${showCity.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${showCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(handleShowTemperature);
}

function handleShowTemperature(response) {
  console.log(response);
  let temperature = Math.round(`${response.data.main.temp}`);
  let showTemperature = document.querySelector("#temp-day");
  showTemperature.innerHTML = `${temperature}°C`;
  let humidity = document.querySelector("#show-humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;
  let wind = Math.round(`${response.data.wind.speed}`);
  let showWindSpeed = document.querySelector("#show-wind");
  showWindSpeed.innerHTML = `Wind: ${wind} km/h`;
}

//Add a Current Location button. When clicking on it, it uses the Geolocation API to
//get your GPS coordinates and display and the city and current temperature using the OpenWeather API.

let selectCurrentButton = document.querySelector("#current-button");
selectCurrentButton.addEventListener("click", getMyPosition);

function getMyPosition(event) {
  navigator.geolocation.getCurrentPosition(handleShowCurrentData);
}

function handleShowCurrentData(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(handleShowCurrentTemperature);
}

function handleShowCurrentTemperature(response) {
  console.log(response);

  let h3 = document.querySelector("h3");
  h3.innerHTML = `${response.data.name}`;

  let temperature = Math.round(`${response.data.main.temp}`);
  let showTemperature = document.querySelector("#temp-day");
  showTemperature.innerHTML = `${temperature}°C`;
  let humidity = document.querySelector("#show-humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;
  let wind = Math.round(`${response.data.wind.speed}`);
  let showWindSpeed = document.querySelector("#show-wind");
  showWindSpeed.innerHTML = `Wind: ${wind} km/h`;
}
