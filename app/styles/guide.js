// @flow
import { StyleSheet } from 'react-native';
import { isiPhone, isTablet } from '../utils';
import colors from './colors';

type GuideStyle = {
  guideTitle: Object,
  guideScroll: Object,
  guideSub: Object,
  guideBullet: Object,
  guidePresetWrapper: Object,
  guidePresetCont: Object,
  guideTxt: Object,
  guideModalView: Object,
  guideImgCont: Object,
  guideImgCont2: Object,
  guideImg: Object,
};

const guideStyle: GuideStyle = StyleSheet.create({
  guideTitle: {
    color: colors.primaryDark,
    fontFamily: 'Montserrat-SemiBold',
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
    fontFamily: 'Montserrat-SemiBold',
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
    fontFamily: 'Montserrat-Regular',
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
