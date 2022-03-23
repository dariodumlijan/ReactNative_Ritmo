// @flow
import { merge, get } from 'lodash';
import { isRealDevice } from '../utils';
import { types as cmsTypes } from './cmsStore';
import type { ReduxAction, ReduxState } from '../types';

export type State = {
  showBanner: boolean,
  unlocked: boolean,
};

export const types = {
  GP_SHOW_BANNER: 'GP/SHOW_BANNER',
  GP_UNLOCK_CHORDS: 'GP/UNLOCK_CHORDS',
};

export const selectors = {
  getGlobal: (state: ReduxState): State => state.global,
  getUnlocked: (state: ReduxState): boolean => state.global.unlocked,
};

export const actions = {
  showBanner: (bool: boolean): ReduxAction => ({
    type: types.GP_SHOW_BANNER,
    payload: bool,
  }),
  unlockChords: (): ReduxAction => ({
    type: types.GP_UNLOCK_CHORDS,
  }),
};

const _unlockChords = (state, payload) => {
  const displayAds = isRealDevice
    ? get(payload, 'master.ads', true)
    : get(payload, 'master.adsStaging', true);

  return merge({}, state, { unlocked: !displayAds });
};

export const reducer = (state: State, action: ReduxAction): State => {
  switch (action.type) {
    case types.GP_SHOW_BANNER:
      return merge({}, state, { showBanner: action.payload });
    case types.GP_UNLOCK_CHORDS:
      return merge({}, state, { unlocked: true, showBanner: true });
    case cmsTypes.CMS_FETCH_APP:
    case cmsTypes.CMS_STORE_APP:
      return _unlockChords(state, action.payload);

    default:
      return state || {};
  }
};
