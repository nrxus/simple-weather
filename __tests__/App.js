import React from 'react';
import * as LocationService from '../LocationService';

import App from '../App';
import {act, cleanup, render} from '@testing-library/react-native';

jest.mock('../LocationService');

describe('<App />', () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test('starts waiting', () => {
        LocationService.getLocation.mockReturnValue(new Promise(() => {}));
        const {queryByText} = render(<App/>);
        expect(queryByText("Waiting for location...")).toBeTruthy();
    });

    test('displays location when resolved', async () => {
        const asyncMock = LocationService.getLocation.mockResolvedValue({
            coords: {
                latitude: 35.2,
                longitude: 43.2
            }
        });

        const {findByText} = render(<App/>);

        expect(findByText("35.2, 43.2")).toBeTruthy();

        await asyncMock;
    });
});
