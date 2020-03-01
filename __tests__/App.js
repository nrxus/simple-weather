import React from 'react';
import * as LocationClient from '../LocationClient';
import * as WeatherClient from '../WeatherClient';

import App from '../App';
import {act, render} from '@testing-library/react-native';

jest.mock('../LocationClient');
jest.mock('../WeatherClient');

describe('<App />', () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test('starts waiting', () => {
        LocationClient.getLocation.mockReturnValue(new Promise(() => {
        }));
        const {queryByText} = render(<App/>);
        expect(queryByText("Waiting for weather data...")).toBeTruthy();
    });

    test('displays weather data', async () => {
        const locationMock = LocationClient.getLocation.mockResolvedValue({
            coords: {
                latitude: 35.2,
                longitude: 43.2
            }
        });

        const current_weather = {
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
        const future_weather = {
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

        const currentWeatherMock = WeatherClient.current.mockResolvedValue(current_weather);
        const nextEightDaysMock = WeatherClient.nextEightDays.mockResolvedValue(future_weather);

        const {getByText} = render(<App/>);

        await act(async () => {
            await locationMock;
            await currentWeatherMock;
            await nextEightDaysMock;
        });

        expect(getByText("Tawarano")).toBeTruthy();
        expect(getByText("285.514")).toBeTruthy();
        expect(getByText("Clear")).toBeTruthy();
        expect(getByText("Sunday - Today"))
    });
});
