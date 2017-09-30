import { getAsyncInjectors } from 'utils/asyncInjectors';
import asyncComponent from 'utils/asyncComponent';

const errorLoading = err => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: '/',
      name: 'frontPage',
      exact: true,
      component: asyncComponent(() =>
        Promise.all([
          System.import('components/FrontPage/reducer'),
          System.import('components/FrontPage/sagas'),
          System.import('components/FrontPage'),
        ])
          .then(([reducer, sagas, component]) => {
            injectReducer('frontPage', reducer.default);
            injectSagas(sagas.default);
            return component;
          })
          .catch(errorLoading),
      ),
    },
    {
      path: '/om',
      name: 'about',
      component: asyncComponent(() =>
        System.import('components/About').catch(errorLoading),
      ),
    },

    {
      path: '/programmer',
      name: 'shows',
      component: asyncComponent(() =>
        Promise.all([
          System.import('components/Shows/reducer'),
          System.import('components/Shows/sagas'),
          System.import('components/Shows'),
        ])
          .then(([reducer, sagas, component]) => {
            injectReducer('shows', reducer.default);
            injectSagas(sagas.default);
            return component;
          })
          .catch(errorLoading),
      ),
    },
    {
      path: '/post/:slug',
      name: 'post',
      component: asyncComponent(() =>
        Promise.all([
          System.import('components/Post/reducer'),
          System.import('components/Post/sagas'),
          System.import('components/Post'),
        ])
          .then(([reducer, sagas, component]) => {
            injectReducer('post', reducer.default);
            injectSagas(sagas.default);
            return component;
          })
          .catch(errorLoading),
      ),
    },
    {
      path: '/programmer/:slug',
      name: 'show',
      component: asyncComponent(() =>
        Promise.all([
          System.import('components/Show/reducer'),
          System.import('components/Show/sagas'),
          System.import('components/Show'),
        ])
          .then(([reducer, sagas, component]) => {
            injectReducer('show', reducer.default);
            injectSagas(sagas.default);
            return component;
          })
          .catch(errorLoading),
      ),
    },
    {
      path: '/admin',
      name: 'admin',
      component: asyncComponent(() =>
        Promise.all([
          System.import('components/Admin/reducer'),
          System.import('components/Admin/sagas'),
          System.import('components/Admin'),
        ])
          .then(([reducer, sagas, component]) => {
            injectReducer('admin', reducer.default);
            injectSagas(sagas.default);
            return component;
          })
          .catch(errorLoading),
      ),
    },
    {
      path: '/admin/programmer/ny',
      name: 'ShowAdmin',
      component: asyncComponent(() =>
        Promise.all([
          System.import('components/ShowAdmin/reducer'),
          System.import('components/ShowAdmin/sagas'),
          System.import('components/ShowAdmin'),
        ])
          .then(([ShowAdminReducer, ShowAdminSagas, ShowAdminComponent]) => {
            injectReducer('ShowAdmin', ShowAdminReducer.default);
            injectSagas(ShowAdminSagas.default);
            return ShowAdminComponent;
          })
          .catch(errorLoading),
      ),
    },
    {
      path: '/admin/episoder/ny',
      name: 'EpisodeAdmin',
      component: asyncComponent(() =>
        Promise.all([
          System.import('components/EpisodeAdmin/reducer'),
          System.import('components/Shows/reducer'),
          System.import('components/EpisodeAdmin/sagas'),
          System.import('components/Shows/sagas'),
          System.import('components/EpisodeAdmin'),
        ])
          .then(
            (
              [episodeReducer, showReducer, episodeSagas, showSagas, component],
            ) => {
              injectReducer('episodeAdmin', episodeReducer.default);
              injectReducer('shows', showReducer.default);
              injectSagas(episodeSagas.default);
              injectSagas(showSagas.default);
              return component;
            },
          )
          .catch(errorLoading),
      ),
    },
    {
      path: '/admin/post/ny',
      name: 'PostAdmin',
      component: asyncComponent(() =>
        Promise.all([
          System.import('components/PostAdmin/reducer'),
          System.import('components/PostAdmin/sagas'),
          System.import('components/PostAdmin'),
          System.import('components/Shows/reducer'),
          System.import('components/Shows/sagas'),
          System.import('components/Categories/reducer'),
          System.import('components/Categories/sagas'),
        ])
          .then(
            (
              [
                PostAdminReducer,
                PostAdminSagas,
                PostAdminComponent,
                ShowsReducer,
                ShowsSagas,
                CategoriesReducer,
                CategoriesSagas,
              ],
            ) => {
              injectReducer('postAdmin', PostAdminReducer.default);
              injectSagas(PostAdminSagas.default);
              injectReducer('shows', ShowsReducer.default);
              injectSagas(ShowsSagas.default);
              injectReducer('categories', CategoriesReducer.default);
              injectSagas(CategoriesSagas.default);
              return PostAdminComponent;
            },
          )
          .catch(errorLoading),
      ),
    },
    {
      path: '/admin/episoder/endre',
      name: 'EpisodeAdminEditor',
      component: asyncComponent(() =>
        Promise.all([
          System.import('components/EpisodeAdminEditor/reducer'),
          System.import('components/EpisodeAdmin/reducer'),
          System.import('components/Shows/reducer'),
          System.import('components/Show/reducer'),
          System.import('components/EpisodeAdminEditor/sagas'),
          System.import('components/EpisodeAdmin/sagas'),
          System.import('components/Shows/sagas'),
          System.import('components/Show/sagas'),
          System.import('components/EpisodeAdminEditor'),
        ])
          .then(
            (
              [
                episodeReducer,
                episodeAdminReducer,
                showsReducer,
                showReducer,
                episodeSagas,
                episodeAdminSagas,
                showsSagas,
                showSagas,
                component,
              ],
            ) => {
              injectReducer('episodeAdminEditor', episodeReducer.default);
              injectReducer('episodeAdmin', episodeAdminReducer.default);
              injectReducer('shows', showsReducer.default);
              injectReducer('show', showReducer.default);
              injectSagas(episodeSagas.default);
              injectSagas(episodeAdminSagas.default);
              injectSagas(showsSagas.default);
              injectSagas(showSagas.default);
              return component;
            },
          )
          .catch(errorLoading),
      ),
    },

    {
      path: '*',
      name: 'notfound',
      component: asyncComponent(() =>
        System.import('components/NotFoundPage').catch(errorLoading),
      ),
    },
  ];
}
