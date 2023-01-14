import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import promiseMiddleware from '../promiseMiddleware';
import logger from 'redux-logger';

const DEVELOPMENT_ENV = 'development';

const middlewareBuilder = () => {
  let middleware = {};
  let universalMiddleware = [thunk, promiseMiddleware];

  if (process.env.NODE_ENV === DEVELOPMENT_ENV) {
    universalMiddleware.push(logger);
  }

  let allComposeElements = [];

  middleware = applyMiddleware(...universalMiddleware);
  allComposeElements = [middleware];

  return allComposeElements;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const finalCreateStore = composeEnhancers(...middlewareBuilder())(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
