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

export function showLoaded(data) {
  return {
    type: LOAD_SHOW_SUCCESS,
    show: data.show,
    episodes: data.episodes,
    posts: data.posts,
  };
}

export function showError() {
  return {
    type: LOAD_SHOW_FAILED,
  };
}
