import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, View } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';
import Navigation from '@components/containers/navigation/Navigation';
import Backgrounds from '@components/elements/backgrounds/Backgrounds';
import Dev from '@components/screens/Dev';
import Guide from '@components/screens/Guide';
import Home from '@components/screens/Home';
import Loading from '@components/screens/Loading';
import Settings from '@components/screens/Settings';
import { actions } from '@store/globalStore';
import mainStyle from '@styles/main';
import { useAppDispatch } from '@utils/hooks';
import { secondsToMilliseconds } from 'date-fns';

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
          <Route path="/dev" element={<Dev />} />
        </Routes>

      </NativeRouter>
    </View>
  );
}

export default Body;
