import { StyleSheet } from 'react-native';
import { Font } from '@styles';
import colors from '@styles/colors';
import { deviceHeight, deviceWidth, isTablet } from '@utils';

const modalsStyle = StyleSheet.create({
  modalOverlay: {
    backgroundColor: colors.blackTransparent,
    height: deviceHeight,
    left: 0,
    position: 'absolute',
    top: 0,
    width: deviceWidth,
    zIndex: 1,
  },
  modalWrapper: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 30,
    display: 'flex',
    elevation: 5,
    justifyContent: 'center',
    marginHorizontal: isTablet ? '15%' : '5%',
    marginTop: isTablet ? '20%' : '30%',
    paddingHorizontal: 10,
    paddingVertical: 15,
    shadowColor: colors.black,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    width: isTablet ? '70%' : '90%',
    zIndex: 5,
  },
  modalTxt: {
    color: colors.grayLight,
    fontFamily: Font.semiBold,
    fontSize: isTablet ? 18 : 14,
    textAlign: 'center',
  },
  modalExp: {
    color: colors.gray,
    fontFamily: Font.semiBold,
    fontSize: isTablet ? 20 : 12,
    marginBottom: isTablet ? 30 : 16,
    marginHorizontal: 10,
    textAlign: 'center',
  },
  modalBtnCont: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalBtn: {
    alignItems: 'center',
    backgroundColor: colors.grayLight,
    borderRadius: isTablet ? 20 : 15,
    display: 'flex',
    height: isTablet ? 40 : 30,
    justifyContent: 'center',
    marginHorizontal: 10,
    width: '30%',
  },
  modalBtnTxt: {
    color: colors.primaryDark,
    fontFamily: Font.semiBold,
    fontSize: isTablet ? 20 : 16,
    textAlign: 'center',
  },
  inputMidi: {
    backgroundColor: colors.grayLight,
    borderRadius: 20,
    color: colors.grayBlue,
    fontFamily: Font.semiBold,
    fontSize: 18,
    marginVertical: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlign: 'left',
    width: '100%',
  },
});

export default modalsStyle;
