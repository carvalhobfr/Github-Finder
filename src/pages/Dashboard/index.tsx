/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import Header from '../../components/Header';
import UserList from '../../components/UserList';

const Dashboard: React.FC = () => {
  return (
    <>
      <Header />
      <UserList />
    </>
  );
};

export default Dashboard;
