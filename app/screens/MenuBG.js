import React from 'react';
import { StyleSheet, Platform, Dimensions, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import colors from '../stylesheets/colors';

import Logo from '../assets/icons/Logo';

const isTablet = DeviceInfo.isTablet();
const isiPhone = Platform.OS === 'ios' && !isTablet;
const deviceWidth = Dimensions.get('screen').width;
const useWidth = deviceWidth * 0.28;

function MenuBG() {
  return (
    <View style={styles.backgroundWrapper}>
      <Logo style={styles.menuLogo} />
    </View>
  );
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
    backgroundColor: colors.gray,
    flex: isiPhone ? null : 1,
    overflow: 'hidden',
  },
  menuLogo: {
    width: '200%',
    aspectRatio: 3 / 1,
    opacity: 0.5,
    transform: [{ translateX: useWidth }, { rotate: '90deg' }],
  },
});

export default MenuBG;
