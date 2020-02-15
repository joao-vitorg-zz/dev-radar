import React, { useState, useEffect } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import {
  getCurrentPositionAsync,
  requestPermissionsAsync
} from 'expo-location';

import api from '../../service/api';

import InputBlock from '../../components/InputBlock';
import { LogoSvg } from '../../components/Icons';

import styles from './styles';

export default ({ screenProps }) => {
  const [editDev, setEditDev] = screenProps.editDevState;

  const [login, setLogin] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    if (!editDev) {
      requestPermissionsAsync(
        getCurrentPositionAsync({
          enableHighAccuracy: true
        }).then(value => {
          const {
            coords: { latitude: currentLatitude, longitude: currentLongitude }
          } = value;

          setLatitude(currentLatitude);
          setLongitude(currentLongitude);
        })
      );
    } else {
      const {
        login: editDevLogin,
        techs: editDevTechs,
        latitude: editDevLatitude,
        longitude: editDevLongitude
      } = editDev;

      setLogin(editDevLogin);
      setTechs(editDevTechs.join(', '));
      setLatitude(editDevLatitude);
      setLongitude(editDevLongitude);
    }
  }, [editDev]);

  function onAdd() {
    api
      .post('/devs', {
        login,
        techs,
        latitude,
        longitude
      })
      .catch(() => {
        Alert.alert('Erro!', 'Não foi possível criar o usuário');
      });
  }

  function onEdit() {
    const { _id } = editDev;

    api
      .put(`/devs/${_id}`, {
        login,
        techs,
        latitude,
        longitude
      })
      .catch(() => {
        Alert.alert('Erro!', 'Não foi possível editar o usuário');
      });

    setEditDev(null);
  }

  function handleSubmit() {
    if (!editDev) {
      onAdd();
    } else {
      onEdit();
    }

    setLogin('');
    setTechs('');
  }

  return (
    <View style={styles.Container}>
      <View style={styles.Form}>
        <LogoSvg />

        <InputBlock
          label="Usuário do Github"
          value={[login, setLogin]}
          id="login"
          next="techs"
          style={{ marginTop: 50 }}
          editable={editDev}
        />

        <InputBlock
          label="Tecnologías"
          value={[techs, setTechs]}
          id="techs"
          next="latitude"
        />

        <View style={styles.InputGroup}>
          <InputBlock
            label="Latitude"
            value={[latitude, setLatitude]}
            id="latitude"
            next="longitude"
            type="numeric"
            style={{
              flex: 1,
              marginRight: 20
            }}
          />

          <InputBlock
            label="Longitude"
            value={[longitude, setLongitude]}
            id="longitude"
            type="numeric"
            submit={handleSubmit}
            style={{ flex: 1 }}
          />
        </View>

        <TouchableOpacity style={styles.Button} onPress={handleSubmit}>
          <Text style={styles.ButtonText}>
            {editDev ? 'Salvar' : 'Cadastrar'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
