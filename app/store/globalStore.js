// @flow
import {
  merge, get, keys, reject, omit, uniq, isNil,
} from 'lodash';
import * as API from '../api';
import * as MIDI from '../midi';
import { types as cmsTypes } from './cmsStore';
import { types as beatTypes } from './beatsStore';
import { t } from '../locales';
import { deviceInfo, isSampleUnlocked } from '../utils';
import * as LocalStorage from '../utils/localStorage';
import { getSamples, getTimeSignatures, getUnlockedSamples } from '../utils/lists';
import type { Beats } from '../sound/beats';
import type { BuildMidi, BuildPromise } from '../midi';
import type { Sample } from '../utils/lists';
import type { InitialCMSResponse } from '../api';
import type {
  FetchResponse,
  SaveRewardsResponse,
  UnlockProFeaturesResponse,
  WriteResponse,
} from '../utils/localStorage';
import type { ReduxAction, ReduxActionWithPayload, ReduxState } from '../types';

export type RewardedAt = {
  samples?: number|null,
  pro?: number|null,
};

export type TimeSignaturePayload = {
  key: 'all'|'hihat'|'snare'|'kick',
  value: string,
};

export type Sliders = {
  hihat: number,
  snare: number,
  kick: number,
};

export type TimeSignature = {
  hihat: string,
  snare: string,
  kick: string,
};

export type UI = {
  fileUri: string,
  isPlaying: boolean,
  isRecording: boolean,
  navigationOpen: boolean,
  showAds: boolean,
  personalisedAds: boolean,
  useBPM: number,
  useSample: Sample,
  useTimeSig: TimeSignature,
  selectedReward: Sample|null,
};
export type Preset = {
  beat: Beats,
  sliders: Sliders,
  useBPM: number,
  useTimeSig: TimeSignature,
};

export type State = {
  codepushData: ?{
    environment: 'Production'|'Staging',
    deploymentKey: string,
    ...Object,
  },
  presets: {
    [string]: Preset|null,
  }|null,
  sliders: Sliders,
  ui: UI,
  unlockedSamples: string[],
  unlockedPro: boolean,
  rewardedAt: ?RewardedAt,
};

