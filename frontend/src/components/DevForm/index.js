import React, { useState, useEffect } from 'react';

import './styles.scss';

function DevForm({ onAdd, onEdit, editMode }) {
	const [editDev, setEditDev] = editMode;

	const [login, setLogin] = useState('');
	const [techs, setTechs] = useState('');
	const [latitude, setLatitude] = useState(0);
	const [longitude, setLongitude] = useState(0);

	useEffect(() => {
		if (!editDev) {
			navigator.geolocation.getCurrentPosition(
				position => {
					const {
						latitude: currentLatitude,
						longitude: currentLongitude
					} = position.coords;

					setLatitude(currentLatitude);
					setLongitude(currentLongitude);
				},
				err => console.log(err.message),
				{ enableHighAccuracy: true, timeout: 20000 }
			);
		} else {
			const {
				login: editDevLogin,
				techs: editDevTechs,
				location: {
					coordinates: [editDevLatitude, editDevLongitude]
				}
			} = editDev;

			setLogin(editDevLogin);
			setTechs(editDevTechs.join(', '));
			setLatitude(editDevLatitude);
			setLongitude(editDevLongitude);
		}
	}, [editDev]);

	async function handleSubmit(e) {
		e.preventDefault();

		if (!editDev) {
			await onAdd({ login, techs, latitude, longitude });
		} else {
			const { _id } = editDev;

			await onEdit(_id, { techs, latitude, longitude });

			setEditDev(null);
		}

		setLogin('');
		setTechs('');
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className="input-block">
				<label htmlFor="login">Usuário do Github</label>
				<input
					name="login"
					id="login"
					disabled={editDev}
					required
					value={login}
					onChange={e => setLogin(e.target.value)}
				/>
			</div>

			<div className="input-block">
				<label htmlFor="techs">Tecnologías</label>
				<input
					name="techs"
					id="techs"
					required
					value={techs}
					onChange={e => setTechs(e.target.value)}
				/>
			</div>
			<div className="input-group">
				<div className="input-block">
					<label htmlFor="latitude">Latitude</label>
					<input
						name="latitude"
						type="number"
						id="latitude"
						required
						value={latitude}
						onChange={e => setLatitude(e.target.value)}
					/>
				</div>

				<div className="input-block">
					<label htmlFor="longitude">Longitude</label>
					<input
						name="longitude"
						type="number"
						id="longitude"
						required
						value={longitude}
						onChange={e => setLongitude(e.target.value)}
					/>
				</div>
			</div>

			<button type="submit">{editDev ? 'Salvar' : 'Cadastrar'}</button>
		</form>
	);
}

export default DevForm;
