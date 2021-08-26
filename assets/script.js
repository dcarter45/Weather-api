const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const currentWeatherItemsEl = document.getElementById("current-weather-items");
const timezone = document.getElementById("time-zone");
const search = document.getElementById("submit");
const countryEl = document.getElementById("country");
const weatherForecastEl = document.getElementById("weather-forecast");
const currentTempEl = document.getElementById("current-temp");

function weatherAPI() {
  const cityName = document.getElementById("cityName").value;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=3283ea35cac6c2691b9c0744c07547de`)
    .then((response) => response.json())
    .then((data) => {
      updateFirstCard(data);

      updateCityName(data);
    });

  fetch(
    `https://api.openweathermap.org/data/2.5/forecast/daily?q=${cityName}&cnt=6&appid=3283ea35cac6c2691b9c0744c07547de`
  )
    .then((response) => response.json())
    .then((data) => {
      const weatherForecastEl = document.getElementById("weather-forecast");
      const weatherForecastElList = weatherForecastEl.getElementsByClassName("weather-forecast-item");

      let cardKey = 0;
      for (let item of data.list.slice(1)) {
        weatherForecastElList[cardKey].getElementsByClassName("temp-day")[0].innerHTML = `day: ${item.temp.day}`;
        weatherForecastElList[cardKey].getElementsByClassName("day")[0].innerHTML =
          new Date(item.dt * 1000).getMonth() +
          "/" +
          new Date(item.dt * 1000).getDate() +
          "/" +
          new Date(item.dt * 1000).getFullYear();
        cardKey++;
      }
    });
}

function updateFirstCard(data) {
  const currentTempEl = document.getElementById("current-temp");

  const tempNight = currentTempEl.getElementsByClassName("temp-night")[0];
  tempNight.innerHTML = data.main.temp;

  const tempDay = currentTempEl.getElementsByClassName("temp-day")[0];
  tempDay.innerHTML = `day: ${data.main.temp}`;
}

function updateCityName(data) {
  const timezone = document.getElementById("time-zone");
  timezone.innerHTML = `${data.sys.country}/${data.name}`;
}
