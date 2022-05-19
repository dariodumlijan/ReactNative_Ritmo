// @flow
import { StyleSheet, Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import colors from './colors';

const isTablet = DeviceInfo.isTablet();
const deviceWidth = Dimensions.get('screen').width;
const circleRad = deviceWidth / 2;

const circleStyle: Object = StyleSheet.create({
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
  },
  snare: {
    width: '78%',
  },
  kick: {
    width: '56%',
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
    zIndex: 2,
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
    width: !isTablet ? '100%' : '80%',
  },
});

export default circleStyle;
