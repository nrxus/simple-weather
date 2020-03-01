import React from 'react';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

// this function is un-tested as it is fairly prescriptive
// consider adding tests if actual logic is added into this function
// or if this causes pain (e.g., bugs)
export async function getLocation() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
        throw 'Permission to access location was denied';
    }

    // `enableHighAccuracy` is needed for Android Emulator
    // https://github.com/expo/expo/issues/5504#issuecomment-526630788 ¯\_(ツ)_/¯
    if (Platform.OS === 'android' && !Constants.isDevice) {
        return Location.getCurrentPositionAsync( { enableHighAccuracy: true });
    } else {
        return Location.getCurrentPositionAsync({ });
    }
}