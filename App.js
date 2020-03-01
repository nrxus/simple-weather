import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as LocationService from './LocationService';

export default function App() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    let cancelled = false;

    LocationService.getLocation()
        .then(({ coords }) => {
          if (!cancelled) {
            setLocation(coords)
          }
        });

    return () => cancelled = true;
  });

  const loadingScreen = () => {
    if (location.latitude === null || location.longitude === null) {
      return <Text>Waiting for location...</Text>
    }
  };

  const locationDisplay = () => {
    if (location.latitude && location.longitude) {
      return <Text>{location.latitude}, {location.longitude}</Text>
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
