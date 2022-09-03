import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Hr from '../../../app/components/elements/misc/Hr';

it('renders correctly', () => {
  renderer.create(<Hr />);
});
