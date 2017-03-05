import { take, call, put } from 'redux-saga/effects';
import { LOAD_POST_PENDING } from './constants';
import {
  postLoaded,
  postError,
} from './actions';
import { getQuery, POSTS_URL } from 'utils/api';

// Individual exports for testing
export function* loadPost(slug) {
  try {
    const result = yield call(getQuery, POSTS_URL, 'slug', slug);
    yield put(postLoaded(result[0]));
  } catch (error) {
    yield put(postError());
  }
}

export function* loadPostWatcher() {
  while (true) { // eslint-disable-line no-constant-condition
    const { slug } = yield take(LOAD_POST_PENDING);
    yield call(loadPost, slug);
  }
}

// All sagas to be loaded
export default [
  loadPostWatcher,
];
