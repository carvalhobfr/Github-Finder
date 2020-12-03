import React, { useState, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Users, Logo } from './styles';

interface User {
  login: string;
  avatar_url: string;
  public_repos: number;
  name: string;
  bio: string;
}

const Dashboard: React.FC = () => {
  const [newUser, setNewUser] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  async function handleAddUsers(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    const response = await api.get(`users/${newUser}`);
    const user= response.data;
    console.log(user);

    setUsers([...users, user]);
    setNewUser('');
  }

  return (
    <>
      <Logo src={logoImg} alt="GitHub Logo" />
      <Title>Encontre usuários do GitHub</Title>

      <Form onSubmit={handleAddUsers}>
        <input
          value={newUser}
          onChange={e => setNewUser(e.target.value)}
          placeholder="Digite o nome do usuário"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      <Users>
        {users.map(user => (
          <a key={user.name} href="teste">
            <img src={user.avatar_url} alt={user.login} />
            <div>
              <strong>{user.name}</strong>
              <p>{user.bio}</p>
              <h5>{user.login}</h5>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Users>
    </>
  );
};

export default Dashboard;
