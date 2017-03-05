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

export class EpisodeAdminEditor extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.loadShows();
  }

  render() {
    let shows;
    if (this.props.shows !== false && this.props.shows.length > 0) {
      shows = this.props.shows.map(
        show => <option value={show.id} key={show.id}>{show.title}</option>
      );
      shows.unshift(<option value={''} key={'show-placeholder'}>Velg show</option>);
    }

    return (
      <div className={styles.episodeAdminPicker}>
        <SelectInput label={'Velg showet episoden tilhører'} options={shows} />
      </div>
    );
  }
}

EpisodeAdminEditor.propTypes = {
  shows: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.array,
  ]),
  loadShows: React.PropTypes.func.isRequired,
};

EpisodeAdminEditor.defaultProps = {
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
    loadShows: () => dispatch(loadShows()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeAdminEditor);
