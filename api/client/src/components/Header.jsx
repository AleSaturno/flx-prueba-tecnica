import React from 'react';
import logo from '../assets/Logo.svg';
import '../styles/theme.scss';

const Header = () => (
  <header className="app-header">
    <img src={logo} alt="Flexxus" className="app-header__logo" />
  </header>
);

export default Header;
