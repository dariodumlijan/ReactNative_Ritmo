import React from 'react';
import DarkBackground from './DarkBackground';
import LightBackground from './LightBackground';
import SplitBackground from './SplitBackground';
import { useLocationInfo } from '../../../utils/hooks';

function Backgrounds() {
  const locationInfo = useLocationInfo();
  if (locationInfo.isHome) return <SplitBackground />;
  if (locationInfo.isRewarded) return <DarkBackground />;

  return <LightBackground hideLogo={locationInfo.isStateTree} />;
}

export default Backgrounds;
