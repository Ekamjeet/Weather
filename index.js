const city = document.querySelector('.search-box');
if(city){
    city.addEventListener('keypress', setQuery);
  }
// city.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {    
      getResults(city.value);
    }
  }

  function getResults (_query) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${_query}&appid=0cd5be1d0ead27b8fc9e5015bab6690f`)
      .then(weather => {
        return weather.json();
      }).then(displayResults);
  }
  
  

  function displayResults (weather) {

    //current city
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;


    // temp acc to city
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp - 273.00 )}<span>°c</span>`;

    // weather acc to city
    let weather_Current = document.querySelector('.current .weather');
    weather_Current.innerHTML = `${weather.weather[0].description.toUpperCase()}`;

    // high_low temperature
    let hi_low = document.querySelector('.hi-low');
    hi_low.innerText = `${Math.floor(weather.main.temp_min - 273.00)}°c / ${Math.ceil(weather.main.temp_max - 273.00)}°c`;

    //feels like temp
    let feelsLike = document.querySelector('.feels-like');
    feelsLike.innerHTML = `<span>Feels Like : </span>${Math.round(weather.main.feels_like - 273.00)}<span>°c</span>`;

    //wind speed
    let wind = document.querySelector('.wind-speed');
    wind.innerHTML = `<span>Wind Speed : </span>${weather.wind.speed * 3.6} <span>km/h</span>`;

    //humidity
    let humi = document.querySelector('.humidity-curr');
    humi.innerHTML = `<span>Humidity : </span>${weather.main.humidity} <span>%</span>`;

    // Current date
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    function dateBuilder (d) {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
      
        return `${day} ${date} ${month} ${year}`;
  }
}
