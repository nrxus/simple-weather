import {OPEN_WEATHER_API_KEY} from "./environment";

const ROOT_URL = "https://api.openweathermap.org/data/2.5";

export async function current(lat, lon) {
    const response = await fetch(`${ROOT_URL}/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${OPEN_WEATHER_API_KEY}`);
    return response.json();
}