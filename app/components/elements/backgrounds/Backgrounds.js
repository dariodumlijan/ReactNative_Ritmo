// @flow
import React from 'react';
import type { Node } from 'react';
import SplitBackground from './SplitBackground';
import LightBackground from './LightBackground';
import DarkBackground from './DarkBackground';
import { useLocationInfo } from '../../../utils/hooks';

const Backgrounds = (): Node => {
  const locationInfo = useLocationInfo();
  if (locationInfo.isRewarded) return <DarkBackground />;
  if (locationInfo.isSettings || locationInfo.isGuide) return <LightBackground />;

  return <SplitBackground />;
};

export default Backgrounds;
