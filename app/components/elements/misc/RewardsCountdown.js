// @flow
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hoursToMilliseconds, secondsToMilliseconds } from 'date-fns';
import { get, isEqual } from 'lodash';
import { isRealDevice } from '../../../utils';
import { actions } from '../../../store/globalStore';
import type { ReduxState } from '../../../types';

function RewardsCountdown(): null {
  const dispatch = useDispatch();
  const { resetRewards, rewardedAt }: {resetRewards: number, rewardedAt: number|null} = useSelector((state: ReduxState) => ({
    resetRewards: get(state.cms, isRealDevice ? 'master.resetRewards' : 'master.resetRewardsStaging', 24),
    rewardedAt: state.global.rewardedAt,
  }), isEqual);
  const [time, setTime] = useState(rewardedAt ? rewardedAt + hoursToMilliseconds(resetRewards) - Date.now() : 0);
  const timerRef = useRef(time);

  useEffect(() => {
    if (rewardedAt) {
      timerRef.current = rewardedAt + hoursToMilliseconds(resetRewards) - Date.now();
      setTime(timerRef.current);
    }
  }, [rewardedAt, resetRewards]);

  useEffect(() => {
    const timerId = setInterval(() => {
      timerRef.current -= secondsToMilliseconds(1);

      if (timerRef.current < 0 && rewardedAt) {
        dispatch(actions.lockRewards());
        clearInterval(timerId);
      } else {
        setTime(timerRef.current);
      }
    }, secondsToMilliseconds(1));

    return () => {
      clearInterval(timerId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export default RewardsCountdown;
