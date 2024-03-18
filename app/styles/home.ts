import { StyleSheet } from 'react-native';
import { Font } from '.';
import colors from './colors';
import { isTablet } from '../utils';

const homeStyle = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
  },
  topWrapper: {
    alignItems: 'center',
    backgroundColor: colors.gray,
    display: 'flex',
    height: '60%',
    justifyContent: 'center',
    width: '100%',
  },
  topWrapperBG: {
    alignItems: 'center',
    backgroundColor: colors.bg,
    borderBottomRightRadius: 70,
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: '5%',
    width: '100%',
  },
  navigation: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    height: isTablet ? '12%' : '14%',
    justifyContent: 'space-between',
    maxWidth: 500,
    width: isTablet ? '80%' : '100%',
  },
  logo: {
    aspectRatio: 2 / 1,
    height: '100%',
  },
  menu: {
    aspectRatio: 1 / 2,
    height: '120%',
    marginTop: -2,
  },
  appEnvironment: {
    alignItems: 'center',
    backgroundColor: colors.gray,
    borderRadius: 15,
    display: 'flex',
    justifyContent: 'center',
    marginTop: isTablet ? 40 : 20,
  },
  appEnvironmentText: {
    color: colors.primaryDark,
    fontFamily: Font.semiBold,
    fontSize: isTablet ? 14 : 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
});

export default homeStyle;
