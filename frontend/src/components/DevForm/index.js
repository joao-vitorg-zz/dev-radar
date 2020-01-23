import React from 'react';

import './styles.scss';

class DevForm extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			login: '',
			techs: '',
			latitude: 0,
			longitude: 0
		};
	}

	componentDidMount() {
		navigator.geolocation.getCurrentPosition(
			position => {
				const { latitude, longitude } = position.coords;

				this.setState({ latitude, longitude });
			},
			err => alert(err.message),
			{ enableHighAccuracy: true, timeout: 20000 }
		);
	}

	async handleSubmit(e) {
		e.preventDefault();

		const { onSubmit } = this.props;
		onSubmit(this.state);

		this.setState({ login: '', techs: '' });
	}

	render() {
		const { login, techs, latitude, longitude } = this.state;

		return (
			<form onSubmit={this.handleSubmit}>
				<div className="input-block">
					<label htmlFor="login">Usuário do Github</label>
					<input
						name="login"
						id="login"
						required
						value={login}
						onChange={e => this.setState({ login: e.target.value })}
					/>
				</div>

				<div className="input-block">
					<label htmlFor="techs">Tecnologias</label>
					<input
						name="techs"
						id="techs"
						required
						value={techs}
						onChange={e => this.setState({ techs: e.target.value })}
					/>
				</div>

				<div className="input-group">
					<div className="input-block">
						<label htmlFor="latitude">Latitude</label>
						<input
							type="number"
							name="latitude"
							id="latitude"
							required
							value={latitude}
							onChange={e => this.setState({ latitude: e.target.value })}
						/>
					</div>

					<div className="input-block">
						<label htmlFor="longitude">Longitude</label>
						<input
							type="number"
							name="longitude"
							id="longitude"
							required
							value={longitude}
							onChange={e => this.setState({ longitude: e.target.value })}
						/>
					</div>
				</div>

				<button type="submit">Salvar</button>
			</form>
		);
	}
}

export default DevForm;
