// @flow
import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import { StatusBar, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NativeRouter, Routes, Route } from 'react-router-native';
import {
  BannerAd,
  // requestPermissionsAsync,
  // getPermissionsAsync,
} from '@react-native-firebase/admob';
import { getTrackingStatus, requestTrackingPermission } from 'react-native-tracking-transparency';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get, isEqual } from 'lodash';
import Home from './screens/Home';
import Settings from './screens/Settings';
import Library from './screens/Library';
import Guide from './screens/Guide';
import Rewarded from './screens/Rewarded';
import Announcement from './screens/Announcement';
import Loading from './screens/Loading';
import Navigation from './blocks/Navigation';
import Backgrounds from './elements/Backgrounds';
import { actions } from '../store/cmsStore';
import { isRealDevice, useAdmobIds } from '../utils';
import { appKeys, localStorageKeys } from '../tokens';
import mainStyle from '../styles/main_style';

function Body(): Node {
  const dispatch = useDispatch();
  const [initLoad, setInitLoad] = useState(true);
  const cms = useSelector((state) => state.cms, isEqual);
  const global = useSelector((state) => state.global, isEqual);
  const admobId = useAdmobIds(get(cms, 'master.adIds', null)).banner;
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [ads, setAds] = useState(false);
  // const [personalised, setPersonalised] = useState(false);

  const localTimestamps = get(cms, 'timestamps.local', 0);
  const onlineTimestamps = get(cms, 'timestamps.online', null);
  const checkStamps = JSON.stringify(localTimestamps) === JSON.stringify(onlineTimestamps);
  const announcementSeen =
    get(cms, 'timestamps.local.announcement', 0) < get(cms, 'timestamps.announcement', 0);
  const displayAds = isRealDevice
    ? get(cms, 'master.ads', false)
    : get(cms, 'master.adsStaging', false);
  const loading = !['master', 'samples'].every((key) => key in cms);
  const hasAnnouncement = get(cms, 'announcement.content', null);

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
    if (loading) {
      const handleLocalStorage = async () => {
        const res = await AsyncStorage.getItem(localStorageKeys.appContent);
        dispatch(actions.storeLocalCMS(JSON.parse(res)));
      };

      const localCheck = localTimestamps && localTimestamps !== appKeys.noLocalData;
      const onlineCheck = onlineTimestamps && onlineTimestamps !== appKeys.noConnection;

      if (
        (localCheck && onlineCheck && !checkStamps) ||
        (localTimestamps === appKeys.noLocalData && onlineCheck)
      ) {
        dispatch(actions.fetchCMS(onlineTimestamps));
      }

      if (
        (localCheck && onlineCheck && checkStamps) ||
        (localCheck && onlineTimestamps === appKeys.noConnection)
      ) {
        handleLocalStorage();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localTimestamps, onlineTimestamps, checkStamps]);

  useEffect(() => {
    if (initLoad) {
      dispatch(actions.checkTimestamps());
      setTimeout(askForPermission, 1000);
      setInitLoad(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initLoad]);

  if (
    (localTimestamps === appKeys.noLocalData && onlineTimestamps === appKeys.noConnection) ||
    (hasAnnouncement && !announcementSeen && showAnnouncement)
  ) {
    return (
      <Announcement
        reload={() => dispatch(actions.checkTimestamps())}
        dismiss={() => setShowAnnouncement(false)}
        cms={hasAnnouncement}
      />
    );
  }

  if (loading) return <Loading />;

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
          <Route
            exact
            path="/guide"
            element={
              <Guide
                sliderMin={global.sliderMin}
                sliderMax={global.sliderMax}
                sliderStep={global.sliderStep}
              />
            }
          />
          <Route path="/rewarded" element={<Rewarded />} />
        </Routes>
      </NativeRouter>

      <View style={mainStyle.ads}>
        {ads && displayAds && admobId && global.showBanner && (
          <BannerAd
            size="smartBannerPortrait"
            unitId={admobId}
            // servePersonalizedAds={personalised}
          />
        )}
      </View>
    </View>
  );
}

export default Body;
