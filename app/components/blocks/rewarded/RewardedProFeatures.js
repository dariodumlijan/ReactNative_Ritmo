// @flow
import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Link, useNavigate } from 'react-router-native';
import { useDispatch, useSelector } from 'react-redux';
import { RewardedAdEventType } from 'react-native-google-mobile-ads';
import { get, isEqual, map } from 'lodash';
import Exit from '../../../assets/icons/Exit';
import useLocale from '../../../locales';
import { useRewardedAd } from '../../../utils/hooks';
import { actions } from '../../../store/globalStore';
import { selectors as selectorsCMS } from '../../../store/cmsStore';
import { isRealDevice } from '../../../utils';
import mainStyle from '../../../styles/main';
import rewardedStyle from '../../../styles/rewarded';
import colors from '../../../styles/colors';
import type { ReduxState } from '../../../types';

const RewardedProFeatures = (): Node => {
  const { t } = useLocale();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxStates = useSelector((state: ReduxState) => ({
    personalisedAds: state.global.ui.personalisedAds,
    resetRewards: get(state.cms, isRealDevice ? 'master.resetRewards' : 'master.resetRewardsStaging', 24),
  }), isEqual);
  const { rewarded } = useSelector(selectorsCMS.getAdmobIds, isEqual);
  const [adLoading, setAdLoading] = useState(true);
  const rewardedAd = useRewardedAd(rewarded, reduxStates.personalisedAds);

  useEffect(() => {
    if (rewardedAd) {
      rewardedAd.addAdEventListener(
        RewardedAdEventType.LOADED, () => {
          setAdLoading(false);
        });

      rewardedAd.addAdEventListener(
        RewardedAdEventType.EARNED_REWARD, () => {
          dispatch(actions.unlockProFeatures());
          navigate('/settings');
        },
      );

      rewardedAd.load();
    }

    return () => {
      rewardedAd?.removeAllListeners();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rewardedAd]);

  const requestReward = () => {
    rewardedAd?.show();
  };

  const proFeatures = [
    t('rewarded.pro.features.features_1'),
    t('rewarded.pro.features.features_2'),
  ];

  return (
    <SafeAreaView style={mainStyle.safe}>
      <Link
        to="/settings"
        style={mainStyle.exit}
        underlayColor={null}
      >
        <Exit fill={colors.gray} />
      </Link>

      <View style={rewardedStyle.rewardedCon}>
        <View style={rewardedStyle.rewardedExp}>
          <Text style={rewardedStyle.rewardedExpText}>
            {t('rewarded.pro.paragraph_1')}
          </Text>
          <Text style={rewardedStyle.rewardedExp2Text}>
            {t('rewarded.pro.paragraph_2.text_1')}
            <Text style={{ color: colors.orange }}>
              {reduxStates.resetRewards}{t('rewarded.pro.paragraph_2.text_2')}
            </Text>
            {t('rewarded.pro.paragraph_2.text_3')}
          </Text>
          <Text style={rewardedStyle.rewardedExp3Text}>
            {t('rewarded.pro.paragraph_3')}
          </Text>
          <View>
            {map(proFeatures, (feature) => (
              <View key={feature} style={rewardedStyle.listItem}>
                <View style={rewardedStyle.listBullet} />
                <Text style={rewardedStyle.listText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          style={adLoading ? rewardedStyle.rewardedDisabled : rewardedStyle.rewardedStart}
          disabled={adLoading}
          onPress={requestReward}
        >
          {adLoading ? (
            <ActivityIndicator size="large" color={colors.grayLight} />
          ) : (
            <Text style={rewardedStyle.rewardedStartText}>{t('rewarded.cta')}</Text>
          )}
        </TouchableOpacity>
        <Text style={rewardedStyle.rewardedDisc}>{t('rewarded.disclamer')}</Text>
      </View>
    </SafeAreaView>
  );
};

export default RewardedProFeatures;
