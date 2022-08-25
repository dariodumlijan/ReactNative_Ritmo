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
  rewardedExp3Text: Object,
  rewardedStart: Object,
  rewardedDisabled: Object,
  rewardedStartText: Object,
  rewardedDisc: Object,
  listItem: Object,
  listBullet: Object,
  listText: Object,
}

const rewardedStyle: RewardedStyle = StyleSheet.create({
  countdownWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    marginHorizontal: '15%',
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
    marginTop: '20%',
    textAlign: 'center',
  },
  rewardedExp3Text: {
    color: colors.gray,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    marginBottom: 20,
    marginTop: '10%',
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
    marginTop: '20%',
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
    marginTop: '20%',
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
  listItem: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
  listBullet: {
    backgroundColor: colors.orange,
    borderRadius: 5,
    height: 10,
    marginRight: 10,
    width: 10,
  },
  listText: {
    color: colors.gray,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  },
});

export default rewardedStyle;
