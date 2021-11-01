import React from 'react';
import { Svg, Path } from 'react-native-svg';

const Play = (props) => {
  return (
    <Svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" style={props.style}>
      <Path
        fill="#DFE2EC"
        d="M75.9,32.6L23.6,1.2C18.1-2.1,11.2,2,11.2,8.6v62.8c0,6.6,6.9,10.7,12.4,7.4l52.3-31.4
	C81.4,44.1,81.4,35.9,75.9,32.6z"
      />
    </Svg>
  );
};

export default Play;
