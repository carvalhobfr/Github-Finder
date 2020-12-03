/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import { Header, UserInfo, Repository } from './styles';
import { Logo } from '../../styles/global';

interface UserParams {
  user: string;
}

const User: React.FC = () => {
  const { params } = useRouteMatch<UserParams>();
  return (
    <>
      <Header>
        <Logo src={logoImg} alt="GitHub Logo" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      <UserInfo>
        <header>
          <img
            src="https://avatars3.githubusercontent.com/u/21340896?v=4"
            alt="Matheus Carvalho"
          />
          <div>
            <strong>Carvalhobfr</strong>
            <p>Bio</p>
          </div>
        </header>
        <ul>
          <li>
            <strong>1808</strong>
            <span>Followers</span>
          </li>
          <li>
            <strong>48</strong>
            <span>Following</span>
          </li>
          <li>
            <strong>67</strong>
            <span>Repos</span>
          </li>
        </ul>
      </UserInfo>

      <Repository>
        <Link to="asdasd">
          <div>
            <strong>Test</strong>
            <p>little test</p>
          </div>

          <FiChevronRight size={20} />
        </Link>
      </Repository>
    </>
  );
};

export default User;
