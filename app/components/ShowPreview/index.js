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
        <img className={styles.image} src={props.logoImage} alt={props.title} />
      </Link>
      <Link className={styles.nameLink} to={`/programmer/${props.slug}`}>
        <h2 className={styles.name}>
          {props.name}
        </h2>
      </Link>
      <div className={styles.lead}>{props.lead}</div>
      <div className={styles.catbox}>{props.id}</div>
    </div>
  );
}

ShowPreview.propTypes = {
  name: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  logoImage: React.PropTypes.string.isRequired,
  slug: React.PropTypes.string.isRequired,
  lead: React.PropTypes.string.isRequired,
};

export default ShowPreview;
