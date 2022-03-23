// @flow
import React from 'react';
import type { Node } from 'react';
import { StyleSheet, View } from 'react-native';
import { isiPhone } from '../../../utils';
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
    backgroundColor: colors.primaryDark,
    ...(isiPhone && { flex: 1 }),
  },
});

function DarkBackground(): Node {
  return <View style={styles.backgroundWrapper} />;
}

export default DarkBackground;
