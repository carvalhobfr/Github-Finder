import React from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';

import logo from '../../assets/logo.svg';

import { Container, Logo } from './styles.js';

interface HeaderProps {
  backToDashboard?: boolean;
}

const Header: React.FC<HeaderProps> = ({ backToDashboard }) => (
  <Container>
    <Logo
      src={logo}
      alt="GitHub Explorer"
      aria-label="GitHub Explorer"
      title="GitHub Explorer | Explore amazing repositories"
    />

    {backToDashboard && (
      <Link to="/">
        <FiChevronLeft size={16} />
        Voltar
      </Link>
    )}
  </Container>
);

export default Header;
