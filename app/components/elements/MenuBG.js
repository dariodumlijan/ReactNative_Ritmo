// @flow
import React from 'react';
import type { Node } from 'react';
import { StyleSheet, Platform, Dimensions, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Logo from '../../assets/icons/Logo';
import colors from '../../styles/colors';

const isTablet = DeviceInfo.isTablet();
const isiPhone = Platform.OS === 'ios' && !isTablet;
const deviceWidth = Dimensions.get('screen').width;
const useWidth = deviceWidth * 0.15;

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
    transform: [{ translateX: useWidth }, { rotate: '90deg' }],
  },
});

function MenuBG(): Node {
  return (
    <View style={styles.backgroundWrapper}>
      <Logo style={styles.menuLogo} fill={colors.grayBlue} />
    </View>
  );
}

export default MenuBG;
