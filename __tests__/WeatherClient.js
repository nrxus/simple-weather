import * as WeatherClient from "../WeatherClient";

jest.mock('../environment', () => ({
    get OPEN_WEATHER_API_KEY () {
        return "API-KEY";
    }
}));

global.fetch = jest.fn();

describe('WeatherClient', () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test('current', async () => {
        const body = {
            "weather": [
                {
                    "main": "Clear"
                }
            ],
            "main": {
                "temp": 285.514
            },
            "name": "Tawarano"
        };
        fetch.mockResolvedValue({
            status: 200,
            json: () => Promise.resolve(body)
        });

        const response = await WeatherClient.current(56, 23.2);

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith('https://api.openweathermap.org/data/2.5/weather?lat=56&lon=23.2&units=imperial&appid=API-KEY');
        expect(response).toEqual(body);
    });

    test('current fails for non 200 codes', async () => {
        fetch.mockResolvedValue({
            status: 401,
            json: () => Promise.resolve({})
        });

        await expect(WeatherClient.current(56, 23,2))
            .rejects.toEqual('Not an OK response');
    })
});