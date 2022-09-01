// @flow
import { useDispatch, useSelector } from 'react-redux';
import { hoursToMilliseconds } from 'date-fns';
import { get, isEqual } from 'lodash';
import { useCountdown } from '../../../utils/hooks';
import { actions } from '../../../store/globalStore';
import type { ReduxState } from '../../../types';

function RewardsCountdown(): null {
  const dispatch = useDispatch();
  const reduxStates = useSelector((state: ReduxState) => ({
    loadTime: state.static.loadTime,
    resetRewards: hoursToMilliseconds(get(state.cms, 'master.resetRewards', 24)),
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
