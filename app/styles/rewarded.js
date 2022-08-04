// @flow
import { StyleSheet } from 'react-native';
import colors from './colors';

type RewardedStyle = {
  countdownWrapper: Object,
  countdownTimer: Object,
  countdownTxt: Object,
  rewardedCon: Object,
  rewardedExp: Object,
  rewardedExpText: Object,
  rewardedExp2Text: Object,
  rewardedStart: Object,
  rewardedDisabled: Object,
  rewardedStartText: Object,
  rewardedDisc: Object,
}

const rewardedStyle: RewardedStyle = StyleSheet.create({
  countdownWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    marginTop: '2%',
    paddingVertical: 10,
    width: '70%',
  },
  countdownTimer: {
    color: colors.gray,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 22,
    marginBottom: 5,
    textAlign: 'center',
  },
  countdownTxt: {
    color: colors.grayLight,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    textAlign: 'center',
  },
  rewardedCon: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  rewardedExp: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10%',
  },
  rewardedExpText: {
    color: colors.gray,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 22,
    marginVertical: 2,
    textAlign: 'center',
  },
  rewardedExp2Text: {
    color: colors.gray,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    marginVertical: '20%',
    textAlign: 'center',
  },
  rewardedStart: {
    alignItems: 'center',
    backgroundColor: colors.orange,
    borderBottomColor: colors.orangeDark,
    borderBottomWidth: 3,
    borderLeftColor: colors.orangeDark,
    borderLeftWidth: 1,
    borderRadius: 15,
    borderRightColor: colors.orangeDark,
    borderRightWidth: 1,
    display: 'flex',
    height: 50,
    justifyContent: 'center',
    marginBottom: 20,
    width: 240,
  },
  rewardedDisabled: {
    alignItems: 'center',
    backgroundColor: colors.orangeDark,
    borderBottomColor: colors.orangeDark,
    borderBottomWidth: 3,
    borderLeftColor: colors.orangeDark,
    borderLeftWidth: 1,
    borderRadius: 15,
    borderRightColor: colors.orangeDark,
    borderRightWidth: 1,
    display: 'flex',
    height: 50,
    justifyContent: 'center',
    marginBottom: 20,
    width: 240,
  },
  rewardedStartText: {
    color: colors.primaryDark,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    textAlign: 'center',
  },
  rewardedDisc: {
    color: colors.grayLight,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default rewardedStyle;
