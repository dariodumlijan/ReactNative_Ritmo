import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../../../styles/colors';
import { deviceHeight, deviceWidth, isiPhone } from '../../../utils';

const styles = StyleSheet.create({
  backgroundWrapper: {
    ...(isiPhone && { flex: 1 }),
    alignItems: 'flex-end',
    backgroundColor: colors.primaryDark,
    bottom: 0,
    display: 'flex',
    height: deviceHeight * 1.1,
    justifyContent: 'center',
    left: '-5%',
    position: 'absolute',
    right: 0,
    top: '-5%',
    width: deviceWidth * 1.1,
  },
});

function DarkBackground() {
  return <View style={styles.backgroundWrapper} />;
}

export default DarkBackground;
