// @flow
import { StyleSheet, Dimensions } from 'react-native';
import colors from './colors';

const deviceWidth = Dimensions.get('screen').width;

export const checkboxStyle: Object = StyleSheet.create({
  wrapper: {
    aspectRatio: 1 / 1,
    position: 'absolute',
    width: deviceWidth * 0.06,
    zIndex: 1,
  },
  checkbox: {
    aspectRatio: 1 / 1,
    borderRadius: deviceWidth * 0.03,
    borderWidth: 2,
    width: '100%',
  },
  default: {
    backgroundColor: colors.primaryDark,
    borderColor: colors.white,
  },
  hihat: {
    backgroundColor: colors.orange,
    borderColor: colors.orange,
  },
  snare: {
    backgroundColor: colors.green,
    borderColor: colors.green,
  },
  kick: {
    backgroundColor: colors.cyan,
    borderColor: colors.cyan,
  },
});
