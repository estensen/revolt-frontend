import { createSelector } from 'reselect';

/**
 * Direct selector to the shows state domain
 */
const selectCategoriesDomain = () => state => state.get('categories');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Shows
 */

const selectCategories = () => createSelector(
  selectCategoriesDomain(),
  (categoryState) => categoryState.get('categories')
);

const selectCategoriesLoading = () => createSelector(
  selectCategoriesDomain(),
  (categoryState) => categoryState.get('loading')
);

const selectCategoriesError = () => createSelector(
  selectCategoriesDomain(),
  (categoryState) => categoryState.get('error')
);

export {
  selectCategoriesDomain,
  selectCategories,
  selectCategoriesLoading,
  selectCategoriesError,
};
