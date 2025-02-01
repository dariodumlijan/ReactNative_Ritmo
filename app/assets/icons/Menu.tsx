import React from 'react';
import { Circle, G, Svg } from 'react-native-svg';

type Props = {
  style?: Object,
};

function Menu(props: Props) {
  return (
    <Svg viewBox="0 0 350 102.9" style={[{ pointerEvents: 'box-only' }, props.style]}>
      <G>
        <Circle fill="#DFE2EC" cx="175" cy="51.5" r="51.5" />
        <Circle fill="#DFE2EC" cx="51.5" cy="51.5" r="51.5" />
        <Circle fill="#DFE2EC" cx="298.5" cy="51.5" r="51.5" />
      </G>
    </Svg>
  );
}

export default Menu;
