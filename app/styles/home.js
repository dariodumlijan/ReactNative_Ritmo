// @flow
import { StyleSheet } from 'react-native';
import { isTablet } from '../utils';
import colors from './colors';

type HomeStyle = {
  wrapper: Object,
  topWrapper: Object,
  topWrapperBG: Object,
  navigation: Object,
  logo: Object,
  menu: Object,
  appVersion: Object,
  appVersionText: Object,
};

const homeStyle: HomeStyle = StyleSheet.create({
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
    height: !isTablet ? '14%' : '12%',
    justifyContent: 'space-between',
    width: !isTablet ? '100%' : '80%',
  },
  logo: {
    aspectRatio: 2 / 1,
    height: '100%',
  },
  menu: {
    aspectRatio: 1 / 2,
    height: '120%',
  },
  appVersion: {
    alignItems: 'center',
    backgroundColor: colors.gray,
    borderRadius: 15,
    display: 'flex',
    height: 30,
    justifyContent: 'center',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  appVersionText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
  },
});

export default homeStyle;
