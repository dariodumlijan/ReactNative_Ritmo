// @flow
import { StyleSheet } from 'react-native';
import { isTablet } from '../utils';
import colors from './colors';

type SettingsStyle = {
  navigation: Object,
  closeIconWrapper: Object,
  closeIcon: Object,
  menuWrapper: Object,
  menuTitle: Object,
  bpmWrapper: Object,
  soundWrapper: Object,
  btnRewardScreen: Object,
  btnRewardScreenText: Object,
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
    fontSize: 18,
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
  soundWrapper: {
    display: 'flex',
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
    marginTop: 20,
    marginBottom: '15%',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  btnRewardScreenText: {
    color: colors.white,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default settingsStyle;
