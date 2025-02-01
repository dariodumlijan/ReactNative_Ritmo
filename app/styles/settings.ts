import { StyleSheet } from 'react-native';
import { Font } from '@styles';
import colors from '@styles/colors';
import { deviceHeight, isTablet, isiPhone } from '@utils';

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
    aspectRatio: 1 / 2,
    height: '80%',
    transform: [{ scaleX: -1 }],
    transformOrigin: 'center',
  },
  closeIcon: {
    aspectRatio: 1 / 2,
    height: '100%',
  },
  menuWrapper: {
    alignItems: 'flex-end',
    display: 'flex',
    flex: 1,
    gap: deviceHeight / 12,
    justifyContent: 'flex-start',
    maxHeight: 700,
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
});

export default settingsStyle;
