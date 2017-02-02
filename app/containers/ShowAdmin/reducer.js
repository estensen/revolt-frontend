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
  LOAD_DIGAS_SHOWS_PENDING,
  LOAD_DIGAS_SHOWS_SUCCESS,
  LOAD_DIGAS_SHOWS_FAILED,
} from './constants';

const initialState = fromJS({
  addShowLoading: false,
  addShowError: false,
  digasShows: false,
  digasLoading: false,
  digasError: false,
});

function ShowAdminReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_SHOW_PENDING:
      return state
        .set('addShowLoading', true)
        .set('addShowError', false);
    case ADD_SHOW_SUCCESS:
      return state
        .set('addShowLoading', false)
        .set('addShowError', false);
    case ADD_SHOW_FAILED:
      return state
        .set('addShowLoading', false)
        .set('addShowError', true);
    case LOAD_DIGAS_SHOWS_PENDING:
      return state
        .set('digasLoading', true)
        .set('digasError', false);
    case LOAD_DIGAS_SHOWS_SUCCESS:
      return state
        .set('digasLoading', false)
        .set('digasError', false)
        .set('digasShows', action.shows);
    case LOAD_DIGAS_SHOWS_FAILED:
      return state
        .set('digasLoading', false)
        .set('digasError', true);
    default:
      return state;
  }
}

export default ShowAdminReducer;
