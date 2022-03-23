import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import Body from './app/components/Body';
import { configureStore } from './app/store';

const initialState = {
  global: {
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
    showBanner: true,
    loadTime: Date.now(),
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
