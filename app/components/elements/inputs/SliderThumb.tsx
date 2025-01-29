import React from 'react';
import type { ViewStyle } from 'react-native';
import { Text, View } from 'react-native';
import useLocale from '@locales';
import colors from '@styles/colors';
import { sliderStyle } from '@styles/inputs';

type Props = {
  label: string,
};

function SliderThumb(props: Props) {
  const { t } = useLocale();

  const handleColor = (): string | null => {
    if (props.label === 'hihat') return colors.orange;
    if (props.label === 'snare') return colors.green;
    if (props.label === 'kick') return colors.cyan;

    return null;
  };

  return (
    <View style={[sliderStyle.thumb, { backgroundColor: handleColor() }] as unknown as ViewStyle}>
      <Text style={sliderStyle.label}>{t(`bottom.slider.${props.label}`)}</Text>
    </View>
  );
}

export default SliderThumb;
