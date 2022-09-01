// @flow
import { get, map } from 'lodash';
import { types as globalTypes } from './globalStore';
import { calcSoundDelay } from '../utils';
import * as Sound from '../sound';
import type { Sample } from '../utils/lists';
import type { Beats, Beat } from '../sound/beats';
import type { TimeSignaturePayload } from './globalStore';
import type { ReduxAction, ReduxActionWithPayload, ReduxState } from '../types';

type PayloadRotate = {
  key: string,
  degree: number,
  useBPM: number,
};

type PayloadCheckbox = {
  key: string,
  index: number,
  checked: boolean,
};

type PayloadPlay = {
  useSample: Sample,
  bpmInterval: number,
};

type State = Beats;

export const types = {
  BT_ROTATE_BEAT: 'BT/ROTATE_BEAT',
  BT_CLEAR_BEAT: 'BT/CLEAR_BEAT',
  BT_RESET_BEAT: 'BT/RESET_BEAT',
  BT_TOGGLE_CHECKBOX: 'BT/TOGGLE_CHECKBOX',
  BT_PLAY_BEAT: 'BT/PLAY_BEAT',
  BT_PAUSE_BEAT: 'BT/PAUSE_BEAT',
};

export const selectors = {
  getBeats: (state: ReduxState): State => state.beats,
};

export const actions = {
  rotateBeat: (payload: PayloadRotate): ReduxAction => ({
    type: types.BT_ROTATE_BEAT,
    payload,
  }),
  clearBeat: (): ReduxAction => ({
    type: types.BT_CLEAR_BEAT,
  }),
  resetBeat: (): ReduxAction => ({
    type: types.BT_RESET_BEAT,
  }),
  toggleCheckbox: (payload: PayloadCheckbox): ReduxAction => ({
    type: types.BT_TOGGLE_CHECKBOX,
    payload,
  }),
  playBeat: (payload: PayloadPlay): ReduxAction => ({
    type: types.BT_PLAY_BEAT,
    payload,
  }),
  pauseBeat: (): ReduxAction => ({
    type: types.BT_PAUSE_BEAT,
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

const resetBeat = (state: State): State => {
  const resetKey = (beats: Beat[]) => (
    map(beats, (beat: Beat) => ({
      ...beat,
      angle: beat.initAngle,
      checked: false,
      visible: true,
    }))
  );

  return {
    hihat: resetKey(state.hihat),
    snare: resetKey(state.snare),
    kick: resetKey(state.kick),
  };
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
  const toggleVisibility = (beats: Beat[], circleKey: 'hihat'|'snare'|'kick') => {
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
  Sound.stopBeat(state);

  return state;
};

const handleBeatUpdate = (state: State, action: ReduxActionWithPayload): State => {
  switch (action.type) {
    case types.BT_ROTATE_BEAT:
      return rotateBeat(state, action.payload);
    case types.BT_CLEAR_BEAT:
      return clearBeat(state);
    case types.BT_RESET_BEAT:
      return resetBeat(state);
    case types.BT_TOGGLE_CHECKBOX:
      return toggleCheckbox(state, action.payload);
    case globalTypes.GB_LOAD_PRESET:
      return action.payload.beat;
    case globalTypes.GB_UPDATE_TIME_SIG:
      return handleTimeSigUpdate(state, action.payload);

    default:
      return state;
  }
};

export const reducer = (state: State, action: ReduxActionWithPayload): State => {
  switch (action.type) {
    case types.BT_ROTATE_BEAT:
    case types.BT_CLEAR_BEAT:
    case types.BT_RESET_BEAT:
    case types.BT_TOGGLE_CHECKBOX:
    case globalTypes.GB_LOAD_PRESET:
    case globalTypes.GB_UPDATE_TIME_SIG:
      const newState = handleBeatUpdate(state, action);
      Sound.updateBeat(newState);

      return newState;

    case types.BT_PLAY_BEAT:
      return playBeat(state, action.payload);
    case types.BT_PAUSE_BEAT:
      return pauseBeat(state);

    default:
      return state || {};
  }
};
