// @flow
import React from 'react';
import type { Node } from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { isiPhone } from '../../../utils';
import colors from '../../../styles/colors';

const styles: Object = StyleSheet.create({
  backgroundWrapper: {
    ...(isiPhone && { flex: 1 }),
    backgroundColor: colors.bg,
    bottom: 0,
    display: 'flex',
    height: '120%',
    left: '-6%',
    position: 'absolute',
    right: 0,
    top: 0,
    width: '112%',
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
