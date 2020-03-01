import {OPEN_WEATHER_API_KEY} from "./environment";

const ROOT_URL = "https://api.openweathermap.org/data/2.5";

export async function current(lat, lon) {
    return openWeatherFetch('weather', [`lat=${lat}`, `lon=${lon}`]);
}

export async function nextEightDays(lat, lon) {
    return openWeatherFetch("forecast/daily", [`lat=${lat}`, `lon=${lon}`, "cnt=8"]);
}

const openWeatherFetch = async (path, query) => {
    const query_path = [...query, "units=imperial", `appid=${OPEN_WEATHER_API_KEY}`].join("&");

    const url = `${ROOT_URL}/${path}?${query_path}`;
    const response = await fetch(url);
    if (response.status !== 200) {
        throw 'Not an OK response';
    }
    return response.json();
};
