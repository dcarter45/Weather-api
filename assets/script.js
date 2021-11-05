const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const currentWeatherItemsEl = document.getElementById("current-weather-items");
const timezone = document.getElementById("time-zone");
const search = document.getElementById("submit");
const countryEl = document.getElementById("country");
const weatherForecastEl = document.getElementById("weather-forecast");
const currentTempEl = document.getElementById("current-temp");

window.onload = function onload() {
  renderCitiesFromLocalStorage()
}


function weatherAPI() {
  const cityName = document.getElementById("cityName").value;
  //addCityOnScreen(cityName);
  addCityToLocalStorage(cityName);
  renderCitiesFromLocalStorage()

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=3283ea35cac6c2691b9c0744c07547de`)
    .then((response) => response.json())
    .then((data) => {
      updateFirstCard(data);

      updateCityName(data);

      console.log(data);
    });

  fetch(
    `https://api.openweathermap.org/data/2.5/forecast/daily?q=${cityName}&units=imperial&cnt=6&appid=3283ea35cac6c2691b9c0744c07547de`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log('DATA2:', data);
      const weatherForecastEl = document.getElementById("weather-forecast");
      const weatherForecastElList = weatherForecastEl.getElementsByClassName("weather-forecast-item");

      let cardKey = 0;
      for (let item of data.list.slice(1)) {

        weatherForecastElList[cardKey].getElementsByClassName("temp-day")[0].innerHTML = `Temp: ${item.temp.day} F`;

        weatherForecastElList[cardKey].getElementsByClassName("temp-wind")[0].innerHTML = `Wind: ${item.speed} mph`;


        const uvEl = weatherForecastElList[cardKey].getElementsByClassName("temp-uv")[0];
        uvEl.innerHTML = `UV: ${item.speed}`;

        weatherForecastElList[cardKey].getElementsByClassName("temp-humidity")[0].innerHTML = `Humidity: ${item.humidity} %`;

        
        if (item.uv === 'severe') {
          uvEl.classList.add('uv-severe');
        } else if (item.uv === 'moderate') {
          uvEl.classList.add('uv-moderate');
        } else if(item.uv === 'favorable'){
          uvEl.classList.add('uv-favorable')
        }



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

document.getElementById('submit_button').addEventListener('click',weatherAPI);

function updateFirstCard(data) {
  const currentTempEl = document.getElementById("current-temp");



  const tempDay = currentTempEl.getElementsByClassName("temp-day")[0];
  tempDay.innerHTML = `Temp: ${data.main.temp} F`;

  const tempWind = currentTempEl.getElementsByClassName("temp-wind")[0];
  tempWind.innerHTML = `Wind: ${data.wind.speed} mph`;

  const tempUV = currentTempEl.getElementsByClassName("temp-uv")[0];
  tempUV.innerHTML = `UV: ${data.wind.speed}`;

  const tempHumidity = currentTempEl.getElementsByClassName("temp-humidity")[0];
  tempHumidity.innerHTML = `Humidity: ${data.wind.speed} %`;
}

function updateCityName(data) {
  const timezone = document.getElementById("time-zone");
  timezone.innerHTML = `${data.sys.country}/${data.name}`;
}


function addCityToLocalStorage(cityName) {
  let cities = getCitiesFromLocalStorage();
  cities = cities.filter(city => city !== cityName);
  cities.push(cityName);
  localStorage.setItem('cities', JSON.stringify(cities));
}

function getCitiesFromLocalStorage() {
  let citiesVal = localStorage.getItem('cities');
  let cities = citiesVal ? JSON.parse(citiesVal) : [];
  return cities;
}

function addCityOnScreen(cityName) {
  const listEl = document.querySelector('#history ul');
  const liEl = document.createElement('li');
  liEl.innerText = cityName;
  liEl.addEventListener('click', function () {
    document.getElementById("cityName").value = cityName;
    weatherAPI();
  }, false)
  listEl.appendChild(liEl);
}


function renderCitiesFromLocalStorage() {
  const listEl = document.querySelector('#history ul');
  listEl.innerHTML = "";
  let cities = getCitiesFromLocalStorage()
  console.log('cities:', cities);
  cities.forEach(addCityOnScreen)

}