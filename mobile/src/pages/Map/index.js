import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import {
  getCurrentPositionAsync,
  requestPermissionsAsync
} from 'expo-location';

import SearchInput from '../../components/SearchInput';
import Marker from '../../components/Marker';

import filterDevs from '../../utils/filterDevs';

import styles from './styles';

export default ({ screenProps }) => {
  const { devs } = screenProps;

  const [search, setSearch] = useState('');
  const [currentRegion, setCurrentRegion] = useState(null);

  useEffect(() => {
    requestPermissionsAsync(
      getCurrentPositionAsync({
        enableHighAccuracy: true
      }).then(value => {
        const {
          coords: { latitude, longitude }
        } = value;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        });
      })
    );
  }, []);

  return (
    <>
      <MapView
        onRegionChangeComplete={setCurrentRegion}
        initialRegion={currentRegion}
        style={styles.MapView}
        rotateEnabled={false}
      >
        {filterDevs(devs, search).map(dev => (
          <Marker key={dev._id} dev={dev} />
        ))}
      </MapView>

      <SearchInput searchState={setSearch} absolute />
    </>
  );
};
