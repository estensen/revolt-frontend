import { take, call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { ADD_POST_PENDING } from './constants';
import {
  addPostSuccess,
  addPostError,
} from './actions';
import { post, POSTS_URL } from 'utils/api';

export function* addPost(postData) {
  try {
    const result = yield call(post, POSTS_URL, postData);
    yield put(addPostSuccess(result));
    yield put(push('/admin'));
  } catch (error) {
    yield put(addPostError(error));
  }
}

export function* addPostWatcher() {
  while (true) { // eslint-disable-line no-constant-condition
    const action = yield take(ADD_POST_PENDING);
    yield call(addPost, action.post);
  }
}

// All sagas to be loaded
export default [
  addPostWatcher,
];
