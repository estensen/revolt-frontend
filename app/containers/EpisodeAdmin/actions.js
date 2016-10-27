/*
 *
 * EpisodeAdmin actions
 *
 */
import axios from 'axios';

import { NEW_API_URL } from 'utils/api';
import {
  ADD_EPISODE_PENDING,
  ADD_EPISODE_SUCCESS,
  ADD_EPISODE_FAILED,
} from './constants';

function addEpisodePending() {
  return {
    type: ADD_EPISODE_PENDING,
  };
}

function addEpisodeSuccess(episode) {
  return {
    type: ADD_EPISODE_SUCCESS,
    episode,
  };
}

function addEpisodeError(error) {
  return {
    type: ADD_EPISODE_FAILED,
    error,
  };
}
export function addEpisode(episode) {
  return (dispatch) => {
    dispatch(addEpisodePending());
    console.log(JSON.stringify(episode, null, 2));
    // TODO: Change from NEW_API_URL to API_URL when new backend deployed.
    axios.post(`${NEW_API_URL}episodes`, {
      title: episode.title || '',
      lead: episode.lead || '',
      show: episode.show || '',
      podcastUrl: episode.podcastUrl || '',
      soundUrl: episode.soundUrl || '',
    })
    .then((res) => res.data)
    .then((resEpisode) => dispatch(addEpisodeSuccess(resEpisode)))
    .catch((err) => dispatch(addEpisodeError(err)));
  };
}
