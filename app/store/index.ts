/* eslint-disable no-console */
import {
  concat, forEach, get, includes, isString,
} from 'lodash';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { reducer as beatsStoreReducer } from './beatsStore';
import { reducer as globalStoreReducer } from './globalStore';
import { reducer as staticStoreReducer } from './staticStore';
import ENV from '../../env.json';
import { isPromise } from '../utils';
import type { ReduxState } from '../types';

const sanitizedActions = get(ENV, 'REDUX.SANITIZED_LIST', []);
const actionsDenylist = get(ENV, 'REDUX.DENY_LIST', []);

const sanitizedPayload = 'Set REACT_APP_REDUX_SANITIZER=false';
const actionSanitizer = (action) => {
  if (!action.payload) return action;

  return includes(sanitizedActions, action.type)
    ? { ...action, payload: sanitizedPayload }
    : action;
};

const stateSanitizer = (state) => {
  if (get(ENV, 'REDUX.STATE_LOG')) console.log(state);
  if (!state) return state;

  return {
    ...state,
  };
};

function promiseMiddleware({ dispatch }) {
  return (next) => (action) => {
    if (action.payload && isPromise(action.payload)) {
      action.payload
        .then((payload) => {
          dispatch({
            type: `${action.type}_FULFILLED`,
            payload,
          });
        })
        .catch((e) => {
          console.error(
            `REDUX: ${action.type}_REJECTED: statusCode = `,
            (e && e.status) || '',
            'name = ',
            (e && e.name) || '',
            'message = ',
            (e && e.message) || '',
          );
          dispatch({
            type: `${action.type}_REJECTED`,
            payload: {
              statusCode: (e && e.status) || '',
              name: (e && e.name) || '',
              message: (e && e.message) || '',
            },
          });
        });

      return dispatch({ type: `${action.type}_PENDING` });
    }

    return next(action);
  };
}

export function chainActionsMiddleware(chainedActions) {
  return ({ dispatch }) => (next) => (action) => {
    let nextActions = chainedActions[action.type];
    if (nextActions) {
      nextActions = concat(nextActions);
      forEach(nextActions, (nextAction) => {
        if (isString(nextAction)) {
          console.debug(`REDUX: dispatched chained action: ${nextAction}`);
          dispatch({ type: nextAction });
        } else {
          console.debug(`REDUX: dispatched chained action: ${nextAction.type}`);
          dispatch(nextAction(action));
        }
      });
    }

    return next(action);
  };
}

export const configureStore = (initialState: {} | Partial<ReduxState>) => {
  const middleware = [thunk];
  middleware.push(promiseMiddleware as any);
  const sanitizers = get(ENV, 'REDUX.SANITIZER') !== false && { actionSanitizer, stateSanitizer };
  const composeEnhancers = composeWithDevTools({ ...sanitizers, actionsDenylist } as any);
  const middlewareApplier = composeEnhancers(applyMiddleware(...middleware as any) as any);

  return createStore(
    combineReducers({
      static: staticStoreReducer,
      global: globalStoreReducer,
      beats: beatsStoreReducer,
    }),
    initialState as any,
    middlewareApplier as any,
  );
};
