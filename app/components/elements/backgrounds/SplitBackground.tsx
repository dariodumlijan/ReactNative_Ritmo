// @flow
import React from 'react';
import type { Node } from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { deviceHeight, deviceWidth, isiPhone } from '../../../utils';
import colors from '../../../styles/colors';

const styles: Object = StyleSheet.create({
  backgroundWrapper: {
    ...(isiPhone && { flex: 1 }),
    backgroundColor: colors.bg,
    bottom: 0,
    display: 'flex',
    height: deviceHeight * 1.1,
    left: 0,
    position: 'absolute',
    top: 0,
    width: deviceWidth * 1.1,
  },
});

function SplitBackground(): Node {
  return (
    <LinearGradient
      style={styles.backgroundWrapper}
      colors={[colors.bg, colors.gray]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      locations={[0.5, 0.5]}
    />
  );
}

export default SplitBackground;
