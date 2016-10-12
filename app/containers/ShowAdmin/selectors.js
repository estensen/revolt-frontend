import { createSelector } from 'reselect';

/**
 * Direct selector to the ShowAdmin state domain
 */
const selectShowAdminDomain = () => state => state.get('ShowAdmin');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ShowAdmin
 */

const selectShowAdmin = () => createSelector(
  selectShowAdminDomain(),
  (substate) => substate.toJS()
);

export default selectShowAdmin;
export {
  selectShowAdminDomain,
};
