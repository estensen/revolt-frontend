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

import EpisodeForm from 'components/EpisodeForm';
import SelectInput from 'components/SelectInput';

// FieldChangeHandlerFactory
const getFieldChangeHandler = (name) => function (event) { // eslint-disable-line func-names
  event.preventDefault();
  this.setState({ [name]: event.target.value });
};

export class EpisodeAdminEditor extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      lead: '',
      podcastUrl: null,
      soundUrl: null,
      showId: null,
    };
  }

  componentWillMount() {
    this.props.loadShows();
  }

  handleBelongingShowChange = (event) => {
    const showId = event.target.value || null;
    this.setState({ showId });
    if (showId !== null) {
      // TODO: Load episodes for the selected show
      // this.props.loadEpisodes(selectedShow.digasId);
    } else {
      // TODO: Clear list of episodes if placeholder is selected
      // this.props.clearEpisodes();
    }
  }

  handleSelectedEpisode = () => {

  }

  handleTitleChange = getFieldChangeHandler('title').bind(this)
  handleLeadChange = getFieldChangeHandler('lead').bind(this)

  handleShowChange = (event) => {
    const showId = event.target.value || null;
    this.setState({ showId });
    if (showId !== null) {
      // Get the correct show by showId, to extract the digasId
      // const selectedShow = this.props.shows.find(show => show.id == showId); // eslint-disable-line eqeqeq
      // this.props.loadDigasEpisodes(selectedShow.digasId);
    } else {
      // Clear list of episodes if "Velg program" is selected
      // this.props.clearDigasEpisodes();
    }
  }

  render() {
    const arrayToOptionComponents = (array, defaultKey, defaultText) => {
      let reactComponents;
      if (array !== false && array.length > 0) {
        reactComponents = array.map(
          element => <option value={element.id} key={element.id}>{element.title}</option>
        );
        reactComponents.unshift(<option value={''} key={defaultKey}>{defaultText}</option>);
        return reactComponents;
      }
      return false;
    };

    const shows = arrayToOptionComponents(this.props.shows,
                                        'show-placeholder',
                                        'Velg program');
    const episodes = arrayToOptionComponents(this.props.episodes,
                                        'episode-placeholder',
                                        'Velg episode');
    const digasOnDemandEpisodes = arrayToOptionComponents(this.props.digasOnDemandEpisodes,
                                                        'digasOnDemandEpisode-placeholder',
                                                        'Velg episode');
    const digasPodcastEpisodes = arrayToOptionComponents(this.props.digasPodcastEpisodes,
                                                        'digasOnDemandEpisode-placeholder',
                                                        'Velg episode');

    return (
      <div className={styles.episodeAdminPicker}>
        <h1>Rediger episode</h1>
        <SelectInput
          label={'Velg showet episoden tilhører'}
          onChange={this.handleBelongingShowChange}
          options={shows}
        />
        <SelectInput
          label={'Velg episoden du ønsker å endre'}
          onChange={this.handleSelectedEpisode}
          options={episodes}
        />
        {this.state.selectedEpisode ?
          <EpisodeForm
            onTitleChange={this.handleTitleChange}
            onLeadChange={this.handleLeadChange}
            onShowChange={this.handleShowChange}
            onOnDemandEpisodeChange={this.handleOnDemandEpisodeChange}
            onPodcastEpisodeChange={this.handlePodcastEpisodeChange}

            title={this.state.title}
            lead={this.state.lead}
            shows={shows}
            digasOnDemandEpisodes={digasOnDemandEpisodes}
            digasPodcastEpisodes={digasPodcastEpisodes}
          />
          :
          <div></div> }
      </div>
    );
  }
}

EpisodeAdminEditor.propTypes = {
  shows: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.array,
  ]).isRequired,
  episodes: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.array,
  ]).isRequired,
  digasOnDemandEpisodes: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.array,
  ]).isRequired,
  digasPodcastEpisodes: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.array,
  ]).isRequired,
  loadShows: React.PropTypes.func.isRequired,
};

EpisodeAdminEditor.defaultProps = {
  loading: false,
  error: false,
  shows: false,
  episodes: false,
  digasOnDemandEpisodes: false,
  digasPodcastEpisodes: false,
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
