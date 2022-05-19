// @flow
import React from 'react';
import type { Node } from 'react';
import { Svg, Path } from 'react-native-svg';

type Props = {
  style?: Object,
};

const Recordings = (props: Props): Node => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={props.style}>
    <Path
      fill="#c7cde1"
      d="M43.2,0H14.4A4.8,4.8,0,0,0,9.6,4.8V33.6a4.8,4.8,0,0,0,4.8,4.8H43.2A4.8,4.8,0,0,0,48,33.6V4.8A4.8,4.8,0,0,0,43.2,0ZM38.4,12H31.2V25.2a6,6,0,1,1-2.4-4.78V7.2h9.6ZM4.8,9.6H0V43.2A4.8,4.8,0,0,0,4.8,48H38.4V43.2H4.8Z"
    />
  </Svg>
);

export default Recordings;
