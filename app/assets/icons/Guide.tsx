import React from 'react';
import { Path, Svg } from 'react-native-svg';

type Props = {
  style?: Object,
};

function Guide(props: Props) {
  return (
    <Svg viewBox="0 0 32 32" style={[{ pointerEvents: 'box-only' }, props.style]}>
      <Path
        fill="#c7cde1"
        d="M16,0A16,16,0,1,0,32,16,16,16,0,0,0,16,0Zm2.82,24.46a2.82,2.82,0,1,1-5.64,0V16a2.82,2.82,0,0,1,5.64,0Zm0-16.92A2.83,2.83,0,1,1,16,4.69a2.82,2.82,0,0,1,2.84,2.85Z"
      />
    </Svg>
  );
}

export default Guide;
