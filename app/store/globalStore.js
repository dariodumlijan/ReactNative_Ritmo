// @flow
import { merge, get, keys, reject } from 'lodash';
import { isRealDevice, isSampleUnlocked } from '../utils';
import * as LocalStorage from '../utils/localStorage';
import { types as cmsTypes } from './cmsStore';
import { exportMIDI as midiExport } from '../midi';
import { types as beatTypes } from './beatsStore';
import useSelectLists from '../utils/lists';
import type { Beat } from "./beatsStore";
import type { BuildMidi } from '../midi';
import type { Sample } from "../utils/lists";
import type { InitialCMSResponse } from "../api";
import type { ReduxAction, ReduxActionWithPayload, ReduxState } from '../types';

export type Static = {
  countdownHours: number,
  loadTime: Date,
  midiBarTicks: number,
  midiNoteMax: number,
  midiNoteMin: number,
  refreshHours: number,
  reviewMinutes: number,
  sliderMax: number,
  sliderMin: number,
  sliderStep: number,
  stepsInBar: number,
};

export type Sliders = {
  hihat: number,
  snare: number,
  kick: number,
};

export type UI = {
  fileUri: string,
  isPlaying: boolean,
  isRecording: boolean,
  showBanner: boolean,
  useBPM: number,
  useTimeSig: string,
  useSample: Sample,
}
;
export type Preset = {
  beat: {
    hihat: Beat[],
    snare: Beat[],
    kick: Beat[],
  },
  sliders: Sliders,
  useBPM: number,
  useTimeSig: string,
};

export type State = {
  presets: {
    [string]: Preset|null,
  }|null,
  sliders: Sliders,
  static: Static,
  ui: UI,
  unlockedSamples: string[],
};

export const types = {
  GB_SHOW_BANNER: 'GB/SHOW_BANNER',
  GB_UNLOCK_REWARD: 'GB/UNLOCK_REWARD',
  GB_EXPORT_MIDI: 'GB/EXPORT_MIDI',
  GB_TOGGLE_PLAY: 'GB/TOGGLE_PLAY',
  GB_UPDATE_BPM: 'GB/UPDATE_BPM',
  GB_UPDATE_TIME_SIG: 'GB/UPDATE_TIME_SIG',
  GB_UPDATE_SELECTED_SAMPLE: 'GB/UPDATE_SELECTED_SAMPLE',

  GB_FETCH_PRESET_AND_SAMPLES: 'GB/GB_FETCH_PRESET_AND_SAMPLES',
  GB_FETCH_PRESET_AND_SAMPLES_PENDING: 'GB/GB_FETCH_PRESET_AND_SAMPLES_PENDING',
  GB_FETCH_PRESET_AND_SAMPLES_REJECTED: 'GB/GB_FETCH_PRESET_AND_SAMPLES_REJECTED',
  GB_FETCH_PRESET_AND_SAMPLES_FULFILLED: 'GB/GB_FETCH_PRESET_AND_SAMPLES_FULFILLED',

  GB_WRITE_PRESET: 'GB/WRITE_PRESET',
  GB_WRITE_PRESET_PENDING: 'GB/WRITE_PRESET_PENDING',
  GB_WRITE_PRESET_REJECTED: 'GB/WRITE_PRESET_REJECTED',
  GB_WRITE_PRESET_FULFILLED: 'GB/WRITE_PRESET_FULFILLED',

  GB_CLEAR_PRESET: 'GB/CLEAR_PRESET',
  GB_CLEAR_PRESET_PENDING: 'GB/CLEAR_PRESET_PENDING',
  GB_CLEAR_PRESET_REJECTED: 'GB/CLEAR_PRESET_REJECTED',
  GB_CLEAR_PRESET_FULFILLED: 'GB/CLEAR_PRESET_FULFILLED',

  GB_LOAD_PRESET: 'GB/LOAD_PRESET',
};

export const selectors = {
  getGlobal: (state: ReduxState): State => state.global,
  getUnlockedSamples: (state: ReduxState): string[] => state.global.unlockedSamples,
  getUnlockableSamples: (state: ReduxState): Sample[] => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { samples } = useSelectLists();
    
    return reject(samples, (sample: Sample) => isSampleUnlocked(state.global.unlockedSamples, sample));
  },
};

