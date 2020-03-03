import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as LocationClient from './LocationClient';
import * as WeatherClient from './WeatherClient';

export default function App() {
    const [state, setState] = useState({
        city: null,
        currentWeather: {
            description: null,
            temperature: null,
        },
        forecast: [],
    });

    useEffect(() => {
        let cancelled = false;

        const refreshWeather = async () => {
            const {coords} = await LocationClient.getLocation();
            const current = await WeatherClient.current(coords.latitude, coords.longitude);
            // const [current, nextEightDays] = await Promise.all([
            //     WeatherClient.current(coords.latitude, coords.longitude),
            //     WeatherClient.nextEightDays(coords.latitude, coords.longitude),
            // ]);
            //
            // const forecast = nextEightDays.list.map(day => {
            //     return {
            //         timestamp: day.dt,
            //         min: day.temp.min,
            //         max: day.temp.max,
            //         description: day.weather[0].main,
            //     }
            // });

            if (cancelled) {
                return
            }

            setState({
                city: current.name,
                currentWeather: {
                    description: current.weather[0].main,
                    temperature: current.main.temp
                },
                // forecast
            })
        };

        refreshWeather();

        return () => cancelled = true;
    }, []);

    const getDay = (seconds) => {
        const day = new Date(seconds * 1000).getDay();
        switch (day) {
            case 0:
                return "Sunday";
            case 1:
                return "Monday";
            case 2:
                return "Tuesday";
            case 3:
                return "Wednesday";
            case 4:
                return "Thursday";
            case 5:
                return "Friday";
            case 6:
                return "Saturday";
            default:
                throw("getDay() should only return numbers from 0-6 but it didn't");
        }
    }

    const loadingScreen = () => {
        if (state.city === null) {
            return <Text>Waiting for weather data...</Text>
        }
    };

    const weatherNow = () => {
        if (!!state.city) {
            return <React.Fragment>
                <Text>{state.city}</Text>
                <Text>{state.currentWeather.description}</Text>
                <Text>{state.currentWeather.temperature}</Text>
            </React.Fragment>
        }
    };

    // const forecast = () => {
    //     if (state.forecast.length === 0) {
    //         return;
    //     }
    //     const today = state.forecast[0];
    //     const day = getDay(today.timestamp);
    //     return <Text>{getDay(today.timestamp)} - Today</Text>;
    // };

    return (
        <View style={styles.container}>
            {weatherNow()}
            {/*{forecast()}*/}
            {loadingScreen()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
