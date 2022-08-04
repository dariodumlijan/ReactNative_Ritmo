// @flow
import React, { useEffect, useRef, useState } from 'react';
import type { Node } from 'react';
import { StatusBar, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NativeRouter, Routes, Route } from 'react-router-native';
import Admob, { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { getTrackingStatus, requestTrackingPermission } from 'react-native-tracking-transparency';
import {
  get, isEqual, every, has,
} from 'lodash';
import Home from './screens/Home';
import Settings from './screens/Settings';
import Library from './screens/Library';
import Guide from './screens/Guide';
import Rewarded from './screens/Rewarded';
import Announcement from './screens/Announcement';
import Loading from './screens/Loading';
import Navigation from './blocks/navigation/Navigation';
import Backgrounds from './elements/backgrounds/Backgrounds';
import { actions as cmsActions, selectors } from '../store/cmsStore';
import { actions as globalActions } from '../store/globalStore';
import { isRealDevice } from '../utils';
import { appKeys } from '../tokens';
import mainStyle from '../styles/main';
import type { State as StateCMS } from '../store/cmsStore';
import type { State as StateGlobal } from '../store/globalStore';

function Body(): Node {
  const dispatch = useDispatch();
  const initLoad = useRef(true);
  const cms: StateCMS = useSelector(selectors.getCMS, isEqual);
  const global: StateGlobal = useSelector((state) => state.global, isEqual);
  const { banner } = useSelector(selectors.getAdmobIds, isEqual);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [adsReady, setAdsReady] = useState(false);

  const localTimestamps = get(cms, 'timestamps.local', 0);
  const onlineTimestamps = get(cms, 'timestamps.online', null);
  const hasAnnouncement = get(cms, 'announcement.content');
  const hasLocalData = !isEqual(localTimestamps, appKeys.noLocalData);
  const hasOnlineData = !isEqual(onlineTimestamps, appKeys.noConnection);
  const announcementSeen = get(cms, 'timestamps.local.announcement', 0) < get(cms, 'timestamps.announcement', 0);
  const isLoading = every(['master', 'timestamps'], (key) => !has(cms, key));
  const displayAds = isRealDevice
    ? get(cms, 'master.ads', false)
    : get(cms, 'master.adsStaging', false);

  const startAds = () => {
    Admob().initialize().then(() => {
      setAdsReady(true);
    });
  };

  const askForPermission = async () => {
    const status = await getTrackingStatus();
    if (status === 'authorized' || status === 'unavailable') {
      dispatch(globalActions.showPersonalisedAds(true));
    } else {
      const newStatus = await requestTrackingPermission();
      if (newStatus === 'authorized' || newStatus === 'unavailable') {
        dispatch(globalActions.showPersonalisedAds(true));
      }
    }
    startAds();
  };

  useEffect(() => {
    if (initLoad.current) {
      dispatch(cmsActions.fetchCMS());
      dispatch(globalActions.fetchPresetAndSamples());
      setTimeout(askForPermission, 1000);
      initLoad.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (
    (!hasLocalData && !hasOnlineData)
    || (hasAnnouncement && !announcementSeen && showAnnouncement)
  ) {
    return (
      <Announcement
        reload={() => dispatch(cmsActions.fetchCMS())}
        dismiss={() => setShowAnnouncement(false)}
        cms={hasAnnouncement}
      />
    );
  }

  if (isLoading) return <Loading />;

  return (
    <View style={mainStyle.container}>
      <StatusBar hidden />

      <NativeRouter>
        <Backgrounds />
        <Navigation />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/library" element={<Library />} />
          <Route path="/guide" element={(<Guide />)} />
          <Route path="/rewarded" element={<Rewarded />} />
        </Routes>
      </NativeRouter>

      <View style={mainStyle.ads}>
        {adsReady && displayAds && banner && global.ui.showBanner && (
          <BannerAd
            unitId={banner}
            size={BannerAdSize.FLUID}
            requestOptions={{
              requestNonPersonalizedAdsOnly: !global.ui.personalisedAds,
            }}
          />
        )}
      </View>
    </View>
  );
}

export default Body;
