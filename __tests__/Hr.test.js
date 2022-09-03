import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Hr from '../app/components/elements/misc/Hr';

// Note: test renderer must be required after react-native.

it('renders correctly', () => {
  renderer.create(<Hr />);
});
