import React from 'react';
import { useParams } from 'react-router-native';
import RewardedProFeatures from '../blocks/rewarded/RewardedProFeatures';
import RewardedSamples from '../blocks/rewarded/RewardedSamples';

function Rewarded() {
  const { section } = useParams();

  if (section === 'pro-features') return <RewardedProFeatures />;

  return <RewardedSamples />;
}

export default Rewarded;
