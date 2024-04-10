const inputBox = document.querySelector('.input-box');
const searchBtn = document.querySelector('.searchBtn');
const weather_img = document.querySelector('.weather-image');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.querySelector('.humidity-value');
const wind_speed = document.querySelector('.wind-speed');
const location_not_found = document.querySelector('.location-not-found-box');
const weather_body = document.querySelector('.weather-section');

async function checkWeather(city) {
    const apiKey = "47b3b61560ebfccd3bbea057994d0ccc";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var weather_data = await response.json();

    if (weather_data.cod === '404') {
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    console.log("run");
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    temperature.innerHTML = `${Math.round(weather_data.main.temp)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;

    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed} Km/h`;

    switch (weather_data.weather[0].main) {
        case 'Clouds':
            weather_img.src = "/cloud.png";
            break;
        case 'Clear':
            weather_img.src = "/clear.jpeg";
            break;
        case 'Rain':
            weather_img.src = "/rain.jpeg";
            break;
        case 'Mist':
            weather_img.src = "/mist.jpeg";
            break;
        case 'Snow':
            weather_img.src = "/snow.jpeg";
            break;
    }

    console.log(weather_data);
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});
