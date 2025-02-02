import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { useTeleport } from '@app/context';
import SliderThumb from '@components/elements/inputs/SliderThumb';
import Alert from '@components/elements/misc/Alert';
import ClearPresetModal from '@components/elements/modals/ClearPresetModal';
import useLocale from '@locales';
import { Slider } from '@miblanchard/react-native-slider';
import { actions as beatActions, selectors as beatSelectors } from '@store/beatsStore';
import { actions as globalActions, selectors as globalSelectors } from '@store/globalStore';
import { selectors as staticSelectors } from '@store/staticStore';
import bottomStyle from '@styles/bottom';
import colors from '@styles/colors';
import { sliderStyle } from '@styles/inputs';
import notificationsStyle from '@styles/notifications';
import { isBeatEmpty } from '@utils';
import { useAppDispatch, useAppSelector } from '@utils/hooks';
import { secondsToMilliseconds } from 'date-fns';
import {
  first, isEmpty, isEqual, map,
} from 'lodash';
import type { Beats } from '@sound/beats';
import type { State as GlobalState, Preset } from '@store/globalStore';
import type { State as StaticState } from '@store/staticStore';
import type { PresetKey, SoundKey } from '@types';

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

      return;
    }

    teleport(
      <Alert clearDelayMS={secondsToMilliseconds(3.3)}>
        <Text style={notificationsStyle.alertText}>
          {t('alert.no_beat')}
        </Text>
      </Alert>,
    );
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
        </View>
      </View>
    </View>
  );
}

export default Bottom;
