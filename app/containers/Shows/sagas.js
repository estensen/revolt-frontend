import { take, call, put, select } from 'redux-saga/effects'; // eslint-disable-line
import {
  showsLoaded,
  showsLoadedError,
} from 'containers/Shows/actions';
import { LOAD_SHOWS_PENDING } from './constants';
import { get, NEW_API_URL } from 'utils/api';

// Individual exports for testing
export function* getShows() {
  try {
    const result = yield call(get, `posts/${NEW_API_URL}`);
    yield put(showsLoaded(result));
  } catch (error) {
    yield put(showsLoadedError());
  }
}

export function* loadShowsWatcher() {
  while (yield take(LOAD_SHOWS_PENDING)) {
    yield call(getShows);
  }
}

// All sagas to be loaded
export default [
  loadShowsWatcher,
];
