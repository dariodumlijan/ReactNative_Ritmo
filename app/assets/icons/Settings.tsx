import React from 'react';
import { Path, Svg } from 'react-native-svg';

type Props = {
  style?: Object,
};

function Settings(props: Props) {
  return (
    <Svg viewBox="0 0 22.42 24" style={[{ pointerEvents: 'box-only' }, props.style]}>
      <Path
        fill="#c7cde1"
        d="M22.2,14.4,21,13.7a2.06,2.06,0,0,1,0-3.5l1.2-.7a1.9,1.9,0,0,0,.7-2.7l-1-1.7a1.9,1.9,0,0,0-2.7-.7L18,5.1a2,2,0,0,1-3-1.7V2a2,2,0,0,0-2-2H11A2,2,0,0,0,9,2V3.3A2,2,0,0,1,6,5L4.8,4.4a1.94,1.94,0,0,0-2.7.7l-1,1.7a2.18,2.18,0,0,0,.7,2.8l1.2.7a2,2,0,0,1,0,3.4l-1.2.7a1.9,1.9,0,0,0-.7,2.7l1,1.7a1.9,1.9,0,0,0,2.7.7L6,18.9a2,2,0,0,1,3,1.7V22a2,2,0,0,0,2,2h2a2,2,0,0,0,2-2V20.7A2,2,0,0,1,18,19l1.2.7a1.94,1.94,0,0,0,2.7-.7l1-1.7A2.28,2.28,0,0,0,22.2,14.4ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16Z"
        transform="translate(-0.79)"
      />
    </Svg>
  );
}

export default Settings;
