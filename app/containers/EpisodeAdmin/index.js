/*
 *
 * EpisodeAdmin
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

import {
  loadShows,
} from 'containers/Shows/actions';

import {
  selectDigasOnDemandEpisodes,
  selectDigasPodcastEpisodes,
  selectDigasEpisodesLoading,
  selectDigasEpisodesError,
} from './selectors';

import {
  addEpisodePending,
  loadDigasEpisodesPending,
  clearDigasEpisodes,
} from './actions';

import styles from './styles.css';

import TextInput from 'components/TextInput';
import TextAreaInput from 'components/TextAreaInput';
import SubmitButton from 'components/SubmitButton';
import SelectInput from 'components/SelectInput';

export class EpisodeAdmin extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      lead: '',
      podcastUrl: null,
      soundUrl: null,
      showId: null,
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleLeadChange = this.handleLeadChange.bind(this);
    this.handleShowChange = this.handleShowChange.bind(this);
    this.handleOnDemandEpisodeChange = this.handleOnDemandEpisodeChange.bind(this);
    this.handlePodcastEpisodeChange = this.handlePodcastEpisodeChange.bind(this);
  }

  componentWillMount() {
    this.props.loadShows();
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleLeadChange(event) {
    this.setState({ lead: event.target.value });
  }

  handleShowChange(event) {
    const showId = event.target.value || null;
    this.setState({ showId });
    if (showId !== null) {
      // Get the correct show by showId, to extract the digasId
      const selectedShow = this.props.shows.find(show => show.id == showId); // eslint-disable-line eqeqeq
      this.props.loadDigasEpisodes(selectedShow.digasId);
    } else {
      // Clear list of episodes if "Velg program" is selected
      this.props.clearDigasEpisodes();
    }
  }

  handleOnDemandEpisodeChange(event) {
    const digasId = event.target.value || null;
    if (digasId !== null) {
      const selectedEpisode = this.props.digasOnDemandEpisodes.find(episode => episode.id == digasId); // eslint-disable-line eqeqeq
      this.setState({ soundUrl: selectedEpisode.url });
    } else {
      this.setState({ soundUrl: null });
    }
  }

  handlePodcastEpisodeChange(event) {
    const digasId = event.target.value || null;
    if (digasId !== null) {
      const selectedEpisode = this.props.digasPodcastEpisodes.find(episode => episode.id == digasId); // eslint-disable-line eqeqeq
      this.setState({ podcastUrl: selectedEpisode.url });
    } else {
      this.setState({ podcastUrl: null });
    }
  }

  render() {
    let shows;
    if (this.props.shows !== false && this.props.shows.length > 0) {
      shows = this.props.shows.map(
        show => <option value={show.id} key={show.id}>{show.title}</option>
      );
      shows.unshift(<option value={''} key={'show-placeholder'}>Velg program</option>);
    }

    let digasOnDemandEpisodes;
    if (this.props.digasOnDemandEpisodes !== false && this.props.digasOnDemandEpisodes.length > 0) {
      digasOnDemandEpisodes = this.props.digasOnDemandEpisodes.map(
        episode => <option value={episode.id} key={episode.id}>{episode.title}</option>
      );
      digasOnDemandEpisodes.unshift(<option value={''} key={'digasOnDemandEpisode-placeholder'}>Velg episode</option>);
    }

    let digasPodcastEpisodes;
    if (this.props.digasPodcastEpisodes !== false && this.props.digasPodcastEpisodes.length > 0) {
      digasPodcastEpisodes = this.props.digasPodcastEpisodes.map(
        episode => <option value={episode.id} key={episode.id}>{episode.title}</option>
      );
      digasPodcastEpisodes.unshift(<option value={''} key={'digasPodcastEpisode-placeholder'}>Velg episode</option>);
    }

    return (
      <div className={styles.episodeAdmin}>
        <h1>Opprett ny episode</h1>
        <TextInput label={'Tittel'} onChange={this.handleTitleChange} value={this.state.title} />
        <TextAreaInput label={'Kort beskrivelse'} onChange={this.handleLeadChange} value={this.state.lead} />
        <SelectInput label={'Hvilket program hører episoden til?'} options={shows} onChange={this.handleShowChange} />
        <SelectInput label={'Hva heter on-demand-episoden i Digas?'} options={digasOnDemandEpisodes} onChange={this.handleOnDemandEpisodeChange} />
        <SelectInput label={'Hva heter podcast-episoden i Digas?'} options={digasPodcastEpisodes} onChange={this.handlePodcastEpisodeChange} />

        <SubmitButton onClick={() => this.props.onAddEpisode(this.state)}>Opprett episode</SubmitButton>
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeAdmin);
