const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const search = document.getElementById('submit');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');



function weatherAPI(){
    const cityName= document.getElementById('cityName').value
    console.log(cityName);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=19c84895f9f2ef636c0c6e74ff8df1ef`).then((response) => response.json())
    .then((data)=> {
        const currentTempEl = document.getElementById('current-temp');
    console.log(currentTempEl);
    const tempNight= currentTempEl.getElementsByClassName('temp-night')[0];
    tempNight.innerHTML=data.main.temp/32;
    const tempDay= currentTempEl.getElementsByClassName('temp-day')[0];
    tempDay.innerHTML=data.main.temp/32;
        console.log(data);
        const timezone = document.getElementById('time-zone');
        timezone.innerHTML=`${data.sys.country}/${data.name}`;
        console.log(timezone);
    } )
       
    
}

