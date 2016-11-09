import { createSelector } from 'reselect';

/**
 * Direct selector to the episodeAdminPicker state domain
 */
const selectEpisodeAdminPickerDomain = () => state => state.get('episodeAdminPicker');

/**
 * Other specific selectors
 */


/**
 * Default selector used by EpisodeAdminPicker
 */

const selectEpisodeAdminPicker = () => createSelector(
  selectEpisodeAdminPickerDomain(),
  (substate) => substate.toJS()
);

export default selectEpisodeAdminPicker;
export {
  selectEpisodeAdminPickerDomain,
};
