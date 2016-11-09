/*
 *
 * EpisodeAdminPicker
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectShows,
  selectShowsLoading,
  selectShowsError,
} from 'containers/Shows/selectors';
import styles from './styles.css';

import { loadShows } from 'containers/Shows/actions';

import SelectInput from 'components/SelectInput';

export class EpisodeAdminPicker extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.loadShow();
  }

  render() {
    return (
      <div className={styles.episodeAdminPicker}>
        <SelectInput label={'Velg showet som tilhører episoden'} options={this.props.shows} />
      </div>
    );
  }
}

EpisodeAdminPicker.propTypes = {
  shows: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.array,
  ]),
  loadShow: React.PropTypes.func.isRequired,
};

EpisodeAdminPicker.defaultProps = {
  loading: false,
  error: false,
  shows: [],
};

const mapStateToProps = createStructuredSelector({
  shows: selectShows(),
  loading: selectShowsLoading(),
  error: selectShowsError(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadShow: () => dispatch(loadShows()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeAdminPicker);
