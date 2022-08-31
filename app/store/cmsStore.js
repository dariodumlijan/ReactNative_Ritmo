// @flow
import { get, merge } from 'lodash';
import * as API from '../api';
import { deviceInfo } from '../utils';
import { setItem } from '../utils/hooks';
import { admob, localStorageKeys } from '../tokens';
import type { InitialCMSResponse } from '../api';
import type { ReduxAction, ReduxActionWithPayload, ReduxState } from '../types';

export type State = {
  timestamps: Object,
  master: Object,
  announcement?: Object,
  isLocal: boolean,
};

export const types = {
  CMS_FETCH_APP: 'CMS/FETCH_APP',
  CMS_FETCH_APP_PENDING: 'CMS/FETCH_APP_PENDING',
  CMS_FETCH_APP_REJECTED: 'CMS/FETCH_APP_REJECTED',
  CMS_FETCH_APP_FULFILLED: 'CMS/FETCH_APP_FULFILLED',
};

type AdmobIds = {
  banner: string|null,
  rewarded: string|null,
}

export const getAdmobIds = (adIds: ?{
  banner: {
    android: string,
    ios: string,
  },
  rewarded: {
    android: string,
    ios: string,
  }
}): AdmobIds => {
  let adId = null;

  const getBannerID = (): string|null => {
    if (!adIds) return null;

    if (deviceInfo.isApple) {
      adId = deviceInfo.isRealDevice ? adIds.banner.ios : admob.banner.ios_test;
    } else {
      adId = deviceInfo.isRealDevice ? adIds.banner.android : admob.banner.android_test;
    }

    return adId;
  };

  const getRewardedID = (): string|null => {
    if (!adIds) return null;

    if (deviceInfo.isApple) {
      adId = deviceInfo.isRealDevice ? adIds.rewarded.ios : admob.rewarded.ios_test;
    } else {
      adId = deviceInfo.isRealDevice ? adIds.rewarded.android : admob.rewarded.android_test;
    }

    return adId;
  };

  return {
    banner: getBannerID(),
    rewarded: getRewardedID(),
  };
};

export const selectors = {
  getCMS: (state: ReduxState): State => state.cms,
  getTimestamps: (state: ReduxState): Object => state.cms.timestamps,
  getAdmobIds: (state: ReduxState): AdmobIds => getAdmobIds(get(state.cms, 'master.adIds')),
};

export const actions = {
  fetchCMS: (deploymentEnvironment: 'Production'|'Staging'): ReduxAction => ({
    type: types.CMS_FETCH_APP,
    payload: API.fetchCMS(deploymentEnvironment),
  }),
};

const buildStore = (state: State, payload: InitialCMSResponse): State => {
  const newState = {};

  if (payload.isLocal) {
    return merge(newState, state, {
      ...payload.data,
      isLocal: payload.isLocal,
    });
  }

  merge(newState, state, {
    master: get(payload.data, 'appCollection.items[0]', null),
    announcement: get(payload.data, 'announcementCollection.items[0]', null),
    isLocal: payload.isLocal,
  });

  const storeState = {
    master: get(payload.data, 'appCollection.items[0]', null),
  };

  setItem(
    localStorageKeys.contentTimestamps,
    JSON.stringify(payload.timestamps.online),
  );
  setItem(localStorageKeys.appContent, JSON.stringify(storeState));

  return newState;
};

export const reducer = (state: State, action: ReduxActionWithPayload): State => {
  switch (action.type) {
    case types.CMS_FETCH_APP_FULFILLED:
      return buildStore(state, action.payload);

    default:
      return state || {};
  }
};
