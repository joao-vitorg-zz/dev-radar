import React, { useState } from 'react';

import './styles.scss';

function InputBlock(id, value, setValue, type, msg = id) {
	return (
		<div className="input-block">
			<label htmlFor={id}>{msg}</label>
			<input
				type={type}
				name={id}
				id={id}
				required
				value={value}
				onChange={e => setValue(e.target.value)}
			/>
		</div>
	);
}

function GetCurrentPossition() {
	const [latitude, setLatitude] = useState(0);
	const [longitude, setLongitude] = useState(0);

	navigator.geolocation.getCurrentPosition(
		position => {
			setLatitude(position.coords.latitude);
			setLongitude(position.coords.longitude);
		},
		err => console.error(err.message),
		{ enableHighAccuracy: true, timeout: 20000 }
	);

	return [latitude, longitude, setLatitude, setLongitude];
}

function DevForm({ onSubmit }) {
	const [login, setLogin] = useState('');
	const [techs, setTechs] = useState('');

	const [
		latitude,
		longitude,
		setLatitude,
		setLongitude
	] = GetCurrentPossition();

	async function handleSubmit(e) {
		e.preventDefault();

		await onSubmit({ login, techs, latitude, longitude });

		setLogin('');
		setTechs('');
	}

	return (
		<form onSubmit={handleSubmit}>
			{InputBlock('login', login, setLogin, 'text', 'Usuário do Github')}
			{InputBlock('techs', techs, setTechs, 'text', 'Tecnologías')}

			<div className="input-group">
				{InputBlock('latitude', latitude, setLatitude, 'number')}
				{InputBlock('longitude', longitude, setLongitude, 'number')}
			</div>

			<button type="submit">Salvar</button>
		</form>
	);
}

export default DevForm;
