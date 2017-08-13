// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';

const errorLoading = err => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = cb => componentModule => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: '/',
      name: 'frontPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('components/FrontPage/reducer'),
          System.import('components/FrontPage/sagas'),
          System.import('components/FrontPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('frontPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/om',
      name: 'about',
      getComponent(location, cb) {
        System.import('components/About')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
    {
      path: '/programmer',
      name: 'shows',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('components/Shows/reducer'),
          System.import('components/Shows/sagas'),
          System.import('components/Shows'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('shows', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/post/:slug',
      name: 'post',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('components/Post/reducer'),
          System.import('components/Post/sagas'),
          System.import('components/Post'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('post', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/programmer/:slug',
      name: 'show',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('components/Show/reducer'),
          System.import('components/Show/sagas'),
          System.import('components/Show'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('show', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/admin',
      name: 'admin',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('components/Admin/reducer'),
          System.import('components/Admin/sagas'),
          System.import('components/Admin'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('admin', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/admin/programmer/ny',
      name: 'ShowAdmin',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('components/ShowAdmin/reducer'),
          System.import('components/ShowAdmin/sagas'),
          System.import('components/ShowAdmin'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(
          ([ShowAdminReducer, ShowAdminSagas, ShowAdminComponent]) => {
            injectReducer('ShowAdmin', ShowAdminReducer.default);
            injectSagas(ShowAdminSagas.default);
            renderRoute(ShowAdminComponent);
          },
        );

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/admin/episoder/ny',
      name: 'EpisodeAdmin',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('components/EpisodeAdmin/reducer'),
          System.import('components/Shows/reducer'),
          System.import('components/EpisodeAdmin/sagas'),
          System.import('components/Shows/sagas'),
          System.import('components/EpisodeAdmin'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(
          (
            [episodeReducer, showReducer, episodeSagas, showSagas, component],
          ) => {
            injectReducer('episodeAdmin', episodeReducer.default);
            injectReducer('shows', showReducer.default);
            injectSagas(episodeSagas.default);
            injectSagas(showSagas.default);
            renderRoute(component);
          },
        );

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/admin/post/ny',
      name: 'PostAdmin',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('components/PostAdmin/reducer'),
          System.import('components/PostAdmin/sagas'),
          System.import('components/PostAdmin'),
          System.import('components/Shows/reducer'),
          System.import('components/Shows/sagas'),
          System.import('components/Categories/reducer'),
          System.import('components/Categories/sagas'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(
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
            renderRoute(PostAdminComponent);
          },
        );

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/admin/episoder/endre',
      name: 'EpisodeAdminEditor',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('components/EpisodeAdminEditor/reducer'),
          System.import('components/EpisodeAdmin/reducer'),
          System.import('components/Shows/reducer'),
          System.import('components/Show/reducer'),
          System.import('components/EpisodeAdminEditor/sagas'),
          System.import('components/EpisodeAdmin/sagas'),
          System.import('components/Shows/sagas'),
          System.import('components/Show/sagas'),
          System.import('components/EpisodeAdminEditor'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(
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
            renderRoute(component);
          },
        );

        importModules.catch(errorLoading);
      },
    },
    {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('components/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
