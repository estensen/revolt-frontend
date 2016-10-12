import { createSelector } from 'reselect';

/**
 * Direct selector to the episodeAdmin state domain
 */
const selectEpisodeAdminDomain = () => state => state.get('episodeAdmin');

/**
 * Other specific selectors
 */


/**
 * Default selector used by EpisodeAdmin
 */

const selectEpisodeAdmin = () => createSelector(
  selectEpisodeAdminDomain(),
  (substate) => substate.toJS()
);

export default selectEpisodeAdmin;
export {
  selectEpisodeAdminDomain,
};
