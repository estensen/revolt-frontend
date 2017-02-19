import { take, call, put } from 'redux-saga/effects';
import {
  ADD_EPISODE_PENDING,
  LOAD_DIGAS_EPISODES_PENDING,
} from './constants';
import {
  addEpisodeSuccess,
  addEpisodeError,
  loadDigasEpisodesSuccess,
  loadDigasEpisodesError,
} from './actions';
import {
  post,
  EPISODES_URL,
  getDigasOnDemandEpisodes,
  getDigasPodcastEpisodes,
} from 'utils/api';

export function* addEpisode(episode) {
  try {
    yield call(post, EPISODES_URL, episode);
    yield put(addEpisodeSuccess());
  } catch (error) {
    yield put(addEpisodeError());
  }
}


export function* addEpisodeWatcher() {
  while (true) { // eslint-disable-line no-constant-condition
    const { episode } = yield take(ADD_EPISODE_PENDING);
    yield call(addEpisode, episode);
  }
}

export function* loadDigasEpisodes(digasId) {
  try {
    const onDemandEpisodes = yield call(getDigasOnDemandEpisodes, digasId);
    const podcastEpisodes = yield call(getDigasPodcastEpisodes, digasId);
    yield put(loadDigasEpisodesSuccess({
      onDemandEpisodes,
      podcastEpisodes,
    }));
  } catch (error) {
    yield put(loadDigasEpisodesError());
  }
}

export function* loadDigasEpisodesWatcher() {
  while (true) { // eslint-disable-line no-constant-condition
    const { digasId } = yield take(LOAD_DIGAS_EPISODES_PENDING);
    yield call(loadDigasEpisodes, digasId);
  }
}

// All sagas to be loaded
export default [
  addEpisodeWatcher,
  loadDigasEpisodesWatcher,
];
