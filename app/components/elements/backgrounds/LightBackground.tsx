import React from 'react';
import { StyleSheet, View } from 'react-native';
import Logo from '@assets/icons/Logo';
import colors from '@styles/colors';
import { deviceHeight, deviceWidth, isiPhone } from '@utils';

type Props = {
  showLogo?: boolean
};

const styles = StyleSheet.create({
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
    transformOrigin: 'center',
    maxHeight: deviceWidth / 2,
    width: deviceHeight,
  },
});

function LightBackground(props: Props) {
  return (
    <View style={styles.backgroundWrapper}>
      {props.showLogo && (
        <View style={styles.menuLogo}>
          <Logo fill={colors.grayBlue} />
        </View>
      )}
    </View>
  );
}

export default LightBackground;
