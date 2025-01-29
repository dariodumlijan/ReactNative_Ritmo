import React, { useEffect, useState } from 'react';
import Sound from 'react-native-sound';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import Body from '@components/Body';
import PortalProvider from '@components/containers/portal/PortalProvider';
import ErrorBoundary from '@components/screens/ErrorBoundary';
import { store } from '@store';
import { actions } from '@store/globalStore';
import { getDeviceInfo } from '@utils';

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

export default App;
