// @flow
import React from 'react';
import type { Node } from 'react';
import { Svg, G, Circle } from 'react-native-svg';

type Props = {
  style: Object,
};

const Menu = (props: Props): Node => (
  <Svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 102.9" style={props.style}>
    <G>
      <Circle fill="#DFE2EC" cx="175" cy="51.5" r="51.5" />
      <Circle fill="#DFE2EC" cx="51.5" cy="51.5" r="51.5" />
      <Circle fill="#DFE2EC" cx="298.5" cy="51.5" r="51.5" />
    </G>
  </Svg>
);

export default Menu;
