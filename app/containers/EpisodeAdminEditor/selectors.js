import { createSelector } from 'reselect';

/**
 * Direct selector to the episodeAdminPicker state domain
 */
const selectEpisodeAdminEditorDomain = () => state => state.get('episodeAdminEditor');


const selectEpisodeAdminEditor = () => createSelector(
  selectEpisodeAdminEditorDomain(),
  (substate) => substate.toJS()
);

export {
  selectEpisodeAdminEditor,
};
