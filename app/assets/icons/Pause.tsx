import React from 'react';
import { Path, Svg } from 'react-native-svg';

type Props = {
  style?: Object,
};

function Pause(props: Props) {
  return (
    <Svg viewBox="0 0 80 80" style={[{ pointerEvents: 'box-only' }, props.style]}>
      <Path
        fill="#DFE2EC"
        d="M8,0h14c4.4,0,8,3.6,8,8v64c0,4.4-3.6,8-8,8H8c-4.4,0-8-3.6-8-8V8C0,3.6,3.6,0,8,0z"
      />
      <Path
        fill="#DFE2EC"
        d="M58,0h14c4.4,0,8,3.6,8,8v64c0,4.4-3.6,8-8,8H58c-4.4,0-8-3.6-8-8V8C50,3.6,53.6,0,58,0z"
      />
    </Svg>
  );
}

export default Pause;
