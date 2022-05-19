// @flow
import React from 'react';
import type { Node } from 'react';
import { Text, View } from 'react-native';
import useLocale from '../../../locales';
import bottomStyle from '../../../styles/bottom_style';
import colors from '../../../styles/colors';

type Props = {
  label: string,
};

function SliderThumb(props: Props): Node {
  const { t } = useLocale();

  const handleColor = (): string | null => {
    if (props.label === 'hihat') return colors.orange;
    if (props.label === 'snare') return colors.cyan;
    if (props.label === 'kick') return colors.green;

    return null;
  };

  return (
    <View style={[bottomStyle.sliderThumb, { backgroundColor: handleColor() }]}>
      <Text style={bottomStyle.sliderThumbText}>{t(`bottom.slider.${props.label}`)}</Text>
    </View>
  );
}

export default SliderThumb;
