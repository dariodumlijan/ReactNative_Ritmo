import { StyleSheet } from 'react-native';
import colors from '@styles/colors';
import { deviceWidth, isApple, isTablet } from '@utils';

const circleRad = deviceWidth / 2;
const circleStyle = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    aspectRatio: 1 / 1,
    display: 'flex',
    height: isTablet ? '70%' : null,
    justifyContent: 'center',
    marginBottom: '12%',
    marginTop: isTablet ? '6%' : '4%',
    width: isTablet ? null : '95%',
  },
  circle: {
    alignItems: 'center',
    aspectRatio: 1 / 1,
    borderColor: colors.white,
    borderRadius: circleRad,
    borderWidth: 5,
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
  },
  hihat: {
    width: '100%',
    zIndex: 1,
  },
  snare: {
    width: '78%',
    zIndex: 2,
  },
  kick: {
    width: '56%',
    zIndex: 3,
  },
  beatline: {
    backgroundColor: colors.primary,
    height: '50%',
    position: 'absolute',
    width: 10,
  },
  btnWrapper: {
    alignItems: 'center',
    aspectRatio: 1 / 1,
    backgroundColor: colors.primary,
    borderRadius: circleRad,
    display: 'flex',
    justifyContent: 'center',
    padding: !isApple && isTablet ? 40 : 25,
    position: 'absolute',
    width: '25%',
    zIndex: 5,
  },
  btnIcon: {
    aspectRatio: 1 / 1,
    padding: isTablet ? '15%' : 0,
    width: '100%',
  },
});

export default circleStyle;
