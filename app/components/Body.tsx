import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, View } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';
import { secondsToMilliseconds } from 'date-fns';
import Navigation from './blocks/navigation/Navigation';
import Backgrounds from './elements/backgrounds/Backgrounds';
import Guide from './screens/Guide';
import Home from './screens/Home';
import Loading from './screens/Loading';
import Settings from './screens/Settings';
import StateTree from './screens/StateTree';
import { actions } from '../store/globalStore';
import mainStyle from '../styles/main';
import { useAppDispatch } from '../utils/hooks';

function Body() {
  const dispatch = useAppDispatch();
  const [loadingAnimationDone, setLoadingAnimationDone] = useState(false);
  const initLoad = useRef(true);
  const timeoutRef = useRef<any>();

  useEffect(() => {
    if (!initLoad.current) return;
    initLoad.current = false;

    dispatch(actions.fetchPresets());
    timeoutRef.current = setTimeout(() => {
      setLoadingAnimationDone(true);
    }, secondsToMilliseconds(3));

    return () => clearTimeout(timeoutRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!loadingAnimationDone) return <Loading />;

  return (
    <View style={mainStyle.container}>
      <StatusBar hidden />

      <NativeRouter>
        <Backgrounds />
        <Navigation />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/guide" element={(<Guide />)} />
          <Route path="/state-tree" element={<StateTree />} />
        </Routes>

      </NativeRouter>
    </View>
  );
}

export default Body;
