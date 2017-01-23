/**
*
* ShowPreview
*
*/

import React from 'react';
import { Link } from 'react-router';

import styles from './styles.css';

function ShowPreview(props) {
  return (
    <div className={styles.container}>
      <Link className={styles.imageLink} to={`/programmer/${props.slug}`}>
        <img className={styles.image} src={props.image} alt={props.name} />
      </Link>
      <Link className={styles.nameLink} to={`/programmer/${props.slug}`}>
        <h2 className={styles.name}>
          {props.name}
        </h2>
      </Link>
      <div className={styles.lead}>{props.lead}</div>
      <div className={styles.catTag}>Tag</div>
    </div>
  );
}

ShowPreview.propTypes = {
  name: React.PropTypes.string.isRequired,
  image: React.PropTypes.string.isRequired,
  slug: React.PropTypes.string.isRequired,
  lead: React.PropTypes.string.isRequired,
  catTag: React.PropTypes.number.isRequired,
};

export default ShowPreview;
