import { take, call, put } from 'redux-saga/effects';
import {
  frontPagePostsLoaded,
  frontPagePostsError,
} from './actions';
import { LOAD_FRONT_PAGE_POSTS_PENDING } from './constants';
import { get, NEW_API_URL } from 'utils/api';

// Individual exports for testing
export function* loadFrontPageArticles() {
  try {
    const result = yield call(get, `posts/${NEW_API_URL}`);
    yield put(frontPagePostsLoaded(result));
  } catch (error) {
    yield put(frontPagePostsError());
  }
}

export function* loadFrontPageArticlesWatcher() {
  while (yield take(LOAD_FRONT_PAGE_POSTS_PENDING)) {
    yield call(loadFrontPageArticles);
  }
}

// All sagas to be loaded
export default [
  loadFrontPageArticlesWatcher,
];
