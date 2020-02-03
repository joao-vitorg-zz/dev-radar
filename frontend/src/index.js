import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import api from './services/api';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';
import { LogoSVG } from './components/Icons';

import './styles/Sidebar.scss';
import './styles/global.scss';
import './styles/Main.scss';
import './styles/App.scss';

function App() {
	const editDevMode = useState(null);
	const [devs, setDevs] = useState([]);

	// Carrega os Devs
	useEffect(() => {
		api.get('/devs').then(res => setDevs(res.data));
	}, []);

	function handledAddDev(data) {
		const hasDev = devs.some(({ login }) => login === data.login);

		if (!hasDev) {
			api
				.post('/devs', data)
				.then(res => setDevs([...devs, res.data]))
				.catch(() => {
					alert('Usuário não existe!');
				});
		} else {
			alert('Usuário já cadastrado!');
		}
	}

	function handledEditDev(id, data) {
		api
			.put(`/devs/${id}`, data)
			.then(res => {
				const othersDevs = devs.filter(({ _id }) => _id !== id);

				setDevs([...othersDevs, res.data]);
			})
			.catch(reason => {
				alert(reason);
			});
	}

	function handledDeleteDev(id) {
		const confirm = global.confirm('Deseja mesmo deletar?');

		if (confirm) {
			api
				.delete(`/devs/${id}`)
				.then(() => setDevs(devs.filter(({ _id }) => _id !== id)))
				.catch(reason => {
					alert(reason);
				});
		}
	}

	return (
		<div id="app">
			<aside>
				<LogoSVG />
				<DevForm
					onAdd={handledAddDev}
					onEdit={handledEditDev}
					editMode={editDevMode}
				/>
			</aside>

			<main>
				<ul>
					{devs.map(dev => (
						<DevItem
							key={dev._id}
							dev={dev}
							onEdit={editDevMode}
							onDelete={handledDeleteDev}
						/>
					))}
				</ul>
			</main>
		</div>
	);
}

ReactDOM.render(<App />, document.getElementById('root'));
