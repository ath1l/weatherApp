let button = document.querySelector('#btn');
const apiKey = '064c0120bbe247e14d6cc85affc16004';

button.addEventListener("click",() => {
    const city = document.querySelector('#city').value;
    if (!city) {
        alert('Please enter a city! ');
        return;
    }
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    

    fetch(currentWeatherUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        displayWeather(data);
    })
    .catch(function(error) {
        console.error('Error fetching current weather data. Please try again:', error);
        alert('Error fetching current weather data. Please try again.');
    });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(function(error) {
            console.error('Error fetching hourly forecast data. Please try again:', error);
            alert('Error fetching hourly forecast data. Please try again.');

        })
})

function displayWeather(data) {
    const tempDivInfo = document.querySelector('#temp-div');
    const weatherInfoDiv = document.querySelector('#weather-info');
    const weatherIcon = document.querySelector('#weather-icon');
    const hourlyForecastDiv = document.querySelector('#hourly-forecast');

    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML =  ''; 


        if (data.cod === '404') {
            weatherInfoDiv.innerHTML = ''
            weatherIcon.style.display = 'none';
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp-273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;


        const temperatureHTML = `<p>${temperature}°C</p>`;
        const weatherHTML = `<p>${cityName}</p><p>${description}</p>`;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHTML;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.querySelector('#hourly-forecast');
    const next24Hours = hourlyData.slice(0,8);

    hourlyForecastDiv.innerHTML = '';

    next24Hours.forEach(item => {
             
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`
        
        const hourlyItemHtml = `
        <div class="hourly-item">
            <span>${hour}:00</span>
            <img src="${iconUrl}" alt="Hourly Weather Icon">
            <span>${temperature}°C</span>
        </div>
        `;
    hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage() {
    const weatherIcon = document.querySelector('#weather-icon');
    weatherIcon.style.display = 'block';
}

