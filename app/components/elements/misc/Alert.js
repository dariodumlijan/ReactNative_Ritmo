import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import { Animated } from 'react-native';
import { useTeleport } from '../../../utils/hooks';
import notificationsStyle from '../../../styles/notifications';

type Props = {
  children: Node,
  clearDelayMS: number,
};

function Alert(props: Props): Node {
  const { close } = useTeleport();
  const fadeAlert = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const timeoutID = setTimeout(() => close(), props.clearDelayMS);

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

    return () => clearTimeout(timeoutID);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.children]);

  return (
    <Animated.View style={[notificationsStyle.alertWrapper, { opacity: fadeAlert }]}>
      {props.children}
    </Animated.View>
  );
}

export default Alert;
