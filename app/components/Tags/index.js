/**
*
* Tags
*
*/

import React from 'react';

import styles from './styles.css';

function Tags(props) {
  return (
    <div style={"background-color:'red'"}>
      <div className={styles.container}>
        <p className={styles.name}>
          {props.name}
        </p>
      </div>
    </div>
  );
}

Tags.propTypes = {
  name: React.PropTypes.string.isRequired,
  color: React.PropTypes.string.isRequired,
};

export default Tags;
