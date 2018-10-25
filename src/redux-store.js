import {applyMiddleware, createStore, combineReducers, compose} from 'redux';
import { createLogger } from 'redux-logger';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

// reducers
import meteoriteReducer from './reducers/meteorites.js';
import detailsReducer from './reducers/details.js';
export const history = createBrowserHistory();
const rootReducer = combineReducers({
  details: detailsReducer,
  meteorites: meteoriteReducer,
});

const store = createStore(
  connectRouter(history)(rootReducer), // new root reducer with router state
  compose(
    applyMiddleware(
      thunk, // allows you to write action creators that return a function instead of an action
      routerMiddleware(history), // for dispatching history actions
      createLogger({ collapsed: true }),
    ),
  ),
);
export default store;
