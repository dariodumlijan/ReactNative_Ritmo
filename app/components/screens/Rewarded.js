// @flow
import React from 'react';
import type { Node } from 'react';
import { useParams } from 'react-router-native';
import RewardedSamples from '../blocks/rewarded/RewardedSamples';
import RewardedProFeatures from '../blocks/rewarded/RewardedProFeatures';

const Rewarded = (): Node => {
  const { section } = useParams();

  if (section === 'pro-features') return <RewardedProFeatures />;

  return <RewardedSamples />;
};

export default Rewarded;
