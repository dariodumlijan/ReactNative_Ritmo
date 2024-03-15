import type { RootState } from '.';
import type { ReduxAction } from '../types';

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
  getStatic: (state: RootState): State => state.static,
};

export const reducer = (state: any, action: ReduxAction) => {
  switch (action.type) {
    default:
      return state || {};
  }
};
