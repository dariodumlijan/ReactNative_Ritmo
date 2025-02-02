import React from 'react';
import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Arrow from '@assets/icons/Arrow';
import useLocale from '@locales';
import colors from '@styles/colors';
import { timeSignatureSelectStyle } from '@styles/inputs';
import { SoundKey } from '@types';
import useSelectLists from '@utils/lists';
import { every, map, reject } from 'lodash';
import type { TimeSignature } from '@store/globalStore';
import type { TimeSigOption } from '@utils/lists';

type Option = {
  label: string,
  value: 'all' | keyof typeof SoundKey,
};

type Props = {
  value: TimeSignature,
  isOpen: boolean,
  onSelect: (option: any) => void,
  onOpen: () => void,
  onClose: () => void,
};

function TimeSignatureSelect(props: Props) {
  const { t } = useLocale();
  const { timeSignatures } = useSelectLists();

  const options: Option[] = [
    {
      label: t('settings.time_sig_sections.all'),
      value: 'all',
    },
    {
      label: t('settings.time_sig_sections.hihat'),
      value: SoundKey.hihat,
    },
    {
      label: t('settings.time_sig_sections.snare'),
      value: SoundKey.snare,
    },
    {
      label: t('settings.time_sig_sections.kick'),
      value: SoundKey.kick,
    },
  ];

  const isActive = (option: Option, sig: TimeSigOption) => {
    if (option.value === 'all') {
      return every(props.value, (ts) => ts === sig.value);
    }

    return props.value[option.value] === sig.value;
  };

  const handleSelect = (option: Option, sig: TimeSigOption) => {
    props.onSelect({ key: option.value, value: sig.value });
  };

  return (
    <>
      <View style={timeSignatureSelectStyle.inputWrapper}>
        <Text style={timeSignatureSelectStyle.label}>{t('settings.time_sig')}</Text>
        <TouchableOpacity
          disabled={props.isOpen}
          activeOpacity={0.6}
          style={timeSignatureSelectStyle.input}
          onPress={props.onOpen}
        >
          {map(reject(options, ['value', 'all']), (option) => (
            <View key={option.value} style={timeSignatureSelectStyle.valueItem}>
              <Text style={timeSignatureSelectStyle.inputTextLabel}>
                {option.label}:
              </Text>
              <Text style={timeSignatureSelectStyle.inputText}>
                {props.value[option.value as SoundKey]}
              </Text>
            </View>
          ))}
          <Arrow style={timeSignatureSelectStyle.inputIcon} />
        </TouchableOpacity>
      </View>

      <Modal animationType="fade" visible={props.isOpen} onRequestClose={props.onClose} transparent>
        <TouchableWithoutFeedback onPress={props.onClose}>
          <View style={timeSignatureSelectStyle.listOverlay} />
        </TouchableWithoutFeedback>
        <View style={timeSignatureSelectStyle.listWrapper}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={timeSignatureSelectStyle.list}
            centerContent
          >
            {map(options, (option: Option) => (
              <React.Fragment key={option.value}>
                <View style={timeSignatureSelectStyle.listLabelWrapper}>
                  <Text style={timeSignatureSelectStyle.listLabel}>
                    &bull; {option.label}
                  </Text>
                </View>
                <View style={timeSignatureSelectStyle.listSection}>
                  {map(timeSignatures, (sig: TimeSigOption, key: number) => {
                    const active = isActive(option, sig);

                    return (
                      <TouchableOpacity
                        key={key}
                        activeOpacity={0.6}
                        style={[timeSignatureSelectStyle.listItem, {
                          borderBottomColor: colors.grayBlue + '80',
                          ...(active && { backgroundColor: colors.primary + '40' }),
                        }]}
                        onPress={() => handleSelect(option, sig)}
                      >
                        <Text style={[
                          timeSignatureSelectStyle.listText,
                          active ? { color: colors.black } : {}]
                          }
                        >
                          {sig.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </React.Fragment>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

export default TimeSignatureSelect;
