// @flow
import { merge } from 'lodash';
import * as API from '../api';
import { PRODUCTION_QUERY, STAGING_QUERY } from '../api/cms.querys';
import { isRealDevice, storeDataToLocal } from '../utils';
import { appKeys, localStorageKeys } from '../tokens';
import type { ReduxAction, ReduxState } from '../types';

const MASTER_QUERY = isRealDevice ? PRODUCTION_QUERY : STAGING_QUERY;

export type State = {
  timestamps: Object,
  master: Object,
  announcement: Object,
};

export const types = {
  CMS_CHECK_TIMESTAMPS: 'CMS/CMS_CHECK_TIMESTAMPS',
  CMS_FETCH_APP: 'CMS/FETCH_APP',
  CMS_STORE_APP: 'CMS/STORE_APP',
};

export const selectors = {
  getTimestamps: (state: ReduxState): Object => state.cms.timestamps,
  getCMS: (state: ReduxState): State => state.cms,
};

export const actions = {
  checkTimestamps: (): ReduxAction => ({
    type: types.CMS_CHECK_TIMESTAMPS,
    // $FlowFixMe
    payload: {
      online: API.fetchCMSTimestamps(),
      ...API.fetchLocalTimestamps(),
    },
  }),
  fetchCMS: (timestamps: Object): ReduxAction => ({
    type: types.CMS_FETCH_APP,
    payload: { data: API.cmsFetch(MASTER_QUERY), timestamps },
  }),
  storeLocalCMS: (data: Object): ReduxAction => ({
    type: types.CMS_STORE_APP,
    payload: data,
  }),
};

const _storeCMS = (state: State, payload: Object, local: boolean): State => {
  const newState = {};
  if (local) {
    return merge(newState, state, payload);
  }

  merge(newState, state, {
    master: payload.data.appCollection.items[0],
    announcement: payload.data.announcementCollection.items[0],
  });

  const storeState = {
    master: payload.data.appCollection.items[0],
  };

  storeDataToLocal(localStorageKeys.contentTimestamps, JSON.stringify(payload.timestamps));
  storeDataToLocal(localStorageKeys.appContent, JSON.stringify(storeState));

  return newState;
};

const _storeTimestamps = (state: State, payload: Object): State => {
  const newState = {};
  if (!payload.local) {
    merge(newState, state, {
      timestamps: {
        local: appKeys.noLocalData,
        online: payload.online,
      },
    });

    return newState;
  }

  merge(newState, state, { timestamps: payload });

  return newState;
};

export const reducer = (state: State, action: ReduxAction): State => {
  switch (action.type) {
    case types.CMS_CHECK_TIMESTAMPS:
      return _storeTimestamps(state, action.payload);
    case types.CMS_FETCH_APP:
      return _storeCMS(state, action.payload, false);
    case types.CMS_STORE_APP:
      return _storeCMS(state, action.payload, true);

    default:
      return state || {};
  }
};
