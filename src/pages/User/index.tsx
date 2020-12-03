/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { promises } from 'fs';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Header, UserInfo, Repository } from './styles';
import { Logo } from '../../styles/global';

interface UserParams {
  repository: any;
  user: string;
}

interface User {
  login: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  name: string;
  bio: string;
}

interface Repository {
  map(arg0: (repository: any) => JSX.Element): React.ReactNode;
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const User: React.FC = () => {
  const [user, setUser] = useState<User>();
  const [repositories, setRepository] = useState<Repository | null>(null);

  const { params } = useRouteMatch<UserParams>();

  useEffect(() => {
    api.get(`users/${params.user}`).then(response => {
      setUser(response.data);
    });

    api.get(`users/${params.user}/repos`).then(response => {
      setRepository(response.data);
    });
  }, [params.user]);

  return (
    <>
      <Header>
        <Logo src={logoImg} alt="GitHub Logo" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Back
        </Link>
      </Header>
      {user && (
        <UserInfo>
          <header>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <h1>{user.name}</h1>
              <h5>@{user.login}</h5>
              <br/>
              <strong>{user.bio}</strong>
            </div>
          </header>
          <ul>
            <li>
              <strong>{user.followers}</strong>
              <span>Followers</span>
            </li>
            <li>
              <strong>{user.following}</strong>
              <span>Following</span>
            </li>
            <li>
              <strong>{user.public_repos}</strong>
              <span>Repositories</span>
            </li>
          </ul>
        </UserInfo>
      )}
      {repositories ? (
        <Repository>
          {repositories.map(repository => (
            <a key={repository.id} href={repository.html_url}>
              <div>
                <strong>{repository.name}</strong>
                <p>{repository.description}</p>
                <p>
                  {repository.stargazers_count} ⭐ {repository.watchers_count}{' '}
                  👁‍🗨 {repository.open_issues_count}🚩
                </p>
              </div>

              <FiChevronRight size={20} />
            </a>
          ))}
        </Repository>
      ) : (
        <h1> Loading...</h1>
      )}
    </>
  );
};

export default User;
