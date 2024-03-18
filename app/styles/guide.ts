import { StyleSheet } from 'react-native';
import { Font } from '.';
import colors from './colors';
import { isTablet, isiPhone } from '../utils';

const guideStyle = StyleSheet.create({
  guideTitle: {
    color: colors.primaryDark,
    fontFamily: Font.semiBold,
    fontSize: 22,
    textAlign: 'center',
  },
  guideScroll: {
    flex: 1,
    height: '100%',
    marginBottom: isiPhone ? '0%' : '8%',
    marginTop: isiPhone ? '18%' : '22%',
    width: '100%',
  },
  guideSub: {
    color: colors.primaryDark,
    fontFamily: Font.semiBold,
    fontSize: 18,
    marginBottom: 5,
    marginTop: 10,
    textAlign: 'left',
  },
  guideBullet: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 5,
    width: '100%',
  },
  guidePresetWrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    width: '100%',
  },
  guidePresetCont: {
    marginHorizontal: '10%',
  },
  guideTxt: {
    color: colors.primaryDark,
    fontFamily: Font.regular,
    fontSize: 16,
    textAlign: 'left',
  },
  guideModalView: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    marginHorizontal: '5%',
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    width: '90%',
  },
  guideImgCont: {
    aspectRatio: 2 / 1,
    marginHorizontal: isTablet ? '10%' : '0%',
    marginVertical: 15,
    width: isTablet ? '80%' : '100%',
  },
  guideImgCont2: {
    aspectRatio: 4 / 1,
    marginHorizontal: isTablet ? '10%' : '0%',
    marginVertical: 15,
    width: isTablet ? '80%' : '100%',
  },
  guideImg: {
    height: '100%',
    width: '100%',
  },
});

export default guideStyle;
