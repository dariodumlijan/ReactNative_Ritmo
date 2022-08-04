// @flow
import { StyleSheet } from 'react-native';
import { isTablet } from '../utils';
import colors from './colors';

type SettingsStyle = {
  navigation: Object,
  closeIconWrapper: Object,
  closeIcon: Object,
  btnRewardScreen: Object,
  btnRewardScreenText: Object,
  btnRewardScreenDisabled: Object,
  btnRewardScreenTextDisabled: Object,
  menuWrapper: Object,
  menuTitle: Object,
  bpmWrapper: Object,
  inputBPM: Object,
  radioWrapper: Object,
  radioCont: Object,
  radioText: Object,
  radioSelected: Object,
  radioNotSelected: Object,
}

const settingsStyle: SettingsStyle = StyleSheet.create({
  navigation: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    height: !isTablet ? '8%' : '6%',
    justifyContent: 'space-between',
    width: !isTablet ? '100%' : '80%',
  },
  closeIconWrapper: {
    height: '80%',
    aspectRatio: 1 / 2,
  },
  closeIcon: {
    height: '100%',
    aspectRatio: 1 / 2,
  },
  btnRewardScreen: {
    backgroundColor: colors.primaryDark,
    borderBottomColor: colors.grayBlue,
    borderBottomWidth: 3,
    borderLeftColor: colors.grayBlue,
    borderLeftWidth: 1,
    borderRadius: 15,
    borderRightColor: colors.grayBlue,
    borderRightWidth: 1,
    marginBottom: '15%',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  btnRewardScreenText: {
    color: colors.white,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    textAlign: 'center',
  },
  btnRewardScreenDisabled: {
    backgroundColor: colors.grayBlue,
    borderBottomWidth: 0,
    borderColor: colors.grayBlue,
    borderRadius: 15,
    marginBottom: '15%',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  btnRewardScreenTextDisabled: {
    color: colors.white,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    textAlign: 'center',
  },
  menuWrapper: {
    alignItems: 'flex-end',
    display: 'flex',
    flex: !isTablet ? 1 : 1 / 1.2,
    justifyContent: 'space-between',
    width: !isTablet ? '100%' : '80%',
  },
  menuTitle: {
    color: colors.primaryDark,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    marginBottom: 10,
    marginRight: 10,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  bpmWrapper: {
    alignItems: 'flex-end',
    display: 'flex',
    flexShrink: 1,
    justifyContent: 'space-between',
    marginTop: '5%',
  },
  inputBPM: {
    backgroundColor: colors.grayLight,
    borderRadius: 15,
    color: colors.grayBlue,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 24,
    height: 40,
    textAlign: 'center',
    textTransform: 'uppercase',
    width: 120,
  },
  radioWrapper: {
    alignItems: 'flex-end',
    display: 'flex',
    flexGrow: 1 / 5,
    justifyContent: 'space-between',
  },
  radioCont: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioText: {
    color: colors.grayBlue,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 24,
    marginRight: 14,
    textAlign: 'center',
  },
  radioSelected: {
    aspectRatio: 1 / 1,
    backgroundColor: colors.primaryDark,
    borderRadius: 30 / 2,
    width: 30,
  },
  radioNotSelected: {
    aspectRatio: 1 / 1,
    backgroundColor: colors.grayLight,
    borderRadius: 30 / 2,
    width: 30,
  },
});

export default settingsStyle;
