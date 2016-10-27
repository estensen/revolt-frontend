/**
*
* AdminOptionButton
*
*/

import React from 'react';

import styles from './styles.css';

function AdminOptionButton(props) {
  return (
    <div className={styles.adminOptionButton}>
      <img src={props.image} alt={props.name} className={styles.image} />
      <h2 className={styles.title}>
        {props.name}
      </h2>
    </div>
  );
}

AdminOptionButton.propTypes = {
  image: React.PropTypes.string,
  name: React.PropTypes.string,
  slug: React.PropTypes.string,
};


export default AdminOptionButton;
