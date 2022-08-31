/* eslint-disable no-undef -- jest is not defined and cannot be */
import React from 'react';
import renderer from 'react-test-renderer';
import Body from '../app/components/Body';

test('renders correctly', () => {
  renderer.create(<Body />);
});
