import InAppReview from 'react-native-in-app-review';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { useLocation } from 'react-router-native';
import { localStorageKeys } from '@tokens';
import { addMonths, minutesToMilliseconds } from 'date-fns';
import { isEqual } from 'lodash';
import { localStorage } from './localStorage';
import type { AppDispatch, RootState } from '@store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useReview = () => {
  const { loadTime, reviewMinutes } = useAppSelector((state) => ({
    loadTime: state.static.loadTime as number,
    reviewMinutes: state.static.reviewMinutes as number,
  }), isEqual);
  const isAvailable = InAppReview.isAvailable();

  const handleReview = async () => {
    const currentTime = Date.now();
    const reviewEnabled = (loadTime + minutesToMilliseconds(reviewMinutes)) <= currentTime;

    if (!isAvailable) return;

    if (reviewEnabled) {
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
  const isSettings = location.pathname === '/settings';
  const isGuide = location.pathname === '/guide';
  const isDev = location.pathname === '/dev';

  return {
    current: location.pathname,
    isHome,
    isSettings,
    isGuide,
    isDev,
  };
};
