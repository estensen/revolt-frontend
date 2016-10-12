/*
 *
 * EpisodeAdmin
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectEpisodeAdmin from './selectors';
import styles from './styles.css';

export class EpisodeAdmin extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.episodeAdmin}>
      </div>
    );
  }
}

const mapStateToProps = selectEpisodeAdmin();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeAdmin);
