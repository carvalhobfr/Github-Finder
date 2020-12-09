import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

import api from '../../services/api';

import Header from '../../components/Header';
import RepoList from '../../components/RepoList';
import HeaderUser from '../../components/HeaderUser';

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
  bio: string;
  name: string;
}

const UserPage: React.FC = () => {
  const [user, setUser] = useState<User>();
  const { params } = useRouteMatch<UserParams>();

  useEffect(() => {
    api.get(`users/${params.user}`).then(response => {
      setUser(response.data);
    });
  }, [params.user]);

  return (
    <>
      <Header backToDashboard />
      {user && (
        <HeaderUser
          avatar_url={user.avatar_url}
          name={user.name}
          login={user.login}
          bio={user.bio}
          followers={user.followers}
          following={user.following}
          public_repos={user.public_repos}
        />
      )}
      <RepoList />
    </>
  );
};

export default UserPage;
