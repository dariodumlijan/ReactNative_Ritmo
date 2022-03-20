// @flow
import React from 'react';
import type { Node } from 'react';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import InAppReview from 'react-native-in-app-review';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocation } from 'react-router-dom';
import { localStorageKeys, admob } from '../tokens';

export const isRealDevice: boolean = !DeviceInfo.isEmulator();
export const isApple: boolean = Platform.OS === 'ios';
export const isPad: boolean = DeviceInfo.isTablet();

// $FlowFixMe
export const isPromise = (p) => !!p && typeof p.then === 'function';

export const useReview = async (unlocked: boolean, reviewDelay: Date) => {
  const available = InAppReview.isAvailable();
  const date = Date.now();
  if (unlocked && reviewDelay <= date) {
    const timestamp = await AsyncStorage.getItem(localStorageKeys.reviewTimestamp);

    if (Number(timestamp) <= date || Number(timestamp) === 0) {
      if (available) {
        InAppReview.RequestInAppReview().then(async (hasFlowFinishedSuccessfully) => {
          if (hasFlowFinishedSuccessfully) {
            const newTimestamp = new Date(date).setMonth(new Date(date).getMonth() + 1).valueOf();
            await AsyncStorage.setItem(
              localStorageKeys.reviewTimestamp,
              JSON.stringify(newTimestamp)
            );
          }
        });
      }
    }
  }
};

export const storeDataToLocal = async (key: string, dataString: string) => {
  await AsyncStorage.setItem(key, dataString);
};

export const useAdmobIds = (adIds: Object): Object => {
  let adId = null;

  const getBannerID = () => {
    if (!adIds) return null;

    if (isApple) {
      adId = isRealDevice ? adIds.banner.ios : admob.banner.ios_test;
    } else {
      adId = isRealDevice ? adIds.banner.android : admob.banner.android_test;
    }

    return adId;
  };

  const getRewardedID = () => {
    if (!adIds) return null;

    if (isApple) {
      adId = isRealDevice ? adIds.rewarded.ios : admob.rewarded.ios_test;
    } else {
      adId = isRealDevice ? adIds.rewarded.android : admob.rewarded.android_test;
    }

    return adId;
  };

  return {
    banner: getBannerID(),
    rewarded: getRewardedID(),
  };
};

export const useLocationInfo = (): Object => {
  const location = useLocation();
  const pathHome = location.pathname === '/';
  const pathRewarded = location.pathname === '/rewarded';
  const pathInfo = location.pathname === '/info';

  return {
    current: location.pathname,
    isHome: pathHome,
    isRewarded: pathRewarded,
    isInfo: pathInfo,
  };
};

export const DismissKeyboard = (children: Node): Node => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);
