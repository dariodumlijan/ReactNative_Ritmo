// @flow
import {
  useContext, useEffect, useRef, useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import InAppReview from 'react-native-in-app-review';
import { RewardedAd } from 'react-native-google-mobile-ads';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  addMonths, minutesToMilliseconds, secondsToMilliseconds,
} from 'date-fns';
import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { localStorageKeys } from '../tokens';
import { PortalContext } from '../context';
import { isPromise } from '.';
import type { PortalProps } from '../context';
import type { ReduxState } from '../types';
import { selectors } from '../store/globalStore';

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

export const useReview = (): Function => {
  const { loadTime, reviewMinutes, hasUnlockedSample }: {
    loadTime: number,
    reviewMinutes: number,
    hasUnlockedSample: boolean,
  } = useSelector((state: ReduxState) => ({
    loadTime: state.static.loadTime,
    reviewMinutes: state.static.reviewMinutes,
    hasUnlockedSample: selectors.hasUnlockedSample(state),
  }), isEqual);
  const localStorage = useLocalStorage();
  const isAvailable = InAppReview.isAvailable();

  const handleReview = async () => {
    const currentTime = Date.now();
    const reviewEnabled = (loadTime + minutesToMilliseconds(reviewMinutes)) <= currentTime;

    if (!isAvailable) return;

    if (hasUnlockedSample && reviewEnabled) {
      const reviewTimestamp = await localStorage.getItem(localStorageKeys.reviewTimestamp);

      if (!reviewTimestamp || Number(reviewTimestamp) <= currentTime) {
        InAppReview.RequestInAppReview().then((successful) => {
          if (successful) {
            const newTimestamp = addMonths(currentTime, 1).valueOf();
            localStorage.setItem(localStorageKeys.reviewTimestamp, JSON.stringify(newTimestamp));
          }
        });
      }
    }
  };

  return handleReview;
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
  const pathRewarded = location.pathname.includes('/rewarded');
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

export const useRewardedAd = (
  rewardedId: string,
  showPersonalisedAds: boolean,
): Object|null => {
  const [rewardedAd, setRewardedAd] = useState(null);

  useEffect(() => {
    const handleNewAd = async (): Object => {
      const response = await RewardedAd.createForAdRequest(rewardedId, {
        requestNonPersonalizedAdsOnly: !showPersonalisedAds,
      });
      setRewardedAd(response);
    };

    if (!rewardedAd || !isPromise(rewardedAd)) handleNewAd();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return rewardedAd;
};

export const useCountdown = (onTimeEnd: Function, countdownFrom: ?number) => {
  const [time, setTime] = useState(countdownFrom || 0);
  const timerRef = useRef(time);

  useEffect(() => {
    if (countdownFrom) {
      timerRef.current = countdownFrom;
      setTime(timerRef.current);
    }
  }, [countdownFrom]);

  useEffect(() => {
    if (!countdownFrom) return;

    const timerId = setInterval(() => {
      timerRef.current -= secondsToMilliseconds(1);

      if (timerRef.current < 0 && countdownFrom) {
        onTimeEnd();
        clearInterval(timerId);
      } else {
        setTime(timerRef.current);
      }
    }, secondsToMilliseconds(1));

    return () => clearInterval(timerId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
