import { getWeatherDescription } from "./getWeatherDescription.js";

export class CurrentWeather extends HTMLElement {
    constructor() {
        super();

        this._weatherForecast = null;

        const shadow = this.attachShadow({
            mode: "open"
        });

        const template = document.getElementById("weather-display-template");
        const clone = template.content.cloneNode(true);

        shadow.appendChild(clone);
    }

    set weatherForecast(value) {
        this._weatherForecast = value;
    }

    get weatherForecast() {
        return this._weatherForecast;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const root = this.shadowRoot;
        const forecast = this.weatherForecast;

        root.querySelector(".location-heading").textContent = `Weather For ${forecast.formattedLocation}`

        const code = forecast.code;
        const descDOM = root.querySelector(".weather-desc");
        const imgDOM = root.querySelector(".weather-img");
        getWeatherDescription(code, descDOM, imgDOM);

        root.querySelector(".temperature").textContent = forecast.formattedTemp;

        root.querySelector(".wind-direction").textContent = forecast.formattedDirection;


        root.querySelector(".wind-speed").textContent = forecast.formattedSpeed;
    }
}

customElements.define("current-weather", CurrentWeather);