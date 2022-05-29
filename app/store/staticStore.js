// @flow
import type { ReduxActionWithPayload, ReduxState } from '../types';

export type State = {
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

export const selectors = {
  getStatic: (state: ReduxState): State => state.static,
};

export const reducer = (state: State, action: ReduxActionWithPayload): State => {
  switch (action.type) {
    default:
      return state || {};
  }
};
