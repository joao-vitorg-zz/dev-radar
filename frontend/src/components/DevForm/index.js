import React, { useState, useEffect } from 'react';

import './styles.scss';

function DevForm({ onSubmit }) {
	const [login, setLogin] = useState('');
	const [techs, setTechs] = useState('');
	const [latitude, setLatitude] = useState(0);
	const [longitude, setLongitude] = useState(0);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			position => {
				const { latitude, longitude } = position.coords;

				setLatitude(latitude);
				setLongitude(longitude);
			},
			err => console.error(err.message),
			{ enableHighAccuracy: true, timeout: 20000 }
		);
	}, []);

	async function handleSubmit(e) {
		e.preventDefault();

		await onSubmit({ login, techs, latitude, longitude });

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
						value={latitude}
						onChange={e => setLongitude(e.target.value)}
					/>
				</div>
			</div>

			<button type="submit">Cadastrar</button>
		</form>
	);
}

export default DevForm;
