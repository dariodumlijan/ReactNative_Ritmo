import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { secondsToMilliseconds } from 'date-fns';
import { isEqual, map } from 'lodash';
import Pause from '../../../assets/icons/Pause';
import Play from '../../../assets/icons/Play';
import useLocale from '../../../locales';
import { actions as beatActions, selectors as beatSelectors } from '../../../store/beatsStore';
import { selectors as globalSelectors } from '../../../store/globalStore';
import circleStyle from '../../../styles/circle';
import colors from '../../../styles/colors';
import { checkboxStyle } from '../../../styles/inputs';
import notificationsStyle from '../../../styles/notifications';
import {
  calcBpmInterval,
  calcPulseInterval,
  isBeatEmpty,
} from '../../../utils';
import { useReview, useTeleport } from '../../../utils/hooks';
import Alert from '../../elements/misc/Alert';
import type { Beat, Beats } from '../../../sound/beats';
import type { UI } from '../../../store/globalStore';

function Circle() {
  const { t } = useLocale();
  const { teleport } = useTeleport();
  const dispatch = useDispatch();
  const reviewApp = useReview();
  const global: UI = useSelector(globalSelectors.getUI, isEqual);
  const beats: Beats = useSelector(beatSelectors.getBeats, isEqual);
  const [circleRadius, setCircleRadius] = useState({ hihat: 0, snare: 0, kick: 0 });
  const beatlineAnimation = useRef(new Animated.Value(0)).current;
  const pulseAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => () => {
    dispatch(beatActions.pauseBeat());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!global.isPlaying) {
      beatlineAnimation.stopAnimation();
      beatlineAnimation.setValue(0);
      pulseAnimation.stopAnimation();
      pulseAnimation.setValue(1);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [global.isPlaying]);

  const getDimensions = (e: any, key: string) => setCircleRadius({ ...circleRadius, ...{ [key]: e.nativeEvent.layout.width / 2 - 2.5 } });

  const beatlineAngle = beatlineAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleAnimations = () => {
    const bpmInterval = calcBpmInterval(global.useBPM);
    const pulseInterval = calcPulseInterval(bpmInterval);

    const handlePulseAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnimation, {
            toValue: 0.9,
            duration: pulseInterval,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
          Animated.timing(pulseAnimation, {
            toValue: 1,
            duration: pulseInterval,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
        ]),
      ).start();
    };

    const handleLineAnimation = () => {
      Animated.loop(
        Animated.timing(beatlineAnimation, {
          toValue: 1,
          duration: bpmInterval,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ).start();
    };

    handleLineAnimation();
    handlePulseAnimation();
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

    dispatch(beatActions.playBeat({
      useSample: global.useSample,
      bpmInterval: calcBpmInterval(global.useBPM),
    }));

    handleAnimations();
  };

  const handlePause = () => {
    dispatch(beatActions.pauseBeat());
    reviewApp();
  };

  const handleCheckbox = (key: string, index: number, checked: boolean) => {
    dispatch(beatActions.toggleCheckbox({ key, index, checked }));
  };

  return (
    <View style={circleStyle.wrapper}>
      <Animated.View
        style={[
          circleStyle.beatline,
          {
            transform: [
              { rotate: beatlineAngle },
              { translateY: -circleRadius.hihat / 2 },
            ],
          },
        ]}
      />

      {map(circleRadius, (_val, key) => (
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
                    zIndex: 5,
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

      {map(circleRadius, (_val, key) => (
        <View
          key={key}
          style={{ ...circleStyle.circle, ...circleStyle[key] }}
          onLayout={(e: any) => getDimensions(e, key)}
        />
      ))}

      {global.isPlaying ? (
        <TouchableHighlight
          style={circleStyle.btnWrapper}
          underlayColor={colors.primaryDark}
          onPress={handlePause}
        >
          <Animated.View
            style={[
              circleStyle.btnAnimated,
              {
                transform: [
                  { scale: pulseAnimation },
                ],
              },
            ]}
          >
            <Pause style={circleStyle.btnIcon} />
          </Animated.View>
        </TouchableHighlight>
      ) : (
        <TouchableHighlight
          style={[
            circleStyle.btnWrapper,
            {
              backgroundColor: colors.primary,
              padding: 25,
            },
          ]}
          underlayColor={colors.primaryDark}
          onPress={handleStart}
        >
          <Play style={circleStyle.btnIcon} />
        </TouchableHighlight>
      )}
    </View>
  );
}

export default Circle;
