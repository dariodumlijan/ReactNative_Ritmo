// @flow
import React from 'react';
import type { Node } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { radioStyle } from '../../../styles/inputs';

type Props = {
  option: Object,
  isActive: boolean,
  onPress: Function,
};

function Radio(props: Props): Node {
  return (
    <TouchableOpacity
      key={props.option.value}
      activeOpacity={0.6}
      onPress={props.onPress}
    >
      <View style={radioStyle.container}>
        <Text style={radioStyle.text}>{props.option.label}</Text>
        <View
          style={props.isActive ? radioStyle.selected : radioStyle.notSelected}
        />
      </View>
    </TouchableOpacity>
  );
}

export default Radio;
