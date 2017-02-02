import { createSelector } from 'reselect';

/**
 * Direct selector to the shows state domain
 */
const selectShowAdminDomain = () => state => state.get('ShowAdmin');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Shows
 */

const selectDigasShows = () => createSelector(
  selectShowAdminDomain(),
  (showState) => showState.get('digasShows')
);

const selectDigasShowsLoading = () => createSelector(
  selectShowAdminDomain(),
  (showState) => showState.get('digasLoading')
);

const selectDigasShowsError = () => createSelector(
  selectShowAdminDomain(),
  (showState) => showState.get('digasError')
);

export {
  selectShowAdminDomain,
  selectDigasShows,
  selectDigasShowsLoading,
  selectDigasShowsError,
};
