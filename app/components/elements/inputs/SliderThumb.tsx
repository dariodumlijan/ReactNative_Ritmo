// @flow
import React from 'react';
import type { Node } from 'react';
import { Text, View } from 'react-native';
import useLocale from '../../../locales';
import { sliderStyle } from '../../../styles/inputs';
import colors from '../../../styles/colors';

type Props = {
  label: string,
};

function SliderThumb(props: Props): Node {
  const { t } = useLocale();

  const handleColor = (): string | null => {
    if (props.label === 'hihat') return colors.orange;
    if (props.label === 'snare') return colors.green;
    if (props.label === 'kick') return colors.cyan;

    return null;
  };

  return (
    <View style={[sliderStyle.thumb, { backgroundColor: handleColor() }]}>
      <Text style={sliderStyle.label}>{t(`bottom.slider.${props.label}`)}</Text>
    </View>
  );
}

export default SliderThumb;
