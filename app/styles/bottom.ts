// @flow
import { StyleSheet } from 'react-native';
import { isTablet } from '../utils';
import colors from './colors';

type BottomStyle = {
  wrapper: Object,
  wrapperBG: Object,
  presetWrapper: Object,
  presetBtn: Object,
  presetText: Object,
  btnWrapper: Object,
  btnPrimary: Object,
  btnPrimaryText: Object,
  btnRecording: Object,
  iconRecording: Object,
};

const bottomStyle: BottomStyle = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    backgroundColor: colors.bg,
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  wrapperBG: {
    alignItems: 'center',
    backgroundColor: colors.gray,
    borderTopLeftRadius: 70,
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: '5%',
    width: '100%',
  },
  presetWrapper: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    flexShrink: 1,
    justifyContent: 'space-between',
    marginTop: -18,
    maxWidth: 400,
    width: isTablet ? '60%' : '80%',
  },
  presetBtn: {
    backgroundColor: colors.primary,
    borderColor: colors.gray,
    borderRadius: 30,
    borderWidth: 2,
    display: 'flex',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  presetText: {
    color: colors.white,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: isTablet ? 18 : 14,
    lineHeight: isTablet ? 20 : 16,
    textAlign: 'center',
  },
  btnWrapper: {
    // marginBottom: isiPhone ? 80 : 40,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexShrink: 1,
    justifyContent: 'flex-start',
    marginHorizontal: !isTablet ? '5%' : 0,
    maxWidth: 500,
    width: isTablet ? '78%' : '90%',
  },
  btnPrimary: {
    backgroundColor: colors.primaryDark,
    borderBottomColor: colors.grayBlue,
    borderBottomWidth: 3,
    borderLeftColor: colors.grayBlue,
    borderLeftWidth: 1,
    borderRadius: 15,
    borderRightColor: colors.grayBlue,
    borderRightWidth: 1,
    marginRight: '5%',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  btnPrimaryText: {
    color: colors.white,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: isTablet ? 20 : 16,
    textAlign: 'center',
  },
  btnRecording: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  iconRecording: {
    aspectRatio: 1 / 1,
    borderRadius: 10,
    width: 16,
  },
});

export default bottomStyle;
