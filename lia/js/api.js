export async function fetchWeatherInformation(userPosition) {
    const latitude = userPosition.latitude;
    const longitude = userPosition.longitude;

    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    const weatherResponse = await fetch(apiUrl);

    if (!weatherResponse.ok) {
        throw new Error(`Weather information could not be loaded. HTTP ${weatherResponse.status}`);
    }

    const weather = await weatherResponse.json();

    return weather;
}