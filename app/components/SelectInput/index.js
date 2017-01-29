/**
*
* SelectInput
*
*/

import React from 'react';


import styles from './styles.css';

function SelectInput(props) {
  return (
    <div className={styles.selectInput}>
      <span className={styles.label}>{props.label}</span>
      <select onChange={(event) => props.onChange(event, props)}>{props.options}</select>
    </div>
  );
}

SelectInput.propTypes = {
  label: React.PropTypes.string,
  options: React.PropTypes.array,
  onChange: React.PropTypes.func.isRequired,
};

export default SelectInput;
