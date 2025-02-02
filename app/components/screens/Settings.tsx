import React, { useState } from 'react';
import {
  Animated, Keyboard, SafeAreaView, ScrollView, Text, TextInput, View,
} from 'react-native';
import { Link } from 'react-router-native';
import Close from '@assets/icons/Close';
import Select from '@components/elements/inputs/Select';
import TimeSignatureSelect from '@components/elements/inputs/TimeSignatureSelect';
import useLocale from '@locales';
import { actions, selectors } from '@store/globalStore';
import colors from '@styles/colors';
import { textInputStyle } from '@styles/inputs';
import mainStyle from '@styles/main';
import settingsStyle from '@styles/settings';
import { maxBPM } from '@tokens';
import { useAppDispatch, useAppSelector } from '@utils/hooks';
import useSelectLists from '@utils/lists';
import {
  get, isEmpty, isEqual, isNaN, isNumber,
} from 'lodash';
import type { TimeSignaturePayload } from '@store/globalStore';
import type { Sample } from '@utils/lists';

function Settings() {
  const { t } = useLocale();
  const dispatch = useAppDispatch();
  const { samples } = useSelectLists();
  const global = useAppSelector(selectors.getGlobal, isEqual);
  const [bpm, setBpm] = useState(String(global.ui.useBPM));
  const [openTimeSigSelect, setOpenTimeSigSelect] = useState(false);
  const [openSoundSelect, setOpenSoundSelect] = useState(false);

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
    if (newBPM > maxBPM) newBPM = maxBPM;

    setBpm(String(newBPM));
    dispatch(actions.updateBPM(newBPM));
  };

  const handleCloseSettings = () => {
    Keyboard.dismiss();
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={mainStyle.scrollDeviceContainer}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <SafeAreaView style={mainStyle.safe}>
        <View style={settingsStyle.navigation}>
          <Link
            to="/"
            underlayColor={colors.transparent}
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
              onChangeText={(val: any) => setBpm(val)}
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
            />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export default Settings;
