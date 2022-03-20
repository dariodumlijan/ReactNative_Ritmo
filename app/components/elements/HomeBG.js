// @flow
import React from 'react';
import type { Node } from 'react';
import { StyleSheet, Platform, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../styles/colors';

const isTablet = DeviceInfo.isTablet();
const isiPhone = Platform.OS === 'ios' && !isTablet;

const styles: Object = StyleSheet.create({
  backgroundWrapper: {
    position: 'absolute',
    top: 0,
    left: '-6%',
    right: 0,
    bottom: 0,
    display: 'flex',
    width: '112%',
    height: '120%',
    backgroundColor: colors.bg,
    ...(isiPhone && { flex: 1 }),
  },
  backgroundTop: {
    height: isiPhone ? '55%' : '50%',
    backgroundColor: colors.gray,
  },
  backgroundTopBlue: {
    flex: 1,
    backgroundColor: colors.bg,
    borderBottomRightRadius: 70,
  },
  backgroundBottom: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  backgroundBottomGray: {
    flex: 1,
    backgroundColor: colors.gray,
    borderTopLeftRadius: 70,
  },
});

function HomeBG(): Node {
  return (
    <LinearGradient
      style={styles.backgroundWrapper}
      colors={[colors.bg, colors.gray]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      locations={[0.5, 0.5]}
    >
      <View style={styles.backgroundTop}>
        <View style={styles.backgroundTopBlue} />
      </View>
      <View style={styles.backgroundBottom}>
        <View style={styles.backgroundBottomGray} />
      </View>
    </LinearGradient>
  );
}

export default HomeBG;
