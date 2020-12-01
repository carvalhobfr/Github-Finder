import React, { useState, useEffect } from 'react';

import './styles.css';

const RepoList = () => {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function getRepos() {
      const response = await fetch(
        'https://api.github.com/users/carvalhobfr/repos',
      );
      const data = await response.json();

      setRepositories(data);
    }

    getRepos();
  }, []);
  return (
    <ul>
      {repositories.map((repo) => (
        <li key={repo.id}>{repo.full_name}</li>
      ))}
    </ul>
  );
};

export default RepoList;
