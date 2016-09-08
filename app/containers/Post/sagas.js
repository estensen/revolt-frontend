import { take, call, put } from 'redux-saga/effects';
import { LOAD_POST_PENDING } from './constants';
import {
  postLoaded,
  postError,
} from './actions';
import { getGraphQL } from 'utils/api';

// Individual exports for testing
export function* loadPost(slug) {
  const query = `query {
    post(slug:"${slug}") {
      id,
      title,
      content,
      publishAt,
      createdBy {
        fullName
      },
      show{
        name,
        slug
      }
    }
  }`;
  try {
    const result = yield call(getGraphQL, query);
    yield put(postLoaded(result.data.post));
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
