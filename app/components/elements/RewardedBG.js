// @flow
import React from 'react';
import type { Node } from 'react';
import { StyleSheet, Platform, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import colors from '../../styles/colors';

const isTablet = DeviceInfo.isTablet();
const isiPhone = Platform.OS === 'ios' && !isTablet;

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
    backgroundColor: colors.primaryDark,
    ...(isiPhone && { flex: 1 }),
  },
});

function RewardedBG(): Node {
  return <View style={styles.backgroundWrapper} />;
}

export default RewardedBG;
