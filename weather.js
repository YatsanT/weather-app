let now = new Date();

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
let time = document.querySelector("#time");
let curdate = document.querySelector("#date");
let weekday = document.querySelector("#weekday");

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();

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

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

h2.innerHTML = `${day}`;
h3.innerHTML = `${month}, ${date}`;
time.innerHTML = `${hours}:${minutes}`;
curdate.innerHTML = `${month}, ${date}`;
weekday.innerHTML = `${day}`;

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = `${Math.round(
    response.data.main.temp
  )} °C`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("h1").innerHTML = `${response.data.name} ${Math.round(
    response.data.main.temp
  )} °C `;
}

function search(city) {
  let apiKey = "847e89ce69af20c0bb02aee25a347161";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeatherCondition);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}
function showPosition(position) {
  let apiKey = "847e89ce69af20c0bb02aee25a347161";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayWeatherCondition);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", handleSubmit);

let yourLocationButton = document.querySelector("#your-location");
yourLocationButton.addEventListener("click", getCurrentLocation);

search("New York");
