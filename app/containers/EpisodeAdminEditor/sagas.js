import { take, call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import {
  UPDATE_EPISODE_PENDING,
  DELETE_EPISODE_PENDING,
} from './constants';


import {
  updateEpisodeSuccess,
  updateEpisodeError,
  deleteEpisodeSuccess,
  deleteEpisodeError,
} from './actions';

import {
  update,
  apiDelete,
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


export function* updateEpisodeWatcher() {
  while (true) { // eslint-disable-line no-constant-condition
    const { episode } = yield take(UPDATE_EPISODE_PENDING);
    yield call(updateEpisode, episode);
  }
}

export function* deleteEpisode(episodeId) {
  try {
    yield call(apiDelete, EPISODES_URL, episodeId);
    yield put(deleteEpisodeSuccess());
    yield put(push('/admin'));
  } catch (error) {
    yield put(deleteEpisodeError());
  }
}


export function* deleteEpisodeWatcher() {
  while (true) { // eslint-disable-line no-constant-condition
    const { episodeId } = yield take(DELETE_EPISODE_PENDING);
    yield call(deleteEpisode, episodeId);
  }
}

// All sagas to be loaded
export default [
  updateEpisodeWatcher,
  deleteEpisodeWatcher,
];
