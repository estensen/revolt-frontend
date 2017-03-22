import { createSelector } from 'reselect';

/**
 * Direct selector to the sendeplan state domain
 */
const selectSendeplanDomain = () => state => state.get('sendeplan');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Sendeplan
 */

const selectSendeplan = () => createSelector(
  selectSendeplanDomain(),
  (substate) => substate.toJS()
);

export default selectSendeplan;
export {
  selectSendeplanDomain,
};
