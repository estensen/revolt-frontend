/*
 *
 * EpisodeAdmin
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import EpisodeForm from 'components/EpisodeForm';
import EpisodePreview from 'components/EpisodePreview';

import {
  selectShows,
  selectShowsLoading,
  selectShowsError,
} from 'containers/Shows/selectors';
import {
  selectDigasOnDemandEpisodes,
  selectDigasPodcastEpisodes,
  selectDigasEpisodesLoading,
  selectDigasEpisodesError,
} from './selectors';

import {
  loadShows,
} from 'containers/Shows/actions';
import {
  getOnDemandPlaylist,
} from 'containers/Player/actions';
import {
  addEpisodePending,
  loadDigasEpisodesPending,
  clearDigasEpisodes,
} from './actions';

import styles from './styles.css';

// FieldChangeHandlerFactory
const getFieldChangeHandler = (name) => function (event) { // eslint-disable-line func-names
  event.preventDefault();
  this.setState({ [name]: event.target.value });
};

export class EpisodeAdmin extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      lead: '',
      selectedShow: null,
      podcastUrl: null,
      soundUrl: null,
      showId: null,
    };
  }

  componentWillMount() {
    this.props.loadShows();
  }

  handleTitleChange = getFieldChangeHandler('title').bind(this)
  handleLeadChange = getFieldChangeHandler('lead').bind(this)

  handleShowChange = (event) => {
    const showId = event.target.value || null;
    this.setState({ showId });
    if (showId !== null) {
      // Get the correct show by showId, to extract the digasId
      const selectedShow = this.props.shows.find(show => show.id == showId); // eslint-disable-line eqeqeq
      this.setState({
        selectedShow,
      });
      this.props.loadDigasEpisodes(selectedShow.digasId);
    } else {
      // Clear list of episodes if "Velg program" is selected
      this.setState({
        selectedShow: null,
      });
      this.props.clearDigasEpisodes();
    }
  }

  handleOnDemandEpisodeChange = (event) => {
    const digasId = event.target.value || null;
    if (digasId !== null) {
      const selectedEpisode = this.props.digasOnDemandEpisodes.find(episode => episode.id == digasId); // eslint-disable-line eqeqeq
      this.setState({ soundUrl: selectedEpisode.url });
    } else {
      this.setState({ soundUrl: null });
    }
  }

  handlePodcastEpisodeChange = (event) => {
    const digasId = event.target.value || null;
    if (digasId !== null) {
      const selectedEpisode = this.props.digasPodcastEpisodes.find(episode => episode.id == digasId); // eslint-disable-line eqeqeq
      this.setState({ podcastUrl: selectedEpisode.url });
    } else {
      this.setState({ podcastUrl: null });
    }
  }

  isValidEpisode = (episode) => {
    if (episode.lead.length === 0) {
      return false;
    } else if (!episode.selectedShow) {
      return false;
    } else if (!episode.podcastUrl && !episode.soundUrl) {
      return false;
    }
    return true;
  }

  handleAddEpisode = (episode) => {
    if (this.isValidEpisode(episode)) {
      this.props.onAddEpisode(episode);
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
    const digasOnDemandEpisodes = arrayToOptionComponents(this.props.digasOnDemandEpisodes,
                                                        'digasOnDemandEpisode-placeholder',
                                                        'Velg episode');
    const digasPodcastEpisodes = arrayToOptionComponents(this.props.digasPodcastEpisodes,
                                                        'digasOnDemandEpisode-placeholder',
                                                        'Velg episode');
    return (
      <div className={styles.episodeAdmin}>
        <h1>Opprett ny episode</h1>
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
          onAddButtonDisabled={!this.isValidEpisode(this.state)}
          onAddEpisode={() => this.handleAddEpisode(this.state)}
        />
        <div className={styles.previewSection}>
          <EpisodePreview
            showName={this.state.selectedShow ? this.state.selectedShow.title : null}
            lead={this.state.lead}
          />
        </div>
      </div>
    );
  }
}

EpisodeAdmin.propTypes = {
  onAddEpisode: React.PropTypes.func.isRequired,
  loadShows: React.PropTypes.func.isRequired,
  loadDigasEpisodes: React.PropTypes.func.isRequired,
  clearDigasEpisodes: React.PropTypes.func.isRequired,
  shows: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.array,
  ]),
  showsLoading: React.PropTypes.bool.isRequired,
  showsError: React.PropTypes.bool.isRequired,
  digasOnDemandEpisodes: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.array,
  ]),
  digasPodcastEpisodes: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.array,
  ]),
  digasEpisodesLoading: React.PropTypes.bool.isRequired,
  digasEpisodesError: React.PropTypes.bool.isRequired,
  playOnDemand: React.PropTypes.func.isRequired,
};

EpisodeAdmin.defaultProps = {
  shows: false,
  showsLoading: false,
  showsError: false,
  digasOnDemandEpisodes: false,
  digasPodcastEpisodes: false,
  digasEpisodesLoading: false,
  digasEpisodesError: false,
};


const mapStateToProps = createStructuredSelector({
  shows: selectShows(),
  showsLoading: selectShowsLoading(),
  showsError: selectShowsError(),
  digasOnDemandEpisodes: selectDigasOnDemandEpisodes(),
  digasPodcastEpisodes: selectDigasPodcastEpisodes(),
  digasEpisodesLoading: selectDigasEpisodesLoading(),
  digasEpisodesError: selectDigasEpisodesError(),
});

function mapDispatchToProps(dispatch) {
  return {
    onAddEpisode: (episode) => dispatch(addEpisodePending(episode)),
    loadShows: () => dispatch(loadShows()),
    loadDigasEpisodes: (digasId) => dispatch(loadDigasEpisodesPending(digasId)),
    clearDigasEpisodes: () => dispatch(clearDigasEpisodes()),
    playOnDemand: (episodeId, offset = 0) => (
      dispatch(getOnDemandPlaylist(episodeId, offset))
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeAdmin);
