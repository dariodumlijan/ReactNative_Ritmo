import { get } from 'lodash';
import ENV from '../../env.json';

export const config = {
  ads: get(ENV, 'CONFIG.ADS', true),
  keepRewards: get(ENV, 'CONFIG.KEEP_REWARDS', 6),
  resetRewards: get(ENV, 'CONFIG.RESET_REWARDS', 24),
};

export const admob = {
  banner: {
    android_test: 'ca-app-pub-3940256099942544/6300978111',
    ios_test: 'ca-app-pub-3940256099942544/2934735716',
    android: get(ENV, 'CONFIG.AD_IDS.BANNER.ANDROID', ''),
    ios: get(ENV, 'ENV.CONFIG.AD_IDS.BANNER.IOS', ''),
  },
  rewarded: {
    android_test: 'ca-app-pub-3940256099942544/5224354917',
    ios_test: 'ca-app-pub-3940256099942544/1712485313',
    android: get(ENV, 'CONFIG.AD_IDS.REWARDED.ANDROID', ''),
    ios: get(ENV, 'CONFIG.AD_IDS.REWARDED.IOS', ''),
  },
};

export const codepush = {
  android: {
    production: '_E6pPExPbuekfs8--1P1KXx0_9PCdp9lfNFHw',
    staging: 'YQ27CjO73bmeHRZmpoPx_JtAHkyFBn5ZhpoAj',
  },
  ios: {
    production: 'O04Aw3YIpvD_ihYX4qO0faqD6R3uCyzorw4Yf',
    staging: '0e_fCwBomxPBperEcePzVV7hpBCXdgISY7vEQ',
  },
};

export const localStorageKeys = {
  presets: {
    one: 'preset1',
    two: 'preset2',
    three: 'preset3',
  },
  reviewTimestamp: 'reviewTimestamp',
  rewardedAtSamples: 'rewardedAtSamples',
  rewardedAtPro: 'rewardedAtPro',
  unlockedRewards: 'unlockedRewards',
};
