// @flow
import React from 'react';
import type { Node } from 'react';
import {
  Modal, ScrollView, Text, TouchableOpacity, View,
} from 'react-native';
import { map } from 'lodash';
import Arrow from '../../../assets/icons/Arrow';
import { isSampleUnlocked } from '../../../utils';
import { useLocationInfo } from '../../../utils/hooks';
import { selectStyle } from '../../../styles/inputs';

type Option = {
  label: string,
};

type Props = {
  title?: string,
  value: string,
  options: Array<Option&Object>,
  isOpen: boolean,
  onSelect: Function,
  onOpen: Function,
  compareSamples?: string[],
};

function Select(props: Props): Node {
  const locationInfo = useLocationInfo();

  return (
    <>
      <View style={locationInfo.isRewarded ? selectStyle.inputWrapper : selectStyle.inputWrapper}>
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

      <Modal animationType="fade" transparent visible={props.isOpen}>
        <View style={selectStyle.listWrapper}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={selectStyle.list}
            centerContent
          >
            {map(props.options, (option: Option&Object, key: number) => (
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