export const types = {
  GB_SHOW_PERSONALISED_ADS: 'GB/SHOW_PERSONALISED_ADS',
  GB_SHOW_ADS: 'GB/SHOW_ADS',
  GB_TOGGLE_NAVIGATION: 'GB/TOGGLE_NAVIGATION',
  GB_UPDATE_BPM: 'GB/UPDATE_BPM',
  GB_UPDATE_TIME_SIG: 'GB/UPDATE_TIME_SIG',
  GB_UPDATE_SELECTED_SAMPLE: 'GB/UPDATE_SELECTED_SAMPLE',
  GB_UPDATE_SELECTED_REWARD: 'GB/UPDATE_SELECTED_REWARD',

  GB_GET_DEPLOYMENT_DATA: 'GB/GET_DEPLOYMENT_DATA',
  GB_GET_DEPLOYMENT_DATA_PENDING: 'GB/GET_DEPLOYMENT_DATA_PENDING',
  GB_GET_DEPLOYMENT_DATA_REJECTED: 'GB/GET_DEPLOYMENT_DATA_REJECTED',
  GB_GET_DEPLOYMENT_DATA_FULFILLED: 'GB/GET_DEPLOYMENT_DATA_FULFILLED',

  GB_FETCH_PRESET_AND_SAMPLES: 'GB/FETCH_PRESET_AND_SAMPLES',
  GB_FETCH_PRESET_AND_SAMPLES_PENDING: 'GB/FETCH_PRESET_AND_SAMPLES_PENDING',
  GB_FETCH_PRESET_AND_SAMPLES_REJECTED: 'GB/FETCH_PRESET_AND_SAMPLES_REJECTED',
  GB_FETCH_PRESET_AND_SAMPLES_FULFILLED: 'GB/FETCH_PRESET_AND_SAMPLES_FULFILLED',

  GB_WRITE_PRESET: 'GB/WRITE_PRESET',
  GB_WRITE_PRESET_PENDING: 'GB/WRITE_PRESET_PENDING',
  GB_WRITE_PRESET_REJECTED: 'GB/WRITE_PRESET_REJECTED',
  GB_WRITE_PRESET_FULFILLED: 'GB/WRITE_PRESET_FULFILLED',

  GB_CLEAR_PRESET: 'GB/CLEAR_PRESET',
  GB_CLEAR_PRESET_PENDING: 'GB/CLEAR_PRESET_PENDING',
  GB_CLEAR_PRESET_REJECTED: 'GB/CLEAR_PRESET_REJECTED',
  GB_CLEAR_PRESET_FULFILLED: 'GB/CLEAR_PRESET_FULFILLED',

  GB_LOAD_PRESET: 'GB/LOAD_PRESET',

  GB_UNLOCK_PRO_FEATURES: 'GB/UNLOCK_PRO_FEATURES',
  GB_UNLOCK_PRO_FEATURES_PENDING: 'GB/UNLOCK_PRO_FEATURES_PENDING',
  GB_UNLOCK_PRO_FEATURES_REJECTED: 'GB/UNLOCK_PRO_FEATURES_REJECTED',
  GB_UNLOCK_PRO_FEATURES_FULFILLED: 'GB/UNLOCK_PRO_FEATURES_FULFILLED',

  GB_LOCK_PRO_FEATURES: 'GB/LOCK_PRO_FEATURES',
  GB_LOCK_PRO_FEATURES_PENDING: 'GB/LOCK_PRO_FEATURES_PENDING',
  GB_LOCK_PRO_FEATURES_REJECTED: 'GB/LOCK_PRO_FEATURES_REJECTED',
  GB_LOCK_PRO_FEATURES_FULFILLED: 'GB/LOCK_PRO_FEATURES_FULFILLED',

  GB_UNLOCK_REWARD: 'GB/UNLOCK_REWARD',

  GB_REFRESH_REWARDS: 'GB/REFRESH_REWARDS',
  GB_REFRESH_REWARDS_PENDING: 'GB/REFRESH_REWARDS_PENDING',
  GB_REFRESH_REWARDS_REJECTED: 'GB/REFRESH_REWARDS_REJECTED',
  GB_REFRESH_REWARDS_FULFILLED: 'GB/REFRESH_REWARDS_FULFILLED',

  GB_LOCK_REWARDS: 'GB/LOCK_REWARDS',
  GB_LOCK_REWARDS_PENDING: 'GB/LOCK_REWARDS_PENDING',
  GB_LOCK_REWARDS_REJECTED: 'GB/LOCK_REWARDS_REJECTED',
  GB_LOCK_REWARDS_FULFILLED: 'GB/LOCK_REWARDS_FULFILLED',

  GB_EXPORT_MIDI: 'GB/EXPORT_MIDI',
  GB_EXPORT_MIDI_PENDING: 'GB/EXPORT_MIDI_PENDING',
  GB_EXPORT_MIDI_REJECTED: 'GB/EXPORT_MIDI_REJECTED',
  GB_EXPORT_MIDI_FULFILLED: 'GB/EXPORT_MIDI_FULFILLED',

  GB_DELETE_MIDI_FILE: 'GB/DELETE_MIDI_FILE',
};

export const selectors = {
  getCodepushEnvironment: (state: ReduxState): 'Production'|'Staging' => get(state.global.codepushData, 'environment', 'Production'),
  getGlobal: (state: ReduxState): State => state.global,
  getUI: (state: ReduxState): UI => state.global.ui,
  getUnlockedSamples: (state: ReduxState): string[] => state.global.unlockedSamples,
  getLockedSamples: (state: ReduxState): Sample[] => {
    const samples = getSamples();

    return reject(samples, (sample: Sample) => isSampleUnlocked(state.global.unlockedSamples, sample));
  },
  hasUnlockedSample: (state: ReduxState): boolean => {
    const defaultUnlockedSamples = getUnlockedSamples();

    return state.global.unlockedSamples.length > defaultUnlockedSamples.length;
  },
};

