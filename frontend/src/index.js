import React from 'react';
import ReactDOM from 'react-dom';

import api from './services/api';

import './styles/Sidebar.scss';
import './styles/global.scss';
import './styles/Main.scss';
import './styles/App.scss';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.handledAddDev = this.handledAddDev.bind(this);
		this.state = {
			devs: []
		};
	}

	async componentDidMount() {
		const res = await api.get('/devs');

		this.setState({ devs: res.data });
	}

	async handledAddDev(data) {
		const { devs } = this.state;

		if (!devs.find(dev => dev.login === data.login)) {
			const res = await api.post('/devs', data);
			this.setState({ devs: [...devs, res.data] });
		}
	}

	render() {
		const { devs } = this.state;

		return (
			<div id="app">
				<aside>
					<strong>Cadastrar</strong>
					<DevForm onSubmit={this.handledAddDev} />
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
}

ReactDOM.render(<App />, document.getElementById('root'));
