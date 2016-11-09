// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
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
          System.import('containers/FrontPage/reducer'),
          System.import('containers/FrontPage/sagas'),
          System.import('containers/FrontPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('frontPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/om',
      name: 'about',
      getComponent(location, cb) {
        System.import('containers/About')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/programmer',
      name: 'shows',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Shows/reducer'),
          System.import('containers/Shows/sagas'),
          System.import('containers/Shows'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('shows', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/post/:slug',
      name: 'post',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Post/reducer'),
          System.import('containers/Post/sagas'),
          System.import('containers/Post'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('post', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/programmer/:slug',
      name: 'show',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Show/reducer'),
          System.import('containers/Show/sagas'),
          System.import('containers/Show'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('show', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/admin',
      name: 'admin',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Admin/reducer'),
          System.import('containers/Admin/sagas'),
          System.import('containers/Admin'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('admin', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/admin/programmer/ny',
      name: 'ShowAdmin',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/ShowAdmin/reducer'),
          System.import('containers/ShowAdmin/sagas'),
          System.import('containers/ShowAdmin'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('ShowAdmin', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/admin/episoder/ny',
      name: 'EpisodeAdmin',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/EpisodeAdmin/reducer'),
          System.import('containers/Shows/reducer'),
          System.import('containers/EpisodeAdmin/sagas'),
          System.import('containers/Shows/sagas'),
          System.import('containers/EpisodeAdmin'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([episodeReducer, showReducer, episodeSagas, showSagas, component]) => {
          injectReducer('episodeAdmin', episodeReducer.default);
          injectReducer('shows', showReducer.default);
          injectSagas(episodeSagas.default);
          injectSagas(showSagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/admin/post/ny',
      name: 'PostAdmin',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/PostAdmin/reducer'),
          System.import('containers/PostAdmin/sagas'),
          System.import('containers/PostAdmin'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('postAdmin', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/admin/episoder/endre',
      name: 'episodeAdminPicker',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/EpisodeAdminPicker/reducer'),
          System.import('containers/EpisodeAdminPicker/sagas'),
          System.import('containers/EpisodeAdminPicker'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('episodeAdminPicker', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
