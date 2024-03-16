import React from 'react';
import {
  Modal, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View,
} from 'react-native';
import { map } from 'lodash';
import Arrow from '../../../assets/icons/Arrow';
import { selectStyle } from '../../../styles/inputs';
import { isSampleUnlocked } from '../../../utils';
import { useLocationInfo } from '../../../utils/hooks';

export type Option = Object & {
  label: string,
};

type Props = {
  title?: string,
  value: string,
  options: Option[],
  isOpen: boolean,
  onSelect: (option: any) => void,
  onOpen: () => void,
  onClose: () => void,
  onRewardedClick? : () => void,
  compareSamples?: string[],
  isDisabled?: boolean,
};

function Select(props: Props) {
  const locationInfo = useLocationInfo();

  const handleSelect = (option: Option) => {
    const disabled = props.compareSamples ? !isSampleUnlocked(props.compareSamples, option) : false;
    if (disabled) {
      if (props.onRewardedClick) props.onRewardedClick();

      return;
    }

    props.onSelect(option);
  };

  return (
    <>
      <View style={locationInfo.isRewarded ? selectStyle.inputWrapperRewarded : selectStyle.inputWrapper}>
        {props.title && (
          <Text style={selectStyle.label}>{props.title}</Text>
        )}
        <TouchableOpacity
          disabled={props.isOpen || props.isDisabled}
          activeOpacity={0.6}
          style={locationInfo.isRewarded ? selectStyle.inputRewarded : selectStyle.input}
          onPress={() => props.onOpen()}
        >
          <Text style={selectStyle.inputText}>{props.value}</Text>
          <Arrow style={locationInfo.isRewarded ? selectStyle.inputIconRewarded : selectStyle.inputIcon} />
        </TouchableOpacity>
      </View>

      <Modal animationType="fade" visible={props.isOpen} onRequestClose={props.onClose} transparent>
        <TouchableWithoutFeedback onPress={props.onClose}>
          <View style={selectStyle.listOverlay} />
        </TouchableWithoutFeedback>
        <View style={selectStyle.listWrapper}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={selectStyle.list}
            centerContent
          >
            {map(props.options, (option: Option, key: number) => (
              <TouchableOpacity
                key={key}
                activeOpacity={0.6}
                style={
                key === props.options.length - 1 ? selectStyle.listItemNoBorder : selectStyle.listItem
              }
                onPress={() => handleSelect(option)}
              >
                <Text style={props.compareSamples && !isSampleUnlocked(props.compareSamples, option) ? selectStyle.listDisabledText : selectStyle.listText}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

export default Select;
