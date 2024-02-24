// @flow
import { useDispatch, useSelector } from 'react-redux';
import { hoursToMilliseconds } from 'date-fns';
import { isEqual } from 'lodash';
import { useCountdown } from '../../../utils/hooks';
import { actions } from '../../../store/globalStore';
import { config } from '../../../tokens';
import type { ReduxState } from '../../../types';

function RewardsCountdown(): null {
  const dispatch = useDispatch();
  const reduxStates = useSelector((state: ReduxState) => ({
    loadTime: state.static.loadTime,
    rewardedAtSamples: state.global.rewardedAt?.samples,
    rewardedAtPro: state.global.rewardedAt?.pro,
  }), isEqual);
  const resetRewards = hoursToMilliseconds(config.resetRewards);
  const startCountdownSamples = reduxStates.rewardedAtSamples ? reduxStates.rewardedAtSamples + resetRewards - reduxStates.loadTime : null;
  const startCountdownPro = reduxStates.rewardedAtPro ? reduxStates.rewardedAtPro + resetRewards - reduxStates.loadTime : null;

  useCountdown(() => {
    dispatch(actions.lockRewards());
  }, startCountdownSamples);

  useCountdown(() => {
    dispatch(actions.lockProFeatures());
  }, startCountdownPro);

  return null;
}

export default RewardsCountdown;
