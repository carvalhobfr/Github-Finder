import React, { useState, useEffect } from 'react';

import './styles.css';

const RepoList = () => {
  const [repositories, setRepositories] = useState([]);
  const [newUser, setNewUser] = useState('carvalhobfr');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getRepos() {
      const response = await fetch(
        `https://api.github.com/users/${newUser}/repos`,
      );
      const data = await response.json();

      setRepositories(data);
    }
    setLoading(true);
    getRepos();
    setLoading(false);
  }, [newUser]);
  if (loading) {
    return <h1>Loading...</h1>;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setNewUser(newUser);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newUser}
        onChange={(e) => setNewUser(e.target.value)}
      />
      <button type="submit">Submit</button>
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id}>{repo.full_name}</li>
        ))}
      </ul>
    </form>
  );
};

export default RepoList;
