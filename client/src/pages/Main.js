import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './Main.css';

import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';

export default function Main({ match }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/v1/dev/index', {
        headers: {
          user: match.params.id
        }
      });

      setUsers(response.data);
    }

    loadUsers();
  }, [match.params.id]);

  async function handleLike(id) {
    console.log(id);
  }

  async function handleDislike(id) {
    await api.post(`/v1/dislike/store/${id}`, null, {
      headers: {
        user: match.params.id
      }
    });

    setUsers(users.filter(user => user._id !== id));
  }

  return (
    <div className="main-container">
      <img src={logo} alt="Tindev" />
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <img src={user.avatar} alt={user.name + ' photo'} />
            <footer>
              <strong>{user.name}</strong>
              <p>{user.bio}</p>
            </footer>

            <div className="buttons">
              <button type="button" onClick={() => handleDislike(user._id)}>
                <img src={dislike} alt="dislike" />
              </button>

              <button type="button">
                <img src={like} alt="like" onClick={() => handleLike(user._id)} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
