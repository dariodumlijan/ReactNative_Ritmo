// @flow
import { StyleSheet } from 'react-native';
import { deviceHeight, isApple, isiPhone } from '../utils';
import colors from './colors';

type MainStyles ={
  container: Object,
  safe: Object,
  scrollContainer: Object,
  scrollDeviceContainer: Object,
  alert: Object,
  alertText: Object,
  exit: Object,
  exitDisabled: Object,
  ads: Object,
  adSpace: Object,
}

const mainStyle: MainStyles = StyleSheet.create({
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
    minHeight: deviceHeight,
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
    fontFamily: 'Montserrat-SemiBold',
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
  ads: {
    alignItems: 'center',
    bottom: isiPhone ? '4.5%' : 0,
    display: 'flex',
    height: '10%',
    justifyContent: 'flex-end',
    position: 'absolute',
    width: '100%',
    zIndex: 999,
  },
  adSpace: {
    // backgroundColor: colors.black,
    height: isApple ? '10%' : '14%',
    width: '100%',
  },
});

export default mainStyle;
