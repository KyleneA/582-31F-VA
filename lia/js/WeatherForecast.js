export class WeatherForecast {
    constructor(
        userPosition,
        currentWeather,
        currentWeatherUnits
    ) {
        this.latitude = userPosition.latitude;
        this.longitude = userPosition.longitude;
        this.temperature = currentWeather.temperature;
        this.temperatureUnit = currentWeatherUnits.temperature;
        this.direction = currentWeather.winddirection;
        this.directionUnit = currentWeatherUnits.winddirection;
        this.speed = currentWeather.windspeed;
        this.speedUnit = currentWeatherUnits.windspeed;
        this.code = currentWeather.weathercode;
    }

    get formattedTemp() {
        return `${this.temperature}${this.temperatureUnit}`; 
    }

    get formattedDirection() {
        return `${this.direction}${this.directionUnit}`;
    }

    get formattedSpeed() {
        return `${this.speed}${this.speedUnit}`;
    }

    get formattedLocation(){
        return `Latitude: ${this.latitude.toFixed(2)}, Longitude: ${this.longitude.toFixed(2)}`;
    }
}