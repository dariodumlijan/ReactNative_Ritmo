import initBeats from '@sound/beats';
import { GlobalTypes } from '@store/globalStore';
import { get, map } from 'lodash';
import type Playback from '@sound';
import type { Beat, Beats } from '@sound/beats';
import type { RootState } from '@store';
import type { TimeSignaturePayload } from '@store/globalStore';
import type { ReduxAction, SoundKey } from '@types';
import type { Sample } from '@utils/lists';

type PayloadRotate = {
  key: string,
  degree: number,
  useBPM: number,
};

type PayloadCheckbox = {
  key: SoundKey,
  index: number,
  checked: boolean,
};

type State = {
  beats: Beats
  playback: Playback,
};

export enum BeatTypes {
  BT_ROTATE_BEAT = 'BT/ROTATE_BEAT',
  BT_CLEAR_BEAT = 'BT/CLEAR_BEAT',
  BT_RESET_BEAT = 'BT/RESET_BEAT',
  BT_TOGGLE_CHECKBOX = 'BT/TOGGLE_CHECKBOX',
  BT_PLAY_BEAT = 'BT/PLAY_BEAT',
  BT_PAUSE_BEAT = 'BT/PAUSE_BEAT',
}

export const selectors = {
  getBeats: (state: RootState): Beats => state.beats.beats,
};

export const actions = {
  rotateBeat: (payload: PayloadRotate): ReduxAction => ({
    type: BeatTypes.BT_ROTATE_BEAT,
    payload,
  }),
  clearBeat: (): ReduxAction => ({
    type: BeatTypes.BT_CLEAR_BEAT,
  }),
  resetBeat: (): ReduxAction => ({
    type: BeatTypes.BT_RESET_BEAT,
  }),
  toggleCheckbox: (payload: PayloadCheckbox): ReduxAction => ({
    type: BeatTypes.BT_TOGGLE_CHECKBOX,
    payload,
  }),
  playBeat: (bpmInterval: number): ReduxAction => ({
    type: BeatTypes.BT_PLAY_BEAT,
    payload: bpmInterval,
  }),
  pauseBeat: (): ReduxAction => ({
    type: BeatTypes.BT_PAUSE_BEAT,
  }),
};

const rotateBeat = (state: State, payload: PayloadRotate): State => {
  const newBeats = { ...state.beats };
  const newArray = get(newBeats, payload.key, []);

  return {
    ...state,
    beats: {
      ...state.beats,
      [payload.key]: map(newArray, (beat: Beat) => ({
        ...beat,
        angle: beat.initAngle + payload.degree,
      })),
    },
  };
};

const toggleCheckbox = (state: State, payload: PayloadCheckbox): State => {
  const newBeats = { ...state.beats };
  const array = map(newBeats[payload.key], (beat: Beat, index: number) => {
    if (index === payload.index) {
      return {
        ...beat,
        checked: payload.checked,
      };
    }

    return beat;
  });

  return {
    ...state,
    beats: {
      ...state.beats,
      [payload.key]: array,
    },
  };
};

const handleTimeSigUpdate = (state: State, payload: TimeSignaturePayload): State => {
  const toggleVisibility = (beats: Beat[], circleKey: 'hihat' | 'snare' | 'kick') => {
    if (payload.key === 'all' || payload.key === circleKey) {
      return map(beats, (beat: Beat) => ({
        ...beat,
        visible: beat.timeSig === payload.value || beat.timeSig === 'Free' || payload.value === 'Free',
      }));
    }

    return beats;
  };

  return {
    ...state,
    beats: {
      hihat: toggleVisibility(state.beats.hihat, 'hihat'),
      snare: toggleVisibility(state.beats.snare, 'snare'),
      kick: toggleVisibility(state.beats.kick, 'kick'),
    },
  };
};

const updateSounds = (state: State, payload: { useSample: Sample }): State => {
  state.playback.switchSample(payload.useSample);

  return state;
};

const clearBeat = (state: State): State => {
  const clearKey = (beats: Beat[]) => map(beats, (beat: Beat) => ({
    ...beat,
    checked: false,
  }));

  return {
    ...state,
    beats: {
      hihat: clearKey(state.beats.hihat),
      snare: clearKey(state.beats.snare),
      kick: clearKey(state.beats.kick),
    },
  };
};

const resetBeat = (state: State): State => {
  state.playback.stopBeat();

  return {
    ...state,
    beats: initBeats,
  };
};

const playBeat = (state: State, bpmInterval: number): State => {
  state.playback.playBeat({ bpmInterval, beats: state.beats });

  return state;
};

const pauseBeat = (state: State): State => {
  state.playback.stopBeat();

  return state;
};

const updateBeat = (state: State, action: ReduxAction): State => {
  switch (action.type) {
    case BeatTypes.BT_ROTATE_BEAT:
      return rotateBeat(state, action.payload);
    case BeatTypes.BT_CLEAR_BEAT:
      return clearBeat(state);
    case BeatTypes.BT_TOGGLE_CHECKBOX:
      return toggleCheckbox(state, action.payload);
    case GlobalTypes.GB_LOAD_PRESET:
      return { ...state, beats: action.payload.beat };
    case GlobalTypes.GB_UPDATE_TIME_SIG:
      return handleTimeSigUpdate(state, action.payload);

    default:
      return state;
  }
};

export const reducer = (state: any, action: ReduxAction) => {
  switch (action.type) {
    case GlobalTypes.GB_UPDATE_SELECTED_SAMPLE:
      return updateSounds(state, action.payload);

    case BeatTypes.BT_RESET_BEAT:
      return resetBeat(state);
    case BeatTypes.BT_PLAY_BEAT:
      return playBeat(state, action.payload);
    case BeatTypes.BT_PAUSE_BEAT:
      return pauseBeat(state);

    case BeatTypes.BT_ROTATE_BEAT:
    case BeatTypes.BT_CLEAR_BEAT:
    case BeatTypes.BT_TOGGLE_CHECKBOX:
    case GlobalTypes.GB_LOAD_PRESET:
    case GlobalTypes.GB_UPDATE_TIME_SIG:
      const newState = updateBeat(state, action);
      newState.playback.updateBeat(newState.beats);

      return newState;

    default:
      return state || {};
  }
};
