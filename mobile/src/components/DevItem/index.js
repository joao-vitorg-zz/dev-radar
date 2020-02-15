import React from 'react';
import { View, Text, Image, Linking, Alert } from 'react-native';

import { DeleteSvg, EditSvg } from '../Icons';

import api from '../../service/api';

import styles from './styles';

export default ({ dev, onEdit }) => {
  const { _id, login, name, techs, bio, blog, avatar } = dev;

  function handlerDeleteDev() {
    Alert.alert(login, 'Deseja mesmo deletar?', [
      {
        text: 'Não',
        style: 'cancel'
      },
      {
        text: 'Sim',
        onPress: () => {
          api.delete(`/devs/${_id}`).catch(reason => {
            Alert(reason);
          });
        },
        style: 'default'
      }
    ]);
  }

  function handlerEditDev() {
    onEdit(dev);
  }

  function handlerOpenBlog() {
    Linking.openURL(bio);
  }

  function handlerOpenGitHub() {
    Linking.openURL(`https://github.com/${login}`);
  }

  return (
    <View style={styles.Container}>
      <View style={styles.Header}>
        <Image style={styles.DevAvatar} source={{ uri: avatar }} />

        <View style={styles.Info}>
          <Text style={styles.DevName} onPress={handlerOpenGitHub}>
            {name}
          </Text>
          <Text style={styles.DevTechs}>{techs.join(', ')}</Text>
        </View>

        <View style={styles.DevTools}>
          <EditSvg onPress={handlerEditDev} />
          <DeleteSvg onPress={handlerDeleteDev} />
        </View>
      </View>

      {bio ? <Text style={styles.DevBio}>{bio}</Text> : null}

      {blog ? (
        <Text style={styles.DevBlog} onPress={handlerOpenBlog}>
          {blog}
        </Text>
      ) : null}
    </View>
  );
};