export const actions = {
  showBanner: (bool: boolean): ReduxAction => ({
    type: types.GB_SHOW_BANNER,
    payload: { showBanner: bool },
  }),
  unlockSample: (key: string): ReduxAction => ({
    type: types.GB_UNLOCK_REWARD,
    payload: key,
  }),
  exportMIDI: (buildMIDI: BuildMidi): ReduxAction => ({
    type: types.GB_EXPORT_MIDI,
    payload: midiExport(buildMIDI),
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
  togglePlay: (bool: boolean): ReduxAction => ({
    type: types.GB_TOGGLE_PLAY,
    payload: { isPlaying: bool },
  }),
  updateBPM: (bpm: number): ReduxAction => ({
    type: types.GB_UPDATE_BPM,
    payload: { useBPM: bpm },
  }),
  updateTimeSig: (sig: string): ReduxAction => ({
    type: types.GB_UPDATE_TIME_SIG,
    payload: { useTimeSig: sig },
  }),
  updateSelectedSample: (sample: Sample): ReduxAction => ({
    type: types.GB_UPDATE_SELECTED_SAMPLE,
    payload: { useSample: sample },
  }),
};

const unlockReward = (state: State, key: string): State => merge({}, state, {
    ui: { showBanner: true },
    unlockedSamples: [...state.unlockedSamples, key]
  });

const checkUnlockedRewards = (state: State, payload: InitialCMSResponse): State => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { samples } = useSelectLists();
  const displayAds = isRealDevice
    ? get(payload.data, 'master.ads', true)
    : get(payload.data, 'master.adsStaging', true);

  if (!displayAds) return {...state, unlockedSamples: keys(samples) };

  return state;
};

const exportMIDI = (state: State, payload: Object): State =>
  merge({}, state, { ui: { fileUri: payload.fileUri } });

const rotateBeat = (
  state: State,
  payload: {
    degree: number,
    key: string,
  }
): State => merge({}, state, { sliders: { [payload.key]: payload.degree } });

const resetBeat = (state: State): State => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { samples } = useSelectLists();

  return merge({}, state, {
    ui: {
      isPlaying: false,
      isRecording: false,
      useBPM: 100,
      useTimeSig: 'Free',
      useSample: samples[0],
    },
    sliders: {
      hihat: 0,
      snare: 0,
      kick: 0,
    },
  });
};

const fetchPresetAndSamples = (state: State, payload: Object) => ({ ...state, ...{
    presets: payload.presets,
    unlockedSamples: [...state.unlockedSamples, ...payload.unlockedSamples]
  } });

const loadPreset = (state: State, preset: Preset): State => ({...state, ...{
  ui: {
    ...state.ui,
    isPlaying: false,
    isRecording: false,
    useBPM: preset.useBPM,
    useTimeSig: preset.useTimeSig,
  },
  sliders: preset.sliders,
}});

const writePreset = (state: State, payload: {key: string, preset: Preset}): State => (
  {
    ...state, 
    // $FlowFixMe
    presets: {
      ...state.presets,
      [payload.key]: payload.preset,
    }
  });

export const reducer = (state: State, action: ReduxActionWithPayload): State => {
  switch (action.type) {
    case cmsTypes.CMS_FETCH_APP_FULFILLED:
      return checkUnlockedRewards(state, action.payload);

    case types.GB_FETCH_PRESET_AND_SAMPLES_FULFILLED:
      return fetchPresetAndSamples(state, action.payload); 

    case types.GB_LOAD_PRESET:
      return loadPreset(state, action.payload);

    case types.GB_WRITE_PRESET_FULFILLED:
      return writePreset(state, action.payload);

    case types.GB_CLEAR_PRESET_FULFILLED:
      return merge({}, state, { presets: {
        [action.payload]: null
      }});

    case types.GB_UNLOCK_REWARD:
      return unlockReward(state, action.payload);

    case beatTypes.BT_ROTATE_BEAT:
      return rotateBeat(state, action.payload);

    case beatTypes.BT_RESET_BEAT:
      return resetBeat(state);

    case types.GB_EXPORT_MIDI:
      return exportMIDI(state, action.payload);

    case types.GB_SHOW_BANNER:
    case types.GB_TOGGLE_PLAY:
    case types.GB_UPDATE_BPM:
    case types.GB_UPDATE_TIME_SIG:
    case types.GB_UPDATE_SELECTED_SAMPLE:
      return merge({}, state, { ui: action.payload });

    default:
      return state || {};
  }
};
