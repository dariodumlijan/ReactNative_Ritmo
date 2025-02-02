import { StyleSheet } from 'react-native';
import { Font } from '@styles';
import colors from '@styles/colors';
import { isTablet } from '@utils';

const notificationsStyle = StyleSheet.create({
  alertWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 22,
    elevation: 1,
    marginHorizontal: isTablet ? '15%' : '5%',
    position: 'absolute',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    top: '15%',
    width: isTablet ? '70%' : '90%',
    zIndex: 1,
  },
  alertText: {
    color: colors.gray,
    fontFamily: Font.semiBold,
    fontSize: 12,
    margin: 10,
    textAlign: 'center',
  },
  alertTimerText: {
    color: colors.white,
    fontFamily: Font.semiBold,
    fontSize: 18,
    marginTop: -5,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default notificationsStyle;
