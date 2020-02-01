import React from 'react';
import { DeleteSVG, EditSVG } from '../Icons';

import './styles.scss';

function DevItem({ dev, onDelete, onEdit }) {
	const { login, name, techs, bio, avatar } = dev;
	const [, setEditDev] = onEdit;

	function editDev() {
		setEditDev(dev);
	}

	function deleteDev() {
		onDelete(dev._id);
	}

	return (
		<li className="dev-item">
			<header>
				<img src={avatar} alt={login} width="54" height="54" />
				<div className="user-info">
					<a href={`https://github.com/${login}`}>{name}</a>
					<span>{techs.join(', ')}</span>
				</div>
				<div className="tools">
					<EditSVG onClick={editDev} />
					<DeleteSVG onClick={deleteDev} />
				</div>
			</header>
			<p>{bio}</p>
		</li>
	);
}

export default DevItem;
