// @flow
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import InAppReview from 'react-native-in-app-review';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { localStorageKeys } from '../tokens';
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

export const useLocationInfo = (): {
  current: string,
  isHome: boolean,
  isRewarded: boolean,
  isSettings: boolean,
  isGuide: boolean,
} => {
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
