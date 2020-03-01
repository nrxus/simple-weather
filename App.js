import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as LocationService from './LocationService';
import * as WeatherClient from './WeatherClient';

export default function App() {
  const [state, setState] = useState({
    city: null,
    currentWeather: {
      description: null,
      temperature: null,
    }
  });

  useEffect(() => {
    let cancelled = false;

    const refreshWeather = async () => {
      const { coords } = await LocationService.getLocation();
      const current = await WeatherClient.current(coords.latitude, coords.longitude);

      if (cancelled) {
        return
      }

      setState({
        city: current.name,
        currentWeather: {
          description: current.weather[0].main,
          temperature: current.main.temp
        }
      })
    };

    refreshWeather();

    return () => cancelled = true;
  }, []);

  const loadingScreen = () => {
    if (state.city === null) {
      return <Text>Waiting for weather data...</Text>
    }
  };

  const locationDisplay = () => {
    if (!!state.city) {
      return <React.Fragment>
        <Text>{state.city}</Text>
        <Text>{state.currentWeather.description}</Text>
        <Text>{state.currentWeather.temperature}</Text>
      </React.Fragment>
    }
  };

  return (
    <View style={styles.container}>
      {locationDisplay()}
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
