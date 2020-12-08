/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect, FormEvent } from 'react';

import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import { Form, Users, Error } from './styles';

interface User {
  login: string;
  avatar_url: string;
  public_repos: number;
  name: string;
  bio: string;
}

const UserList: React.FC = () => {
  const [newUser, setNewUser] = useState('');
  const [inputError, setInputError] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const storageUsers = localStorage.getItem('@GithubFinder:users');
    if (storageUsers) {
      setUsers(JSON.parse(storageUsers));
    } else {
      setUsers([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('@GithubFinder:users', JSON.stringify(users));
  }, [users]);

  async function handleAddUsers(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    if (!newUser) {
      setInputError('Invalid user');
      return;
    }
    try {
      const response = await api.get(`users/${newUser}`);

      const user = response.data;

      setUsers([user, ...users]);
      setNewUser('');
      setInputError('');
    } catch (err) {
      setInputError('Make sure you spelled correctly');
    }
  }

  return (
    <>
      <Form hasError={!!inputError} onSubmit={handleAddUsers}>
        <input
          value={newUser}
          onChange={e => setNewUser(e.target.value)}
          placeholder="Enter a Github User (e.g. 'Facebook') "
        />
        <button type="submit">Search</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Users>
        {users.map(user => (
          <Link key={user.name} to={`/users/${user.login}`}>
            <img src={user.avatar_url} alt={user.login} />
            <div>
              <strong>{user.name}</strong>
              <p>{user.bio}</p>
              <h5>@{user.login}</h5>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Users>
    </>
  );
};

export default UserList;
