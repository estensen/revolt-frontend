/**
*
* ShowDetailHeader
*
*/

import React from 'react';


import styles from './styles.css';

function ShowDetailHeader(props) {
  return (
    <div className={styles.container}>
      <div className={styles.showInfo}>
        <img className={styles.image} src={props.show.image} alt={props.show.name} />
        <div className={styles.showText}>
          <h2 className={styles.name}>{props.show.name}</h2>
          <p className={styles.lead}>{props.show.content}</p>
        </div>
      </div>
    </div>
  );
}
ShowDetailHeader.propTypes = {
  show: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.object,
  ]),
};


export default ShowDetailHeader;
