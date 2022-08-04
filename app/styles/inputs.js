// @flow
import { StyleSheet } from 'react-native';
import { deviceWidth, isApple, isTablet } from '../utils';
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
  inputWrapperRewarded: Object,
  label: Object,
  input: Object,
  inputRewarded: Object,
  inputText: Object,
  inputIcon: Object,
  inputIconRewarded: Object,
  listWrapper: Object,
  list: Object,
  listItem: Object,
  listItemNoBorder: Object,
  listText: Object,
  listDisabledText: Object,
}

export const selectStyle: SelectStyle = StyleSheet.create({
  inputWrapper: {
    alignItems: 'flex-end',
    display: 'flex',
    flexShrink: 1,
    justifyContent: 'space-between',
  },
  inputWrapperRewarded: {
    alignItems: 'center',
    display: 'flex',
    flexShrink: 1,
    justifyContent: 'space-between',
  },
  label: {
    color: colors.primaryDark,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    marginBottom: 10,
    marginRight: 10,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  input: {
    alignItems: 'flex-end',
    backgroundColor: colors.grayLight,
    borderRadius: 15,
    display: 'flex',
    height: 40,
    justifyContent: 'center',
    width: 200,
  },
  inputRewarded: {
    alignItems: 'center',
    backgroundColor: colors.grayLight,
    borderRadius: 15,
    display: 'flex',
    height: 40,
    justifyContent: 'center',
    width: 250,
  },
  inputText: {
    color: colors.grayBlue,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 24,
    marginRight: 10,
    textAlign: 'right',
  },
  inputIcon: {
    aspectRatio: 1 / 1,
    left: 10,
    position: 'absolute',
    width: 20,
  },
  inputIconRewarded: {
    aspectRatio: 1 / 1,
    position: 'absolute',
    right: 10,
    width: 20,
  },
  listWrapper: {
    borderRadius: 30,
    marginHorizontal: !isTablet ? '5%' : '14%',
    marginVertical: '30%',
    maxHeight: '60%',
    overflow: isApple ? 'scroll' : 'hidden',
    width: !isTablet ? '90%' : '72%',
  },
  list: {
    backgroundColor: colors.gray,
    borderColor: colors.grayBlue,
    borderRadius: 30,
    borderWidth: 2,
    flexGrow: 1,
    width: '100%',
  },
  listItem: {
    borderBottomColor: colors.disabledList,
    borderBottomWidth: 1,
    width: '100%',
  },
  listItemNoBorder: {
    borderBottomWidth: 0,
  },
  listText: {
    color: colors.black,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },
  listDisabledText: {
    color: colors.disabledList,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
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
