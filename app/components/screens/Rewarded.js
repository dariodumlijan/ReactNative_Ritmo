// @flow
import React, { useState } from 'react';
import type { Node } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Link } from 'react-router-native';
import { useSelector } from 'react-redux';
import { get, isEqual, } from 'lodash';
import Select from '../elements/inputs/Select';
import Exit from "../../assets/icons/Exit";
import useLocale from '../../locales';
import { selectors } from "../../store/globalStore";
import mainStyles from '../../styles/main_style';
import styles from '../../styles/styles';
import colors from '../../styles/colors';
import type { Sample } from "../../utils/lists";

const Rewarded = (): Node => {
  const { t } = useLocale();
  const unlockableSamples = useSelector(selectors.getUnlockableSamples, isEqual);
  const [selectedReward, setSelectedReward] = useState(get(unlockableSamples, [0], null));
  const [openSelect, setOpenSelect] = useState(false);
  const [loadRewarded, setLoadRewarded] = useState(false);
  const [countdownStart, setCountdownStart] = useState(false);
  const [refresh, setRefresh] = useState(false);

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

  /* Register Admob Listeners - START */
  /*
  RewardedAd.addEventListener('rewardedVideoDidFailToLoad', () => {
    resetRewarded();
  });

  RewardedAd.addEventListener('rewardedVideoDidFailToPresent', () => {
    resetRewarded();
  });

  RewardedAd.addEventListener('rewardedVideoDidDismiss', () => {
    resetRewarded();
  });

  RewardedAd.addEventListener('rewardedVideoUserDidEarnReward', () => {
    if (!rewardDisabled) {
      unlockSamples();
    } else {
      refreshCount();
    }
  });
  */
  /* Register Admob Listeners - END */

  /* Request Ad Video - Function */
  // async function requestReward() {
  //   setLoadRewarded(true);

  //   /*
  //   await RewardedAd.setAdUnitID(
  //     Platform.OS === 'ios' ? admob_ios.rewarded : admob_android.rewarded,
  //   ); // Test ID, Replace with your-admob-unit-id
  //   await RewardedAd.requestAdAsync();
  //   await RewardedAd.showAdAsync();
  //   */
  // }

  /* Reset Rewarded Loading Animation - Function */
  // function resetRewarded() {
  //   if (loadRewarded === true && rewardEarned === false) {
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
    <SafeAreaView style={mainStyles.safe}>
      <Link
        to="/settings"
        style={styles.exit}
        underlayColor={null}
        disabled={loadRewarded || openSelect}
      >
        <Exit fill={!loadRewarded ? colors.gray : colors.grayBlue} />
      </Link>

      <View style={styles.countdownCon}>
        {countdownStart && (<Text style={styles.countdownTimer}>12:00:00</Text>)}
        <Text style={styles.countdownTxt}>{t('rewarded.countdown')}</Text>
      </View>

      <View style={styles.rewardedCon}>
        {!refresh ? (
          <>
            <Select
              title={t('rewarded.select_cta')}
              value={selectedReward?.label}
              options={unlockableSamples}
              isOpen={openSelect}
              onOpen={() => setOpenSelect(true)}
              onSelect={handleSelect}
            />

            <View style={styles.rewardedExp}>
              <Text style={styles.rewardedExpText}>
                {t('rewarded.paragraph_1')}
              </Text>
              <Text style={styles.rewardedExp2Text}>
                {t('rewarded.paragraph_2.text_1')}
                <Text style={{ color: colors.orange }}>{t('rewarded.paragraph_2.text_2')}</Text>
                {t('rewarded.paragraph_2.text_3')}<Text style={{ color: colors.orange }}>{t('rewarded.paragraph_2.text_4')}</Text>{t('rewarded.paragraph_2.text_5')}
              </Text>
            </View>
          </>
        ) : (
          <View style={styles.rewardedExp}>
            <Text style={styles.rewardedExpText}>
             {t('rewarded.paragraph_3.text_1')}
            </Text>
            <Text style={styles.rewardedExp2Text}>
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
        )}
        <TouchableOpacity
          activeOpacity={1}
          style={loadRewarded ? styles.rewardedDisabled : styles.rewardedStart}
          disabled={loadRewarded || openSelect}
          // onPress={() => requestReward()}
        >
          {loadRewarded ? (
            <ActivityIndicator size="large" color={colors.grayLight} />
            ) : (
            <Text style={styles.rewardedStartText}>{t('rewarded.cta')}</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.rewardedDisc}>{t('rewarded.disclamer')}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Rewarded;
