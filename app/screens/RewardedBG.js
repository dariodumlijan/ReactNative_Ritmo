import React from 'react';
import { StyleSheet, Platform, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import colors from '../stylesheets/colors';

const isTablet = DeviceInfo.isTablet();
const isiPhone = Platform.OS === 'ios' && !isTablet;

function RewardedBG() {
  return <View style={styles.backgroundWrapper} />;
}

const styles = StyleSheet.create({
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
    flex: isiPhone ? null : 1,
  },
});

export default RewardedBG;
