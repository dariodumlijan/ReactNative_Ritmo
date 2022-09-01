// @flow
import React, { useEffect, useState } from 'react';
import codePush from 'react-native-code-push';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import Body from './app/components/Body';
import PortalProvider from './app/components/blocks/portal/PortalProvider';
import beats from './app/sound/beats';
import { t } from './app/locales';
import { getDeviceInfo } from './app/utils';
import { getSamples, getTimeSignatures, getUnlockedSamples } from './app/utils/lists';
import { configureStore } from './app/store';
import type { ReduxState } from './app/types';

const samples = getSamples();
const unlockedSamples = getUnlockedSamples();
const timeSignatures = getTimeSignatures(t);
const initialState: ReduxState = {
  static: {
    sliderMin: 0,
    sliderMax: 90,
    sliderStep: 5,
    stepsInBar: 360 / 5,
    midiNoteMin: 8,
    midiNoteMax: 64,
    midiBarTicks: 512,
    reviewMinutes: 2,
    // $FlowFixMe
    loadTime: Date.now(),
  },
  global: {
    sliders: {
      hihat: 0,
      snare: 0,
      kick: 0,
    },
    ui: {
      showAds: true,
      showBanner: true,
      isPlaying: false,
      isRecording: false,
      hihatSliderVal: 0,
      snareSliderVal: 0,
      kickSliderVal: 0,
      useBPM: 100,
      useTimeSig: {
        hihat: timeSignatures[0].value,
        snare: timeSignatures[0].value,
        kick: timeSignatures[0].value,
      },
      useSample: samples[0],
    },
    unlockedSamples,
  },
  beats: {
    hihat: beats.hihat,
    snare: beats.snare,
    kick: beats.kick,
  },
};
const store = configureStore(initialState);

function App() {
  const [setupPending, setSetupPending] = useState(true);

  useEffect(() => {
    const handleDeviceSetup = async () => {
      await getDeviceInfo();
      setSetupPending(false);
      SplashScreen.hide();
    };

    handleDeviceSetup();
  }, []);

  if (setupPending) return null;

  return (
    <Provider store={store}>
      <PortalProvider>
        <Body />
      </PortalProvider>
    </Provider>
  );
}

export default (codePush(App): any);
