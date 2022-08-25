// @flow
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hoursToMilliseconds, secondsToMilliseconds } from 'date-fns';
import { get, isEqual } from 'lodash';
import { isRealDevice } from '../../../utils';
import { useCountdown } from '../../../utils/hooks';
import { actions } from '../../../store/globalStore';
import type { ReduxState } from '../../../types';
import type { RewardedAt } from "../../../store/globalStore";

function RewardsCountdown(): null {
  const dispatch = useDispatch();
  const reduxStates = useSelector((state: ReduxState) => ({
    loadTime: state.static.loadTime,
    resetRewards: hoursToMilliseconds(get(state.cms, isRealDevice ? 'master.resetRewards' : 'master.resetRewardsStaging', 24)),
    rewardedAtSamples: state.global.rewardedAt?.samples,
    rewardedAtPro: state.global.rewardedAt?.pro,
  }), isEqual);
  const startCountdownSamples = reduxStates.rewardedAtSamples ? reduxStates.rewardedAtSamples + reduxStates.resetRewards - reduxStates.loadTime : null;
  const startCountdownPro = reduxStates.rewardedAtPro ? reduxStates.rewardedAtPro + reduxStates.resetRewards - reduxStates.loadTime : null;

  useCountdown(() => {
    dispatch(actions.lockRewards());
  }, startCountdownSamples);

  useCountdown(() => {
    dispatch(actions.lockProFeatures());
  }, startCountdownPro);

  return null;
}

export default RewardsCountdown;
