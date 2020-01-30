import React from 'react';
import { View, Text, TextInput } from 'react-native';

import { styles, color } from './styles';

let inputs = {};

export default function({
	text,
	placeholder,
	value,
	id,
	next,
	submit,
	type,
	style
}) {
	function focusTheField(ref) {
		inputs[ref].focus();
	}

	return (
		<View style={{ ...styles.InputBox, ...style }}>
			<Text style={styles.Text}>{text}</Text>
			<TextInput
				style={styles.TextInput}
				blurOnSubmit={false}
				keyboardType={type === 'numeric' ? 'decimal-pad' : 'default'}
				clearButtonMode="while-editing"
				returnKeyType={submit ? 'default' : 'next'}
				onSubmitEditing={() => {
					submit ? submit() : focusTheField(next);
				}}
				ref={input => {
					inputs[id] = input;
				}}
				placeholder={placeholder}
				placeholderTextColor={color.greyLight}
				autoCapitalize="words"
				autoCorrect={false}
				value={value[0].toString()}
				onChangeText={text => value[1](text)}
			/>
		</View>
	);
}
