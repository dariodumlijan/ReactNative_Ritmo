// @flow
import React from 'react';
import type { Node } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { isEqual } from 'lodash';
import { isApple, isTablet } from '../../../utils';
import { useLocationInfo } from '../../../utils/hooks';
import { selectors } from '../../../store/globalStore';
import mainStyle from '../../../styles/main';
import type { UI } from '../../../store/globalStore';

type Props = {
  bannerId: string,
  showAd: boolean,
};

function AdmobBanner(props: Props): Node {
  const ui: UI = useSelector(selectors.getUI, isEqual);
  const locationInfo = useLocationInfo();

  const handleBannerSize = (): string => {
    if (isApple) return BannerAdSize.FLUID;

    if (isTablet) return BannerAdSize.FULL_BANNER;

    return BannerAdSize.BANNER;
  };

  if (locationInfo.isRewarded) return null;

  return (
    <View style={mainStyle.ads}>
      {props.showAd && ui.showAds && (
        <BannerAd
          unitId={props.bannerId}
          size={handleBannerSize()}
          requestOptions={{
            requestNonPersonalizedAdsOnly: !ui.personalisedAds,
          }}
        />
      )}
    </View>
  );
}

export default AdmobBanner;
