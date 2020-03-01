import React from 'react';
import * as LocationService from '../LocationService';
import * as WeatherClient from '../WeatherClient';

import App from '../App';
import {act, render} from '@testing-library/react-native';

jest.mock('../LocationService');
jest.mock('../WeatherClient');

describe('<App />', () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test('starts waiting', () => {
        LocationService.getLocation.mockReturnValue(new Promise(() => {}));
        const {queryByText} = render(<App/>);
        expect(queryByText("Waiting for weather data...")).toBeTruthy();
    });

    test('displays weather data', async () => {
        const locationMock = LocationService.getLocation.mockResolvedValue({
            coords: {
                latitude: 35.2,
                longitude: 43.2
            }
        });

        const weather_response = {
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

        const weatherMock = WeatherClient.current.mockResolvedValue(weather_response);

        const {findByText} = render(<App/>);

        await act(async () => {
            await locationMock;
            await weatherMock;
        });

        expect(findByText("Tawarano")).toBeTruthy();
        expect(findByText("285.514")).toBeTruthy();
        expect(findByText("Clear")).toBeTruthy();
    });
});
