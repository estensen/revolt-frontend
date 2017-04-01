/*
 *
 * EpisodeAdminPicker actions
 *
 */

import {
  UPDATE_EPISODE_PENDING,
  UPDATE_EPISODE_SUCCESS,
  UPDATE_EPISODE_FAILED,
} from './constants';

export function updateEpisodePending(episode) {
  return {
    type: UPDATE_EPISODE_PENDING,
    episode,
  };
}

export function updateEpisodeSuccess() {
  return {
    type: UPDATE_EPISODE_SUCCESS,
  };
}

export function updateEpisodeError(error) {
  return {
    type: UPDATE_EPISODE_FAILED,
    error,
  };
}
