import React from 'react';
import { DeleteSVG, EditSVG } from '../Icons';

import api from '../../services/api';

import './styles.scss';

export default function DevItem({ dev, onEdit }) {
  const { _id, login, name, techs, bio, blog, avatar } = dev;
  const [, setEditDev] = onEdit;

  function editDev() {
    setEditDev(dev);
  }

  function handlerDeleteDev() {
    const confirm = global.confirm('Deseja mesmo deletar?');

    if (confirm) {
      api.delete(`/devs/${_id}`).catch((reason) => {
        alert(reason);
      });
    }
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
          <DeleteSVG onClick={handlerDeleteDev} />
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
