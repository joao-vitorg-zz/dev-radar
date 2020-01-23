import React from 'react';
import { WebView } from 'react-native-webview';

import styles from './styles';

function Profile({ navigation }) {
	const login = navigation.getParam('login');

	return (
		<WebView
			style={styles.WebView}
			source={{ uri: `https://github.com/${login}` }}
		/>
	);
}

export default Profile;
