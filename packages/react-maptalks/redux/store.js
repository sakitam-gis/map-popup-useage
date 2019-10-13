import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxActionsPromise from 'redux-actions-promise';

import rootReducers from './reducers';

const loggerMiddleware = createLogger();

export const store = createStore(combineReducers({
  ...rootReducers,
}), applyMiddleware(
  ReduxActionsPromise,
  loggerMiddleware // neat middleware that logs actions
));
