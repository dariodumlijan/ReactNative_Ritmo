import React, { useEffect, useState } from 'react';
import CodePush from 'react-native-code-push';
import Sound from 'react-native-sound';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import ErrorBoundary from './components/blocks/errors/ErrorBoundary';
import PortalProvider from './components/blocks/portal/PortalProvider';
import Body from './components/Body';
import { t } from './locales';
import beats from './sound/beats';
import { configureStore } from './store';
import { actions } from './store/globalStore';
import { getDeviceInfo } from './utils';
import { getSamples, getTimeSignatures, getUnlockedSamples } from './utils/lists';
import type { ReduxState } from './types';
import type { Sample, TimeSig } from './utils/lists';

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  installMode: CodePush.InstallMode.IMMEDIATE,
  mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
};

const samples = getSamples();
const unlockedSamples = getUnlockedSamples();
const timeSignatures = getTimeSignatures(t);
const sample: Sample = samples[0] as Sample;
const timeSig: TimeSig = timeSignatures[0] as TimeSig;
const initialState: ReduxState = {
  beats,
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
    developerMode: false,
    unlockedSamples,
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
      useSample: sample,
      useTimeSig: {
        hihat: timeSig.value,
        snare: timeSig.value,
        kick: timeSig.value,
      },
    },
  },
};
const store = configureStore(initialState);

function App() {
  Sound.setCategory('Playback');
  const [setupPending, setSetupPending] = useState(true);

  useEffect(() => {
    getDeviceInfo().then((res) => {
      store.dispatch(actions.toggleDeveloperMode(!res.isRealDevice as boolean));
    }).finally(() => {
      setSetupPending(false);
      SplashScreen.hide();
    });
  }, []);

  if (setupPending) return null;

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <PortalProvider>
          <Body />
        </PortalProvider>
      </ErrorBoundary>
    </Provider>
  );
}

export default CodePush(codePushOptions)(App);
