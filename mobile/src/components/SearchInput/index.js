import React from 'react';
import { TextInput, View } from 'react-native';

import { styles, color } from './styles';

export default ({ searchState, absolute }) => {
  return (
    <View style={styles[absolute ? 'ContainerAbsolute' : 'Container']}>
      <TextInput
        style={styles.SearchInput}
        placeholder="Buscar devs por techs..."
        placeholderTextColor={color.grayAsh}
        returnKeyType="search"
        autoCapitalize="words"
        autoCorrect={false}
        onSubmitEditing={({ nativeEvent: { text } }) => searchState(text)}
      />
    </View>
  );
};
