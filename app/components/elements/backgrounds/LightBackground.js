// @flow
import React from 'react';
import type { Node } from 'react';
import { StyleSheet, View } from 'react-native';
import Logo from '../../../assets/icons/Logo';
import { deviceHeight, deviceWidth, isiPhone } from '../../../utils';
import colors from '../../../styles/colors';
import type { LocationInfo } from '../../../utils/hooks';

type Props = {
  locationInfo: LocationInfo
}

const styles: Object = StyleSheet.create({
  backgroundWrapper: {
    ...(isiPhone && { flex: 1 }),
    alignItems: 'flex-end',
    backgroundColor: colors.gray,
    bottom: 0,
    display: 'flex',
    height: deviceHeight * 1.1,
    justifyContent: 'center',
    left: '-5%',
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    top: '-5%',
    width: deviceWidth * 1.1,
  },
  menuLogo: {
    aspectRatio: 4 / 1,
    left: 0,
    opacity: 0.3,
    position: 'absolute',
    top: 0,
    transform: [
      { rotate: '90deg' },
      { translateX: deviceHeight / 2.25 },
      { translateY: deviceHeight / 2.5 },
    ],
    width: deviceHeight,
  },
});

function LightBackground(props: Props): Node {
  return (
    <View style={styles.backgroundWrapper}>
      {!props.locationInfo.isStateTree && (
        <Logo style={styles.menuLogo} fill={colors.grayBlue} />
      )}
    </View>
  );
}

export default LightBackground;
