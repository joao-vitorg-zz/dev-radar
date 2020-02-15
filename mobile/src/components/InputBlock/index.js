import React from 'react';
import { View, Text, TextInput } from 'react-native';

import styles from './styles';

const inputs = {};

function focusTheField(ref) {
  inputs[ref].focus();
}

export default ({ label, value, id, next, submit, type, style, editable }) => (
  <View style={{ ...styles.InputBox, ...style }}>
    <Text style={styles.Text}>{label}</Text>
    <TextInput
      style={styles.TextInput}
      blurOnSubmit={false}
      editable={!editable}
      keyboardType={type === 'numeric' ? 'decimal-pad' : 'default'}
      returnKeyType={submit ? 'default' : 'next'}
      onSubmitEditing={() => (submit ? submit() : focusTheField(next))}
      ref={input => {
        inputs[id] = input;
      }}
      autoCapitalize="words"
      autoCorrect={false}
      value={value[0].toString()}
      onChangeText={text => value[1](text)}
    />
  </View>
);
