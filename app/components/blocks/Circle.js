// @flow
import React, { useState } from 'react';
import type { Node } from 'react';
import { Animated, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { isEqual, map } from 'lodash';
import Play from '../../assets/icons/Play';
import Pause from '../../assets/icons/Pause';
import { actions, selectors } from '../../store/beatsStore';
import circleStyle from '../../styles/circle_style';
import { checkboxStyle } from '../../styles/inputs_style';
import colors from '../../styles/colors';
import type { Beat, State } from '../../store/beatsStore';
import type { ReduxState } from '../../types';

function Circle(): Node {
  const dispatch = useDispatch();
  const isPlaying: boolean = useSelector((state: ReduxState) => state.global.ui.isPlaying, isEqual);
  const beats: State = useSelector(selectors.getBeats, isEqual);
  const [circleRadius, setCircleRadius] = useState({ hihat: 0, snare: 0, kick: 0 });

  const getDimentions = (e: Object, key: string) =>
    setCircleRadius({ ...circleRadius, ...{ [key]: e.nativeEvent.layout.width / 2 - 2.5 } });

  const handleStart = () => {};

  const handlePause = () => {};

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
                  onPress={() =>
                    dispatch(
                      actions.toggleCheckbox({
                        key,
                        index: beatKey,
                        bool: !beat.checked,
                      })
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

      {isPlaying ? (
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
    </View>
  );
}

export default Circle;
