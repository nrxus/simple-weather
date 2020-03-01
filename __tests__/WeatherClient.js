import * as WeatherClient from "../WeatherClient";

jest.mock('../environment', () => ({
    get OPEN_WEATHER_API_KEY() {
        return "API-KEY";
    }
}));

describe('WeatherClient', () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        global.fetch.mockClear();
        delete global.fetch;
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

        await expect(WeatherClient.current(56, 23, 2))
            .rejects.toEqual('Not an OK response');
    });

    test('next eight days', async () => {
        const body = {
            "list": [
                {
                    "dt": 1485741600,
                    "temp": {
                        "min": 285.51,
                        "max": 285.51
                    },
                    "weather": [
                        {
                            "main": "Clear"
                        }
                    ]
                },
                {
                    "dt": 1485828000,
                    "temp": {
                        "min": 282.27,
                        "max": 284.66
                    },
                    "weather": [
                        {
                            "main": "Clear"
                        }
                    ]
                },
                {
                    "dt": 1485914400,
                    "temp": {
                        "min": 283.21,
                        "max": 285.7
                    },
                    "weather": [
                        {
                            "main": "Clear"
                        }
                    ]
                },
                {
                    "dt": 1486000800,
                    "temp": {
                        "min": 281.86,
                        "max": 285.13
                    },
                    "weather": [
                        {
                            "main": "Clear"
                        }
                    ]
                },
                {
                    "dt": 1486087200,
                    "temp": {
                        "min": 275.68,
                        "max": 283.75
                    },
                    "weather": [
                        {
                            "main": "Rain"
                        }
                    ]
                },
                {
                    "dt": 1486173600,
                    "temp": {
                        "min": 276.69,
                        "max": 283.22
                    },
                    "weather": [
                        {
                            "main": "Clear"
                        }
                    ]
                },
                {
                    "dt": 1486260000,
                    "temp": {
                        "min": 276.28,
                        "max": 284.66
                    },
                    "weather": [
                        {
                            "main": "Rain"
                        }
                    ]
                },
                {
                    "dt": 1486346400,
                    "temp": {
                        "min": 278.74,
                        "max": 283.76
                    },
                    "weather": [
                        {
                            "main": "Rain"
                        }
                    ]
                },
            ]
        };
        fetch.mockResolvedValue({
            status: 200,
            json: () => Promise.resolve(body)
        });

        const response = await WeatherClient.nextEightDays(34, 99.8);

        expect(response).toEqual(body);
    });

    test('next eight days fails for not-OK responses', async () => {
        fetch.mockResolvedValue({
            status: 404,
            json: () => Promise.resolve(body)
        });

        await expect(WeatherClient.nextEightDays(56, 23, 2))
            .rejects.toEqual('Not an OK response');
    });
});