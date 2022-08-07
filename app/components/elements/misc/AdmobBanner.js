// @flow
import React from 'react';
import type { Node } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { isEqual } from 'lodash';
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

  if (locationInfo.isRewarded) return null;

  return (
    <View style={mainStyle.ads}>
      {props.showAd && ui.showAds && ui.showBanner && (
        <BannerAd
          unitId={props.bannerId}
          size={BannerAdSize.FLUID}
          requestOptions={{
            requestNonPersonalizedAdsOnly: !ui.personalisedAds,
          }}
        />
      )}
    </View>
  );
}

export default AdmobBanner;
