// @flow
import { StyleSheet } from 'react-native';
import colors from './colors';
import { isApple } from '../utils';

type Style = {
  wrapper: Object,
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
    width: '50%',
    marginLeft: '50%',
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    marginVertical: 16,
  },
  icon: {
    height: 24,
    aspectRatio: 1 / 1,
    marginLeft: 10,
  },
  label: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    textAlign: 'left',
    color: colors.grayLight,
  },
});

export default navigationStyle;
