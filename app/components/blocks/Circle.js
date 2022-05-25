// @flow
import React, { useState } from 'react';
import type { Node } from 'react';
import {
  Animated,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { isEqual, map } from 'lodash';
import Alert from '../elements/misc/Alert';
import Play from '../../assets/icons/Play';
import Pause from '../../assets/icons/Pause';
import { selectors as globalSelectors } from '../../store/globalStore';
import { actions as beatActions, selectors as beatSelectors } from '../../store/beatsStore';
import { calcBpmInterval, isBeatEmpty } from '../../utils';
import useLocale from '../../locales';
import circleStyle from '../../styles/circle_style';
import { checkboxStyle } from '../../styles/inputs_style';
import colors from '../../styles/colors';
import type { UI } from '../../store/globalStore';
import type { Beat, Beats } from '../../sound/beats';

function Circle(): Node {
  const { t } = useLocale();
  const dispatch = useDispatch();
  const global: UI = useSelector(globalSelectors.getUI, isEqual);
  const beats: Beats = useSelector(beatSelectors.getBeats, isEqual);
  const [circleRadius, setCircleRadius] = useState({ hihat: 0, snare: 0, kick: 0 });
  const [showNoBeatAlert, setShowNoBeatAlert] = useState(false);

  const getDimentions = (e: Object, key: string) => setCircleRadius({ ...circleRadius, ...{ [key]: e.nativeEvent.layout.width / 2 - 2.5 } });

  const handleStart = () => {
    if (isBeatEmpty(beats)) {
      setShowNoBeatAlert(true);

      return;
    }

    dispatch(beatActions.playBeat({
      useSample: global.useSample,
      bpmInterval: calcBpmInterval(global.useBPM),
    }));
  };

  const handlePause = () => {
    dispatch(beatActions.pauseBeat());
  };

  return (
    <View style={circleStyle.wrapper}>
      <Animated.View
        style={[
          circleStyle.beatline,
          { transform: [{ rotate: '0deg' }, { translateY: -circleRadius.hihat / 2 }] },
        ]}
      />

      {map(circleRadius, (val, key) => (
        <View
          key={key}
          style={{ ...circleStyle.circle, ...circleStyle[key] }}
          onLayout={(e) => getDimentions(e, key)}
        >
          {map(beats[key], (beat: Beat, beatKey: number) => (
            <React.Fragment key={beatKey}>
              {beat.visible && (
                <TouchableOpacity
                  activeOpacity={1}
                  style={[
                    checkboxStyle.wrapper,
                    {
                      transform: [{ rotate: beat.angle + 'deg' }, { translateY: -circleRadius[key] }],
                    },
                  ]}
                  onPress={() => dispatch(
                    beatActions.toggleCheckbox({
                      key,
                      index: beatKey,
                      bool: !beat.checked,
                    }),
                  )
                  }
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
          ))}
        </View>
      ))}

      {global.isPlaying ? (
        <TouchableHighlight
          style={circleStyle.btnWrapper}
          underlayColor={colors.primaryDark}
          onPress={handlePause}
        >
          <Animated.View style={[circleStyle.btnAnimated, { transform: [{ scale: 1 }] }]}>
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

      <Alert
        clearDelayMS={3300}
        visible={showNoBeatAlert}
        onDestroy={() => setShowNoBeatAlert(false)}
      >
        <Text>{t('alert.no_beat')}</Text>
      </Alert>
    </View>
  );
}

export default Circle;
