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

export async function fetchWeatherDescriptions() {
    const descriptionsResponse = await fetch('https://gist.githubusercontent.com/stellasphere/9490c195ed2b53c707087c8c2db4ec0c/raw/76b0cb0ef0bfd8a2ec988aa54e30ecd1b483495d/descriptions.json');

    if (!descriptionsResponse.ok) {
        throw new Error(`Weather description could not be loaded. HTTP ${descriptionsResponse.status}`);
    }

    const descriptions = await descriptionsResponse.json();

    return descriptions;
}