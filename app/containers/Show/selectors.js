import { createSelector } from 'reselect';

/**
 * Direct selector to the show state domain
 */
const selectShowDomain = () => state => state.get('show');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Show
 */

const selectShow = () => createSelector(
  selectShowDomain(),
  (showState) => showState.get('data')
);

const selectShowLoading = () => createSelector(
  selectShowDomain(),
  (showState) => showState.get('loading')
);

const selectShowError = () => createSelector(
  selectShowDomain(),
  (showState) => showState.get('error')
);

export {
  selectShowDomain,
  selectShow,
  selectShowLoading,
  selectShowError,
};
