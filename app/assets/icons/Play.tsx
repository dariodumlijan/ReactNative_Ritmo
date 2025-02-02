import React from 'react';
import { Path, Svg } from 'react-native-svg';

type Props = {
  style?: Object,
};

function Play(props: Props) {
  return (
    <Svg viewBox="0 0 80 80" style={[{ pointerEvents: 'box-only' }, props.style]}>
      <Path
        fill="#DFE2EC"
        d="M75.9,32.6L23.6,1.2C18.1-2.1,11.2,2,11.2,8.6v62.8c0,6.6,6.9,10.7,12.4,7.4l52.3-31.4C81.4,44.1,81.4,35.9,75.9,32.6z"
      />
    </Svg>
  );
}

export default Play;
