/*
 *
 * ShowAdmin actions
 *
 */
import {
  ADD_SHOW_PENDING,
  ADD_SHOW_SUCCESS,
  ADD_SHOW_FAILED,
  LOAD_DIGAS_SHOWS_PENDING,
  LOAD_DIGAS_SHOWS_SUCCESS,
  LOAD_DIGAS_SHOWS_FAILED,
} from './constants';

export function addShowPending(show) {
  return {
    type: ADD_SHOW_PENDING,
    show,
  };
}

export function addShowSuccess() {
  return {
    type: ADD_SHOW_SUCCESS,
  };
}

export function addShowError(error) {
  return {
    type: ADD_SHOW_FAILED,
    error,
  };
}

export function loadDigasShowsPending() {
  return {
    type: LOAD_DIGAS_SHOWS_PENDING,
  };
}

export function loadDigasShowsSuccess(shows) {
  return {
    type: LOAD_DIGAS_SHOWS_SUCCESS,
    shows,
  };
}

export function loadDigasShowsError(error) {
  return {
    type: LOAD_DIGAS_SHOWS_FAILED,
    error,
  };
}
