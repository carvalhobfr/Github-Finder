import React from 'react';

import { UserInfo } from './styles';

export interface HeaderUserProps {
  avatar_url: string | undefined;
  name: string | undefined;
  login: string | undefined;
  bio: string | undefined;
  followers: number | undefined;
  following: number | undefined;
  public_repos: number | undefined;
}

const HeaderUser: React.FC<HeaderUserProps> = ({
  avatar_url,
  name,
  login,
  bio,
  followers,
  following,
  public_repos,
}) => {
  return (
    <UserInfo>
      <header>
        <img src={avatar_url} alt={name} />
        <div>
          <h1>{name}</h1>
          <h5>@{login}</h5>
          <br />
          <strong>{bio}</strong>
        </div>
      </header>
      <ul>
        <li>
          <strong>{followers}</strong>
          <span>Followers</span>
        </li>
        <li>
          <strong>{following}</strong>
          <span>Following</span>
        </li>
        <li>
          <strong>{public_repos}</strong>
          <span>Repositories</span>
        </li>
      </ul>
    </UserInfo>
  );
};

export default HeaderUser;
