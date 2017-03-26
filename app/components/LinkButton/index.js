/**
*
* LinkButton
*
*/

import React from 'react';
import { Link } from 'react-router';

import styles from './styles.css';

function LinkButton(props) {
  return (
    <Link className={styles.wrapper} to={props.to}>
      <button className={styles.button}>{props.text}</button>
    </Link>
  );
}

LinkButton.propTypes = {
  to: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
};

export default LinkButton;
