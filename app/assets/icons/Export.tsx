import React from 'react';
import { Path, Svg } from 'react-native-svg';

type Props = {
  style?: Object,
};

function Export(props: Props) {
  return (
    <Svg viewBox="0 0 24 22.67" style={[{ pointerEvents: 'box-only' }, props.style]}>
      <Path
        fill="#c7cde1"
        d="M5.33,17.33V18c2.26-3.44,4.8-5.27,8-5.33v4A1.44,1.44,0,0,0,14.86,18,1.55,1.55,0,0,0,16,17.48c2.58-2.71,8-8.15,8-8.15s-5.39-5.44-8-8.18A1.68,1.68,0,0,0,14.86.67,1.43,1.43,0,0,0,13.33,2V6C7.12,6,5.33,12.49,5.33,17.33Z"
        transform="translate(0 -0.67)"
      />
      <Path
        fill="#c7cde1"
        d="M1.33,23.33H20A1.32,1.32,0,0,0,21.33,22V13.94l-2.66,2.73v4h-16v-16H12V2H1.33A1.34,1.34,0,0,0,0,3.33V22A1.33,1.33,0,0,0,1.33,23.33Z"
        transform="translate(0 -0.67)"
      />
    </Svg>
  );
}

export default Export;
