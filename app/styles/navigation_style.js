// @flow
import { StyleSheet } from 'react-native';
import colors from './colors';
import { isApple } from '../utils';

const navigationStyle: Object = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'flex-start',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 99,
  },
  wrapperBG: {
    backgroundColor: colors.black,
    height: '100%',
    opacity: 0.2,
    position: 'relative',
    width: '100%',
  },
  nav: {
    backgroundColor: colors.primaryTransparent,
    borderBottomLeftRadius: 200,
    borderColor: colors.grayBlue,
    borderWidth: 2,
    display: 'flex',
    left: 0,
    marginTop: -2,
    paddingBottom: 20,
    paddingHorizontal: '5%',
    paddingTop: isApple ? 75 : 20,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
});

export default navigationStyle;
