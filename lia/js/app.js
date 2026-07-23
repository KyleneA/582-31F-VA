import { fetchWeatherInformation } from "./api.js";
import { WeatherForecast } from "./WeatherForecast.js";
import { CurrentWeather } from "./CurrentWeather.js";

const weatherSection = document.getElementById("weather-section");
const statusP = document.getElementById("status");

function getUserPosition() {
    if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported"));
    } else {
        navigator.geolocation.getCurrentPosition(userPosition, locationError);
    }
}

function userPosition(position) {
    const location = position.coords;

    const userPosition = {
        latitude: location.latitude,
        longitude: location.longitude
    }
    
    console.log("Your current position is:");
    console.log(`Latitude: ${userPosition.latitude}`);
    console.log(`Longitude: ${userPosition.longitude}`);

    fetchWeatherInformation(userPosition)
        .then((response) => {
            const currentWeather = response.current_weather;
            const currentWeatherUnits = response.current_weather_units;

            const forecast = new WeatherForecast(
                userPosition,
                currentWeather,
                currentWeatherUnits
            )

            const display = document.createElement("current-weather");
            display.weatherForecast = forecast;

            weatherSection.appendChild(display);
            console.log(response, currentWeather, currentWeatherUnits, forecast, display.weatherForecast);
        })
    
}

function locationError() {
    statusP.textContent = "Location could not be assessed";
    statusP.className = "status text-danger"
    console.log("Location could not be assessed");
}

getUserPosition();