import React from 'react';
import {
  Modal, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View,
} from 'react-native';
import Arrow from '@assets/icons/Arrow';
import { selectStyle } from '@styles/inputs';
import { map } from 'lodash';

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
};

function Select(props: Props) {
  const handleSelect = (option: Option) => {
    props.onSelect(option);
  };

  return (
    <>
      <View style={selectStyle.inputWrapper}>
        {props.title && (
          <Text style={selectStyle.label}>{props.title}</Text>
        )}
        <TouchableOpacity
          disabled={props.isOpen}
          activeOpacity={0.6}
          style={selectStyle.input}
          onPress={() => props.onOpen()}
        >
          <Text style={selectStyle.inputText}>{props.value}</Text>
          <Arrow style={selectStyle.inputIcon} />
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
                <Text style={selectStyle.listText}>
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
