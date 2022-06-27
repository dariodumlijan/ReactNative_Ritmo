// @flow
import { Platform, StyleSheet } from 'react-native';
import { deviceWidth, isTablet } from '../utils';
import colors from './colors';

type CheckboxStyle = {
  wrapper: Object,
  checkbox: Object,
  default: Object,
  hihat: Object,
  snare: Object,
  kick: Object,
}

export const checkboxStyle: CheckboxStyle = StyleSheet.create({
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

type SelectStyle = {
  inputWrapper: Object,
  label: Object,
  input: Object,
  inputText: Object,
  inputIcon: Object,
  listWrapper: Object,
  list: Object,
  listItem: Object,
  listItemNoBorder: Object,
  listText: Object,
  listDisabledText: Object,
}

export const selectStyle: SelectStyle = StyleSheet.create({
  inputWrapper: {
    flexShrink: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  label: {
    fontFamily: 'Montserrat-SemiBold',
    textTransform: 'uppercase',
    fontSize: 20,
    textAlign: 'left',
    color: colors.primaryDark,
    marginRight: 10,
    marginBottom: 10,
  },
  input: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: 200,
    height: 40,
    backgroundColor: colors.grayLight,
    borderRadius: 15,
  },
  inputText: {
    fontFamily: 'Montserrat-SemiBold',
    color: colors.grayBlue,
    textAlign: 'right',
    fontSize: 24,
    marginRight: 10,
  },
  inputIcon: {
    position: 'absolute',
    left: 10,
    width: 20,
    aspectRatio: 1 / 1,
  },
  listWrapper: {
    width: !isTablet ? '90%' : '72%',
    maxHeight: '60%',
    borderRadius: 30,
    overflow: Platform.OS === 'ios' ? 'scroll' : 'hidden',
    marginVertical: '30%',
    marginHorizontal: !isTablet ? '5%' : '14%',
  },
  list: {
    backgroundColor: colors.gray,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.grayBlue,
    width: '100%',
    flexGrow: 1,
  },
  listItem: {
    width: '100%',
    borderBottomColor: colors.disabledList,
    borderBottomWidth: 1,
  },
  listItemNoBorder: {
    borderBottomWidth: 0,
  },
  listText: {
    fontFamily: 'Montserrat-SemiBold',
    color: colors.black,
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 10,
  },
  listDisabledText: {
    fontFamily: 'Montserrat-SemiBold',
    color: colors.disabledList,
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 10,
  },
});

type SliderStyle = {
  wrapper: Object,
  container: Object,
  track: Object,
  thumb: Object,
  label: Object,
}

export const sliderStyle: SliderStyle = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-between',
    marginHorizontal: !isTablet ? '5%' : '10%',
    marginVertical: '5%',
    width: !isTablet ? '90%' : '80%',
  },
  container: {
    flexShrink: 1,
    width: '100%',
  },
  track: {
    borderRadius: 2,
    height: 4,
    width: '100%',
  },
  thumb: {
    alignItems: 'center',
    borderRadius: 30,
    display: 'flex',
    height: 30,
    justifyContent: 'center',
    width: 70,
  },
  label: {
    color: colors.primaryDark,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    lineHeight: 16,
  },
});
