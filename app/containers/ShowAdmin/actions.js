/*
 *
 * ShowAdmin actions
 *
 */
import axios from 'axios';
import { NEW_API_URL } from 'utils/api';
import {
  ADD_SHOW_PENDING,
  ADD_SHOW_SUCCESS,
  ADD_SHOW_FAILED,
} from './constants';

function addShowPending() {
  return {
    type: ADD_SHOW_PENDING,
  };
}

function addShowSuccess(show) {
  return {
    type: ADD_SHOW_SUCCESS,
    show,
  };
}

function addShowError(error) {
  return {
    type: ADD_SHOW_FAILED,
    error,
  };
}
export function addShow(show) {
  return (dispatch) => {
    dispatch(addShowPending());
    console.log(JSON.stringify(show, null, 2));
    // TODO: Change from NEW_API_URL to API_URL when new backend deployed.
    axios.post(`${NEW_API_URL}shows`, {
      title: show.name || '',
      rssFeed: show.rssFeed || '',
      logoImage: show.logoImage || '',
      lead: show.lead || '',
      archived: show.archived || false,
      description: show.content || '',
      explicitContent: show.explicitContent || false,
      language: show.language || 'no',
    })
    .then((res) => res.data)
    .then((resShow) => dispatch(addShowSuccess(resShow)))
    .catch((err) => dispatch(addShowError(err)));
  };
}
