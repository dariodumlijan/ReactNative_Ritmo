import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import Body from './app/screens/Body';

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return <Body />;
}

export default App;
