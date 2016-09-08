/*
 *
 * Post reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_POST_PENDING,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILED,
} from './constants';

const initialState = fromJS({
  data: false,
  loading: false,
  error: false,
});

function postReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_POST_PENDING:
      return state
        .set('loading', true)
        .set('error', false);
    case LOAD_POST_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('data', action.post);
    case LOAD_POST_FAILED:
      return state
        .set('loading', true)
        .set('error', false);
    default:
      return state;
  }
}

export default postReducer;
