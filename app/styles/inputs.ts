import { StyleSheet } from 'react-native';
import { Font } from '@styles';
import colors from '@styles/colors';
import {
  deviceHeight, deviceWidth, isApple, isTablet,
} from '@utils';

export const checkboxStyle = StyleSheet.create({
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

export const selectStyle = StyleSheet.create({
  inputWrapper: {
    alignItems: 'flex-end',
    display: 'flex',
    flexShrink: 1,
    justifyContent: 'space-between',
  },
  label: {
    color: colors.primaryDark,
    fontFamily: Font.semiBold,
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
  inputText: {
    color: colors.grayBlue,
    fontFamily: Font.semiBold,
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
    fontFamily: Font.semiBold,
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },
  listDisabledText: {
    color: colors.disabledList,
    fontFamily: Font.semiBold,
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },
});

export const timeSignatureSelectStyle = StyleSheet.create({
  inputWrapper: {
    alignItems: 'flex-end',
    display: 'flex',
    flexShrink: 1,
    justifyContent: 'space-between',
  },
  label: {
    color: colors.primaryDark,
    fontFamily: Font.semiBold,
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
    fontFamily: Font.semiBold,
    fontSize: 20,
    marginRight: 10,
    minWidth: 55,
    textAlign: 'right',
  },
  inputTextLabel: {
    color: colors.grayBlue,
    fontFamily: Font.semiBold,
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
    borderRadius: 20,
    borderWidth: 2,
    marginHorizontal: isTablet ? '15%' : '5%',
    marginVertical: '30%',
    maxHeight: '60%',
    overflow: isApple ? 'scroll' : 'hidden',
    width: isTablet ? '70%' : '90%',
    zIndex: 2,
  },
  list: {
    backgroundColor: colors.white,
    flexGrow: 1,
    width: '100%',
  },
  listLabelWrapper: {
    alignItems: 'center',
    backgroundColor: colors.grayBlue,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  listLabel: {
    color: colors.white,
    fontFamily: Font.semiBold,
    fontSize: 16,
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
    fontFamily: Font.semiBold,
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
    fontFamily: Font.regular,
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
  },
});

export const sliderStyle = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-between',
    marginHorizontal: isTablet ? '10%' : '5%',
    marginVertical: '5%',
    maxHeight: isTablet ? 200 : 150,
    maxWidth: isTablet ? 600 : 500,
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
    fontFamily: Font.semiBold,
    fontSize: isTablet ? 18 : 14,
    lineHeight: isTablet ? 20 : 16,
  },
});

export const radioStyle = StyleSheet.create({
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
    fontFamily: Font.semiBold,
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

export const textInputStyle = StyleSheet.create({
  input: {
    backgroundColor: colors.grayLight,
    borderRadius: 15,
    color: colors.grayBlue,
    fontFamily: Font.semiBold,
    fontSize: 20,
    height: 40,
    padding: 0,
    textAlign: 'center',
    textTransform: 'uppercase',
    width: 120,
  },
});
