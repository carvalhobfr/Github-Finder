import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';

import { Repository } from './styles';

interface UserParams {
  repository: any;
  user: string;
}

interface Repository {
  map(arg: (repository: any) => JSX.Element): React.ReactNode;
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

const RepoList: React.FC = () => {
  const [repositories, setRepository] = useState<Repository | null>(null);

  const { params } = useRouteMatch<UserParams>();

  useEffect(() => {
    api.get(`users/${params.user}/repos`).then(response => {
      setRepository(response.data);
    });
  }, [params.user]);

  return (
    <>
      {repositories ? (
        <Repository>
          {repositories.map(repository => (
            <a key={repository.id} href={repository.html_url}>
              <div>
                <strong>{repository.name}</strong>
                <p>{repository.description}</p>
                <p>
                  {repository.stargazers_count}⭐ {repository.watchers_count}
                  👁‍🗨 {repository.open_issues_count}🚩
                </p>
              </div>
              <FiChevronRight size={20} />
            </a>
          ))}
        </Repository>
      ) : (
        <h1> Loading... </h1>
      )}
    </>
  );
};

export default RepoList;
