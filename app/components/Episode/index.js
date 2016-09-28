/**
*
* Episode
*
*/

import React from 'react';
import moment from 'moment';

import styles from './styles.css';

function getNormalizedDateString(dateString) {
  const paddedString = (i) => (i < 10 ? `0${i}` : `${i}`);

  const date = moment(dateString);
  const year = date.year();
  const month = date.month() + 1;
  const day = date.date();

  return `${paddedString(day)}.${paddedString(month)}.${year}`;
}

function Episode(props) {
  if (props.digasBroadcastId === 0) {
    return null;
  }

  return (
    <div className={styles.episode} onClick={() => props.playOnDemand(props.id)}>
      <div className={styles.playButton}>
        <div className={styles.playButtonInner}></div>
      </div>
      <div className={styles.meta}>
        <div className={styles.title}>{props.showName} {getNormalizedDateString(props.createdAt)}</div>
        <div className={styles.lead}>{props.lead}</div>
      </div>
    </div>
  );
}

Episode.propTypes = {
  digasBroadcastId: React.PropTypes.number,
  id: React.PropTypes.number,
  title: React.PropTypes.string,
  showName: React.PropTypes.string,
  createdAt: React.PropTypes.string,
  lead: React.PropTypes.string,
  podcastUrl: React.PropTypes.string,
  playOnDemand: React.PropTypes.func,
};

export default Episode;