export const actions = {
  getDeploymentData: (): ReduxAction => ({
    type: types.GB_GET_DEPLOYMENT_DATA,
    payload: API.getDeploymentData(),
  }),
  showPersonalisedAds: (bool: boolean): ReduxAction => ({
    type: types.GB_SHOW_PERSONALISED_ADS,
    payload: { personalisedAds: bool },
  }),
  showAds: (showAds: boolean): ReduxAction => ({
    type: types.GB_SHOW_ADS,
    payload: { showAds },
  }),
  unlockReward: (sampleLabel?: string): ReduxAction => ({
    type: types.GB_UNLOCK_REWARD,
    payload: sampleLabel,
  }),
  unlockProFeatures: (): ReduxAction => ({
    type: types.GB_UNLOCK_PRO_FEATURES,
    payload: LocalStorage.unlockProFeatures(),
  }),
  refreshRewards: (): ReduxAction => ({
    type: types.GB_REFRESH_REWARDS,
    payload: LocalStorage.saveRewards(Date.now()),
  }),
  lockRewards: (): ReduxAction => ({
    type: types.GB_LOCK_REWARDS,
    payload: LocalStorage.clearRewards(),
  }),
  lockProFeatures: (): ReduxAction => ({
    type: types.GB_LOCK_PRO_FEATURES,
    payload: LocalStorage.lockProFeatures(),
  }),
  toggleNavigation: (bool: boolean): ReduxAction => ({
    type: types.GB_TOGGLE_NAVIGATION,
    payload: { navigationOpen: bool },
  }),
  exportMIDI: (buildMIDI: BuildMidi): ReduxAction => ({
    type: types.GB_EXPORT_MIDI,
    payload: MIDI.exportMIDI(buildMIDI),
  }),
  deleteMIDIFile: (fileUri: string): ReduxAction => ({
    type: types.GB_DELETE_MIDI_FILE,
    payload: MIDI.deleteMIDIFile(fileUri),
  }),
  fetchPresetAndSamples: (): ReduxAction => ({
    type: types.GB_FETCH_PRESET_AND_SAMPLES,
    payload: LocalStorage.fetchPresetAndSamples(),
  }),
  loadPreset: (preset: Preset): ReduxAction => ({
    type: types.GB_LOAD_PRESET,
    payload: preset,
  }),
  writePreset: (key: string, preset: Preset): ReduxAction => ({
    type: types.GB_WRITE_PRESET,
    payload: LocalStorage.writePreset(key, preset),
  }),
  clearPreset: (key: string): ReduxAction => ({
    type: types.GB_CLEAR_PRESET,
    payload: LocalStorage.clearPreset(key),
  }),
  updateBPM: (bpm: number): ReduxAction => ({
    type: types.GB_UPDATE_BPM,
    payload: { useBPM: bpm },
  }),
  updateTimeSig: (payload: TimeSignaturePayload): ReduxAction => ({
    type: types.GB_UPDATE_TIME_SIG,
    payload,
  }),
  updateSelectedSample: (sample: Sample): ReduxAction => ({
    type: types.GB_UPDATE_SELECTED_SAMPLE,
    payload: { useSample: sample },
  }),
  updateSelectedReward: (sample: Sample): ReduxAction => ({
    type: types.GB_UPDATE_SELECTED_REWARD,
    payload: { selectedReward: sample },
  }),
};

const unlockReward = (state: State, sampleLabel?: string): State => {
  const samples = getSamples();
  const reward = sampleLabel || state.ui.selectedReward?.label;
  const newUnlockedSamples = uniq(reward ? [...state.unlockedSamples, reward] : [...state.unlockedSamples]);
  const lockedSamples = reject(samples, (sample: Sample) => isSampleUnlocked(newUnlockedSamples, sample));
  const rewardedAt = Date.now();
  LocalStorage.saveRewards(rewardedAt, newUnlockedSamples);

  return {
    ...state,
    ui: {
      ...state.ui,
      selectedReward: get(lockedSamples, [0], null),
    },
    unlockedSamples: newUnlockedSamples,
    rewardedAt: {
      ...state.rewardedAt,
      samples: rewardedAt,
    },
  };
};

const refreshRewards = (state: State, payload: SaveRewardsResponse): State => ({
  ...state,
  rewardedAt: {
    ...state.rewardedAt,
    samples: payload.rewardedAt,
  },
});

const lockRewards = (state: State): State => {
  const samples = getSamples();
  const unlockedSamples = getUnlockedSamples();
  const lockedSamples = reject(samples, (sample: Sample) => isSampleUnlocked(unlockedSamples, sample));

  return {
    ...state,
    unlockedSamples,
    rewardedAt: {
      ...state.rewardedAt,
      samples: null,
    },
    ui: {
      ...state.ui,
      selectedReward: get(lockedSamples, [0], null),
    },
  };
};

const lockProFeatures = (state: State): State => ({
  ...state,
  unlockedPro: false,
  rewardedAt: {
    ...state.rewardedAt,
    pro: null,
  },
});

const checkUnlockedRewards = (state: State, payload: InitialCMSResponse): State => {
  const samples = getSamples();
  const displayAds = deviceInfo.isRealDevice
    ? get(payload.data, 'master.ads', true)
    : get(payload.data, 'master.adsStaging', true);

  if (!displayAds) return { ...state, unlockedSamples: keys(samples) };

  return state;
};

const exportMIDI = (state: State, payload: BuildPromise): State => merge({}, state, { ui: { fileUri: payload.fileUri } });

const rotateBeat = (
  state: State,
  payload: {
    degree: number,
    key: string,
  },
): State => merge({}, state, { sliders: { [payload.key]: payload.degree } });

const resetBeat = (state: State): State => {
  const samples = getSamples();
  const timeSignatures = getTimeSignatures(t);

  return merge({}, state, {
    ui: {
      isPlaying: false,
      isRecording: false,
      useBPM: 100,
      useTimeSig: {
        hihat: timeSignatures[0].value,
        snare: timeSignatures[0].value,
        kick: timeSignatures[0].value,
      },
      useSample: samples[0],
    },
    sliders: {
      hihat: 0,
      snare: 0,
      kick: 0,
    },
  });
};

