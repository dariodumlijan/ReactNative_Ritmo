import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import { Animated } from "react-native";
import styles from '../../styles/styles';

type Props = {
  children: Node,
  onDestroy: Function,
  visible: boolean,
  clearDelayMS: number,
};

function Alert(props: Props): Node {
  const fadeAlert = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      if (props.visible) props.onDestroy();
    }, props.clearDelayMS);

    if (props.visible) {
      Animated.sequence([
        Animated.timing(fadeAlert, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAlert, {
          toValue: 0,
          delay: props.clearDelayMS - 600,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }

    return () => clearTimeout(timeoutID);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.visible]);

  if (props.visible) {
    return (
      <Animated.View style={[styles.alertWrapper, { opacity: fadeAlert }]}>
        {props.children}
      </Animated.View>
    );
  }

  return null;
}

export default Alert;
