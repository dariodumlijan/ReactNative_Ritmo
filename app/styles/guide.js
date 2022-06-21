// @flow
import { StyleSheet, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import colors from './colors';

const isTablet = DeviceInfo.isTablet();
const isiPhone = Platform.OS === 'ios' && !isTablet;

const guideStyle: Object = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: isTablet ? '80%' : '90%',
    marginVertical: isTablet ? '2%' : '5%',
    marginHorizontal: isTablet ? '10%' : '5%',
    display: 'flex',
    alignItems: 'center',
  },
  guideTitle: {
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
    fontSize: 22,
    color: colors.primaryDark,
  },
  guideScroll: {
    flex: 1,
    width: '100%',
    height: '100%',
    marginTop: '18%',
    marginBottom: isiPhone ? '0%' : '8%',
  },
  guideSub: {
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'left',
    fontSize: 18,
    color: colors.primaryDark,
    marginTop: 10,
    marginBottom: 5,
  },
  guideBullet: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 5,
  },
  guidePresetWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  guidePresetCont: {
    marginHorizontal: '10%',
  },
  guideTxt: {
    fontFamily: 'Montserrat-Regular',
    textAlign: 'left',
    fontSize: 16,
    color: colors.primaryDark,
  },
  guideModalView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginVertical: 10,
    marginHorizontal: '5%',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: colors.primary,
    borderRadius: 30,
  },
  guideImgCont: {
    width: isTablet ? '80%' : '100%',
    aspectRatio: 2 / 1,
    marginVertical: 15,
    marginHorizontal: isTablet ? '10%' : '0%',
  },
  guideImgCont2: {
    width: isTablet ? '80%' : '100%',
    aspectRatio: 4 / 1,
    marginVertical: 15,
    marginHorizontal: isTablet ? '10%' : '0%',
  },
  guideImg: {
    width: '100%',
    height: '100%',
  },
});

export default guideStyle;
