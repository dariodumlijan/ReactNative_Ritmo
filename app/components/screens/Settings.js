// @flow
import React, { useState } from 'react';
import type { Node } from 'react';
import {
  Animated,
  Keyboard,
  SafeAreaView,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-native';
import {
  get, isEmpty, isEqual, isNaN, isNumber, map,
} from 'lodash';
import { hoursToMilliseconds } from 'date-fns';
import DismissKeyboard from '../elements/misc/DismissKeyboard';
import CountdownTimer from '../elements/misc/CountdownTimer';
import Select from '../elements/inputs/Select';
import Alert from '../elements/misc/Alert';
import Close from '../../assets/icons/Close';
import useLocale from '../../locales';
import { isRealDevice } from '../../utils';
import useSelectLists from '../../utils/lists';
import { useTeleport } from '../../utils/hooks';
import { actions, selectors } from '../../store/globalStore';
import mainStyle from '../../styles/main';
import settingsStyle from '../../styles/settings';
import notificationsStyle from '../../styles/notifications';
import colors from '../../styles/colors';
import type { Sample } from '../../utils/lists';
import type { State } from '../../store/globalStore';
import type { ReduxState } from '../../types';

const Settings = (): Node => {
  const { t } = useLocale();
  const { teleport } = useTeleport();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { samples, timeSignatures } = useSelectLists();
  const lockedSamples = useSelector(selectors.getLockedSamples, isEqual);
  const global: State = useSelector(selectors.getGlobal, isEqual);
  const { resetRewards, keepRewards }: { resetRewards: number, keepRewards: number } = useSelector((state: ReduxState) => ({
    resetRewards: get(state.cms, isRealDevice ? 'master.resetRewards' : 'master.resetRewardsStaging', 24),
    keepRewards: get(state.cms, isRealDevice ? 'master.keepRewards' : 'master.keepRewardsStaging', 6),
  }), isEqual);
  const [bpm, setBpm] = useState<string>(String(global.ui.useBPM));
  const [openSelect, setOpenSelect] = useState(false);
  const hasAllRewards = isEmpty(lockedSamples);
  const [rewardsAreRefreshable, setRewardsAreRefreshable] = useState(false);
  const shouldShowAlert = hasAllRewards && !rewardsAreRefreshable;

  const onSampleChange = (sample: Sample) => {
    setOpenSelect(false);
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

  const handleRewardedOpen = () => {
    if (!global.ui.showAds) {
      teleport(
        <Alert clearDelayMS={5000}>
          <Text style={[notificationsStyle.alertText, { fontSize: 14 }]}>
            {t('modal.no_ads')}
          </Text>
        </Alert>,
      );

      return;
    }

    if (shouldShowAlert) {
      teleport(
        <Alert clearDelayMS={5000}>
          <Text style={[notificationsStyle.alertText, { fontSize: 14 }]}>
            {t('modal.keep_rewards.text_1')}
            <Text style={{ color: colors.green }}>{keepRewards}h</Text>
            {t('modal.keep_rewards.text_2')}
          </Text>
        </Alert>,
      );

      return;
    }

    Keyboard.dismiss();
    navigate('/rewarded');
  };

  const handleCountdown = (currentTime: number) => {
    const isBelowThreshold = currentTime <= hoursToMilliseconds(keepRewards);
    if (isBelowThreshold && !rewardsAreRefreshable) setRewardsAreRefreshable(true);
  };

  return (
    <DismissKeyboard>
      <SafeAreaView style={mainStyle.safe}>
        <CountdownTimer
          countdownFrom={global.rewardedAt ? global.rewardedAt + hoursToMilliseconds(resetRewards) : null}
          onChange={handleCountdown}
          isHidden
        />
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
              onChangeText={(val) => setBpm(val)}
              onSubmitEditing={() => handleBPM(bpm)}
              onBlur={() => handleBPM(bpm)}
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

          <TouchableHighlight
            onPress={handleRewardedOpen}
            disabled={openSelect}
            underlayColor={colors.grayBlue}
            style={shouldShowAlert || !global.ui.showAds ? settingsStyle.btnRewardScreenDisabled : settingsStyle.btnRewardScreen}
          >
            <Text style={shouldShowAlert || !global.ui.showAds ? settingsStyle.btnRewardScreenTextDisabled : settingsStyle.btnRewardScreenText}>
              {t(hasAllRewards ? 'settings.keep_rewards' : 'settings.more_samples')}
            </Text>
          </TouchableHighlight>
        </View>

        <View style={mainStyle.adSpace} />
      </SafeAreaView>
    </DismissKeyboard>
  );
};

export default Settings;
