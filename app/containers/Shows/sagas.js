import { take, call, put, select } from 'redux-saga/effects'; // eslint-disable-line
import {
  showsLoaded,
  showsLoadedError,
} from 'containers/Shows/actions';
import { LOAD_SHOWS_PENDING } from './constants';
import { getGraphQL } from 'utils/api';

// Individual exports for testing
export function* getShows() {
  const query = `query {
    allShows {
      id,
      name,
      image,
      lead,
      slug,
      archived
    }
  }`;
  try {
    const result = yield call(getGraphQL, query);
    yield put(showsLoaded(result.data.allShows));
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
