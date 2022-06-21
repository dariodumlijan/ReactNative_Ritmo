// @flow
import { StyleSheet } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import colors from './colors';

const isTablet = DeviceInfo.isTablet();

const homeStyle: Object = StyleSheet.create({
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
});

export default homeStyle;
