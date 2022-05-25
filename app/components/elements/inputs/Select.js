// @flow
import React from 'react';
import type { Node } from 'react';
import {
  Modal, ScrollView, Text, TouchableOpacity, View,
} from 'react-native';
import { map } from 'lodash';
import Arrow from '../../../assets/icons/Arrow';
import { isSampleUnlocked } from '../../../utils';
import styles from '../../../styles/styles';

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
  return (
    <>
      <View style={styles.selectWrapper}>
        {props.title && (
          <Text style={styles.menuTitle}>{props.title}</Text>
        )}
        <TouchableOpacity
          disabled={props.isOpen}
          activeOpacity={0.6}
          style={styles.selectInput}
          onPress={() => props.onOpen()}
        >
          <Text style={styles.selectInputText}>{props.value}</Text>
          <Arrow style={styles.selectListArrow} />
        </TouchableOpacity>
      </View>

      <Modal animationType="fade" transparent visible={props.isOpen}>
        <View style={styles.selectListWrapper}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.selectList}
            centerContent
          >
            {map(props.options, (option: Option&Object, key: number) => (
              <TouchableOpacity
                key={key}
                activeOpacity={0.6}
                style={
                key === props.options.length - 1 ? styles.selectItemNoBorder : styles.selectItem
              }
                disabled={props.compareSamples ? !isSampleUnlocked(props.compareSamples, option) : false}
                onPress={() => props.onSelect(option)}
              >
                <Text style={props.compareSamples && !isSampleUnlocked(props.compareSamples, option) ? styles.selectDisabledText : styles.selectText}>
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
