import { take, call, put } from 'redux-saga/effects';
import { ADD_SHOW_PENDING, LOAD_DIGAS_SHOWS_PENDING } from './constants';
import {
  addShowSuccess,
  addShowError,
  loadDigasShowsSuccess,
  loadDigasShowsError,
} from './actions';
import { post, get, SHOWS_URL, PAPPAGORG_SHOWS_URL } from 'utils/api';

export function* addShow(show) {
  try {
    const result = yield call(post, SHOWS_URL, show);
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

export function* getDigasShows() {
  try {
    const result = yield get(PAPPAGORG_SHOWS_URL);
    yield put(loadDigasShowsSuccess(result));
  } catch (error) {
    yield put(loadDigasShowsError());
  }
}

export function* loadDigasShowsWatcher() {
  while (yield take(LOAD_DIGAS_SHOWS_PENDING)) {
    yield call(getDigasShows);
  }
}

// All sagas to be loaded
export default [
  addShowWatcher,
  loadDigasShowsWatcher,
];
