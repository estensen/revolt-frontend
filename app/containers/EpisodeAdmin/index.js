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
import { addEpisode } from './actions';

import { loadShows } from 'containers/Shows/actions';
import styles from './styles.css';

import TextInput from 'components/TextInput';
import TextAreaInput from 'components/TextAreaInput';
import SubmitButton from 'components/SubmitButton';

export class EpisodeAdmin extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      lead: '',
      show: '',
      podcastUrl: '',
      soundUrl: '',
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleLeadChange = this.handleLeadChange.bind(this);
    this.handlePodcastUrlChange = this.handlePodcastUrlChange.bind(this);
    this.handleSoundUrlChange = this.handleSoundUrlChange.bind(this);
  }

  componentWillMount() {
    this.props.loadShow();
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleLeadChange(event) {
    this.setState({ lead: event.target.value });
  }

  handlePodcastUrlChange(event) {
    this.setState({ podcastUrl: event.target.value });
  }

  handleSoundUrlChange(event) {
    this.setState({ soundUrl: event.target.value });
  }

  render() {
    let shows;
    if (this.props.shows !== false) {
      shows = this.props.shows.map(
        show => <option value={show.name} key={show.id}>{show.name}</option>
      );
    }


    return (
      <div className={styles.episodeAdmin}>
        <h1>Opprett ny episode</h1>
        <TextInput label={'Tittel'} onChange={this.handleTitleChange} value={this.state.title} />
        <TextAreaInput label={'Kort beskrivelse'} onChange={this.handleLeadChange} value={this.state.lead} />
        <select>{shows}</select>
         {/* TODO */}
        <TextInput label={'PodcastUrl - Burde legges inn automatisk?'} onChange={this.handlePodcastUrlChange} value={this.state.podcastUrl} />
        <TextInput label={'SoundUrl - Burde legges inn automatisk?'} onChange={this.handleSoundUrlChange} value={this.state.soundUrl} />

        <SubmitButton onClick={() => this.props.onAddEpisode(this.state)}>Lagre</SubmitButton>
      </div>
    );
  }
}

EpisodeAdmin.propTypes = {
  loadShow: React.PropTypes.func,
  onAddEpisode: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  error: React.PropTypes.bool,
  shows: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.array,
  ]),
};

EpisodeAdmin.defaultProps = {
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
    onAddEpisode: (episode) => dispatch(addEpisode(episode)),
    loadShow: () => dispatch(loadShows()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeAdmin);
