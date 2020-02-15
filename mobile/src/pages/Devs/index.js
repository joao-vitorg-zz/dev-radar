import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

import DevItem from '../../components/DevItem';
import SearchInput from '../../components/SearchInput';

import filterDevs from '../../utils/filterDevs';

import styles from './styles';

export default ({ navigation, screenProps }) => {
  const { devs, editDevState } = screenProps;
  const [, setEditDev] = editDevState;

  const [search, setSearch] = useState('');

  function handlerEditDev(dev) {
    setEditDev(dev);
    navigation.navigate('Main');
  }

  return (
    <View style={styles.Container}>
      <SearchInput searchState={setSearch} />

      <ScrollView style={styles.ScrollView}>
        {filterDevs(devs, search).map(dev => (
          <DevItem key={dev._id} dev={dev} onEdit={handlerEditDev} />
        ))}
      </ScrollView>
    </View>
  );
};
