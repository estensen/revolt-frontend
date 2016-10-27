/*
 *
 * EpisodeAdmin reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ADD_EPISODE_PENDING,
  ADD_EPISODE_SUCCESS,
  ADD_EPISODE_FAILED,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  episode: {},
});

function episodeAdminReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_EPISODE_PENDING:
      return state;
    case ADD_EPISODE_SUCCESS:
      return state
      .set('loading', false)
      .set('episode', action.episode);
    case ADD_EPISODE_FAILED:
      return state
      .set('error', true);
    default:
      return state;
  }
}

export default episodeAdminReducer;
