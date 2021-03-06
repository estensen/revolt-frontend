import React from 'react';

import styles from './styles.css';

const HeaderLiveButton = () =>
  <div className={styles.container}>
    <div className={styles.playButton}>
      <div className={styles.playButtonInner} />
    </div>
    <div className={styles.meta}>Lytt direkte!</div>
  </div>;

export default HeaderLiveButton;
