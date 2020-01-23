import React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet } from 'react-native';

function Profile({ navigation }) {
	const login = navigation.getParam('login');

	return (
		<WebView
			style={styles.WebView}
			source={{ uri: `https://github.com/${login}` }}
		/>
	);
}

const styles = StyleSheet.create({
	WebView: {
		flex: 1
	}
});

export default Profile;
