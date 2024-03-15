import { get, map } from 'lodash';
import { GlobalTypes } from './globalStore';
import * as Sound from '../sound';
import initBeats from '../sound/beats';
import { calcSoundDelay } from '../utils';
import type { RootState } from '.';
import type { TimeSignaturePayload } from './globalStore';
import type { Beat, Beats } from '../sound/beats';
import type { ReduxAction, SoundKey } from '../types';
import type { Sample } from '../utils/lists';

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

type PayloadPlay = {
  useSample: Sample,
  bpmInterval: number,
};

type State = Beats;

export enum BeatTypes {
  BT_ROTATE_BEAT = 'BT/ROTATE_BEAT',
  BT_CLEAR_BEAT = 'BT/CLEAR_BEAT',
  BT_RESET_BEAT = 'BT/RESET_BEAT',
  BT_TOGGLE_CHECKBOX = 'BT/TOGGLE_CHECKBOX',
  BT_PLAY_BEAT = 'BT/PLAY_BEAT',
  BT_PAUSE_BEAT = 'BT/PAUSE_BEAT',
}

export const selectors = {
  getBeats: (state: RootState): State => state.beats,
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
  playBeat: (payload: PayloadPlay): ReduxAction => ({
    type: BeatTypes.BT_PLAY_BEAT,
    payload,
  }),
  pauseBeat: (): ReduxAction => ({
    type: BeatTypes.BT_PAUSE_BEAT,
  }),
};

const rotateBeat = (state: State, payload: PayloadRotate): State => {
  const newState = { ...state };
  const newArray = get(newState, payload.key, []);

  return {
    ...state,
    [payload.key]: map(newArray, (beat: Beat) => ({
      ...beat,
      angle: beat.initAngle + payload.degree,
      soundDelay: calcSoundDelay(
        beat.initAngle,
        payload.degree,
        payload.useBPM,
      ),
    })),
  };
};

const clearBeat = (state: State): State => {
  const clearKey = (beats: Beat[]) => map(beats, (beat: Beat) => ({
    ...beat,
    checked: false,
  }));

  return {
    hihat: clearKey(state.hihat),
    snare: clearKey(state.snare),
    kick: clearKey(state.kick),
  };
};

const resetBeat = (): State => {
  Sound.stopBeat();

  return initBeats;
};

const toggleCheckbox = (state: State, payload: PayloadCheckbox): State => {
  const newState = { ...state };
  const array = map(newState[payload.key], (beat: Beat, index: number) => {
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
    [payload.key]: array,
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
    hihat: toggleVisibility(state.hihat, 'hihat'),
    snare: toggleVisibility(state.snare, 'snare'),
    kick: toggleVisibility(state.kick, 'kick'),
  };
};

const playBeat = (state: State, payload: PayloadPlay): State => {
  Sound.playBeat({
    beats: state,
    sample: payload.useSample,
    bpmInterval: payload.bpmInterval,
  });

  return state;
};

const pauseBeat = (state: State): State => {
  Sound.stopBeat();

  return state;
};

const handleBeatUpdate = (state: State, action: ReduxAction): State => {
  switch (action.type) {
    case BeatTypes.BT_ROTATE_BEAT:
      return rotateBeat(state, action.payload);
    case BeatTypes.BT_CLEAR_BEAT:
      return clearBeat(state);
    case BeatTypes.BT_TOGGLE_CHECKBOX:
      return toggleCheckbox(state, action.payload);
    case GlobalTypes.GB_LOAD_PRESET:
      return action.payload.beat;
    case GlobalTypes.GB_UPDATE_TIME_SIG:
      return handleTimeSigUpdate(state, action.payload);

    default:
      return state;
  }
};

export const reducer = (state: any, action: ReduxAction) => {
  switch (action.type) {
    case BeatTypes.BT_ROTATE_BEAT:
    case BeatTypes.BT_CLEAR_BEAT:
    case BeatTypes.BT_TOGGLE_CHECKBOX:
    case GlobalTypes.GB_LOAD_PRESET:
    case GlobalTypes.GB_UPDATE_TIME_SIG:
      const newState = handleBeatUpdate(state, action);
      Sound.updateBeat(newState);

      return newState;

    case BeatTypes.BT_RESET_BEAT:
      return resetBeat();
    case BeatTypes.BT_PLAY_BEAT:
      return playBeat(state, action.payload);
    case BeatTypes.BT_PAUSE_BEAT:
      return pauseBeat(state);

    default:
      return state || {};
  }
};
