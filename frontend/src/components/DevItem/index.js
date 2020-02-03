import React from 'react';
import { DeleteSVG, EditSVG } from '../Icons';

import './styles.scss';

export default function DevItem({ dev, onDelete, onEdit }) {
	const { login, name, techs, bio, blog, avatar } = dev;
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
				<img src={avatar} alt={login} />

				<div className="user-info">
					<a href={`https://github.com/${login}`} target="_black">
						{name}
					</a>
					<span>{techs.join(', ')}</span>
				</div>

				<div className="tools">
					<EditSVG onClick={editDev} />
					<DeleteSVG onClick={deleteDev} />
				</div>
			</header>

			<p>{bio}</p>
			{blog ? (
				<a href={blog} target="_black">
					{blog}
				</a>
			) : null}
		</li>
	);
}
