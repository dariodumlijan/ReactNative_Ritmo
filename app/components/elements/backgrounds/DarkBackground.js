// @flow
import React from 'react';
import type { Node } from 'react';
import { StyleSheet, View } from 'react-native';
import { deviceHeight, deviceWidth, isiPhone } from '../../../utils';
import colors from '../../../styles/colors';

const styles: Object = StyleSheet.create({
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

function DarkBackground(): Node {
  return <View style={styles.backgroundWrapper} />;
}

export default DarkBackground;
