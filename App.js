// @flow
import React, { useEffect, useState } from 'react';
import codePush from 'react-native-code-push';
import { Provider } from 'react-redux';
import Sound from 'react-native-sound';
import SplashScreen from 'react-native-splash-screen';
import ErrorBoundary from './app/components/blocks/errors/ErrorBoundary';
import PortalProvider from './app/components/blocks/portal/PortalProvider';
import Body from './app/components/Body';
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
      isPlaying: false,
      isRecording: false,
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
  beats,
};
const store = configureStore(initialState);

function App() {
  Sound.setCategory('Playback');
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
    <ErrorBoundary store={store}>
      <Provider store={store}>
        <PortalProvider>
          <Body />
        </PortalProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default (codePush(App): any);
