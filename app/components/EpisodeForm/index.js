/**
*
* EpisodeForm
*
*/

import React from 'react';

import styles from './styles.css';

import TextInput from 'components/TextInput';
import TextAreaInput from 'components/TextAreaInput';
import SubmitButton from 'components/SubmitButton';
import SelectInput from 'components/SelectInput';

const EpisodeForm = props => {
  return (
    <div className={styles.episodeForm}>
      <TextInput
        label={'Tittel'}
        onChange={props.onTitleChange}
        value={props.title}
      />
      <TextAreaInput
        label={'Kort beskrivelse'}
        onChange={props.onLeadChange}
        value={props.lead}
      />
      <SelectInput
        label={'Hvilket program hører episoden til?'}
        onChange={props.onShowChange}
        options={props.shows}
      />
      <SelectInput
        label={'Hva heter on-demand-episoden i Digas?'}
        onChange={props.onOnDemandEpisodeChange}
        options={props.digasOnDemandEpisodes}
      />
      <SelectInput
        label={'Hva heter podcast-episoden i Digas?'}
        onChange={props.onPodcastEpisodeChange}
        options={props.digasPodcastEpisodes}
      />

      <SubmitButton
        disabled={props.onAddButtonDisabled}
        onClick={props.onAddEpisode}
      >
        Opprett episode
      </SubmitButton>
    </div>
  );
};

EpisodeForm.propTypes = {
  onTitleChange: React.PropTypes.func.isRequired,
  onLeadChange: React.PropTypes.func.isRequired,
  onShowChange: React.PropTypes.func.isRequired,
  onOnDemandEpisodeChange: React.PropTypes.func.isRequired,
  onPodcastEpisodeChange: React.PropTypes.func.isRequired,

  title: React.PropTypes.string.isRequired,
  lead: React.PropTypes.string.isRequired,
  shows: React.PropTypes.oneOfType([
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
  onAddButtonDisabled: React.PropTypes.bool,
  onAddEpisode: React.PropTypes.func.isRequired,
};

export default EpisodeForm;
