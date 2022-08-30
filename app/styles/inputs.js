// @flow
import { StyleSheet } from 'react-native';
import {
  deviceHeight, deviceWidth, isApple, isTablet,
} from '../utils';
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
    // width: deviceWidth * (isTablet ? 0.04 : 0.06),
    width: '7%',
    zIndex: 1,
  },
  checkbox: {
    aspectRatio: 1 / 1,
    borderRadius: deviceWidth * 0.1,
    borderWidth: isTablet ? 4 : 2,
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
  listOverlay: Object,
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
    fontSize: 18,
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
    fontSize: 20,
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
  listOverlay: {
    backgroundColor: colors.blackTransparent,
    height: deviceHeight,
    left: 0,
    position: 'absolute',
    top: 0,
    width: deviceWidth,
    zIndex: 1,
  },
  listWrapper: {
    borderColor: colors.grayBlue,
    borderRadius: 30,
    borderWidth: 2,
    marginHorizontal: isTablet ? '15%' : '5%',
    marginVertical: '30%',
    maxHeight: '60%',
    overflow: isApple ? 'scroll' : 'hidden',
    width: isTablet ? '70%' : '90%',
    zIndex: 2,
  },
  list: {
    backgroundColor: colors.gray,
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

type TimeSignatureSelectStyle = {
  inputWrapper: Object,
  label: Object,
  input: Object,
  valueItem: Object,
  inputText: Object,
  inputTextLabel: Object,
  inputIcon: Object,
  listOverlay: Object,
  listWrapper: Object,
  list: Object,
  listLabelWrapper: Object,
  proWrapper: Object,
  proText: Object,
  listSection: Object,
  listLabel: Object,
  listItem: Object,
  listItemNoBorder: Object,
  listText: Object,
}

export const timeSignatureSelectStyle: TimeSignatureSelectStyle = StyleSheet.create({
  inputWrapper: {
    alignItems: 'flex-end',
    display: 'flex',
    flexShrink: 1,
    justifyContent: 'space-between',
  },
  label: {
    color: colors.primaryDark,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
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
    justifyContent: 'center',
    width: 200,
  },
  valueItem: {
    alignItems: 'flex-end',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 5,
  },
  inputText: {
    color: colors.grayBlue,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    marginRight: 10,
    minWidth: 55,
    textAlign: 'right',
  },
  inputTextLabel: {
    color: colors.grayBlue,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    marginRight: 10,
    textAlign: 'right',
  },
  inputIcon: {
    aspectRatio: 1 / 1,
    left: 10,
    position: 'absolute',
    top: 10,
    width: 20,
  },
  listOverlay: {
    backgroundColor: colors.blackTransparent,
    height: deviceHeight,
    left: 0,
    position: 'absolute',
    top: 0,
    width: deviceWidth,
    zIndex: 1,
  },
  listWrapper: {
    borderColor: colors.grayBlue,
    borderRadius: 30,
    borderWidth: 2,
    marginHorizontal: isTablet ? '15%' : '5%',
    marginVertical: '30%',
    maxHeight: '60%',
    overflow: isApple ? 'scroll' : 'hidden',
    width: isTablet ? '70%' : '90%',
    zIndex: 2,
  },
  list: {
    backgroundColor: colors.gray,
    flexGrow: 1,
    width: '100%',
  },
  listLabelWrapper: {
    backgroundColor: colors.grayBlue,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  listLabel: {
    color: colors.white,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    marginRight: 20,
  },
  proWrapper: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 14,
    display: 'flex',
    justifyContent: 'center',
  },
  proText: {
    color: colors.primaryDark,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlign: 'left',
  },
  listSection: {},
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
    marginHorizontal: isTablet ? '10%' : '5%',
    marginVertical: '5%',
    maxHeight: 200,
    maxWidth: 500,
    width: isTablet ? '80%' : '90%',
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
    height: isTablet ? 40 : 30,
    justifyContent: 'center',
    width: isTablet ? 120 : 70,
  },
  label: {
    color: colors.primaryDark,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: isTablet ? 18 : 14,
    lineHeight: isTablet ? 20 : 16,
  },
});

type RadioStyle = {
  wrapper: Object,
  container: Object,
  text: Object,
  selected: Object,
  notSelected: Object,
}

export const radioStyle: RadioStyle = StyleSheet.create({
  wrapper: {
    alignItems: 'flex-end',
    display: 'flex',
    flexGrow: 1 / 5,
    justifyContent: 'space-between',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: colors.grayBlue,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    marginRight: 14,
    textAlign: 'center',
  },
  selected: {
    aspectRatio: 1 / 1,
    backgroundColor: colors.primaryDark,
    borderRadius: 30 / 2,
    width: 30,
  },
  notSelected: {
    aspectRatio: 1 / 1,
    backgroundColor: colors.grayLight,
    borderRadius: 30 / 2,
    width: 30,
  },
});

type TextInputStyle = {
  input: Object,
}

export const textInputStyle: TextInputStyle = StyleSheet.create({
  input: {
    backgroundColor: colors.grayLight,
    borderRadius: 15,
    color: colors.grayBlue,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    height: 40,
    textAlign: 'center',
    textTransform: 'uppercase',
    width: 120,
  },
});
