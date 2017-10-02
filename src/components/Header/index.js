import React from 'react';

import Logo from 'components/Header/Logo';
import NavBar from 'components/Header/NavBar';
import HeaderLiveButton from 'components/HeaderLiveButton';

import styles from './styles.css';

class Header extends React.Component {
  render() {
    return (
      <header className={styles.header}>
        <NavBar />
        <Logo />
        <HeaderLiveButton />
      </header>
    );
  }
}

export default Header;
