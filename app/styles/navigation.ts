import { StyleSheet } from 'react-native';
import { Font } from '@styles';
import colors from '@styles/colors';
import { deviceHeight, deviceWidth, isTablet } from '@utils';

const navBgMaxSize = 1000;
const navMaxSize = navBgMaxSize / 2;
const containNav = deviceWidth * 2 >= navBgMaxSize;

const navigationStyle = StyleSheet.create({
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
    backgroundColor: colors.primaryTransparent,
    borderColor: colors.grayBlue,
    borderRadius: deviceWidth,
    borderWidth: 2,
    height: deviceWidth * 2,
    maxHeight: navBgMaxSize,
    maxWidth: navBgMaxSize,
    position: 'absolute',
    right: 0,
    top: 0,
    transform: [
      { translateX: containNav ? navMaxSize : deviceWidth },
      { translateY: containNav ? -navMaxSize : -deviceWidth },
    ],
    width: deviceWidth * 2,
    zIndex: 2,
  },
  nav: {
    display: 'flex',
    height: deviceWidth,
    maxHeight: navMaxSize,
    maxWidth: navMaxSize,
    paddingLeft: '10%',
    paddingRight: '5%',
    paddingVertical: isTablet ? 40 : '12.5%',
    position: 'absolute',
    right: 0,
    top: 0,
    width: deviceWidth,
    zIndex: 3,
  },
  top: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
    marginTop: 20,
    width: '100%',
  },
  tagline: {
    color: colors.grayLight,
    fontFamily: Font.semiBold,
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
    fontFamily: Font.semiBold,
    fontSize: 18,
    textAlign: 'left',
  },
});

export default navigationStyle;
