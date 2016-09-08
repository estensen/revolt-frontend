/*
 *
 * Show actions
 *
 */

import {
  LOAD_SHOW_PENDING,
  LOAD_SHOW_SUCCESS,
  LOAD_SHOW_FAILED,
} from './constants';

export function loadShow(slug) {
  return {
    type: LOAD_SHOW_PENDING,
    slug,
  };
}

export function showLoaded(show) {
  return {
    type: LOAD_SHOW_SUCCESS,
    show,
  };
}

export function showError() {
  return {
    type: LOAD_SHOW_FAILED,
  };
}
