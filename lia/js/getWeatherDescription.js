import { fetchWeatherDescriptions } from './api.js'

export function getWeatherDescription(weatherCode, targetText, targetImg) {
    fetchWeatherDescriptions()
        .then((response) => {
            const date = new Date();
            const time = date.getHours();
            const descriptions = response[weatherCode];
            
            console.log(response, weatherCode, descriptions.day, time, 5 >= time >=  18);
            if (5 >= time >=  18) {
                const description = descriptions.day.description;
                const imgUrl = descriptions.day.image;
                console.log("day");
                targetText.textContent = description;
                targetImg.src = imgUrl;
            } else {
                const description = descriptions.night.description;
                const imgUrl = descriptions.night.image;
                console.log("night");
                targetText.textContent = description;
                targetImg.src = imgUrl;
            }
        })
        . catch((error) => {
            console.log(error);
            targetText.textContent = `Unable to load weather description. Error: ${error}`;
        });
}