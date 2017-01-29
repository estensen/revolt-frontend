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

export function addShowPending(show) {
  return {
    type: ADD_SHOW_PENDING,
    show,
  };
}

export function addShowSuccess(show) {
  return {
    type: ADD_SHOW_SUCCESS,
    show,
  };
}

export function addShowError(error) {
  return {
    type: ADD_SHOW_FAILED,
    error,
  };
}
export function addShow(show) {
  return (dispatch) => {
    dispatch(addShowPending());
    // TODO: Change from NEW_API_URL to API_URL when new backend deployed.
    axios.post(`${NEW_API_URL}shows`, show)
    .then((res) => res.data)
    .then()
    .then((resShow) => dispatch(addShowSuccess(resShow)))
    .catch((err) => dispatch(addShowError(err)));
  };
}
