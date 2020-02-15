import React from 'react';
import { Marker, Callout } from 'react-native-maps';
import { Image, View, Text, Linking } from 'react-native';

import styles from './styles';

export default ({ dev }) => {
  const { login, techs, name, avatar, bio, latitude, longitude } = dev;

  function handlerOpenGitHub() {
    Linking.openURL(`https://github.com/${login}`);
  }

  return (
    <Marker coordinate={{ latitude, longitude }}>
      <Image style={styles.Avatar} source={{ uri: avatar }} />

      <Callout style={styles.Callout} onPress={handlerOpenGitHub}>
        <View style={styles.Callout}>
          <Text style={styles.DevName}>{name}</Text>
          <Text style={styles.DevBio}>{bio}</Text>
          <Text style={styles.DevTechs}>{techs.join(', ')}</Text>
        </View>
      </Callout>
    </Marker>
  );
};
