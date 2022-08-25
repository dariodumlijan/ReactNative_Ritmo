// @flow
import React from 'react';
import type { Node } from 'react';
import {
  Modal, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View,
} from 'react-native';
import { map } from 'lodash';
import Arrow from '../../../assets/icons/Arrow';
import { isSampleUnlocked } from '../../../utils';
import { useLocationInfo } from '../../../utils/hooks';
import { selectStyle } from '../../../styles/inputs';

export type Option = {
  ...Object,
  label: string,
};

type Props = {
  title?: string,
  value: string,
  options: Option[],
  isOpen: boolean,
  onSelect: Function,
  onOpen: Function,
  onClose: Function,
  compareSamples?: string[],
  isDisabled?: boolean,
};

function Select(props: Props): Node {
  const locationInfo = useLocationInfo();

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
                disabled={props.compareSamples ? !isSampleUnlocked(props.compareSamples, option) : false}
                onPress={() => props.onSelect(option)}
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
