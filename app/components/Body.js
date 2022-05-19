// @flow
import React, { useEffect, useRef, useState } from 'react';
import type { Node } from 'react';
import { StatusBar, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NativeRouter, Routes, Route } from 'react-router-native';
// import {
//   BannerAd,
//   // requestPermissionsAsync,
//   // getPermissionsAsync,
// } from '@react-native-firebase/admob';
import { getTrackingStatus, requestTrackingPermission } from 'react-native-tracking-transparency';
import { get, isEqual, every, has } from 'lodash';
import Home from './screens/Home';
import Settings from './screens/Settings';
import Library from './screens/Library';
import Guide from './screens/Guide';
import Rewarded from './screens/Rewarded';
import Announcement from './screens/Announcement';
import Loading from './screens/Loading';
import Navigation from './blocks/Navigation';
import Backgrounds from './elements/backgrounds/Backgrounds';
import { actions as cmsActions } from '../store/cmsStore';
import { actions as globalActions } from '../store/globalStore';
import { isRealDevice, useAdmobIds } from '../utils';
import { appKeys } from '../tokens';
import mainStyle from '../styles/main_style';

function Body(): Node {
  const dispatch = useDispatch();
  const initLoad = useRef(true);
  const cms = useSelector((state) => state.cms, isEqual);
  const global = useSelector((state) => state.global, isEqual);
  const admobId = useAdmobIds(get(cms, 'master.adIds', null)).banner;
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [ads, setAds] = useState(false);
  const [showNav, setShowNav] = useState(false);
  // const [personalised, setPersonalised] = useState(false);

  const localTimestamps = get(cms, 'timestamps.local', 0);
  const onlineTimestamps = get(cms, 'timestamps.online', null);
  const hasAnnouncement = get(cms, 'announcement.content');
  const hasLocalData = !isEqual(localTimestamps, appKeys.noLocalData);
  const hasOnlineData = !isEqual(onlineTimestamps, appKeys.noConnection);
  const announcementSeen =
    get(cms, 'timestamps.local.announcement', 0) < get(cms, 'timestamps.announcement', 0);
  const isLoading = every(['master', 'timestamps'], (key) => !has(cms, key));
  const displayAds = isRealDevice
    ? get(cms, 'master.ads', false)
    : get(cms, 'master.adsStaging', false);

  const askForPermission = async () => {
    const status = await getTrackingStatus();
    if (status === 'authorized' || status === 'unavailable') {
      // setPersonalised(true);
      setAds(true);
    } else {
      const newStatus = await requestTrackingPermission();
      if (newStatus === 'authorized' || newStatus === 'unavailable') {
        // setPersonalised(true);
      }
      setAds(true);
    }
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
    (!hasLocalData && !hasOnlineData) ||
    (hasAnnouncement && !announcementSeen && showAnnouncement)
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
        <Navigation visible={showNav} exit={() => setShowNav(false)} />

        <Routes>
          <Route exact path="/" element={<Home openNav={() => setShowNav(true)} />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/library" element={<Library />} />
          <Route
            exact
            path="/guide"
            element={
              <Guide
                sliderMin={global.static.sliderMin}
                sliderMax={global.static.sliderMax}
                sliderStep={global.static.sliderStep}
              />
            }
          />
          <Route path="/rewarded" element={<Rewarded />} />
        </Routes>
      </NativeRouter>

      <View style={mainStyle.ads}>
        {ads && displayAds && admobId && global.showBanner && (
          <></>
          // <BannerAd
          //   size="smartBannerPortrait"
          //   unitId={admobId}
          //   // servePersonalizedAds={personalised}
          // />
        )}
      </View>
    </View>
  );
}

export default Body;
