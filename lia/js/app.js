import { fetchWeatherInformation } from "./api.js";
import { WeatherForecast } from "./WeatherForecast.js";
import { CurrentWeather } from "./CurrentWeather.js";


function getUserPosition() {
    const statusP = document.getElementById("status");
    
    try {
        if (!navigator.geolocation) {
            throw new Error("Geolocation is not supported");
        } else {
            navigator.geolocation.getCurrentPosition(userPosition, locationError);
            statusP.textContent = "Loading...";
        }
    } catch (error) {
        console.error(error);
        statusP.textContent = `${error}. Try a different browser.`;
    }
}

function userPosition(position) {
    const statusP = document.getElementById("status");

    const weatherSection = document.getElementById("weather-section");
    const location = position.coords;
    
    const userPosition = {
        latitude: location.latitude,
        longitude: location.longitude
    }
    
    fetchWeatherInformation(userPosition)
    .then((response) => {
        statusP.textContent = "";

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
        
    }).catch((error) => {
        const statusP = document.getElementById("status");
        
        statusP.textContent = error;
        console.error(error)
    })
    
}

function locationError() {
    const weatherSection = document.getElementById("weather-section");
    const statusP = document.getElementById("status");
    
    statusP.textContent = "Your location could not be assessed. See below for the weather in a randomized location.";
    statusP.className = "status text-danger"
    console.error("Your location could not be assessed");
    
    const randomLatitude = (Math.random() * (90 - -90) + -90);
    const randomLongitude = (Math.random() * (180 - -180) + -180);

    const randomPosition = {
        latitude: randomLatitude,
        longitude: randomLongitude
    }

    fetchWeatherInformation(randomPosition)
        .then((response) => {
            const currentWeather = response.current_weather;
            const currentWeatherUnits = response.current_weather_units;

            const forecast = new WeatherForecast(
                randomPosition,
                currentWeather,
                currentWeatherUnits
            )

            const display = document.createElement("current-weather");
            display.weatherForecast = forecast;

            weatherSection.appendChild(display);

        }).catch((error) => {
            statusP.textContent = error;
            console.error(error)
        })
}

getUserPosition();