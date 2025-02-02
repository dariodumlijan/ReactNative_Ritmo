/* eslint-disable no-console */
import { t } from '@locales';
import { Tuple, configureStore } from '@reduxjs/toolkit';
import Playback from '@sound';
import beats from '@sound/beats';
import { reducer as beatsStoreReducer } from '@store/beatsStore';
import { reducer as globalStoreReducer } from '@store/globalStore';
import { reducer as staticStoreReducer } from '@store/staticStore';
import { sliderStep } from '@tokens';
import { isPromise } from '@utils';
import { getSamples, getTimeSignatures } from '@utils/lists';
import { thunk } from 'redux-thunk';
import type { Sample, TimeSigOption } from '@utils/lists';

const samples = getSamples();
const timeSignatures = getTimeSignatures(t);
const sample = samples[0] as Sample;
const timeSig = timeSignatures[0] as TimeSigOption;
const playback = new Playback();
playback.initSample(sample);

const initialState = {
  beats: {
    beats,
    playback,
  },
  static: {
    sliderMin: 0,
    sliderMax: 90,
    sliderStep,
    stepsInBar: 360 / sliderStep,
    midiNoteMin: 8,
    midiNoteMax: 64,
    midiBarTicks: 512,
    reviewMinutes: 2,
    loadTime: Date.now(),
  },
  global: {
    developerMode: false,
    sliders: {
      hihat: 0,
      snare: 0,
      kick: 0,
    },
    ui: {
      isPlaying: false,
      useBPM: 100,
      useSample: sample,
      useTimeSig: {
        hihat: timeSig.value,
        snare: timeSig.value,
        kick: timeSig.value,
      },
    },
  },
};

function promiseMiddleware({ dispatch }: { dispatch : any }) {
  return (next: (arg0: any) => any) => (action: { payload: Promise<any>; type: any; }) => {
    if (action.payload && isPromise(action.payload)) {
      action.payload
        .then((payload: any) => {
          dispatch({
            type: `${action.type}_FULFILLED`,
            payload,
          });
        })
        .catch((e: { status: any; name: any; message: any; }) => {
          console.error(
            `REDUX: ${action.type}_REJECTED: statusCode = `,
            (e && e.status) || '',
            'name = ',
            (e && e.name) || '',
            'message = ',
            (e && e.message) || '',
          );
          dispatch({
            type: `${action.type}_REJECTED`,
            payload: {
              statusCode: (e && e.status) || '',
              name: (e && e.name) || '',
              message: (e && e.message) || '',
            },
          });
        });

      return dispatch({ type: `${action.type}_PENDING` });
    }

    return next(action);
  };
}

export const createStore = () => configureStore({
  reducer: {
    static: staticStoreReducer,
    global: globalStoreReducer,
    beats: beatsStoreReducer,
  },
  middleware: () => new Tuple(thunk, promiseMiddleware as any),
  preloadedState: initialState,
});

export const store = createStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
