// @flow
import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Link, useNavigate } from 'react-router-native';
import { useDispatch, useSelector } from 'react-redux';
import { RewardedAdEventType } from 'react-native-google-mobile-ads';
import { get, isEmpty, isEqual } from 'lodash';
import { hoursToMilliseconds } from 'date-fns';
import Select from '../../elements/inputs/Select';
import Exit from '../../../assets/icons/Exit';
import CountdownTimer from '../../elements/misc/CountdownTimer';
import useLocale from '../../../locales';
import { deviceInfo } from '../../../utils';
import { useRewardedAd } from '../../../utils/hooks';
import { actions, selectors } from '../../../store/globalStore';
import { selectors as selectorsCMS } from '../../../store/cmsStore';
import mainStyle from '../../../styles/main';
import rewardedStyle from '../../../styles/rewarded';
import colors from '../../../styles/colors';
import type { Sample } from '../../../utils/lists';
import type { ReduxState } from '../../../types';

function RewardedSamples(): Node {
  const { t } = useLocale();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lockedSamples = useSelector(selectors.getLockedSamples, isEqual);
  const reduxStates = useSelector((state: ReduxState) => ({
    personalisedAds: state.global.ui.personalisedAds,
    selectedReward: state.global.ui.selectedReward,
    resetRewards: get(state.cms, 'master.resetRewards', 24),
    keepRewards: get(state.cms, 'master.keepRewards', 6),
    rewardedAt: state.global.rewardedAt,
  }), isEqual);
  const { rewarded } = useSelector(selectorsCMS.getAdmobIds, isEqual);
  const [openSelect, setOpenSelect] = useState(false);
  const [adLoading, setAdLoading] = useState(true);
  const [rewardsAreRefreshable, setRewardsAreRefreshable] = useState(false);
  const rewardedAd = useRewardedAd(rewarded, reduxStates.personalisedAds);
  const hasAllRewards = isEmpty(lockedSamples);

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
    const isBelowThreshold = currentTime <= hoursToMilliseconds(reduxStates.keepRewards);
    if (isBelowThreshold && !rewardsAreRefreshable) setRewardsAreRefreshable(true);
  };

  return (
    <SafeAreaView style={mainStyle.safe}>
      <Link
        to="/settings"
        style={mainStyle.exit}
        underlayColor={null}
        disabled={openSelect}
      >
        <Exit fill={colors.gray} />
      </Link>

      {reduxStates.rewardedAt.samples && (
        <View style={[rewardedStyle.countdownWrapper, {
          marginBottom: deviceInfo.isiPhone ? 0 : '-20%',
        }]}
        >
          <CountdownTimer
            style={rewardedStyle.countdownTimer}
            countdownFrom={reduxStates.rewardedAt.samples ? reduxStates.rewardedAt.samples + hoursToMilliseconds(reduxStates.resetRewards) : null}
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
                {reduxStates.resetRewards}{t('rewarded.samples.paragraph_3.text_3')}
              </Text>
              {t('rewarded.samples.paragraph_3.text_4')}
              <Text style={{ color: colors.orange }}>
                {t('rewarded.samples.paragraph_3.text_5')}
              </Text>
              {t('rewarded.samples.paragraph_3.text_6')}
              <Text style={{ color: colors.orange }}>
                {reduxStates.keepRewards}{t('rewarded.samples.paragraph_3.text_7')}
              </Text>
              {t('rewarded.samples.paragraph_3.text_8')}
            </Text>
          </View>
        ) : (
          <>
            <Select
              title={t('rewarded.samples.select_cta')}
              value={reduxStates.selectedReward?.label}
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
                  {reduxStates.resetRewards}{t('rewarded.samples.paragraph_2.text_2')}
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
