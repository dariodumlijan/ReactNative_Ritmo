import { StyleSheet } from 'react-native';
import { Font } from '.';
import colors from './colors';
import { isTablet, isiPhone } from '../utils';

const settingsStyle = StyleSheet.create({
  navigation: {
    alignItems: 'flex-end',
    display: 'flex',
    flexDirection: 'row',
    height: isTablet ? '6%' : '8%',
    justifyContent: 'space-between',
    marginTop: isiPhone ? 0 : '5%',
    width: isTablet ? '80%' : '100%',
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
    flex: 1,
    justifyContent: 'space-between',
    maxHeight: 750,
    width: isTablet ? '80%' : '100%',
  },
  menuTitle: {
    color: colors.primaryDark,
    fontFamily: Font.semiBold,
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
    fontFamily: Font.semiBold,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default settingsStyle;
