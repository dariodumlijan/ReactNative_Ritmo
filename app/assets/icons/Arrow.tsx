import React from 'react';
import { Path, Svg } from 'react-native-svg';

type Props = {
  style?: Object,
};

function Arrow(props: Props) {
  return (
    <Svg viewBox="0 0 255 255" style={[{ pointerEvents: 'box-only' }, props.style]}>
      <Path
        fill="#6F7BA4"
        d="M140.5,184.1l60.3-104.5c5.8-10-1.4-22.5-13-22.5H67.2c-11.5,0-18.8,12.5-13,22.5l60.3,104.5C120.3,194.1,134.7,194.1,140.5,184.1z"
      />
    </Svg>
  );
}

export default Arrow;