const fetchPresetAndSamples = (state: State, payload: FetchResponse) => {
  const samples = getSamples();
  const newUnlockedSamples = uniq([...state.unlockedSamples, ...payload.unlockedSamples]);
  const lockedSamples = reject(samples, (sample: Sample) => isSampleUnlocked(newUnlockedSamples, sample));

  return {
    ...state,
    presets: payload.presets,
    unlockedSamples: newUnlockedSamples,
    unlockedPro: !isNil(payload.rewardedAt.pro),
    rewardedAt: payload.rewardedAt,
    ui: {
      ...state.ui,
      selectedReward: get(lockedSamples, [0], null),
    },
  };
};

const loadPreset = (state: State, preset: Preset): State => ({
  ...state,
  ui: {
    ...state.ui,
    isPlaying: false,
    isRecording: false,
    useBPM: preset.useBPM,
    useTimeSig: preset.useTimeSig,
  },
  sliders: preset.sliders,
});

const writePreset = (state: State, payload: WriteResponse): State => (
  {
    ...state,
    // $FlowFixMe
    presets: {
      ...state.presets,
      [payload.key]: payload.preset,
    },
  });

const setTimeSig = (state: State, payload: TimeSignaturePayload): State => {
  if (payload.key === 'all') {
    return {
      ...state,
      ...{
        ui: {
          ...state.ui,
          useTimeSig: {
            hihat: payload.value,
            snare: payload.value,
            kick: payload.value,
          },
        },
      },
    };
  }

  return {
    ...state,
    ...{
      ui: {
        ...state.ui,
        // $FlowFixMe
        useTimeSig: {
          ...state.ui.useTimeSig,
          // $FlowFixMe
          [payload.key]: payload.value,
        },
      },
    },
  };
};

const unlockProFeatures = (state: State, payload: UnlockProFeaturesResponse): State => ({
  ...state,
  unlockedPro: true,
  rewardedAt: {
    ...state.rewardedAt,
    pro: payload,
  },
});

export const reducer = (state: State, action: ReduxActionWithPayload): State => {
  switch (action.type) {
    case cmsTypes.CMS_FETCH_APP_FULFILLED:
      return checkUnlockedRewards(state, action.payload);

    case types.GB_FETCH_PRESET_AND_SAMPLES_FULFILLED:
      // $FlowFixMe
      return fetchPresetAndSamples(state, action.payload);

    case types.GB_LOAD_PRESET:
      return loadPreset(state, action.payload);

    case types.GB_WRITE_PRESET_FULFILLED:
      return writePreset(state, action.payload);

    case types.GB_CLEAR_PRESET_FULFILLED:
      return merge({}, state, {
        presets: {
          [action.payload]: null,
        },
      });

    case types.GB_UNLOCK_REWARD:
      return unlockReward(state, action.payload);

    case types.GB_UNLOCK_PRO_FEATURES_FULFILLED:
      return unlockProFeatures(state, action.payload);

    case types.GB_REFRESH_REWARDS_FULFILLED:
      return refreshRewards(state, action.payload);

    case types.GB_LOCK_REWARDS_FULFILLED:
      return lockRewards(state);

    case types.GB_LOCK_PRO_FEATURES_FULFILLED:
      return lockProFeatures(state);

    case beatTypes.BT_ROTATE_BEAT:
      return rotateBeat(state, action.payload);

    case beatTypes.BT_RESET_BEAT:
      return resetBeat(state);

    case beatTypes.BT_PLAY_BEAT:
      return merge({}, state, { ui: { isPlaying: true } });

    case beatTypes.BT_PAUSE_BEAT:
      return merge({}, state, { ui: { isPlaying: false } });

    case types.GB_EXPORT_MIDI_FULFILLED:
    case types.GB_EXPORT_MIDI_REJECTED:
      return exportMIDI(state, action.payload);

    case types.GB_DELETE_MIDI_FILE:
      return omit(state, 'ui.fileUri');

    case types.GB_UPDATE_TIME_SIG:
      return setTimeSig(state, action.payload);

    case types.GB_SHOW_PERSONALISED_ADS:
    case types.GB_SHOW_ADS:
    case types.GB_TOGGLE_NAVIGATION:
    case types.GB_UPDATE_BPM:
    case types.GB_UPDATE_SELECTED_SAMPLE:
    case types.GB_UPDATE_SELECTED_REWARD:
      return merge({}, state, { ui: action.payload });

    case types.GB_GET_DEPLOYMENT_DATA_FULFILLED:
      return merge({}, state, { codepushData: action.payload });

    default:
      return state || {};
  }
};
