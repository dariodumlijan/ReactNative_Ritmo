// @flow
import React, { useEffect, useRef, useState } from 'react';
import type { Node } from 'react';
import { StatusBar, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NativeRouter, Routes, Route } from 'react-router-native';
import { isEmpty, isEqual } from 'lodash';
import { secondsToMilliseconds } from 'date-fns';
import Home from './screens/Home';
import Settings from './screens/Settings';
import Library from './screens/Library';
import Guide from './screens/Guide';
import StateTree from './screens/StateTree';
import Rewarded from './screens/Rewarded';
import Loading from './screens/Loading';
import Navigation from './blocks/navigation/Navigation';
import Backgrounds from './elements/backgrounds/Backgrounds';
import RewardsCountdown from './elements/misc/RewardsCountdown';
import AdmobBanner from './elements/misc/AdmobBanner';
import { actions } from '../store/globalStore';
import { initializeAds } from '../utils';
import mainStyle from '../styles/main';
import type { ReduxState } from '../types';

function Body(): Node {
  const dispatch = useDispatch();
  const initLoad = useRef(true);
  const deploymentEnvironment = useSelector((state: ReduxState) => state.global.codepushData?.environment, isEqual);
  const [loadingAnimationDone, setLoadingAnimationDone] = useState(false);

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
      setTimeout(() => {
        initializeAds().then((response) => {
          dispatch(actions.showAds(response.showAds));
          dispatch(actions.showPersonalisedAds(response.personalisedAds));
        }).finally(() => {
          setLoadingAnimationDone(true);
        });
      }, secondsToMilliseconds(3));
    }

    return () => clearTimeout();
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
          <Route exact path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/library" element={<Library />} />
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
