/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Link } from 'react-router';

import svgLogo from './radiorevolt.svg';
import styles from './styles.css';

import Footer from 'components/Footer';

import Player from 'containers/Player';

const navbarLinks = [
  {
    path: '/programmer',
    title: 'Programmer',
  },
  {
    path: '/om',
    title: 'Om Oss',
  },
];

export default class App extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
    changeRoute: React.PropTypes.func,
  };

  render() {
    const navbarItems = navbarLinks.map(
      (link, index) =>
        <li key={`item-${index}`} className={styles.navbarItem}>
          <Link className={styles.navbarLink} style={{ textDecoration: 'none', color: 'inherit' }} to={link.path}>
            {link.title}
          </Link>
        </li>
    );

    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <Link to="/">
            <img src={svgLogo} alt="Logo" className={styles.logo} />
          </Link>
          <ul className={styles.navbar}>
            {navbarItems}
          </ul>
        </header>
        <div className={styles.content}>
          {this.props.children}
        </div>
        <Footer />
        <Player />
      </div>
    );
  }
}
