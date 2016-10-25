/*
 *
 * ShowAdmin reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ADD_SHOW_PENDING,
  ADD_SHOW_SUCCESS,
  ADD_SHOW_FAILED,
} from './constants';

const initialState = fromJS({
  data: false,
  loading: false,
  error: false,
});

function ShowAdminReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_SHOW_PENDING:
      return state
        .set('loading', true)
        .set('error', false);
    case ADD_SHOW_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('data', action.post);
    case ADD_SHOW_FAILED:
      return state
        .set('loading', false)
        .set('error', true);
    default:
      return state;
  }
}

export default ShowAdminReducer;
