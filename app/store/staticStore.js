// @flow
import type { ReduxActionWithPayload, ReduxState } from '../types';

export type State = {
  loadTime: number,
  midiBarTicks: number,
  midiNoteMax: number,
  midiNoteMin: number,
  reviewMinutes: number,
  sliderMax: number,
  sliderMin: number,
  sliderStep: number,
  stepsInBar: number,
};

export const selectors = {
  getStatic: (state: ReduxState): State => state.static,
};

export const reducer = (state: State, action: ReduxActionWithPayload): State => {
  switch (action.type) {
    default:
      return state || {};
  }
};
