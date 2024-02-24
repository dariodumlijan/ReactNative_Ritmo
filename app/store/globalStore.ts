import {
  get, isNil, map, merge, omit, reject, uniq,
} from 'lodash';
import { types as beatTypes } from './beatsStore';
import * as API from '../api';
import { t } from '../locales';
import * as MIDI from '../midi';
import { admob, config } from '../tokens';
import { deviceInfo, isSampleUnlocked } from '../utils';
import { getSamples, getTimeSignatures, getUnlockedSamples } from '../utils/lists';
import * as LocalStorage from '../utils/localStorage';
import type { BuildMidi, BuildPromise } from '../midi';
import type { Beats } from '../sound/beats';
import type { ReduxActionWithPayload, ReduxState } from '../types';
import type { Sample, TimeSig } from '../utils/lists';
import type {
  FetchResponse,
  SaveRewardsResponse,
  UnlockProFeaturesResponse,
  WriteResponse,
} from '../utils/localStorage';

export type RewardedAt = {
  samples?: number | null,
  pro?: number | null,
};

export type TimeSignaturePayload = {
  key: 'all' | 'hihat' | 'snare' | 'kick',
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
  fileUri?: string,
  isPlaying: boolean,
  isRecording: boolean,
  navigationOpen?: boolean,
  personalisedAds?: boolean,
  selectedReward?: Sample | null,
  showAds: boolean,
  useBPM: number,
  useSample: Sample,
  useTimeSig: TimeSignature,
};
export type Preset = {
  beat: Beats,
  sliders: Sliders,
  useBPM: number,
  useTimeSig: TimeSignature,
};

type AdmobIds = {
  banner: string,
  rewarded: string,
};

export type State = {
  codepushData?: Object & {
    environment: 'Production' | 'Staging',
    deploymentKey: string,
  },
  developerMode: boolean,
  presets?: {
    [key: string]: Preset | null,
  },
  sliders: Sliders,
  ui: UI,
  unlockedSamples: string[],
  unlockedPro?: boolean,
  rewardedAt?: RewardedAt,
};

export const types = {
  GB_SHOW_PERSONALISED_ADS: 'GB/SHOW_PERSONALISED_ADS',
  GB_SHOW_ADS: 'GB/SHOW_ADS',
  GB_TOGGLE_NAVIGATION: 'GB/TOGGLE_NAVIGATION',
  GB_TOGGLE_DEVELOPER_MODE: 'GB/TOGGLE_DEVELOPER_MODE',
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

export const getAdmobIds = (state: ReduxState): AdmobIds => {
  const showTestAds = state.global.developerMode;

  const getBannerID = (): string => {
    if (deviceInfo.isApple) {
      return showTestAds ? admob.banner.ios_test : admob.banner.ios;
    }

    return showTestAds ? admob.banner.android_test : admob.banner.android;
  };

  const getRewardedID = (): string => {
    if (deviceInfo.isApple) {
      return showTestAds ? admob.rewarded.ios_test : admob.rewarded.ios;
    }

    return showTestAds ? admob.rewarded.android_test : admob.rewarded.android;
  };

  return {
    banner: getBannerID(),
    rewarded: getRewardedID(),
  };
};

export const selectors = {
  getCodepushEnvironment: (state: ReduxState): 'Production' | 'Staging' => get(state.global.codepushData, 'environment', 'Production'),
  getAdmobIds: (state: ReduxState): AdmobIds => getAdmobIds(state),
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
  getDeploymentData: () => ({
    type: types.GB_GET_DEPLOYMENT_DATA,
    payload: API.getDeploymentData(),
  }),
  showPersonalisedAds: (bool: boolean) => ({
    type: types.GB_SHOW_PERSONALISED_ADS,
    payload: { personalisedAds: bool },
  }),
  showAds: (showAds: boolean) => ({
    type: types.GB_SHOW_ADS,
    payload: { showAds },
  }),
  unlockReward: (sampleLabel?: string) => ({
    type: types.GB_UNLOCK_REWARD,
    payload: sampleLabel,
  }),
  unlockProFeatures: () => ({
    type: types.GB_UNLOCK_PRO_FEATURES,
    payload: LocalStorage.unlockProFeatures(),
  }),
  refreshRewards: () => ({
    type: types.GB_REFRESH_REWARDS,
    payload: LocalStorage.saveRewards(Date.now()),
  }),
  lockRewards: () => ({
    type: types.GB_LOCK_REWARDS,
    payload: LocalStorage.clearRewards(),
  }),
  lockProFeatures: () => ({
    type: types.GB_LOCK_PRO_FEATURES,
    payload: LocalStorage.lockProFeatures(),
  }),
  toggleNavigation: (bool: boolean) => ({
    type: types.GB_TOGGLE_NAVIGATION,
    payload: { navigationOpen: bool },
  }),
  toggleDeveloperMode: (bool: boolean) => ({
    type: types.GB_TOGGLE_DEVELOPER_MODE,
    payload: bool,
  }),
  exportMIDI: (buildMIDI: BuildMidi) => ({
    type: types.GB_EXPORT_MIDI,
    payload: MIDI.exportMIDI(buildMIDI),
  }),
  deleteMIDIFile: (fileUri: string) => ({
    type: types.GB_DELETE_MIDI_FILE,
    payload: MIDI.deleteMIDIFile(fileUri),
  }),
  fetchPresetAndSamples: () => ({
    type: types.GB_FETCH_PRESET_AND_SAMPLES,
    payload: LocalStorage.fetchPresetAndSamples(),
  }),
  loadPreset: (preset: Preset) => ({
    type: types.GB_LOAD_PRESET,
    payload: preset,
  }),
  writePreset: (key: string, preset: Preset) => ({
    type: types.GB_WRITE_PRESET,
    payload: LocalStorage.writePreset(key, preset),
  }),
  clearPreset: (key: string) => ({
    type: types.GB_CLEAR_PRESET,
    payload: LocalStorage.clearPreset(key),
  }),
  updateBPM: (bpm: number) => ({
    type: types.GB_UPDATE_BPM,
    payload: { useBPM: bpm },
  }),
  updateTimeSig: (payload: TimeSignaturePayload) => ({
    type: types.GB_UPDATE_TIME_SIG,
    payload,
  }),
  updateSelectedSample: (sample: Sample) => ({
    type: types.GB_UPDATE_SELECTED_SAMPLE,
    payload: { useSample: sample },
  }),
  updateSelectedReward: (sample: Sample) => ({
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

const lockSamples = (state: State): State => {
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

const checkUnlockedRewards = (state: State): State => {
  const samples = getSamples();

  if (!config.ads) {
    return {
      ...state,
      unlockedPro: true,
      unlockedSamples: map(samples, 'label'),
    };
  }

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
  const timeSig: TimeSig = timeSignatures[0] as TimeSig;

  return merge({}, state, {
    ui: {
      isPlaying: false,
      isRecording: false,
      useBPM: 100,
      useTimeSig: {
        hihat: timeSig.value,
        snare: timeSig.value,
        kick: timeSig.value,
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
        useTimeSig: {
          ...state.ui.useTimeSig,
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
    case types.GB_FETCH_PRESET_AND_SAMPLES_FULFILLED:
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
      return lockSamples(state);

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

    case types.GB_GET_DEPLOYMENT_DATA:
      return checkUnlockedRewards(state);

    case types.GB_GET_DEPLOYMENT_DATA_FULFILLED:
      return merge({}, state, { codepushData: action.payload });

    case types.GB_TOGGLE_DEVELOPER_MODE:
      return merge({}, state, { developerMode: action.payload });

    default:
      return state || {};
  }
};
