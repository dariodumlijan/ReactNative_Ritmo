// @flow
import React from 'react';
import type { Node } from 'react';
import { Text, View } from 'react-native';
import styles from '../../styles/styles';

type Props = {
  label: string,
  color: string,
};

function SliderThumb(props: Props): Node {
  return (
    <View style={[styles.sliderThumb, { backgroundColor: props.color }]}>
      <Text style={styles.sliderThumbText}>{props.label}</Text>
    </View>
  );
}

export default SliderThumb;
