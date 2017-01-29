import { take, call, put } from 'redux-saga/effects';
import { ADD_SHOW_PENDING } from './constants';
import {
  addShowSuccess,
  addShowError,
} from './actions';
import { post, POSTS_URL } from 'utils/api';

export function* addShow(show) {
  try {
    const result = yield call(post, POSTS_URL, show);
    yield put(addShowSuccess(result));
  } catch (error) {
    yield put(addShowError());
  }
}

export function* addShowWatcher() {
  while (true) { // eslint-disable-line no-constant-condition
    const { show } = yield take(ADD_SHOW_PENDING);
    yield call(addShow, show);
  }
}

// All sagas to be loaded
export default [
  addShowWatcher,
];
