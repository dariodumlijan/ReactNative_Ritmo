// @flow
import { StyleSheet } from 'react-native';
import colors from './colors';
import { deviceHeight, deviceWidth } from '../utils';

type Style = {
  overlay: Object,
  background: Object,
  nav: Object,
  top: Object,
  tagline: Object,
  close: Object,
  linksWrapper: Object,
  link: Object,
  button: Object,
  icon: Object,
  label: Object,
};

const navigationStyle: Style = StyleSheet.create({
  overlay: {
    backgroundColor: colors.blackTransparent,
    height: deviceHeight,
    left: 0,
    position: 'absolute',
    top: 0,
    width: deviceWidth,
    zIndex: 1,
  },
  background: {
    alignItems: 'flex-start',
    backgroundColor: colors.primaryTransparent,
    borderColor: colors.grayBlue,
    borderRadius: deviceWidth,
    borderWidth: 2,
    display: 'flex',
    height: deviceWidth * 2,
    justifyContent: 'flex-end',
    transform: [
      { translateY: -deviceWidth },
    ],
    width: deviceWidth * 2,
  },
  nav: {
    display: 'flex',
    flexShrink: 1,
    marginBottom: 50,
    paddingHorizontal: '5%',
    width: deviceWidth,
  },
  top: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
    width: '100%',
  },
  tagline: {
    color: colors.grayLight,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 22,
    left: 0,
    position: 'absolute',
    textAlign: 'left',
  },
  close: {
    aspectRatio: 1 / 1,
    height: 25,
  },
  linksWrapper: {
    alignItems: 'flex-end',
    borderTopColor: colors.grayLight,
    borderTopWidth: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    paddingTop: 8,
    width: '100%',
  },
  link: {
    marginLeft: '50%',
    width: '50%',
  },
  button: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 16,
    width: '100%',
  },
  icon: {
    aspectRatio: 1 / 1,
    height: 24,
    marginLeft: 10,
  },
  label: {
    color: colors.grayLight,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    textAlign: 'left',
  },
});

export default navigationStyle;
