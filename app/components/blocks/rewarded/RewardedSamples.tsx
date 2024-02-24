import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RewardedAdEventType } from 'react-native-google-mobile-ads';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-native';
import { hoursToMilliseconds } from 'date-fns';
import { isEmpty, isEqual } from 'lodash';
import Exit from '../../../assets/icons/Exit';
import useLocale from '../../../locales';
import { actions, selectors } from '../../../store/globalStore';
import colors from '../../../styles/colors';
import mainStyle from '../../../styles/main';
import rewardedStyle from '../../../styles/rewarded';
import { config } from '../../../tokens';
import { deviceInfo } from '../../../utils';
import { useRewardedAd } from '../../../utils/hooks';
import Select from '../../elements/inputs/Select';
import CountdownTimer from '../../elements/misc/CountdownTimer';
import type { ReduxState } from '../../../types';
import type { Sample } from '../../../utils/lists';

function RewardedSamples() {
  const { t } = useLocale();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lockedSamples = useSelector(selectors.getLockedSamples, isEqual);
  const reduxStates = useSelector((state: ReduxState) => ({
    personalisedAds: state.global.ui.personalisedAds,
    selectedReward: state.global.ui.selectedReward,
    rewardedAt: state.global.rewardedAt,
  }), isEqual);
  const { rewarded } = useSelector(selectors.getAdmobIds, isEqual);
  const [openSelect, setOpenSelect] = useState(false);
  const [adLoading, setAdLoading] = useState(true);
  const [rewardsAreRefreshable, setRewardsAreRefreshable] = useState(false);
  const rewardedAd = useRewardedAd(rewarded, reduxStates.personalisedAds);
  const hasAllRewards = isEmpty(lockedSamples);
  const { resetRewards, keepRewards } = config;

  useEffect(() => {
    if (rewardedAd) {
      rewardedAd.addAdEventListener(
        RewardedAdEventType.LOADED, () => {
          setAdLoading(false);
        });

      rewardedAd.addAdEventListener(
        RewardedAdEventType.EARNED_REWARD, () => {
          if (hasAllRewards) {
            dispatch(actions.refreshRewards());
          } else {
            dispatch(actions.unlockReward());
          }
          navigate('/settings');
        },
      );

      rewardedAd.load();
    }

    return () => {
      rewardedAd?.removeAllListeners();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rewardedAd]);

  const requestReward = () => {
    rewardedAd?.show();
  };

  const handleSelect = (sample: Sample) => {
    dispatch(actions.updateSelectedReward(sample));
    setOpenSelect(false);
  };

  const handleCountdown = (currentTime: number) => {
    const isBelowThreshold = currentTime <= hoursToMilliseconds(keepRewards);
    if (isBelowThreshold && !rewardsAreRefreshable) setRewardsAreRefreshable(true);
  };

  return (
    <SafeAreaView style={mainStyle.safe}>
      <Link
        to="/settings"
        style={mainStyle.exit}
        underlayColor={colors.transparent}
        disabled={openSelect}
      >
        <Exit fill={colors.gray} />
      </Link>

      {reduxStates.rewardedAt?.samples && (
      <View style={[rewardedStyle.countdownWrapper, {
        marginBottom: deviceInfo.isiPhone ? 0 : '-20%',
      }]}
      >
        <CountdownTimer
          style={rewardedStyle.countdownTimer}
          countdownFrom={reduxStates.rewardedAt.samples ? reduxStates.rewardedAt.samples + hoursToMilliseconds(resetRewards) : null}
          onChange={handleCountdown}
        />
        <Text style={rewardedStyle.countdownTxt}>{t('rewarded.samples.countdown')}</Text>
      </View>
      )}

      <View style={[rewardedStyle.rewardedCon, {
        marginTop: deviceInfo.isiPhone ? 0 : '20%',
      }]}
      >
        {hasAllRewards ? (
          <View style={rewardedStyle.rewardedExp}>
            <Text style={rewardedStyle.rewardedExpText}>
              {t('rewarded.samples.paragraph_3.text_1')}
            </Text>
            <Text style={rewardedStyle.rewardedExp2Text}>
              {t('rewarded.samples.paragraph_3.text_2')}
              <Text style={{ color: colors.orange }}>
                {resetRewards}{t('rewarded.samples.paragraph_3.text_3')}
              </Text>
              {t('rewarded.samples.paragraph_3.text_4')}
              <Text style={{ color: colors.orange }}>
                {t('rewarded.samples.paragraph_3.text_5')}
              </Text>
              {t('rewarded.samples.paragraph_3.text_6')}
              <Text style={{ color: colors.orange }}>
                {keepRewards}{t('rewarded.samples.paragraph_3.text_7')}
              </Text>
              {t('rewarded.samples.paragraph_3.text_8')}
            </Text>
          </View>
        ) : (
          <>
            <Select
              title={t('rewarded.samples.select_cta')}
              value={reduxStates.selectedReward?.label || ''}
              options={lockedSamples}
              isOpen={openSelect}
              onOpen={() => setOpenSelect(true)}
              onClose={() => setOpenSelect(false)}
              onSelect={handleSelect}
            />

            <View style={rewardedStyle.rewardedExp}>
              <Text style={rewardedStyle.rewardedExpText}>
                {t('rewarded.samples.paragraph_1')}
              </Text>
              <Text style={rewardedStyle.rewardedExp2Text}>
                {t('rewarded.samples.paragraph_2.text_1')}
                <Text style={{ color: colors.orange }}>
                  {resetRewards}{t('rewarded.samples.paragraph_2.text_2')}
                </Text>
                {t('rewarded.samples.paragraph_2.text_3')}<Text style={{ color: colors.orange }}>{t('rewarded.samples.paragraph_2.text_4')}</Text>{t('rewarded.samples.paragraph_2.text_5')}
              </Text>
            </View>
          </>
        )}
        <TouchableOpacity
          activeOpacity={1}
          style={adLoading || (hasAllRewards && !rewardsAreRefreshable) ? rewardedStyle.rewardedDisabled : rewardedStyle.rewardedStart}
          disabled={adLoading || openSelect || (hasAllRewards && !rewardsAreRefreshable)}
          onPress={requestReward}
        >
          {adLoading ? (
            <ActivityIndicator size="large" color={colors.grayLight} />
          ) : (
            <Text style={rewardedStyle.rewardedStartText}>{t('rewarded.cta')}</Text>
          )}
        </TouchableOpacity>
        <Text style={rewardedStyle.rewardedDisc}>{t('rewarded.disclamer')}</Text>
      </View>
    </SafeAreaView>
  );
}

export default RewardedSamples;
