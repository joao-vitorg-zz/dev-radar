import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import api from './services/api';

import './styles/Sidebar.scss';
import './styles/global.scss';
import './styles/Main.scss';
import './styles/App.scss';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

function App() {
	const [devs, setDevs] = useState([]);

	useEffect(() => {
		async function loadDevs() {
			const res = await api.get('/devs');
			setDevs(res.data);
		}

		loadDevs();
	}, []);

	async function handledAddDev(data) {
		if (!devs.find(dev => dev.login === data.login)) {
			const res = await api.post('/devs', data);
			setDevs([...devs, res.data]);
		}
	}

	return (
		<div id="app">
			<aside>
				<img src="./logo.svg" alt="logo" />
				<DevForm onSubmit={handledAddDev} />
			</aside>

			<main>
				<ul>
					{devs.map(dev => (
						<DevItem key={dev._id} dev={dev} />
					))}
				</ul>
			</main>
		</div>
	);
}

ReactDOM.render(<App />, document.getElementById('root'));
