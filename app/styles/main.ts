import { StatusBar, StyleSheet } from 'react-native';
import { Font } from '@styles';
import colors from '@styles/colors';
import { isApple, isiPhone } from '@utils';

const mainStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    position: 'relative',
    width: '100%',
  },
  safe: {
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 500,
    paddingTop: isApple ? 0 : StatusBar.currentHeight,
    position: 'relative',
    width: '90%',
  },
  scrollContainer: {
    backgroundColor: colors.white,
    flexGrow: 1,
    position: 'relative',
    width: '90%',
  },
  scrollDeviceContainer: {
    flexGrow: 1,
    width: '100%',
  },
  alert: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    display: 'flex',
    elevation: 2,
    height: isApple ? '18%' : '17%',
    justifyContent: 'flex-end',
    left: '-5%',
    paddingBottom: 30,
    position: 'absolute',
    top: isiPhone ? 0 : '-5%',
    width: '110%',
    zIndex: 99,
  },
  alertText: {
    color: colors.black,
    fontFamily: Font.semiBold,
    fontSize: 18,
    textAlign: 'center',
  },
  exit: {
    aspectRatio: 1 / 1,
    position: 'absolute',
    right: 0,
    top: isiPhone ? '8%' : '5%',
    width: 25,
    zIndex: 1,
  },
  exitDisabled: {
    aspectRatio: 1 / 1,
    position: 'absolute',
    right: 0,
    top: isiPhone ? '8%' : '5%',
    width: 25,
    zIndex: 1,
  },
});

export default mainStyle;
