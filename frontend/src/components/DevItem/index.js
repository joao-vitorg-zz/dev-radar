import React from 'react';

import './styles.scss';

function DevItem({ dev }) {
	const { login, name, techs, bio, avatar } = dev;

	return (
		<li className="dev-item">
			<header>
				<img src={avatar} alt={name} />
				<div className="user-info">
					<strong>{name}</strong>
					<span>{techs.join(', ')}</span>
				</div>
			</header>
			<p>{bio}</p>
			<a href={`https://github.com/${login}`}>Acessar perfil no Github</a>
		</li>
	);
}

export default DevItem;
