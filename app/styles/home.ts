import { StyleSheet } from 'react-native';
import colors from '@styles/colors';
import { isTablet, isiPhone } from '@utils';

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
    alignItems: 'flex-end',
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
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 30,
    width: 40,
    marginBottom: isiPhone ? 12 : 15,
  },
});

export default homeStyle;
