import React, { useEffect, useState } from 'react';
import CodePush from 'react-native-code-push';
import Sound from 'react-native-sound';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import ErrorBoundary from './components/blocks/errors/ErrorBoundary';
import PortalProvider from './components/blocks/portal/PortalProvider';
import Body from './components/Body';
import { store } from './store';
import { actions } from './store/globalStore';
import { getDeviceInfo } from './utils';

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  installMode: CodePush.InstallMode.IMMEDIATE,
  mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
};

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
