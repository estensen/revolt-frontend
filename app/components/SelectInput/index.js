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
      <select>{props.options}</select>
    </div>
  );
}

SelectInput.propTypes = {
  label: React.PropTypes.string,
  options: React.PropTypes.array,
};

export default SelectInput;
