/**
*
* CheckboxInput
*
*/

import React from 'react';


import styles from './styles.css';

function CheckboxInput(props) {
  return (
    <div>
      <label htmlFor={props.label}><input type="checkbox" name={props.label} onChange={props.onChange} checked={props.value} className={styles.checkboxInput} />{props.label}</label>
    </div>
  );
}

CheckboxInput.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.bool.isRequired,
  label: React.PropTypes.string.isRequired,
};

export default CheckboxInput;
