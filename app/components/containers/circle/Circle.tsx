import React, { useEffect, useRef, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import {
  Animated, Easing, Text, TouchableHighlight, TouchableOpacity, View,
} from 'react-native';
import { useTeleport } from '@app/context';
import Pause from '@assets/icons/Pause';
import Play from '@assets/icons/Play';
import Alert from '@components/elements/misc/Alert';
import useLocale from '@locales';
import { actions as beatActions, selectors as beatSelectors } from '@store/beatsStore';
import { selectors as globalSelectors } from '@store/globalStore';
import circleStyle from '@styles/circle';
import colors from '@styles/colors';
import { checkboxStyle } from '@styles/inputs';
import notificationsStyle from '@styles/notifications';
import { calcBpmInterval, isApple, isBeatEmpty } from '@utils';
import { useAppDispatch, useAppSelector, useReview } from '@utils/hooks';
import { secondsToMilliseconds } from 'date-fns';
import {
  get, isEqual, map, uniqueId,
} from 'lodash';
import type { Beat } from '@sound/beats';
import type { SoundKey } from '@types';

function Circle() {
  const { t } = useLocale();
  const { teleport } = useTeleport();
  const dispatch = useAppDispatch();
  const reviewApp = useReview();
  const global = useAppSelector(globalSelectors.getUI, isEqual);
  const beats = useAppSelector(beatSelectors.getBeats, isEqual);
  const [circleRadius, setCircleRadius] = useState({ hihat: 0, snare: 0, kick: 0 });
  const [, setSalt] = useState(uniqueId('salt'));
  const beatlineAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => () => {
    dispatch(beatActions.pauseBeat());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (global.isPlaying) return;

    beatlineAnimation.resetAnimation();
    if (isApple) return;
    // hack for android animation reset bug
    setTimeout(() => setSalt(uniqueId('salt')), 1);
  }, [beatlineAnimation, global.isPlaying]);

  const getDimensions = (e: LayoutChangeEvent, key: string) => {
    const width = get(e, 'nativeEvent.layout.width', undefined);
    if (!width) return;

    setCircleRadius((state) => ({ ...state, ...{ [key]: width / 2 - 2.5 } }));
  };

  const handleAnimation = (bpmInterval: number) => {
    Animated.loop(
      Animated.timing(beatlineAnimation, {
        toValue: 1,
        duration: bpmInterval,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ).start();
  };

  const handleStart = () => {
    if (isBeatEmpty(beats)) {
      teleport(
        <Alert clearDelayMS={secondsToMilliseconds(3.3)}>
          <Text style={notificationsStyle.alertText}>{t('alert.no_beat')}</Text>
        </Alert>,
      );

      return;
    }

    const bpmInterval = calcBpmInterval(global.useBPM);
    handleAnimation(bpmInterval);
    dispatch(beatActions.playBeat(bpmInterval));
  };

  const handlePause = () => {
    dispatch(beatActions.pauseBeat());
    reviewApp();
  };

  const handleTogglePlay = () => {
    if (global.isPlaying) return handlePause();

    return handleStart();
  };

  const handleCheckbox = (key: SoundKey, index: number, checked: boolean) => {
    dispatch(beatActions.toggleCheckbox({ key, index, checked }));
  };

  return (
    <View style={circleStyle.wrapper}>
      <Animated.View
        style={[
          circleStyle.beatline,
          {
            transform: [
              {
                rotate: beatlineAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '359deg'],
                }),
              },
              { translateY: -circleRadius.hihat / 2 },
            ],
          },
        ]}
      />

      {map(circleRadius, (_val: number, key: SoundKey) => (
        map(beats[key], (beat: Beat, beatKey: number) => (
          <React.Fragment key={beatKey}>
            {beat.visible && (
              <TouchableOpacity
                activeOpacity={1}
                style={[
                  checkboxStyle.wrapper,
                  {
                    transform: [
                      { rotate: beat.angle + 'deg' },
                      { translateY: -circleRadius[key] },
                    ],
                    zIndex: 4,
                  },
                ]}
                onPress={() => handleCheckbox(key, beatKey, !beat.checked)}
              >
                <View
                  style={[
                    checkboxStyle.checkbox,
                    beat.checked ? checkboxStyle[key] : checkboxStyle.default,
                  ]}
                />
              </TouchableOpacity>
            )}
          </React.Fragment>
        ))),
      )}

      {map(circleRadius, (_val:number, key: SoundKey) => (
        <View
          key={key}
          style={{ ...circleStyle.circle, ...circleStyle[key] }}
          onLayout={(e) => getDimensions(e, key)}
        />
      ))}

      <TouchableHighlight
        style={circleStyle.btnWrapper}
        underlayColor={colors.primaryDark}
        activeOpacity={1}
        onPress={handleTogglePlay}
      >
        {global.isPlaying ? (
          <Pause style={circleStyle.btnIcon} />
        ) : (
          <Play style={circleStyle.btnIcon} />
        )}
      </TouchableHighlight>
    </View>
  );
}

export default Circle;
