// @flow
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { concat, forEach, get, isString } from 'lodash';
import { reducer as cmsStoreReducer } from './cmsStore';
import { reducer as globalStoreReducer } from './globalStore';
import { isPromise } from '../utils';

import type { ReduxState, ReduxMiddlewareArgument, ActionChains } from '../types';

const actionsDenylist = () => get(process.env, 'REACT_APP_REDUX_ACTIONS_BLACKLIST', '').split(',');

function promiseMiddleware({ dispatch }: ReduxMiddlewareArgument): any {
  return (next) => (action) => {
    if (action.payload && isPromise(action.payload)) {
      action.payload
        .then((payload) => {
          dispatch({ type: action.type + '_FULFILLED', payload });
        })
        .catch((e) => {
          const message = get(e, 'message') || get(e, 'errorMessage');
          const statusCode = get(e, 'code') || get(e, 'errorCode') || get(e, 'statusCode');
          dispatch({
            type: `${action.type}_REJECTED`,
            error: true,
            payload: {
              message,
              statusCode,
            },
          });
        });

      return dispatch({ type: `${action.type}_PENDING` });
    }

    return next(action);
  };
}

export function chainActionsMiddleware(chainedActions: ActionChains): any {
  return ({ dispatch }: ReduxMiddlewareArgument) =>
    (next) =>
    (action) => {
      let nextActions = chainedActions[action.type];
      if (nextActions) {
        nextActions = concat(nextActions);
        forEach(nextActions, (nextAction) => {
          if (isString(nextAction)) {
            dispatch({ type: nextAction });
          } else {
            dispatch(nextAction(action));
          }
        });
      }

      return next(action);
    };
}

function dispatchRecorder(dispatchedActions: ?Array<string>): any {
  return () => (next) => (action) => {
    if (dispatchedActions && !actionsDenylist().includes(action.type)) {
      dispatchedActions.push(action.type);
    }

    return next(action);
  };
}

// $FlowFixMe
export const configureStore = (
  initialState: {} | ReduxState,
  actionChains: ?ActionChains,
  dispatchedActions: ?Array<string>
): any => {
  const middleware = [thunk];
  if (dispatchedActions) {
    middleware.push(dispatchRecorder(dispatchedActions));
  }
  middleware.push(promiseMiddleware);
  if (actionChains) {
    middleware.push(chainActionsMiddleware(actionChains));
  }
  const composeEnhancers = composeWithDevTools({
    actionsDenylist: actionsDenylist(),
  });
  const middlewareApplier = composeEnhancers(applyMiddleware(...middleware));

  return createStore(
    combineReducers({
      cms: cmsStoreReducer,
      global: globalStoreReducer,
    }),
    initialState,
    middlewareApplier
  );
};
