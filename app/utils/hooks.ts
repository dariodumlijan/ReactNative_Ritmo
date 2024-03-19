import {
  useContext, useEffect, useRef, useState,
} from 'react';
import { RewardedAd } from 'react-native-google-mobile-ads';
import InAppReview from 'react-native-in-app-review';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { useLocation } from 'react-router-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  addMonths, minutesToMilliseconds, secondsToMilliseconds,
} from 'date-fns';
import { isEqual } from 'lodash';
import { isPromise } from '.';
import { PortalContext } from '../context';
import { selectors } from '../store/globalStore';
import { localStorageKeys } from '../tokens';
import { rewardedKeywords } from '../tokens/keywords';
import type { AppDispatch, RootState } from '../store';

export const getItem = async (key: string): Promise<any> => {
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

export const localStorage = {
  getItem,
  setItem,
  removeItem,
};

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useReview = () => {
  const { loadTime, reviewMinutes, hasUnlockedSample }: {
    loadTime: number,
    reviewMinutes: number,
    hasUnlockedSample: boolean,
  } = useAppSelector((state) => ({
    loadTime: state.static.loadTime,
    reviewMinutes: state.static.reviewMinutes,
    hasUnlockedSample: selectors.hasUnlockedSample(state),
  }), isEqual);
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

export const useLocationInfo = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isRewarded = location.pathname.includes('/rewarded');
  const isSettings = location.pathname === '/settings';
  const isGuide = location.pathname === '/guide';
  const isStateTree = location.pathname === '/state-tree';

  return {
    current: location.pathname,
    isHome,
    isRewarded,
    isSettings,
    isGuide,
    isStateTree,
  };
};

export const useTeleport = () => useContext(PortalContext);

export const useRewardedAd = (
  rewardedId: string,
  showPersonalisedAds?: boolean,
) => {
  const [rewardedAd, setRewardedAd] = useState<RewardedAd | null>(null);

  useEffect(() => {
    const handleNewAd = async () => {
      const response = await RewardedAd.createForAdRequest(rewardedId, {
        requestNonPersonalizedAdsOnly: !showPersonalisedAds,
        keywords: rewardedKeywords,
      });
      setRewardedAd(response);
    };

    if (!rewardedAd || !isPromise(rewardedAd)) handleNewAd();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return rewardedAd;
};

export const useCountdown = (onTimeEnd: Function, countdownFrom?: number) => {
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
