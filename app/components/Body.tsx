import React, { useEffect, useRef } from 'react';
import { StatusBar, View } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';
import Navigation from '@components/containers/navigation/Navigation';
import Backgrounds from '@components/elements/backgrounds/Backgrounds';
import Dev from '@components/screens/Dev';
import Guide from '@components/screens/Guide';
import Home from '@components/screens/Home';
import Settings from '@components/screens/Settings';
import { actions } from '@store/globalStore';
import mainStyle from '@styles/main';
import { useAppDispatch } from '@utils/hooks';

function Body() {
  const dispatch = useAppDispatch();
  const initLoad = useRef(true);

  useEffect(() => {
    if (!initLoad.current) return;
    initLoad.current = false;

    dispatch(actions.fetchPresets());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
