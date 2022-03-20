// @flow
import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import { ActivityIndicator, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Link } from 'react-router-dom';
import Svg, { Path } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles/styles';
import colors from '../../styles/colors';

const Rewarded = (): Node => {
  /* Register Reward Variables */
  const rewardList = [];
  let rewardEarned = false;
  let disableList = false;

  /* Create Rewards List */
  for (let i = 0; i < soundList.length; i++) {
    if (soundList[i].disabled === true) {
      rewardList.push(soundList[i]);
    }
  }

  /* Check if Rewards List Empty */
  if (rewardList.length === undefined || rewardList.length === 0) {
    rewardListName = 'N/A';
    disableList = true;
  } else {
    rewardListName = rewardList[0].name;
  }

  /* Rewarded Screen onLoad */
  useEffect(() => {
    setHrs(('0' + timerUpdate.hours).slice(-2));
    setMins(('0' + timerUpdate.minutes).slice(-2));
    setSecs(('0' + timerUpdate.seconds).slice(-2));
    checkTimerStart();
    setSelectedRewardName(rewardListName);
    rewardIndex = soundList.findIndex((obj) => obj.name === rewardListName);
  }, []);

  /* Rewarded States */
  const [loadRewarded, setLoadRewarded] = useState(false);

  /* Rewarded List States */
  const [openSelect, setOpenSelect] = useState(false);
  const [selectedRewardName, setSelectedRewardName] = useState(rewardListName);

  /* Countdown Timer States */
  const [countdownStart, setCountdownStart] = useState(timerStart);
  const [refresh, setRefresh] = useState(refreshEnabled);

  /* Timer States */
  const [hrs, setHrs] = useState([timerUpdate.hours]);
  const [mins, setMins] = useState([timerUpdate.minutes]);
  const [secs, setSecs] = useState([timerUpdate.seconds]);

  /* Check if Timer is Null - Function */
  async function checkTimerStart() {
    timerStart = await AsyncStorage.getItem('timerStart');

    if (timerStart !== null) {
      timerStart = true;
      setCountdownStart(timerStart);
      checkRewardCountdown();
    } else {
      timerStart = false;
      setCountdownStart(timerStart);
    }
    checkSoundList();
  }

  /* Check Countdown time - Function */
  async function checkRewardCountdown() {
    const countdownDate = JSON.parse(await AsyncStorage.getItem('countdownTime'));

    const currentDate = new Date().valueOf();
    const timeDiff = countdownDate - currentDate;
    ms2Time(timeDiff);

    if (timeDiff <= 0) {
      lockRewards();
    } else {
      tickVariable = setInterval(() => tick(), 1000);
    }
  }

  /* Countdown tick Interval - Function */
  function tick() {
    if (timerUpdate.hours === 0 && timerUpdate.minutes === 0 && timerUpdate.seconds === 0) {
      lockRewards();
    } else if (timerUpdate.hours <= -1 || timerUpdate.minutes <= -1 || timerUpdate.seconds <= -1) {
      clearInterval(tickVariable);
      checkRewardCountdown();
    } else if (timerUpdate.minutes === 0 && timerUpdate.seconds === 0) {
      const calcTime = timerUpdate.hours - 1;
      timerUpdate.hours = calcTime;
      timerUpdate.minutes = 59;
      timerUpdate.seconds = 59;
    } else if (timerUpdate.seconds === 0) {
      const calcTime = timerUpdate.minutes - 1;
      timerUpdate.minutes = calcTime;
      timerUpdate.seconds = 59;
    } else {
      const calcTime = timerUpdate.seconds - 1;
      timerUpdate.seconds = calcTime;
    }

    setHrs(('0' + timerUpdate.hours).slice(-2));
    setMins(('0' + timerUpdate.minutes).slice(-2));
    setSecs(('0' + timerUpdate.seconds).slice(-2));
  }

  /* Reset/Lock Rewards & Timer - Function */
  async function lockRewards() {
    clearInterval(tickVariable);
    timerUpdate.hours = 0;
    timerUpdate.minutes = 0;
    timerUpdate.seconds = 0;

    await AsyncStorage.removeItem('timerStart');
    await AsyncStorage.removeItem('countdownTime');
    await AsyncStorage.removeItem('unlockedRewards');
    timerStart = false;
    setCountdownStart(timerStart);

    for (let i = 0; i < soundList.length; i++) {
      if (i <= 2) {
        soundList[i].disabled = false;
      } else {
        soundList[i].disabled = true;
      }
    }
    unlockedSamples = soundList.map(({ disabled }) => disabled);

    rewardList = [];
    for (let i = 0; i < soundList.length; i++) {
      if (soundList[i].disabled === true) {
        rewardList.push(soundList[i]);
      }
    }

    if (rewardList.length === undefined || rewardList.length === 0) {
      rewardListName = 'N/A';
      disableList = true;
    } else {
      rewardListName = rewardList[0].name;
    }
    setSelectedRewardName(rewardListName);
    rewardIndex = soundList.findIndex((obj) => obj.name === rewardListName);
  }

  /* Check what Reward Content to Show - Function */
  function checkSoundList() {
    for (let i = 0; i < soundList.length; i++) {
      if (soundList[i].disabled === true) {
        rewardDisabled = false;
        break;
      } else {
        rewardDisabled = true;
      }
    }
    if (rewardDisabled) {
      refreshEnabled = true;
      setRefresh(refreshEnabled);
    }
  }

  /* Exit Rewarded Screen - Function */
  function exitReward() {
    clearInterval(tickVariable);
    rewardedCallback(false);
  }

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
  async function requestReward() {
    setLoadRewarded(true);

    /*
    await RewardedAd.setAdUnitID(
      Platform.OS === 'ios' ? admob_ios.rewarded : admob_android.rewarded,
    ); // Test ID, Replace with your-admob-unit-id
    await RewardedAd.requestAdAsync();
    await RewardedAd.showAdAsync();
    */
  }

  /* Reset Rewarded Loading Animation - Function */
  function resetRewarded() {
    if (loadRewarded === true && rewardEarned === false) {
      setTimeout(() => {
        setLoadRewarded(false);
      }, 10000);
    }
  }

  /* Open Rewarded List - Function */
  const openSelectList = () => {
    setOpenSelect(true);
  };

  /* Select Reward Item - Function */
  const selectedSound = (name) => {
    setSelectedRewardName(name);
    rewardIndex = soundList.findIndex((obj) => obj.name === name);

    setOpenSelect(false);
  };

  /* Give Sound Reward - Function */
  async function unlockSamples() {
    await AsyncStorage.removeItem('timerStart');
    await AsyncStorage.removeItem('countdownTime');
    await AsyncStorage.removeItem('unlockedRewards');

    const countdownDate = new Date().valueOf() + countdownHours * 36e5;
    await AsyncStorage.setItem('countdownTime', JSON.stringify(countdownDate));

    timerStart = true;
    await AsyncStorage.setItem('timerStart', JSON.stringify(timerStart));

    soundList[rewardIndex].disabled = false;
    unlockedSamples = soundList.map(({ disabled }) => disabled);
    await AsyncStorage.setItem('unlockedRewards', JSON.stringify(unlockedSamples));

    rewardEarned = true;
    rewardedCallback(false);
  }

  /* Refresh Reward Timer - Function */
  async function refreshCount() {
    await AsyncStorage.removeItem('timerStart');
    await AsyncStorage.removeItem('countdownTime');

    const countdownDate = new Date().valueOf() + countdownHours * 36e5;
    await AsyncStorage.setItem('countdownTime', JSON.stringify(countdownDate));

    timerStart = true;
    await AsyncStorage.setItem('timerStart', JSON.stringify(timerStart));

    rewardEarned = true;
    rewardedCallback(false);
  }

  return (
    <View style={styles.rewardedWrapper}>
      <Link
        to="/"
        style={styles.exit}
        // disabled={!!(loadRewarded || openSelect)}
        onPress={exitReward}
      >
        <Svg height="100%" width="100%" viewBox="0 0 352 352">
          <Path
            fill={!loadRewarded ? colors.gray : colors.grayBlue}
            d="M242.7,176L342.8,75.9c12.3-12.3,12.3-32.2,0-44.5L320.6,9.2c-12.3-12.3-32.2-12.3-44.5,0L176,109.3L75.9,9.2 C63.7-3.1,43.7-3.1,31.5,9.2L9.2,31.4c-12.3,12.3-12.3,32.2,0,44.5L109.3,176L9.2,276.1c-12.3,12.3-12.3,32.2,0,44.5l22.2,22.2 c12.3,12.3,32.2,12.3,44.5,0L176,242.7l100.1,100.1c12.3,12.3,32.2,12.3,44.5,0l22.2-22.2c12.3-12.3,12.3-32.2,0-44.5L242.7,176z"
          />
        </Svg>
      </Link>

      <View style={styles.countdownCon}>
        {countdownStart ? (
          <Text style={styles.countdownTimer}>
            {hrs}:{mins}:{secs}
          </Text>
        ) : (
          <Text style={styles.countdownTimer}>00:00:00</Text>
        )}
        <Text style={styles.countdownTxt}>till unlocked samples are locked</Text>
      </View>

      {!refresh ? (
        <View style={styles.rewardedCon}>
          <View style={styles.selectReward}>
            <Text style={styles.rewardTitle}>Choose the library you want:</Text>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.selectRewardInput}
              disabled={disableList}
              onPress={openSelectList}
            >
              <Text style={styles.selectRewardInputText}>{selectedRewardName}</Text>
              <Arrow style={styles.selectRewardArrow} />
            </TouchableOpacity>
          </View>

          <View style={styles.rewardedExp}>
            <Text style={styles.rewardedExpText}>
              To get the chosen library{'\n'}
              watch this Advert:
            </Text>
            <Text style={styles.rewardedExp2Text}>
              The unlocked sample will be available for{' '}
              <Text style={{ color: colors.orange }}>24h</Text>
              {'\n'}
              from <Text style={{ color: colors.orange }}>the last one</Text> that you unlocked.
            </Text>
          </View>
          <TouchableOpacity
            style={!loadRewarded ? styles.rewardedStart : styles.rewardedDisabled}
            activeOpacity={1}
            disabled={!!(loadRewarded || openSelect)}
            onPress={() => requestReward()}
          >
            {!loadRewarded ? (
              <Text style={styles.rewardedStartText}>Watch the Ad</Text>
            ) : (
              <ActivityIndicator size="large" color={colors.grayLight} />
            )}
          </TouchableOpacity>
          <Text style={styles.rewardedDisc}>If no Advert is shown come back a bit later</Text>
        </View>
      ) : (
        <View style={styles.rewardedCon}>
          <View style={styles.rewardedExp}>
            <Text style={styles.rewardedExpText}>
              To keep the rewards,{'\n'}
              watch one Advert:
            </Text>
            <Text style={styles.rewardedExp2Text}>
              The refresh will give you <Text style={{ color: colors.orange }}>24h</Text>
              {'\n'}
              from <Text style={{ color: colors.orange }}>the end of the Ad</Text> {'\n'}
              and will become available again{'\n'}
              <Text style={{ color: colors.orange }}>6h</Text> before the time runs out.
            </Text>
          </View>
          <TouchableOpacity
            style={!loadRewarded ? styles.rewardedStart : styles.rewardedDisabled}
            activeOpacity={1}
            disabled={!!(loadRewarded || openSelect)}
            onPress={() => requestReward()}
          >
            {!loadRewarded ? (
              <Text style={styles.rewardedStartText}>Watch the Ad</Text>
            ) : (
              <ActivityIndicator size="large" color={colors.grayLight} />
            )}
          </TouchableOpacity>
          <Text style={styles.rewardedDisc}>If no Advert is shown come back a bit later</Text>
        </View>
      )}

      <Modal animationType="fade" transparent visible={openSelect}>
        <View style={styles.selectListWrapper}>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.selectList} centerContent>
            {rewardList.map((sound, index) => (
              <TouchableOpacity
                activeOpacity={0.6}
                style={
                  index === rewardList.length - 1 ? styles.selectItemNoBorder : styles.selectItem
                }
                key={sound.name}
                onPress={() => selectedSound(sound.name)}
              >
                <Text style={styles.selectText}>{sound.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default Rewarded;
