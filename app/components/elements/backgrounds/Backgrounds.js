// @flow
import React from 'react';
import type { Node } from 'react';
import SplitBackground from './SplitBackground';
import LightBackground from './LightBackground';
import DarkBackground from './DarkBackground';
import { useLocationInfo } from '../../../utils/hooks';

function Backgrounds(): Node {
  const locationInfo = useLocationInfo();
  if (locationInfo.isHome) return <SplitBackground />;
  if (locationInfo.isRewarded) return <DarkBackground />;

  return <LightBackground locationInfo={locationInfo} />;
}

export default Backgrounds;
