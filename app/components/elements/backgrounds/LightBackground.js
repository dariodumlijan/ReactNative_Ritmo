// @flow
import React from 'react';
import type { Node } from 'react';
import { StyleSheet, View } from 'react-native';
import Logo from '../../../assets/icons/Logo';
import { deviceWidth, isiPhone } from '../../../utils';
import colors from '../../../styles/colors';

const styles: Object = StyleSheet.create({
  backgroundWrapper: {
    position: 'absolute',
    top: '-5%',
    left: '-6%',
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '112%',
    height: '120%',
    backgroundColor: colors.gray,
    ...(isiPhone && { flex: 1 }),
    overflow: 'hidden',
  },
  menuLogo: {
    width: '200%',
    aspectRatio: 3 / 1,
    opacity: 0.3,
    transform: [{ translateX: deviceWidth * 0.15 }, { rotate: '90deg' }],
  },
});

function LightBackground(): Node {
  return (
    <View style={styles.backgroundWrapper}>
      <Logo style={styles.menuLogo} fill={colors.grayBlue} />
    </View>
  );
}

export default LightBackground;
