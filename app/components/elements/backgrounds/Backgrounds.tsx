import React from 'react';
import LightBackground from '@components/elements/backgrounds/LightBackground';
import SplitBackground from '@components/elements/backgrounds/SplitBackground';
import { useLocationInfo } from '@utils/hooks';

function Backgrounds() {
  const locationInfo = useLocationInfo();

  if (locationInfo.isHome) return <SplitBackground />;

  return <LightBackground showLogo={locationInfo.isSettings} />;
}

export default Backgrounds;
