import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import DarkBackground from '../app/components/elements/backgrounds/DarkBackground';

// Note: test renderer must be required after react-native.

it('renders correctly', () => {
  renderer.create(<DarkBackground />);
});
