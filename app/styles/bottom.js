// @flow
import { StyleSheet } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import colors from './colors';

const isTablet = DeviceInfo.isTablet();

const bottomStyle: Object = StyleSheet.create({
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
    marginTop: -15,
    width: !isTablet ? '80%' : '60%',
  },
  presetBtn: {
    backgroundColor: colors.primary,
    borderColor: colors.gray,
    borderRadius: 24,
    borderWidth: 2,
    display: 'flex',
    height: 30,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  presetText: {
    color: colors.white,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    lineHeight: 16,
    textAlign: 'center',
  },
  btnWrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexShrink: 1,
    justifyContent: 'flex-start',
    // marginBottom: isiPhone ? 80 : 40,
    marginHorizontal: !isTablet ? '5%' : 0,
    width: !isTablet ? '90%' : '78%',
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
    fontSize: 16,
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
