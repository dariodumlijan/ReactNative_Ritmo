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
import Select from '../elements/inputs/Select';
import Exit from '../../assets/icons/Exit';
import CountdownTimer from '../elements/misc/CountdownTimer';
import useLocale from '../../locales';
import { useRewardedAd } from '../../utils/hooks';
import { actions, selectors } from '../../store/globalStore';
import { selectors as selectorsCMS } from '../../store/cmsStore';
import mainStyle from '../../styles/main';
import rewardedStyle from '../../styles/rewarded';
import colors from '../../styles/colors';
import type { Sample } from '../../utils/lists';
import type { ReduxState } from '../../types';
import { isRealDevice } from '../../utils';

const Rewarded = (): Node => {
  const { t } = useLocale();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lockedSamples = useSelector(selectors.getLockedSamples, isEqual);
  const {
    personalisedAds, selectedReward, resetRewards, keepRewards, rewardedAt,
  }: {
    personalisedAds: boolean,
    selectedReward: Sample,
    resetRewards: number,
    keepRewards: number,
    rewardedAt: number|null,
  } = useSelector((state: ReduxState) => ({
    personalisedAds: state.global.ui.personalisedAds,
    selectedReward: state.global.ui.selectedReward,
    resetRewards: get(state.cms, isRealDevice ? 'master.resetRewards' : 'master.resetRewardsStaging', 24),
    keepRewards: get(state.cms, isRealDevice ? 'master.keepRewards' : 'master.keepRewardsStaging', 6),
    rewardedAt: state.global.rewardedAt,
  }), isEqual);
  const { rewarded } = useSelector(selectorsCMS.getAdmobIds, isEqual);
  const [openSelect, setOpenSelect] = useState(false);
  const [adLoading, setAdLoading] = useState(true);
  const [rewardsAreRefreshable, setRewardsAreRefreshable] = useState(false);
  const rewardedAd = useRewardedAd(rewarded, personalisedAds);
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
    const isBelowThreshold = currentTime <= hoursToMilliseconds(keepRewards);
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

      {hasAllRewards && (
        <View style={rewardedStyle.countdownWrapper}>
          <CountdownTimer
            style={rewardedStyle.countdownTimer}
            countdownFrom={rewardedAt ? rewardedAt + hoursToMilliseconds(resetRewards) : null}
            onChange={handleCountdown}
          />
          <Text style={rewardedStyle.countdownTxt}>{t('rewarded.countdown')}</Text>
        </View>
      )}

      <View style={rewardedStyle.rewardedCon}>
        {hasAllRewards ? (
          <View style={rewardedStyle.rewardedExp}>
            <Text style={rewardedStyle.rewardedExpText}>
              {t('rewarded.paragraph_3.text_1')}
            </Text>
            <Text style={rewardedStyle.rewardedExp2Text}>
              {t('rewarded.paragraph_3.text_2')}
              <Text style={{ color: colors.orange }}>
                {t('rewarded.paragraph_3.text_3')}
              </Text>
              {t('rewarded.paragraph_3.text_4')}
              <Text style={{ color: colors.orange }}>
                {t('rewarded.paragraph_3.text_5')}
              </Text>
              {t('rewarded.paragraph_3.text_6')}
              <Text style={{ color: colors.orange }}>
                {t('rewarded.paragraph_3.text_7')}
              </Text>
              {t('rewarded.paragraph_3.text_8')}
            </Text>
          </View>
        ) : (
          <>
            <Select
              title={t('rewarded.select_cta')}
              value={selectedReward?.label}
              options={lockedSamples}
              isOpen={openSelect}
              onOpen={() => setOpenSelect(true)}
              onSelect={handleSelect}
            />

            <View style={rewardedStyle.rewardedExp}>
              <Text style={rewardedStyle.rewardedExpText}>
                {t('rewarded.paragraph_1')}
              </Text>
              <Text style={rewardedStyle.rewardedExp2Text}>
                {t('rewarded.paragraph_2.text_1')}
                <Text style={{ color: colors.orange }}>{t('rewarded.paragraph_2.text_2')}</Text>
                {t('rewarded.paragraph_2.text_3')}<Text style={{ color: colors.orange }}>{t('rewarded.paragraph_2.text_4')}</Text>{t('rewarded.paragraph_2.text_5')}
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
};

export default Rewarded;
