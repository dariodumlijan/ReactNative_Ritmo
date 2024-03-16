import React from 'react';
import { View } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { isEqual } from 'lodash';
import ConditionalAd from './ConditionalAd';
import { selectors } from '../../../store/globalStore';
import mainStyle from '../../../styles/main';
import { isTablet } from '../../../utils';
import { useAppSelector, useLocationInfo } from '../../../utils/hooks';

function AdmobBanner() {
  const locationInfo = useLocationInfo();
  const { banner, showAds, personalisedAds } = useAppSelector((state) => ({
    banner: selectors.getAdmobIds(state).banner,
    showAds: state.global.ui.showAds,
    personalisedAds: state.global.ui.personalisedAds,
  }), isEqual);

  const handleBannerSize = (): string => {
    if (isTablet) return BannerAdSize.FULL_BANNER;

    return BannerAdSize.BANNER;
  };

  if (locationInfo.isRewarded) return null;

  return (
    <View style={mainStyle.ads}>
      {banner && showAds && (
        <ConditionalAd>
          <BannerAd
            unitId={banner}
            size={handleBannerSize()}
            requestOptions={{
              requestNonPersonalizedAdsOnly: !personalisedAds,
            }}
          />
        </ConditionalAd>
      )}
    </View>
  );
}

export default AdmobBanner;
