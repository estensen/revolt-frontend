import { take, call, put } from 'redux-saga/effects';
import { LOAD_SHOW_PENDING } from './constants';
import {
  showLoaded,
  showError,
} from './actions';
import {
  getQuery,
  SHOWS_URL,
  EPISODES_URL,
  POSTS_URL,
} from 'utils/api';

// Individual exports for testing
export function* loadShow(slug) {
  try {
    let show = yield call(getQuery, SHOWS_URL, 'slug', slug);
    show = show[0];
    const episodes = yield call(getQuery, EPISODES_URL, 'showId', show.id);
    const posts = yield call(getQuery, POSTS_URL, 'showId', show.id);
    yield put(showLoaded({
      show,
      episodes,
      posts,
    }));
  } catch (error) {
    yield put(showError());
  }
}

export function* loadShowWatcher() {
  while (true) { // eslint-disable-line no-constant-condition
    const { slug } = yield take(LOAD_SHOW_PENDING);
    yield call(loadShow, slug);
  }
}

// All sagas to be loaded
export default [
  loadShowWatcher,
];
