import React from 'react';
import { Path, Svg } from 'react-native-svg';

type Props = {
  style?: Object,
  fill: string,
};

function Exit(props: Props) {
  return (
    <Svg viewBox="0 0 352 352" style={[{ pointerEvents: 'box-only' }, props.style]}>
      <Path
        fill={props.fill}
        d="M242.7,176L342.8,75.9c12.3-12.3,12.3-32.2,0-44.5L320.6,9.2c-12.3-12.3-32.2-12.3-44.5,0L176,109.3L75.9,9.2C63.7-3.1,43.7-3.1,31.5,9.2L9.2,31.4c-12.3,12.3-12.3,32.2,0,44.5L109.3,176L9.2,276.1c-12.3,12.3-12.3,32.2,0,44.5l22.2,22.2c12.3,12.3,32.2,12.3,44.5,0L176,242.7l100.1,100.1c12.3,12.3,32.2,12.3,44.5,0l22.2-22.2c12.3-12.3,12.3-32.2,0-44.5L242.7,176z"
      />
    </Svg>
  );
}

export default Exit;
