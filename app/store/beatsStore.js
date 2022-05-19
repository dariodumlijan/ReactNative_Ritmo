// @flow
import { get, map } from 'lodash';
import { types as globalTypes } from "./globalStore";
import type { ReduxAction, ReduxActionWithPayload, ReduxState } from '../types';

type PayloadRotate = {
  degree: number,
  key: string,
};

type PayloadCheckbox = {
  bool: boolean,
  key: string,
  index: number,
};

export type Beat = {
  angle: number,
  checked: boolean,
  initAngle: number,
  soundDelay: number,
  soundDelayKey: string,
  soundName: string,
  timeSig: string,
  visible: boolean,
};

export type State = {
  hihat: Beat[],
  snare: Beat[],
  kick: Beat[],
};

export const types = {
  BT_ROTATE_BEAT: 'BT/ROTATE_BEAT',
  BT_CLEAR_BEAT: 'BT/CLEAR_BEAT',
  BT_RESET_BEAT: 'BT/RESET_BEAT',
  BT_TOGGLE_CHECKBOX: 'BT/TOGGLE_CHECKBOX',
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
};

const rotateBeat = (state: State, payload: PayloadRotate): State => {
  const newState = { ...state };
  const newArray = get(newState, payload.key, []);

  return {...state, [payload.key]: map(newArray, (beat: Beat) => ({
    ...beat,
    angle: beat.initAngle + payload.degree
  }))};
};

const clearBeat = (state: State): State => {
  const clearKey = (beats: Beat[]) => map(beats, (beat: Beat) => ({
      ...beat,
      checked: false
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
        checked: payload.bool,
      };
    }

    return beat;
  });

  return {
    ...state,
    [payload.key]: array,
  };
};

const handleTimeSigUpdate = (state: State, payload: { useTimeSig: string }): State => {
  const {useTimeSig} = payload;

  const toggleVisibility = (beats: Beat[]) => (
    map(beats, (beat: Beat) => ({
      ...beat,
      visible: beat.timeSig === useTimeSig || beat.timeSig === 'Free' || useTimeSig === 'Free',
    }))
  );

  return {
    hihat: toggleVisibility(state.hihat),
    snare: toggleVisibility(state.snare),
    kick: toggleVisibility(state.kick),
  };
};

export const reducer = (state: State, action: ReduxActionWithPayload): State => {
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
      return state || {};
  }
};
