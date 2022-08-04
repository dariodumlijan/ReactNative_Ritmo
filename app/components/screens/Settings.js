// @flow
import React, { useState } from 'react';
import type { Node } from 'react';
import {
  Animated,
  Keyboard,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-native';
import {
  every, get, includes, isEmpty, isEqual, isNumber, map,
} from 'lodash';
import DismissKeyboard from '../elements/misc/DismissKeyboard';
import Select from '../elements/inputs/Select';
import Alert from '../elements/misc/Alert';
import Close from '../../assets/icons/Close';
import useLocale from '../../locales';
import useSelectLists from '../../utils/lists';
import { useTeleport } from '../../utils/hooks';
import { actions, selectors } from '../../store/globalStore';
import mainStyle from '../../styles/main';
import settingsStyle from '../../styles/settings';
import notificationsStyle from '../../styles/notifications';
import colors from '../../styles/colors';
import type { Sample } from '../../utils/lists';
import type { State } from '../../store/globalStore';

const Settings = (): Node => {
  const { t } = useLocale();
  const { teleport } = useTeleport();
  const dispatch = useDispatch();
  const { samples, timeSignatures } = useSelectLists();
  const global: State = useSelector(selectors.getGlobal, isEqual);
  const [bpm, setBpm] = useState<string>(String(global.ui.useBPM));
  const [openSelect, setOpenSelect] = useState(false);
  const rewardedBtnIsDisabled = every(samples, (s) => includes(global.unlockedSamples, s.name));
  const shouldRefresh = false;
  const shouldShowAlert = rewardedBtnIsDisabled && !shouldRefresh;

  const onSampleChange = (sample: Sample) => {
    setOpenSelect(false);
    dispatch(actions.updateSelectedSample(sample));
  };

  /* Check Reward Reset Time - Function */
  // async function checkCountdown() {
  //   const countdownDate = JSON.parse(await AsyncStorage.getItem('countdownTime'));

  //   if (countdownDate) {
  //     const currentDate = new Date().valueOf();
  //     const timeDiff = countdownDate - currentDate;
  //     ms2Time(timeDiff);

  //     if (timeDiff <= 0) {
  //       lockRewards();
  //     } else {
  //       checkUnlocked();
  //     }
  //   }
  // }

  /* Lock Rewards - Function */
  // async function lockRewards() {
  //   timerUpdate.hours = 0;
  //   timerUpdate.minutes = 0;
  //   timerUpdate.seconds = 0;

  //   await AsyncStorage.removeItem('timerStart');
  //   await AsyncStorage.removeItem('countdownTime');
  //   await AsyncStorage.removeItem('unlockedRewards');
  //   timerStart = false;

  //   for (let i = 0; i < soundList.length; i++) {
  //     if (i <= 2) {
  //       soundList[i].disabled = false;
  //     } else {
  //       soundList[i].disabled = true;
  //     }
  //   }
  //   checkUnlocked();
  // }

  /* Check Reward Call Button - Function */
  // function checkSoundList() {
  //   for (let i = 0; i < soundList.length; i++) {
  //     if (soundList[i].disabled === true) {
  //       rewardDisabled = false;
  //       setDisabled(rewardDisabled);
  //       break;
  //     } else {
  //       rewardDisabled = true;
  //       setDisabled(rewardDisabled);
  //     }
  //   }
  //   if (rewardDisabled && timerUpdate.hours <= refreshHours) {
  //     refreshEnabled = true;
  //     setRefresh(refreshEnabled);
  //   } else {
  //     refreshEnabled = false;
  //     setRefresh(refreshEnabled);
  //   }
  // }

  const bpmCheck = (val: string) => {
    let newBPM = Number(val);
    if (newBPM < 1 || (isEmpty(newBPM) && !isNumber(newBPM))) newBPM = 1;
    if (newBPM > 300) newBPM = 300;

    setBpm(String(newBPM));
    dispatch(actions.updateBPM(newBPM));
    // calcSoundDelay();
  };

  /* Pause Playback - Function */
  // const pause = () => {
  //   props.pauseCallback();
  // };

  const handleCloseSettings = () => {
    Keyboard.dismiss();
    // rotateEffect();
  };

  const handleRewardedOpen = () => {
    if (shouldShowAlert) {
      teleport(
        <Alert clearDelayMS={5000}>
          <Text style={[notificationsStyle.alertText, { fontSize: 14 }]}>
            {t('settings.modal.text_1')}
            <Text style={{ color: colors.green }}>6h</Text>
            {t('settings.modal.text_2')}
          </Text>
        </Alert>,
      );

      return;
    }

    Keyboard.dismiss();
    // pause();
  };

  // useEffect(() => {
  //   checkCountdown();
  // }, []);

  return (
    <DismissKeyboard>
      <SafeAreaView style={mainStyle.safe}>
        <View style={settingsStyle.navigation}>
          <Link
            to="/"
            underlayColor={null}
            disabled={openSelect}
            onPress={handleCloseSettings}
          >
            <Animated.View style={settingsStyle.closeIconWrapper}>
              <Close style={settingsStyle.closeIcon} />
            </Animated.View>
          </Link>
        </View>

        <View style={settingsStyle.menuWrapper}>
          <View style={settingsStyle.bpmWrapper}>
            <Text style={settingsStyle.menuTitle}>{t('settings.bpm')}</Text>
            <TextInput
              style={settingsStyle.inputBPM}
              maxLength={3}
              onChangeText={(val) => setBpm(String(Math.trunc(Number(val))))}
              onSubmitEditing={() => bpmCheck(bpm)}
              onBlur={() => bpmCheck(bpm)}
              // onFocus={pause}
              value={bpm}
              placeholderTextColor={colors.grayBlue}
              keyboardType="numeric"
              multiline={false}
            />
          </View>

          <View style={settingsStyle.radioWrapper}>
            <Text style={settingsStyle.menuTitle}>{t('settings.time_sig')}</Text>
            {map(timeSignatures, (sig) => (
              <TouchableOpacity
                key={sig.value}
                activeOpacity={0.6}
                onPress={() => dispatch(actions.updateTimeSig(sig.value))}
              >
                <View style={settingsStyle.radioCont}>
                  <Text style={settingsStyle.radioText}>{sig.label}</Text>
                  <View
                    style={global.ui.useTimeSig === sig.value ? settingsStyle.radioSelected : settingsStyle.radioNotSelected}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <Select
            title={t('settings.sound')}
            value={get(global.ui.useSample, 'label', 'Acoustic')}
            options={samples}
            isOpen={openSelect}
            onOpen={() => setOpenSelect(true)}
            onSelect={onSampleChange}
            compareSamples={global.unlockedSamples}
          />

          <Link
            to="/rewarded"
            onPress={handleRewardedOpen}
            disabled={openSelect || shouldShowAlert}
            underlayColor={colors.grayBlue}
            style={shouldShowAlert ? settingsStyle.btnRewardScreenDisabled : settingsStyle.btnRewardScreen}
          >
            <Text style={shouldShowAlert ? settingsStyle.btnRewardScreenTextDisabled : settingsStyle.btnRewardScreenText}>
              {t(rewardedBtnIsDisabled ? 'settings.keep_rewards' : 'settings.more_samples')}
            </Text>
          </Link>
        </View>

        <View style={mainStyle.adSpace} />
      </SafeAreaView>
    </DismissKeyboard>
  );
};

export default Settings;
