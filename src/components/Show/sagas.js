import { take, call, put } from 'redux-saga/effects';
import { LOAD_SHOW_PENDING, LOAD_SHOW_BY_ID_PENDING } from './constants';
import { showLoaded, showError } from './actions';
import { getQuery, SHOWS_URL, EPISODES_URL, POSTS_URL } from 'utils/api';

// TODO: Refactor methods to share behaviour

// Individual exports for testing
export function* loadShow(slug) {
  try {
    let show = yield call(getQuery, SHOWS_URL, 'slug', slug);
    show = show[0];
    const episodes = yield call(getQuery, EPISODES_URL, 'showId', show.id);
    const posts = yield call(getQuery, POSTS_URL, 'showId', show.id);
    yield put(
      showLoaded({
        show,
        episodes,
        posts,
      }),
    );
  } catch (error) {
    yield put(showError());
  }
}

export function* loadShowById(id) {
  try {
    let show = yield call(getQuery, SHOWS_URL, 'id', id);
    show = show[0];
    const episodes = yield call(getQuery, EPISODES_URL, 'showId', show.id);
    const posts = yield call(getQuery, POSTS_URL, 'showId', show.id);
    yield put(
      showLoaded({
        show,
        episodes,
        posts,
      }),
    );
  } catch (error) {
    yield put(showError());
  }
}

export function* loadShowWatcher() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { slug } = yield take(LOAD_SHOW_PENDING);
    yield call(loadShow, slug);
  }
}

export function* loadShowByIdWatcher() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { id } = yield take(LOAD_SHOW_BY_ID_PENDING);
    yield call(loadShowById, id);
  }
}
// All sagas to be loaded
export default [loadShowWatcher, loadShowByIdWatcher];
