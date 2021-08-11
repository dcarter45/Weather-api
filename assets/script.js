const timeEl= document.getElementById('time');
const dateEl= document.getElementById('date');
const currentWeatherItemsEl= document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEL = document.getElementById('current-temp');

setInterval(()=>{
const time= new Date();
const month=time.getMonth();
const date=time.getDate();
const day=time.getDay();
const hours=time.getHours();
const hoursIn12HourFormat= hour >= 13? hour %12: hour;
const minutes=time.getMinutes();
const ampm= hours >=12 ? 'pm': 'am';

timeEl.innerHTML= hoursIn12HourFormat + ':' + minutes +  '' + `<span id="am-pm">${ampm}</span>`

dateEl.innerHTML='';



},1000)


