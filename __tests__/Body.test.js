import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Body from '../app/components/Body';

it('renders correctly', () => {
  renderer.create(<Body />);
});
 