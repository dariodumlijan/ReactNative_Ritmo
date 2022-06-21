// @flow
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import InAppReview from 'react-native-in-app-review';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { localStorageKeys, admob } from '../tokens';
import { isApple, isRealDevice } from '.';
import { PortalContext } from '../context';
import type { PortalProps } from '../context';

export const getItem = async (key: string): any => {
  try {
    const response = await AsyncStorage.getItem(key);

    return response;
  } catch (error) {
    Promise.reject(error);
  }
};

export const setItem = async (key: string, data: string) => {
  try {
    await AsyncStorage.setItem(key, data);
  } catch (error) {
    Promise.reject(error);
  }
};

export const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    Promise.reject(error);
  }
};

export const useLocalStorage = (): {
  getItem: Function,
  setItem: Function,
  removeItem: Function,
} => ({
  getItem,
  setItem,
  removeItem,
});

export const useReview = (unlocked: boolean, reviewDelay: Date) => {
  const localStorage = useLocalStorage();
  const available = InAppReview.isAvailable();
  const date = Date.now();
  if (unlocked && reviewDelay <= date) {
    const timestamp = localStorage.getItem(localStorageKeys.reviewTimestamp);

    if (Number(timestamp) <= date || Number(timestamp) === 0) {
      if (available) {
        InAppReview.RequestInAppReview().then((hasFlowFinishedSuccessfully) => {
          if (hasFlowFinishedSuccessfully) {
            const newTimestamp = new Date(date).setMonth(new Date(date).getMonth() + 1).valueOf();
            localStorage.setItem(localStorageKeys.reviewTimestamp, JSON.stringify(newTimestamp));
          }
        });
      }
    }
  }
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
  const pathSettings = location.pathname === '/settings';
  const pathGuide = location.pathname === '/guide';

  return {
    current: location.pathname,
    isHome: pathHome,
    isRewarded: pathRewarded,
    isSettings: pathSettings,
    isGuide: pathGuide,
  };
};

export const useTeleport = (): PortalProps => useContext(PortalContext);
