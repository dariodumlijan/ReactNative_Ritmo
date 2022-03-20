// @flow
import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import { Animated, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Close from '../../assets/icons/Close';
import { DismissKeyboard } from '../../utils';
import styles from '../../styles/styles';
import colors from '../../styles/colors';

const Settings = forwardRef((props, ref): Node => {
  /* Menu Screen onLoad */
  useEffect(() => {
    checkCountdown();
  }, []);

  /* Calls from Outside */
  useImperativeHandle(ref, () => ({
    rotateEffect,
    updateMenuState,
  }));

  /* Update Settings State - Callback */
  const updateMenuState = () => {
    setBpmNumber(useBPM.toString());
    setRadioCheck(useTimeSig);
  };

  /* Settings States */
  const [bpmNumber, setBpmNumber] = useState(useBPM.toString());
  const [radioCheck, setRadioCheck] = useState(useTimeSig);
  const [openSelect, setOpenSelect] = useState(false);
  const [selectedSoundName, setSelectedSoundName] = useState(selectedSoundNameSaved);
  const [disabled, setDisabled] = useState(rewardDisabled);
  const [refresh, setRefresh] = useState(refreshEnabled);
  const [alertShow, setAlertShow] = useState(false);
  const fadeAlert = useState(new Animated.Value(0))[0];

  /* Show Alert message - Function */
  const alertRewardedDisabled = () => {
    Keyboard.dismiss();
    setAlertShow(true);
    Animated.sequence([
      Animated.timing(fadeAlert, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAlert, {
        toValue: 0,
        delay: 4700,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
    setTimeout(() => {
      setAlertShow(false);
    }, 5300);
  };

  /* Rotate Settings Icon - Animation - START */
  const rotate = useRef(new Animated.Value(0)).current;

  const rotateEffect = () => {
    if (menuCheck) {
      rotate.setValue(1);
      setTimeout(() => {
        Animated.timing(rotate, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.ease,
        }).start();
      }, 500);
    } else {
      setTimeout(() => {
        rotate.setValue(1);
      }, 500);
    }
  };

  const interpolateRotate = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-180deg'],
  });

  const rotateArrow = {
    transform: [{ rotate: interpolateRotate }],
  };
  /* Rotate Settings Icon - Animation - END */

  /* Check Reward Reset Time - Function */
  async function checkCountdown() {
    const countdownDate = JSON.parse(await AsyncStorage.getItem('countdownTime'));

    if (countdownDate) {
      const currentDate = new Date().valueOf();
      const timeDiff = countdownDate - currentDate;
      ms2Time(timeDiff);

      if (timeDiff <= 0) {
        lockRewards();
      } else {
        checkUnlocked();
      }
    }
  }

  /* Lock Rewards - Function */
  async function lockRewards() {
    timerUpdate.hours = 0;
    timerUpdate.minutes = 0;
    timerUpdate.seconds = 0;

    await AsyncStorage.removeItem('timerStart');
    await AsyncStorage.removeItem('countdownTime');
    await AsyncStorage.removeItem('unlockedRewards');
    timerStart = false;

    for (let i = 0; i < soundList.length; i++) {
      if (i <= 2) {
        soundList[i].disabled = false;
      } else {
        soundList[i].disabled = true;
      }
    }
    checkUnlocked();
  }

  /* Check Unlocked Sounds List - Function */
  async function checkUnlocked() {
    unlockedSamples = JSON.parse(await AsyncStorage.getItem('unlockedRewards'));
    if (unlockedSamples && unlockedSamples.length) {
      for (let i = 0; i < soundList.length; i++) {
        soundList[i].disabled = unlockedSamples[i];
      }
    } else {
      unlockedSamples = soundList.map(({ disabled }) => disabled);
    }

    checkSoundList();
  }

  /* Check Reward Call Button - Function */
  function checkSoundList() {
    for (let i = 0; i < soundList.length; i++) {
      if (soundList[i].disabled == true) {
        rewardDisabled = false;
        setDisabled(rewardDisabled);
        break;
      } else {
        rewardDisabled = true;
        setDisabled(rewardDisabled);
      }
    }
    if (rewardDisabled && timerUpdate.hours <= refreshHours) {
      refreshEnabled = true;
      setRefresh(refreshEnabled);
    } else {
      refreshEnabled = false;
      setRefresh(refreshEnabled);
    }
  }

  /* BPM Input - Function */
  const bpmUpdate = (value) => {
    setBpmNumber(value.toString());
  };

  /* BPM on Blur/Submit - Function */
  const bpmCheck = (value) => {
    const valueNum = Math.trunc(Number(value));
    if (valueNum < 1) {
      setBpmNumber('1');
      useBPM = 1;
    } else if (valueNum > 300) {
      setBpmNumber('300');
      useBPM = 300;
    } else if (valueNum == undefined || valueNum == null || isNaN(valueNum)) {
      setBpmNumber('1');
      useBPM = 1;
    } else {
      setBpmNumber(valueNum.toString());
      useBPM = valueNum;
    }
    calcSoundDelay();
  };

  /* Time Sig Update - Function */
  const gridChange = (value) => {
    Keyboard.dismiss();
    useTimeSig = value.toString();
    setRadioCheck(useTimeSig);
    changeTimeSig();
    props.updateCallback();
  };

  /* Open Select List - Function */
  const openSelectList = () => {
    Keyboard.dismiss();
    setOpenSelect(true);
    pause();
  };

  /* Select Sound from List - Function */
  const selectedSound = (name, index) => {
    setSelectedSoundName(name);
    selectedSoundNameSaved = name;
    selectedSoundIndexSaved = index;

    reloadSoundLib();

    setOpenSelect(false);
  };

  /* Pause Playback - Function */
  const pause = () => {
    props.pauseCallback();
  };

  /* Close Settings Screen - Function */
  const menuClose = () => {
    Keyboard.dismiss();
    props.menuCallback(false);
    rotateEffect();
  };

  /* Open Rewarded Screen - Function */
  const callRewarded = () => {
    Keyboard.dismiss();
    props.rewardedCallback(true);
    pause();
  };

  return (
    <DismissKeyboard>
      <View style={styles.screenMenuWrapper}>
        <View style={styles.navigationMenu}>
          <TouchableOpacity activeOpacity={0.8} disabled={openSelect} onPress={menuClose}>
            <Animated.View style={[rotateArrow, styles.menuCloseW]}>
              <Close style={styles.menuClose} />
            </Animated.View>
          </TouchableOpacity>
        </View>

        <View style={styles.menuWrapper}>
          <View style={styles.bpmWrapper}>
            <Text style={styles.menuTitle}>BPM</Text>
            <TextInput
              style={styles.inputBPM}
              maxLength={3}
              onChangeText={(bpmNumber) => bpmUpdate(bpmNumber)}
              onSubmitEditing={() => bpmCheck(bpmNumber)}
              onBlur={() => bpmCheck(bpmNumber)}
              onFocus={pause}
              value={bpmNumber}
              placeholderTextColor={colors.grayBlue}
              keyboardType="numeric"
              multiline={false}
            />
          </View>

          <View style={styles.radioWrapper}>
            <Text style={styles.menuTitle}>Time Signature</Text>
            <TouchableOpacity activeOpacity={0.6} onPress={() => gridChange('Free')}>
              <View style={styles.radioCont}>
                <Text style={styles.radioText}>Free</Text>
                <View
                  style={radioCheck == 'Free' ? styles.radioSelected : styles.radioNotSelected}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} onPress={() => gridChange('4/4')}>
              <View style={styles.radioCont}>
                <Text style={styles.radioText}>4/4</Text>
                <View
                  style={radioCheck == '4/4' ? styles.radioSelected : styles.radioNotSelected}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} onPress={() => gridChange('3/4')}>
              <View style={styles.radioCont}>
                <Text style={styles.radioText}>3/4</Text>
                <View
                  style={radioCheck == '3/4' ? styles.radioSelected : styles.radioNotSelected}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.selectWrapper}>
            <Text style={styles.menuTitle}>Sound</Text>
            <TouchableOpacity
              disabled={openSelect}
              activeOpacity={0.6}
              style={styles.selectInput}
              onPress={openSelectList}
            >
              <Text style={styles.selectInputText}>{selectedSoundName}</Text>
              <Arrow style={styles.selectListArrow} />
            </TouchableOpacity>
          </View>

          {/*
					{!disabled ? (
						<TouchableHighlight
							underlayColor={colors.grayBlue}
							style={styles.btnRewardScreen}
							disabled={openSelect}
							onPress={callRewarded}
						>
							<Text style={styles.btnRewardScreenText}>
								Get more samples
							</Text>
						</TouchableHighlight>
					) : (
						<TouchableHighlight
							underlayColor={colors.grayBlue}
							style={
								refresh
									? styles.btnRewardScreen
									: styles.btnRewardScreenDisabled
							}
							disabled={openSelect}
							onPress={
								refresh ? callRewarded : alertRewardedDisabled
							}
						>
							<Text
								style={
									refresh
										? styles.btnRewardScreenText
										: styles.btnRewardScreenTextDisabled
								}
							>
								Keep rewards
							</Text>
						</TouchableHighlight>
					)}
					*/}
        </View>

        <View style={styles.adSpace} />

        <Modal animationType="fade" transparent visible={openSelect}>
          <View style={styles.selectListWrapper}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.selectList}
              centerContent
            >
              {soundList.map((sound, index) => (
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={
                    index === soundList.length - 1 ? styles.selectItemNoBorder : styles.selectItem
                  }
                  key={sound.name}
                  disabled={sound.disabled}
                  onPress={() => selectedSound(sound.name, index)}
                >
                  <Text style={!sound.disabled ? styles.selectText : styles.selectDisabledText}>
                    {sound.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Modal>

        {alertShow ? (
          <Animated.View style={[styles.alertWrapper, { opacity: fadeAlert }]}>
            <Text style={styles.alertText2}>
              This will become available <Text style={{ color: colors.green }}>6h</Text> before
              {'\n'}
              the timer runs out.
            </Text>
          </Animated.View>
        ) : null}
      </View>
    </DismissKeyboard>
  );
});

export default Settings;
