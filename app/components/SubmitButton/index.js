/**
*
* SubmitButton
*
*/

import React from 'react';


import styles from './styles.css';

function SubmitButton(props) {
  return (
    <button className={styles.submitButton} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

SubmitButton.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  children: React.PropTypes.string.isRequired,
};

export default SubmitButton;
