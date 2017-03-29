/**
*
* SubmitButton
*
*/

import React from 'react';


import styles from './styles.css';

function SubmitButton(props) {
  return (
    <button
      className={props.disabled ? styles.submitButtonDisabled : styles.submitButtonEnabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

SubmitButton.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool,
  children: React.PropTypes.string.isRequired,
};

export default SubmitButton;
