import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import { secondsToMilliseconds } from 'date-fns';
import {
  first, isEmpty, isEqual, map,
} from 'lodash';
import useLocale from '../../../locales';
import { actions as beatActions, selectors as beatSelectors } from '../../../store/beatsStore';
import { actions as globalActions, selectors as globalSelectors } from '../../../store/globalStore';
import { selectors as staticSelectors } from '../../../store/staticStore';
import bottomStyle from '../../../styles/bottom';
import colors from '../../../styles/colors';
import { sliderStyle } from '../../../styles/inputs';
import notificationsStyle from '../../../styles/notifications';
import { isBeatEmpty } from '../../../utils';
import { useAppDispatch, useAppSelector, useTeleport } from '../../../utils/hooks';
import SliderThumb from '../../elements/inputs/SliderThumb';
import Alert from '../../elements/misc/Alert';
import ClearPresetModal from '../../elements/modals/ClearPresetModal';
import type { Beats } from '../../../sound/beats';
import type { State as GlobalState, Preset } from '../../../store/globalStore';
import type { State as StaticState } from '../../../store/staticStore';
import type { PresetKey, SoundKey } from '../../../types';

function Bottom() {
  const { t } = useLocale();
  const { teleport } = useTeleport();
  const dispatch = useAppDispatch();
  const staticState: StaticState = useAppSelector(staticSelectors.getStatic, isEqual);
  const beats: Beats = useAppSelector(beatSelectors.getBeats, isEqual);
  const global: GlobalState = useAppSelector(globalSelectors.getGlobal, isEqual);
  const beatExists = !isBeatEmpty(beats);

  const handleSliderChange = (degree: number, key: SoundKey) => {
    if (global.sliders[key] !== degree) dispatch(beatActions.rotateBeat({ key, degree, useBPM: global.ui.useBPM }));
  };

  const handlePreset = (preset: Preset, key: PresetKey) => {
    if (!isEmpty(preset)) {
      dispatch(globalActions.loadPreset(preset));

      return;
    }

    if (beatExists) {
      dispatch(globalActions.writePreset(key, {
        beat: beats,
        sliders: global.sliders,
        useBPM: global.ui.useBPM,
        useTimeSig: global.ui.useTimeSig,
      }));
    } else {
      teleport(
        <Alert clearDelayMS={secondsToMilliseconds(3.3)}>
          <Text style={notificationsStyle.alertText}>
            {t('alert.no_beat')}
          </Text>
        </Alert>,
      );
    }
  };

  const handleModalCall = (key: PresetKey) => {
    if (!global.presets || isEmpty(global.presets[key])) {
      teleport(
        <Alert clearDelayMS={secondsToMilliseconds(3.3)}>
          <Text style={notificationsStyle.alertText}>
            {t('alert.no_preset')}
          </Text>
        </Alert>,
      );

      return;
    }

    teleport(<ClearPresetModal presetKey={key} />);
  };

  const handleClearBeat = () => {
    dispatch(beatActions.clearBeat());
  };

  const handleResetBeat = () => {
    dispatch(beatActions.resetBeat());
  };

  // const handleRecording = () => {};

  /* Recording Functions - START */
  /*
  const startRec = async () => {
    let findBeat = false;
    for (let i in beats.hihat) {
      if (
        beats.hihat[i].checked === true ||
        beats.snare[i].checked === true ||
        beats.kick[i].checked === true
      ) {
        findBeat = true;
        break;
      }
    }

    let status = (await Audio.getPermissionsAsync()).granted;
    if (status === true && isPlaying === false && findBeat === true) {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: false,
          playThroughEarpieceAndroid: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          interruptionModeAndroid:
            Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        });

        await recording.prepareToRecordAsync(RecordingOptions);
        await recording.startAsync();

        start();

        isRecording = true;
        setRecordingStatus(isRecording);
      } catch (err) {
        console.error(err);
      }
    } else if (status === true && isPlaying === true && findBeat === true) {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: false,
          playThroughEarpieceAndroid: true,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          interruptionModeAndroid:
            Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        });

        await recording.prepareToRecordAsync(RecordingOptions);
        await recording.startAsync();

        isRecording = true;
        setRecordingStatus(isRecording);
      } catch (err) {
        console.error(err);
      }
    } else if (status === true && isPlaying === false && findBeat === false) {
      alertDelay();
    } else {
      await Audio.requestPermissionsAsync();
    }
  };

  const stopRec = async () => {
    pause();

    await recording.stopAndUnloadAsync();
    setRecording(new Audio.Recording());
    const uri = recording.getURI();

    console.log(uri);
    // Current Save Folder URL: /Users/dariodumlijan/Library/Developer/CoreSimulator/Devices/B54A7218-4990-45B7-925F-BC578F42FB29/data/Containers/Data/Application/13C70B38-FE6B-4F46-A0C0-CC95AE195051/Library/Caches/ExponentExperienceData/%40ddario%2FRitmo

    isRecording = false;
    setRecordingStatus(isRecording);
  };
  */
  /* Recording Functions - END */

  return (
    <View style={bottomStyle.wrapper}>
      <View style={bottomStyle.wrapperBG}>
        <View style={bottomStyle.presetWrapper}>
          {map(global.presets, (preset: Preset, key: PresetKey) => (
            <TouchableHighlight
              key={key}
              underlayColor={colors.grayBlue}
              style={{
                ...bottomStyle.presetBtn,
                ...(isEmpty(preset) && {
                  borderColor: colors.gray,
                  backgroundColor: colors.bg,
                }),
              }}
              onPress={() => handlePreset(preset, key)}
              onLongPress={() => handleModalCall(key)}
            >
              <Text style={bottomStyle.presetText}>{t(`bottom.preset.${key}`)}</Text>
            </TouchableHighlight>
          ))}
        </View>
        <View style={sliderStyle.wrapper}>
          {map(global.sliders, (val: number, key: SoundKey) => (
            <Slider
              key={key}
              value={val}
              minimumValue={staticState.sliderMin}
              maximumValue={staticState.sliderMax}
              step={staticState.sliderStep}
              minimumTrackTintColor={colors.grayLight}
              maximumTrackTintColor={colors.grayLight}
              containerStyle={sliderStyle.container}
              trackStyle={sliderStyle.track}
              renderThumbComponent={() => <SliderThumb label={key} />}
              thumbTouchSize={{ width: 65, height: 25 }}
              onValueChange={(targetVal) => handleSliderChange(first(targetVal) as number, key)}
            />
          ))}
        </View>
        <View style={bottomStyle.btnWrapper}>
          <TouchableHighlight
            underlayColor={colors.grayBlue}
            style={bottomStyle.btnPrimary}
            onPress={handleClearBeat}
          >
            <Text style={bottomStyle.btnPrimaryText}>{t('bottom.actions.clear')}</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={colors.grayBlue}
            style={bottomStyle.btnPrimary}
            onPress={handleResetBeat}
          >
            <Text style={bottomStyle.btnPrimaryText}>{t('bottom.actions.reset')}</Text>
          </TouchableHighlight>
          {/* <TouchableHighlight
            underlayColor={colors.grayBlue}
            style={[bottomStyle.btnPrimary, bottomStyle.btnRecording]}
            onPress={handleRecording}
          >
            <View
              style={[bottomStyle.iconRecording, {
                backgroundColor: global.ui.isRecording ? colors.white : colors.red,
              }]}
            />
          </TouchableHighlight> */}
        </View>
      </View>
    </View>
  );
}

export default Bottom;
