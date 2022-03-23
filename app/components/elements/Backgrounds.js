// @flow
import React from 'react';
import type { Node } from 'react';
import SplitBackground from './backgrounds/SplitBackground';
import LightBackground from './backgrounds/LightBackground';
import DarkBackground from './backgrounds/DarkBackground';
import { useLocationInfo } from '../../utils';

const Backgrounds = (): Node => {
  const locationInfo = useLocationInfo();
  if (locationInfo.isRewarded) return <DarkBackground />;
  if (locationInfo.isSettings || locationInfo.isGuide) return <LightBackground />;

  return <SplitBackground />;
};

export default Backgrounds;
