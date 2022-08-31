// @flow
import React, { useState } from 'react';
import type { Node } from 'react';
import {
  Animated,
  Keyboard,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-native';
import {
  get, isEmpty, isEqual, isNaN, isNumber,
} from 'lodash';
import { hoursToMilliseconds, secondsToMilliseconds } from 'date-fns';
import DismissKeyboard from '../elements/misc/DismissKeyboard';
import CountdownTimer from '../elements/misc/CountdownTimer';
import Select from '../elements/inputs/Select';
import TimeSignatureSelect from '../elements/inputs/TimeSignatureSelect';
import Alert from '../elements/misc/Alert';
import ConditionalAd from '../elements/misc/ConditionalAd';
import Close from '../../assets/icons/Close';
import useLocale from '../../locales';
import { deviceInfo } from '../../utils';
import useSelectLists from '../../utils/lists';
import { useTeleport } from '../../utils/hooks';
import { actions, selectors } from '../../store/globalStore';
import mainStyle from '../../styles/main';
import settingsStyle from '../../styles/settings';
import notificationsStyle from '../../styles/notifications';
import { textInputStyle } from '../../styles/inputs';
import colors from '../../styles/colors';
import type { Sample } from '../../utils/lists';
import type { State, TimeSignaturePayload } from '../../store/globalStore';
import type { ReduxState } from '../../types';

function Settings(): Node {
  const { t } = useLocale();
  const { teleport } = useTeleport();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { samples } = useSelectLists();
  const lockedSamples = useSelector(selectors.getLockedSamples, isEqual);
  const global: State = useSelector(selectors.getGlobal, isEqual);
  const { resetRewards, keepRewards }: { resetRewards: number, keepRewards: number } = useSelector((state: ReduxState) => ({
    resetRewards: hoursToMilliseconds(get(state.cms, deviceInfo.isRealDevice ? 'master.resetRewards' : 'master.resetRewardsStaging', 24)),
    keepRewards: get(state.cms, deviceInfo.isRealDevice ? 'master.keepRewards' : 'master.keepRewardsStaging', 6),
  }), isEqual);
  const [bpm, setBpm] = useState<string>(String(global.ui.useBPM));
  const [openTimeSigSelect, setOpenTimeSigSelect] = useState(false);
  const [openSoundSelect, setOpenSoundSelect] = useState(false);
  const hasAllRewards = isEmpty(lockedSamples);
  const [rewardsAreRefreshable, setRewardsAreRefreshable] = useState(false);
  const shouldShowAlert = hasAllRewards && !rewardsAreRefreshable;
  const countdownFrom = global.rewardedAt?.samples ? global.rewardedAt.samples + resetRewards : null;

  const onTimeSigChange = (timeSig: TimeSignaturePayload) => {
    setOpenTimeSigSelect(false);
    dispatch(actions.updateTimeSig(timeSig));
  };

  const onSampleChange = (sample: Sample) => {
    setOpenSoundSelect(false);
    dispatch(actions.updateSelectedSample(sample));
  };

  const handleBPM = (val: string) => {
    let newBPM = Math.trunc(Number(val));
    if (newBPM < 1 || (isEmpty(newBPM) && !isNumber(newBPM)) || isNaN(newBPM)) newBPM = 1;
    if (newBPM > 300) newBPM = 300;

    setBpm(String(newBPM));
    dispatch(actions.updateBPM(newBPM));
  };

  const handleCloseSettings = () => {
    Keyboard.dismiss();
  };

  const handleRewardedProOpen = () => {
    if (!global.ui.showAds) {
      setOpenTimeSigSelect(false);
      teleport(
        <Alert clearDelayMS={secondsToMilliseconds(5)}>
          <Text style={[notificationsStyle.alertText, { fontSize: 14 }]}>
            {t('modal.no_ads')}
          </Text>
        </Alert>,
      );

      return;
    }

    Keyboard.dismiss();
    navigate('/rewarded/pro-features');
  };

  const handleRewardedSamplesOpen = () => {
    if (!global.ui.showAds) {
      setOpenSoundSelect(false);
      teleport(
        <Alert clearDelayMS={secondsToMilliseconds(5)}>
          <Text style={[notificationsStyle.alertText, { fontSize: 14 }]}>
            {t('modal.no_ads')}
          </Text>
        </Alert>,
      );

      return;
    }

    if (shouldShowAlert) {
      const refreshAvailableIn = countdownFrom ? countdownFrom - hoursToMilliseconds(keepRewards) : null;

      teleport(
        <Alert clearDelayMS={secondsToMilliseconds(5)}>
          <Text style={[notificationsStyle.alertText, { fontSize: 14 }]}>
            {t('modal.keep_rewards')}
          </Text>
          <CountdownTimer countdownFrom={refreshAvailableIn} style={notificationsStyle.alertTimerText} />
        </Alert>,
      );

      return;
    }

    Keyboard.dismiss();
    navigate('/rewarded/samples');
  };

  const handleCountdown = (currentTime: number) => {
    const isBelowThreshold = currentTime <= hoursToMilliseconds(keepRewards);
    if (isBelowThreshold && !rewardsAreRefreshable) setRewardsAreRefreshable(true);
  };

  return (
    <DismissKeyboard>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={mainStyle.scrollDeviceContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <SafeAreaView style={mainStyle.safe}>
          <CountdownTimer
            countdownFrom={countdownFrom}
            onChange={handleCountdown}
            isHidden
          />
          <View style={settingsStyle.navigation}>
            <Link
              to="/"
              underlayColor={null}
              disabled={openSoundSelect}
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
                style={textInputStyle.input}
                maxLength={3}
                onChangeText={(val) => setBpm(val)}
                onSubmitEditing={() => handleBPM(bpm)}
                onBlur={() => handleBPM(bpm)}
                value={bpm}
                placeholderTextColor={colors.grayBlue}
                keyboardType="numeric"
                multiline={false}
              />
            </View>

            <TimeSignatureSelect
              value={global.ui.useTimeSig || {
                hihat: 'Free',
                snare: 'Free',
                kick: 'Free',
              }}
              isOpen={openTimeSigSelect}
              onOpen={() => setOpenTimeSigSelect(true)}
              onClose={() => setOpenTimeSigSelect(false)}
              onSelect={onTimeSigChange}
              onRewardedClick={handleRewardedProOpen}
              unlockedPro={global.unlockedPro}
            />

            <View style={settingsStyle.soundWrapper}>
              <Select
                title={t('settings.sound')}
                value={get(global.ui.useSample, 'label', 'Acoustic')}
                options={samples}
                isOpen={openSoundSelect}
                onOpen={() => setOpenSoundSelect(true)}
                onClose={() => setOpenSoundSelect(false)}
                onSelect={onSampleChange}
                onRewardedClick={handleRewardedSamplesOpen}
                compareSamples={global.unlockedSamples}
              />
              <ConditionalAd>
                <TouchableHighlight
                  onPress={handleRewardedSamplesOpen}
                  disabled={openTimeSigSelect || openSoundSelect}
                  underlayColor={colors.grayBlue}
                  style={settingsStyle.btnRewardScreen}
                >
                  <Text style={settingsStyle.btnRewardScreenText}>
                    {t(hasAllRewards ? 'settings.keep_rewards' : 'settings.more_samples')}
                  </Text>
                </TouchableHighlight>
              </ConditionalAd>
            </View>
          </View>
          <View style={mainStyle.adSpace} />
        </SafeAreaView>
      </ScrollView>
    </DismissKeyboard>
  );
}

export default Settings;
