async function useInput() {
    try {
        const btn = document.querySelector('.city-weather-btn');
        const input = document.querySelector('.city-weather-input');
        input.oninput = () => {
            localStorage.setItem('city_weather', input.value);
        };
        btn.onclick = async () => {
            await getWeather(localStorage.getItem('city_weather'))
        };
    } catch (e) {
        alert(e);
    }

}

async function getWeather(city = "Минск") {
    try {
        city = localStorage.getItem('city_weather');

        if (!city) {
            city = 'Минск';
        }
        document.querySelector('.city-weather-input').value = city;
        const host = axios.create();
        const { data } = await host.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=6e91bc70f70b8bc4b4f0fd9ad1857d38&units=metric`);
        iconId = data.weather[0].id;
        description = data.weather[0].description;
        temp = Math.round(data.main.temp);
        windSpeed = Math.round(data.wind.speed);
        humidityVal = data.main.humidity;

        document.querySelector('.weatherIcon .owf').classList.add(`owf-${iconId}`);
        document.querySelector('.weathertemp-descr').innerText = `${temp}°C ${description}`;
        document.querySelector('.weather-windSpeed').innerText = `Wind speed: ${windSpeed} m/s`;
        document.querySelector('.weather-humidity').innerText = `Humidity: ${humidityVal}%`;

        return;
    } catch (e) {
        localStorage.removeItem('city_weather');
        getWeather();
        alert(e.message);
    }

}
useInput();
getWeather();
setInterval(() => {
    getWeather();
}, 24 * 60 * 1000);
