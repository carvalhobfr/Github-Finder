import React from 'react';
import { useRouteMatch } from 'react-router-dom';

interface UserParams {
  user: string;
}

const User: React.FC = () => {
  const { params } = useRouteMatch<UserParams>();
  return <div>User:{params.user}</div>;
};

export default User;
