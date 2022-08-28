// @flow
import { StyleSheet } from 'react-native';
import { deviceWidth, isTablet } from '../utils';
import colors from './colors';

const circleRad = deviceWidth / 2;

type CircleStyle = {
  wrapper: Object,
  circle: Object,
  hihat: Object,
  snare: Object,
  kick: Object,
  beatline: Object,
  btnWrapper: Object,
  btnAnimated: Object,
  btnIcon: Object,
};

const circleStyle: CircleStyle = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    aspectRatio: 1 / 1,
    display: 'flex',
    height: isTablet ? '70%' : null,
    justifyContent: 'center',
    marginBottom: '12%',
    marginTop: !isTablet ? '4%' : '6%',
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
    borderRadius: circleRad,
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    width: '25%',
    zIndex: 4,
  },
  btnAnimated: {
    alignItems: 'center',
    aspectRatio: 1 / 1,
    backgroundColor: colors.primary,
    borderRadius: circleRad,
    display: 'flex',
    justifyContent: 'center',
    padding: 25,
    width: '100%',
  },
  btnIcon: {
    aspectRatio: 1 / 1,
    width: isTablet ? '60%' : '100%',
  },
});

export default circleStyle;
