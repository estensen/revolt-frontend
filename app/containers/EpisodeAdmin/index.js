/*
 *
 * EpisodeAdmin
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { addEpisode } from './actions';
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
    return (
      <div className={styles.episodeAdmin}>
        <h1>Opprett ny episode</h1>
        <TextInput label={'Tittel'} onChange={this.handleTitleChange} value={this.state.title} />
        <TextAreaInput label={'Kort beskrivelse'} onChange={this.handleLeadChange} value={this.state.lead} />
        <div>Dropdown med Shows</div> {/* TODO */}
        <TextInput label={'PodcastUrl - Burde legges inn automatisk?'} onChange={this.handlePodcastUrlChange} value={this.state.podcastUrl} />
        <TextInput label={'SoundUrl - Burde legges inn automatisk?'} onChange={this.handleSoundUrlChange} value={this.state.soundUrl} />

        <SubmitButton onClick={() => this.props.onAddEpisode(this.state)}>Lagre</SubmitButton>
      </div>
    );
  }
}

EpisodeAdmin.propTypes = {
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


function mapStateToProps(state) {
  return {
    shows: state.shows,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAddEpisode: (episode) => dispatch(addEpisode(episode)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeAdmin);
