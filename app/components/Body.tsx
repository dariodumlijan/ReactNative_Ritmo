import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, View } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';
import { secondsToMilliseconds } from 'date-fns';
import { isEmpty, isEqual } from 'lodash';
import Navigation from './blocks/navigation/Navigation';
import Backgrounds from './elements/backgrounds/Backgrounds';
import AdmobBanner from './elements/misc/AdmobBanner';
import RewardsCountdown from './elements/misc/RewardsCountdown';
import Guide from './screens/Guide';
import Home from './screens/Home';
import Loading from './screens/Loading';
import Rewarded from './screens/Rewarded';
import Settings from './screens/Settings';
import StateTree from './screens/StateTree';
import { actions } from '../store/globalStore';
import mainStyle from '../styles/main';
import { initializeAds } from '../utils';
import { useAppDispatch, useAppSelector } from '../utils/hooks';

function Body() {
  const dispatch = useAppDispatch();
  const deploymentEnvironment = useAppSelector((state) => state.global.codepushData?.environment, isEqual);
  const [loadingAnimationDone, setLoadingAnimationDone] = useState(false);
  const initLoad = useRef(true);
  const timeoutRef = useRef<any>();

  useEffect(() => {
    if (!isEmpty(deploymentEnvironment)) {
      dispatch(actions.fetchPresetAndSamples());
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deploymentEnvironment]);

  useEffect(() => {
    if (initLoad.current) {
      initLoad.current = false;
      dispatch(actions.getDeploymentData());
      timeoutRef.current = setTimeout(() => {
        initializeAds().then((response) => {
          dispatch(actions.showAds(response.showAds));
          dispatch(actions.showPersonalisedAds(response.personalisedAds));
        }).finally(() => {
          setLoadingAnimationDone(true);
        });
      }, secondsToMilliseconds(3));
    }

    return () => clearTimeout(timeoutRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!loadingAnimationDone) return <Loading />;

  return (
    <View style={mainStyle.container}>
      <StatusBar hidden />
      <RewardsCountdown />

      <NativeRouter>
        <Backgrounds />
        <Navigation />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/guide" element={(<Guide />)} />
          <Route path="/state-tree" element={<StateTree />} />
          <Route path="/rewarded/:section" element={<Rewarded />} />
        </Routes>

        <AdmobBanner />
      </NativeRouter>
    </View>
  );
}

export default Body;
