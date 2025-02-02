import * as MIDI from '@app/midi';
import { t } from '@locales';
import { BeatTypes } from '@store/beatsStore';
import { getTimeSignatures } from '@utils/lists';
import * as LocalStorage from '@utils/localStorage';
import { merge, omit } from 'lodash';
import type { BuildMidi, BuildPromise } from '@app/midi';
import type { Beats } from '@sound/beats';
import type { RootState } from '@store';
import type { PresetKey, ReduxAction, SoundKey } from '@types';
import type { Sample, TimeSig, TimeSigOption } from '@utils/lists';
import type { FetchResponse, WriteResponse } from '@utils/localStorage';

export type TimeSignaturePayload = {
  key: 'all' | keyof typeof SoundKey,
  value: TimeSig,
};

export type Sliders = {
  [SoundKey.hihat]: number,
  [SoundKey.snare]: number,
  [SoundKey.kick]: number,
};

export type TimeSignature = {
  [SoundKey.hihat]: TimeSig,
  [SoundKey.snare]: TimeSig,
  [SoundKey.kick]: TimeSig,
};

export type UI = {
  fileUri?: string,
  isPlaying: boolean,
  navigationOpen?: boolean,
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

export type State = {
  developerMode: boolean,
  presets?: {
    [key: string]: Preset | null,
  },
  sliders: Sliders,
  ui: UI,
};

export enum GlobalTypes {
  GB_TOGGLE_NAVIGATION = 'GB/TOGGLE_NAVIGATION',
  GB_TOGGLE_DEVELOPER_MODE = 'GB/TOGGLE_DEVELOPER_MODE',
  GB_UPDATE_BPM = 'GB/UPDATE_BPM',
  GB_UPDATE_TIME_SIG = 'GB/UPDATE_TIME_SIG',
  GB_UPDATE_SELECTED_SAMPLE = 'GB/UPDATE_SELECTED_SAMPLE',

  GB_FETCH_PRESETS = 'GB/FETCH_PRESETS',
  GB_FETCH_PRESETS_PENDING = 'GB/FETCH_PRESETS_PENDING',
  GB_FETCH_PRESETS_REJECTED = 'GB/FETCH_PRESETS_REJECTED',
  GB_FETCH_PRESETS_FULFILLED = 'GB/FETCH_PRESETS_FULFILLED',

  GB_WRITE_PRESET = 'GB/WRITE_PRESET',
  GB_WRITE_PRESET_PENDING = 'GB/WRITE_PRESET_PENDING',
  GB_WRITE_PRESET_REJECTED = 'GB/WRITE_PRESET_REJECTED',
  GB_WRITE_PRESET_FULFILLED = 'GB/WRITE_PRESET_FULFILLED',

  GB_CLEAR_PRESET = 'GB/CLEAR_PRESET',
  GB_CLEAR_PRESET_PENDING = 'GB/CLEAR_PRESET_PENDING',
  GB_CLEAR_PRESET_REJECTED = 'GB/CLEAR_PRESET_REJECTED',
  GB_CLEAR_PRESET_FULFILLED = 'GB/CLEAR_PRESET_FULFILLED',

  GB_LOAD_PRESET = 'GB/LOAD_PRESET',

  GB_EXPORT_MIDI = 'GB/EXPORT_MIDI',
  GB_EXPORT_MIDI_PENDING = 'GB/EXPORT_MIDI_PENDING',
  GB_EXPORT_MIDI_REJECTED = 'GB/EXPORT_MIDI_REJECTED',
  GB_EXPORT_MIDI_FULFILLED = 'GB/EXPORT_MIDI_FULFILLED',

  GB_DELETE_MIDI_FILE = 'GB/DELETE_MIDI_FILE',
}

export const selectors = {
  getGlobal: (state: RootState): State => state.global,
  getUI: (state: RootState): UI => state.global.ui,
};

export const actions = {
  toggleNavigation: (bool: boolean) => ({
    type: GlobalTypes.GB_TOGGLE_NAVIGATION,
    payload: { navigationOpen: bool },
  }),
  toggleDeveloperMode: (bool: boolean) => ({
    type: GlobalTypes.GB_TOGGLE_DEVELOPER_MODE,
    payload: bool,
  }),
  exportMIDI: (buildMIDI: BuildMidi) => ({
    type: GlobalTypes.GB_EXPORT_MIDI,
    payload: MIDI.exportMIDI(buildMIDI),
  }),
  deleteMIDIFile: (fileUri: string) => ({
    type: GlobalTypes.GB_DELETE_MIDI_FILE,
    payload: MIDI.deleteMIDIFile(fileUri),
  }),
  fetchPresets: () => ({
    type: GlobalTypes.GB_FETCH_PRESETS,
    payload: LocalStorage.fetchPresets(),
  }),
  loadPreset: (preset: Preset) => ({
    type: GlobalTypes.GB_LOAD_PRESET,
    payload: preset,
  }),
  writePreset: (key: PresetKey, preset: Preset) => ({
    type: GlobalTypes.GB_WRITE_PRESET,
    payload: LocalStorage.writePreset(key, preset),
  }),
  clearPreset: (key: PresetKey) => ({
    type: GlobalTypes.GB_CLEAR_PRESET,
    payload: LocalStorage.clearPreset(key),
  }),
  updateBPM: (bpm: number) => ({
    type: GlobalTypes.GB_UPDATE_BPM,
    payload: { useBPM: bpm },
  }),
  updateTimeSig: (payload: TimeSignaturePayload) => ({
    type: GlobalTypes.GB_UPDATE_TIME_SIG,
    payload,
  }),
  updateSelectedSample: (sample: Sample) => ({
    type: GlobalTypes.GB_UPDATE_SELECTED_SAMPLE,
    payload: { useSample: sample },
  }),
};

const exportMIDI = (state: State, payload: BuildPromise): State => merge({}, state, { ui: { fileUri: payload.fileUri } });

const rotateBeat = (
  state: State,
  payload: { degree: number, key: string },
): State => merge({}, state, { sliders: { [payload.key]: payload.degree } });

const resetBeat = (state: State): State => {
  const timeSignatures = getTimeSignatures(t);
  const timeSig: TimeSigOption = timeSignatures[0] as TimeSigOption;

  return merge({}, state, {
    ui: {
      isPlaying: false,
      useBPM: 100,
      useTimeSig: {
        hihat: timeSig.value,
        snare: timeSig.value,
        kick: timeSig.value,
      },
    },
    sliders: {
      hihat: 0,
      snare: 0,
      kick: 0,
    },
  });
};

const fetchPresets = (state: State, payload: FetchResponse) => ({ ...state, presets: payload.presets });

const loadPreset = (state: State, preset: Preset): State => ({
  ...state,
  ui: {
    ...state.ui,
    isPlaying: false,
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

export const reducer = (state: any, action: ReduxAction) => {
  switch (action.type) {
    case GlobalTypes.GB_FETCH_PRESETS_FULFILLED:
      return fetchPresets(state, action.payload);

    case GlobalTypes.GB_LOAD_PRESET:
      return loadPreset(state, action.payload);

    case GlobalTypes.GB_WRITE_PRESET_FULFILLED:
      return writePreset(state, action.payload);

    case GlobalTypes.GB_CLEAR_PRESET_FULFILLED:
      return merge({}, state, {
        presets: {
          [action.payload]: null,
        },
      });

    case BeatTypes.BT_ROTATE_BEAT:
      return rotateBeat(state, action.payload);

    case BeatTypes.BT_RESET_BEAT:
      return resetBeat(state);

    case BeatTypes.BT_PLAY_BEAT:
      return merge({}, state, { ui: { isPlaying: true } });

    case BeatTypes.BT_PAUSE_BEAT:
      return merge({}, state, { ui: { isPlaying: false } });

    case GlobalTypes.GB_EXPORT_MIDI_FULFILLED:
      return exportMIDI(state, action.payload);

    case GlobalTypes.GB_EXPORT_MIDI_REJECTED:
      return state;

    case GlobalTypes.GB_DELETE_MIDI_FILE:
      return omit(state, 'ui.fileUri');

    case GlobalTypes.GB_UPDATE_TIME_SIG:
      return setTimeSig(state, action.payload);

    case GlobalTypes.GB_TOGGLE_NAVIGATION:
    case GlobalTypes.GB_UPDATE_BPM:
    case GlobalTypes.GB_UPDATE_SELECTED_SAMPLE:
      return merge({}, state, { ui: action.payload });

    case GlobalTypes.GB_TOGGLE_DEVELOPER_MODE:
      return merge({}, state, { developerMode: action.payload });

    default:
      return state || {};
  }
};
