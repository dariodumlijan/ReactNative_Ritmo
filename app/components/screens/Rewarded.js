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
import { RewardedAd, RewardedAdEventType } from 'react-native-google-mobile-ads';
import { get, isEqual } from 'lodash';
import Select from '../elements/inputs/Select';
import Exit from '../../assets/icons/Exit';
import useLocale from '../../locales';
import { actions, selectors } from '../../store/globalStore';
import { selectors as selectorsCMS } from '../../store/cmsStore';
import mainStyle from '../../styles/main';
import rewardedStyle from '../../styles/rewarded';
import colors from '../../styles/colors';
import type { Sample } from '../../utils/lists';
import type { ReduxState } from '../../types';

const Rewarded = (): Node => {
  const { t } = useLocale();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const unlockableSamples = useSelector(selectors.getUnlockableSamples, isEqual);
  const personalisedAds = useSelector((state: ReduxState) => state.global.ui.personalisedAds, isEqual);
  const { rewarded } = useSelector(selectorsCMS.getAdmobIds, isEqual);
  const [selectedReward, setSelectedReward] = useState(get(unlockableSamples, [0], null));
  const [openSelect, setOpenSelect] = useState(false);
  const [adLoading, setAdLoading] = useState(false);
  const [rewardEarned, setRewardEarned] = useState(false);
  const [isInCountdown, setIsInCountdown] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const rewardedAd = RewardedAd.createForAdRequest(rewarded, {
    requestNonPersonalizedAdsOnly: personalisedAds,
    keywords: ['music'],
  });

  useEffect(() => {
    const unsubscribeLoaded = rewardedAd.addAdEventListener(
      RewardedAdEventType.LOADED, () => {
        setAdLoading(false);
        rewardedAd.show();
      });

    const unsubscribeEarned = rewardedAd.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD, (reward) => {
        // console.log('User earned reward of ', reward);
        dispatch(actions.unlockSample(selectedReward.label));
        setRewardEarned(true);
      },
    );

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (rewardEarned) navigate('/settings');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rewardEarned]);

  // /* Register Reward Variables */
  // const rewardList = [];
  // let rewardEarned = false;
  // let disableList = false;

  // /* Create Rewards List */
  // forEach(soundList, (sound) => {
  //   if (sound.disabled === true) {
  //     rewardList.push(sound);
  //   }
  // });

  // /* Check if Rewards List Empty */
  // if (rewardList.length === undefined || rewardList.length === 0) {
  //   rewardListName = 'N/A';
  //   disableList = true;
  // } else {
  //   rewardListName = rewardList[0].name;
  // }

  /* Rewarded Screen onLoad */
  // useEffect(() => {
  //   setHrs(('0' + timerUpdate.hours).slice(-2));
  //   setMins(('0' + timerUpdate.minutes).slice(-2));
  //   setSecs(('0' + timerUpdate.seconds).slice(-2));
  //   checkTimerStart();
  //   setSelectedRewardName(rewardListName);
  //   rewardIndex = soundList.findIndex((obj) => obj.name === rewardListName);
  // }, []);

  /* Check if Timer is Null - Function */
  // async function checkTimerStart() {
  //   timerStart = await AsyncStorage.getItem('timerStart');

  //   if (timerStart !== null) {
  //     timerStart = true;
  //     setCountdownStart(timerStart);
  //     checkRewardCountdown();
  //   } else {
  //     timerStart = false;
  //     setCountdownStart(timerStart);
  //   }
  //   checkSoundList();
  // }

  /* Check Countdown time - Function */
  // async function checkRewardCountdown() {
  //   const countdownDate = JSON.parse(await AsyncStorage.getItem('countdownTime'));

  //   const currentDate = new Date().valueOf();
  //   const timeDiff = countdownDate - currentDate;
  //   ms2Time(timeDiff);

  //   if (timeDiff <= 0) {
  //     lockRewards();
  //   } else {
  //     tickVariable = setInterval(() => tick(), 1000);
  //   }
  // }

  /* Countdown tick Interval - Function */
  // function tick() {
  //   if (timerUpdate.hours === 0 && timerUpdate.minutes === 0 && timerUpdate.seconds === 0) {
  //     lockRewards();
  //   } else if (timerUpdate.hours <= -1 || timerUpdate.minutes <= -1 || timerUpdate.seconds <= -1) {
  //     clearInterval(tickVariable);
  //     checkRewardCountdown();
  //   } else if (timerUpdate.minutes === 0 && timerUpdate.seconds === 0) {
  //     const calcTime = timerUpdate.hours - 1;
  //     timerUpdate.hours = calcTime;
  //     timerUpdate.minutes = 59;
  //     timerUpdate.seconds = 59;
  //   } else if (timerUpdate.seconds === 0) {
  //     const calcTime = timerUpdate.minutes - 1;
  //     timerUpdate.minutes = calcTime;
  //     timerUpdate.seconds = 59;
  //   } else {
  //     const calcTime = timerUpdate.seconds - 1;
  //     timerUpdate.seconds = calcTime;
  //   }

  //   setHrs(('0' + timerUpdate.hours).slice(-2));
  //   setMins(('0' + timerUpdate.minutes).slice(-2));
  //   setSecs(('0' + timerUpdate.seconds).slice(-2));
  // }

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

  /* Check what Reward Content to Show - Function */
  // function checkSoundList() {
  //   for (let i = 0; i < soundList.length; i++) {
  //     if (soundList[i].disabled === true) {
  //       rewardDisabled = false;
  //       break;
  //     } else {
  //       rewardDisabled = true;
  //     }
  //   }
  //   if (rewardDisabled) {
  //     refreshEnabled = true;
  //     setRefresh(refreshEnabled);
  //   }
  // }

  const requestReward = () => {
    setAdLoading(true);
    rewardedAd.load();
  };

  /* Reset Rewarded Loading Animation - Function */
  // function resetRewarded() {
  //   if (adLoading && !rewardEarned) {
  //     setTimeout(() => {
  //       setLoadRewarded(false);
  //     }, 10000);
  //   }
  // }

  const handleSelect = (sample: Sample) => {
    setSelectedReward(sample);
    setOpenSelect(false);
  };

  /* Give Sound Reward - Function */
  // async function unlockSamples() {
  //   await AsyncStorage.removeItem('timerStart');
  //   await AsyncStorage.removeItem('countdownTime');
  //   await AsyncStorage.removeItem('unlockedRewards');

  //   const countdownDate = new Date().valueOf() + countdownHours * 36e5;
  //   await AsyncStorage.setItem('countdownTime', JSON.stringify(countdownDate));

  //   timerStart = true;
  //   await AsyncStorage.setItem('timerStart', JSON.stringify(timerStart));

  //   soundList[rewardIndex].disabled = false;
  //   unlockedSamples = soundList.map(({ disabled }) => disabled);
  //   await AsyncStorage.setItem('unlockedRewards', JSON.stringify(unlockedSamples));

  //   rewardEarned = true;
  //   rewardedCallback(false);
  // }

  // /* Refresh Reward Timer - Function */
  // async function refreshCount() {
  //   await AsyncStorage.removeItem('timerStart');
  //   await AsyncStorage.removeItem('countdownTime');

  //   const countdownDate = new Date().valueOf() + countdownHours * 36e5;
  //   await AsyncStorage.setItem('countdownTime', JSON.stringify(countdownDate));

  //   timerStart = true;
  //   await AsyncStorage.setItem('timerStart', JSON.stringify(timerStart));

  //   rewardEarned = true;
  //   rewardedCallback(false);
  // }

  return (
    <SafeAreaView style={mainStyle.safe}>
      <Link
        to="/settings"
        style={mainStyle.exit}
        underlayColor={null}
        disabled={adLoading || openSelect}
      >
        <Exit fill={!adLoading ? colors.gray : colors.grayBlue} />
      </Link>

      {isInCountdown && (
        <View style={rewardedStyle.countdownWrapper}>
          <Text style={rewardedStyle.countdownTimer}>12:00:00</Text>
          <Text style={rewardedStyle.countdownTxt}>{t('rewarded.countdown')}</Text>
        </View>
      )}

      <View style={rewardedStyle.rewardedCon}>
        {refresh ? (
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
          style={adLoading ? rewardedStyle.rewardedDisabled : rewardedStyle.rewardedStart}
          disabled={adLoading || openSelect}
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
