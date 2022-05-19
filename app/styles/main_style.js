// @flow
import { StyleSheet } from 'react-native';
import { isApple, isPad } from '../utils';
import colors from './colors';

const mainStyle: Object = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    position: 'relative',
    width: '100%',
  },
  safe: {
    flex: 1,
    marginLeft: '5%',
    marginRight: '5%',
    maxWidth: 500,
    position: 'relative',
    width: '90%',
  },
  scrollContainer: {
    backgroundColor: colors.white,
    flexGrow: 1,
    position: 'relative',
    width: '90%',
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
    top: isApple && !isPad ? 0 : '-5%',
    width: '110%',
    zIndex: 99,
  },
  alertText: {
    color: colors.black,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    textAlign: 'center',
  },
  exit: {
    aspectRatio: 1 / 1,
    position: 'absolute',
    right: 0,
    top: 0,
    width: 25,
  },
  exitDisabled: {
    aspectRatio: 1 / 1,
    position: 'absolute',
    right: 0,
    top: 0,
    width: 25,
  },
  ads: {
    alignItems: 'center',
    bottom: isApple && !isPad ? '4.5%' : 0,
    display: 'flex',
    height: '10%',
    justifyContent: 'flex-end',
    position: 'absolute',
    width: '100%',
    zIndex: 999,
  },
});

export default mainStyle;
