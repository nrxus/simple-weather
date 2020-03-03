import React from 'react';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as Constants from "expo-constants";

// this function is un-tested as it is fairly prescriptive
// consider adding tests if actual logic is added into this function
// or if this causes pain (e.g., bugs)
export async function getLocation() {
    let {status} = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
        throw 'Permission to access location was denied';
    }

    // location does not need high accuracy - last position is *fine*
    try {
        return await Location.getLastKnownPositionAsync();
    } catch {
        // fall back to current position if there is no known last position
        // `enableHighAccuracy` is needed for Android Emulator
        // https://github.com/expo/expo/issues/5504#issuecomment-526630788 ¯\_(ツ)_/¯
        if (Platform.OS === 'android' && !Constants.isDevice) {
            return Location.getCurrentPositionAsync( { enableHighAccuracy: true });
        } else {
            return Location.getCurrentPositionAsync({ });
        }
    }
}