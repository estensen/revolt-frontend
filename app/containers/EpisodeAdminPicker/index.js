/*
 *
 * EpisodeAdminPicker
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectEpisodeAdminPicker from './selectors';
import styles from './styles.css';

import SelectInput from 'components/SelectInput';

export class EpisodeAdminPicker extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.episodeAdminPicker}>
        <SelectInput />
      </div>
    );
  }
}

const mapStateToProps = selectEpisodeAdminPicker();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeAdminPicker);
