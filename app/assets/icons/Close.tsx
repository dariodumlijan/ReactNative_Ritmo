import React from 'react';
import {
  Circle, G, Path, Rect, Svg,
} from 'react-native-svg';

type Props = {
  style?: Object,
};

function Close(props: Props) {
  return (
    <Svg viewBox="0 0 206 309" style={[{ pointerEvents: 'box-only' }, props.style]}>
      <Path
        fill="#0E123C"
        d="M9.6,299.4L9.6,299.4c12.8,12.8,33.4,12.8,46.2,0l98.7-98.7l0,0l23.1-23.1c12.8-12.8,12.8-33.4,0-46.2l-23.1-23.1l0,0L55.8,9.6C43-3.2,22.4-3.2,9.6,9.6l0,0C-3.2,22.4-3.2,43,9.6,55.8l98.7,98.7l0,0L9.6,253.2C-3.2,266-3.2,286.7,9.6,299.4z"
      />
      <G>
        <Circle fill="#DFE2EC" cx="300.6" cy="154.5" r="51.5" />
        <Circle fill="#DFE2EC" cx="300.6" cy="257.5" r="51.5" />
        <Circle fill="#DFE2EC" cx="403.6" cy="154.5" r="51.5" />
        <Circle fill="#DFE2EC" cx="300.6" cy="51.5" r="51.5" />
      </G>
      <Rect
        x="-291.1"
        y="66.3"
        transform="matrix(0.7071 -0.7071 0.7071 0.7071 -121.3943 -100.3392)"
        fill="#0E123C"
        width="218.5"
        height="60.1"
      />
      <Rect
        x="-211.9"
        y="99.2"
        transform="matrix(0.7071 -0.7071 0.7071 0.7071 -200.6323 -67.5649)"
        fill="#0E123C"
        width="60.1"
        height="218.5"
      />
    </Svg>
  );
}

export default Close;
