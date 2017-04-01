import { take, call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import {
  UPDATE_EPISODE_PENDING,
} from './constants';


import {
  updateEpisodeSuccess,
  updateEpisodeError,
} from './actions';

import {
  update,
  EPISODES_URL,
} from 'utils/api';

// Individual exports for testing
export function* updateEpisode(episode) {
  try {
    yield call(update, EPISODES_URL, episode);
    yield put(updateEpisodeSuccess());
    yield put(push('/admin'));
  } catch (error) {
    yield put(updateEpisodeError());
  }
}


export function* addEpisodeWatcher() {
  while (true) { // eslint-disable-line no-constant-condition
    const { episode } = yield take(UPDATE_EPISODE_PENDING);
    yield call(updateEpisode, episode);
  }
}

// All sagas to be loaded
export default [
  addEpisodeWatcher,
];
