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
  const unlockableSamples = useSelector(selectors.getLockedSamples, isEqual);
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
    resetRewards: get(state.cms, isRealDevice ? 'master.resetRewards' : 'master.resetRewardsStaging', 0),
    keepRewards: get(state.cms, isRealDevice ? 'master.keepRewards' : 'master.keepRewardsStaging', 0),
    rewardedAt: state.global.rewardedAt,
  }), isEqual);
  const { rewarded } = useSelector(selectorsCMS.getAdmobIds, isEqual);
  const [openSelect, setOpenSelect] = useState(false);
  const [adLoading, setAdLoading] = useState(true);
  const [rewardsAreRefreshable, setRewardsAreRefreshable] = useState(false);
  const rewardedAd = useRewardedAd(rewarded, personalisedAds);
  const hasAllRewards = isEmpty(unlockableSamples);

  useEffect(() => {
    if (rewardedAd) {
      rewardedAd.addAdEventListener(
        RewardedAdEventType.LOADED, () => {
          setAdLoading(false);
        });

      // rewardedAd.addAdEventListener(
      //   RewardedAdEventType.CLOSED, () => {
      //     navigate('/settings');
      //   });

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

  /* Reset/Lock Rewards & Timer - Function */
  // async function lockRewards() {
  //   clearInterval(tickVariable);
  //   timerUpdate.hours = 0;
  //   timerUpdate.minutes = 0;
  //   timerUpdate.seconds = 0;

  //   await AsyncStorage.removeItem('timerStart');
  //   await AsyncStorage.removeItem('countdownTime');
  //   await AsyncStorage.removeItem('unlockedRewards');
  //   timerStart = false;
  //   setCountdownStart(timerStart);

  //   for (let i = 0; i < soundList.length; i++) {
  //     if (i <= 2) {
  //       soundList[i].disabled = false;
  //     } else {
  //       soundList[i].disabled = true;
  //     }
  //   }
  //   unlockedSamples = soundList.map(({ disabled }) => disabled);

  //   rewardList = [];
  //   for (let i = 0; i < soundList.length; i++) {
  //     if (soundList[i].disabled === true) {
  //       rewardList.push(soundList[i]);
  //     }
  //   }

  //   if (rewardList.length === undefined || rewardList.length === 0) {
  //     rewardListName = 'N/A';
  //     disableList = true;
  //   } else {
  //     rewardListName = rewardList[0].name;
  //   }
  //   setSelectedRewardName(rewardListName);
  //   rewardIndex = soundList.findIndex((obj) => obj.name === rewardListName);
  // }

  const requestReward = () => {
    rewardedAd?.show();
  };

  const handleSelect = (sample: Sample) => {
    dispatch(actions.updateSelectedReward(sample));
    setOpenSelect(false);
  };

  const handleCountdown = (currentTime: number) => {
    const isBelowThreshold = currentTime <= hoursToMilliseconds(keepRewards);
    if (currentTime === 0) {
      dispatch(actions.lockRewards());

      return;
    }
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
              options={unlockableSamples}
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
