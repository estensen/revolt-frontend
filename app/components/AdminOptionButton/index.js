/**
*
* AdminOptionButton
*
*/

import React from 'react';
import { Link } from 'react-router';

import styles from './styles.css';

function AdminOptionButton(props) {
  return (
    <div className={styles.adminOptionButton}>
      <img className={styles.image} src={props.image} alt={props.name} />
      <Link className={styles.titleLink} to={`/post/${props.slug}`}>
        <h2 className={styles.title}>
          {props.name}
        </h2>
      </Link>
    </div>
  );
}

AdminOptionButton.propTypes = {
  image: React.PropTypes.array,
  name: React.PropTypes.string,
  slug: React.PropTypes.string,
};


export default AdminOptionButton;
