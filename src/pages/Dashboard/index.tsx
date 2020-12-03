import React, { useState, useEffect, FormEvent } from 'react';

import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Users, Logo, Error } from './styles';

interface User {
  login: string;
  avatar_url: string;
  public_repos: number;
  name: string;
  bio: string;
}

const Dashboard: React.FC = () => {
  const [newUser, setNewUser] = useState('');
  const [inputError, setInputError] = useState('');
  const [users, setUsers] = useState<User[]>(() => {
    const storageUsers = localStorage.getItem('@GithubFinder:users');

    if (storageUsers) {
      return JSON.parse(storageUsers);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem('@GithubFinder:users', JSON.stringify(users));
  }, [users]);

  async function handleAddUsers(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    if (!newUser) {
      setInputError('Digite um usuário válido');
      return;
    }
    try {
      const response = await api.get(`users/${newUser}`);

      const user = response.data;

      setUsers([...users, user]);
      setNewUser('');
      setInputError('');
    } catch (err) {
      setInputError('Verifique se digitou usuário corretamente');
    }
  }

  return (
    <>
      <Logo src={logoImg} alt="GitHub Logo" />
      <Title>Encontre usuários do GitHub</Title>

      <Form hasError={!!inputError} onSubmit={handleAddUsers}>
        <input
          value={newUser}
          onChange={e => setNewUser(e.target.value)}
          placeholder="Digite o nome do usuário"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Users>
        {users.map(user => (
          <Link key={user.name} to={`/users/${user.login}`}>
            <img src={user.avatar_url} alt={user.login} />
            <div>
              <strong>{user.name}</strong>
              <p>{user.bio}</p>
              <h5>{user.login}</h5>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Users>
    </>
  );
};

export default Dashboard;
