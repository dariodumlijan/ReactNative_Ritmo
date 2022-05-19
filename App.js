import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import Body from './app/components/Body';
import beats from './app/sound/beats';
import useSelectLists from './app/utils/lists';
import { configureStore } from './app/store';
import type { ReduxState } from './app/types';

// eslint-disable-next-line react-hooks/rules-of-hooks
const { samples, timeSignatures } = useSelectLists();
const initialState: ReduxState = {
  global: {
    presets: {
      one: null,
      two: null,
      three: null
    },
    sliders: {
      hihat: 0,
      snare: 0,
      kick: 0,
    },
    static: {
      sliderMin: 0,
      sliderMax: 90,
      sliderStep: 5,
      stepsInBar: 360 / 5,
      midiNoteMin: 8,
      midiNoteMax: 64,
      midiBarTicks: 512,
      countdownHours: 24,
      refreshHours: 5,
      reviewMinutes: 2,
      loadTime: Date.now(),
    },
    ui: {
      showBanner: true,
      isPlaying: false,
      isRecording: false,
      hihatSliderVal: 0,
      snareSliderVal: 0,
      kickSliderVal: 0,
      useBPM: 100,
      bpmInterval: 240000 / 100,
      pulseInterval: 240000 / 100 / 8,
      useTimeSig: timeSignatures[0].value,
      useSample: samples[0],
    },
    unlockedSamples: [samples[0].label, samples[1].label],
  },
  beats: {
    hihat: beats.hihat,
    snare: beats.snare,
    kick: beats.kick,
  },
};
const store = configureStore(initialState);

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <Body />
    </Provider>
  );
}

export default App;
