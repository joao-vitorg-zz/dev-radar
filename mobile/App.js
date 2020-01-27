import React from 'react';
import { YellowBox } from 'react-native';

import Routes from './src/routes';

YellowBox.ignoreWarnings(['Unrecognized webSocket']);

function App() {
	return <Routes />;
}

export default App;
