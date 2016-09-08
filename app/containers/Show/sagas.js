import { take, call, put } from 'redux-saga/effects';
import { LOAD_SHOW_PENDING } from './constants';
import {
  showLoaded,
  showError,
} from './actions';
import { getGraphQL } from 'utils/api';

// Individual exports for testing
export function* loadShow(slug) {
  const query = `query {
    show(slug:"${slug}") {
      id,
      name,
      image,
      content,
      archived,
      episodes {
        id,
        lead,
        createdAt,
      },
      posts {
        id,
        title,
        slug,
        image,
        publishAt,
        lead,
        createdBy {
          fullName
        }
      }
    }
  }`;
  try {
    const result = yield call(getGraphQL, query);
    yield put(showLoaded(result.data.show));
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
