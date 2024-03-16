import 'react-native';
import React from 'react';
import { NativeRouter } from 'react-router-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Backgrounds from '../../../app/components/elements/backgrounds/Backgrounds';

it('renders correctly', () => {
  renderer.create(
    <NativeRouter>
      <Backgrounds />
    </NativeRouter>,
  );
});
