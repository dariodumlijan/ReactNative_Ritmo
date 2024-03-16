import React from 'react';
import {
  Modal,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { every, map, reject } from 'lodash';
import Arrow from '../../../assets/icons/Arrow';
import useLocale from '../../../locales';
import colors from '../../../styles/colors';
import { timeSignatureSelectStyle } from '../../../styles/inputs';
import settingsStyle from '../../../styles/settings';
import { SoundKey } from '../../../types';
import useSelectLists from '../../../utils/lists';
import ConditionalAd from '../misc/ConditionalAd';
import type { TimeSignature } from '../../../store/globalStore';
import type { TimeSig } from '../../../utils/lists';

type Option = {
  label: string,
  value: 'all' | keyof typeof SoundKey,
  disabled: boolean,
};

type Props = {
  value: TimeSignature,
  isOpen: boolean,
  unlockedPro: boolean,
  onSelect: (option: any) => void,
  onOpen: () => void,
  onClose: () => void,
  onRewardedClick: () => void,
  isDisabled?: boolean,
};

function TimeSignatureSelect(props: Props) {
  const { t } = useLocale();
  const { timeSignatures } = useSelectLists();

  const options: Option[] = [
    {
      label: t('settings.time_sig_sections.all'),
      value: 'all',
      disabled: false,
    },
    {
      label: t('settings.time_sig_sections.hihat'),
      value: SoundKey.hihat,
      disabled: !props.unlockedPro,
    },
    {
      label: t('settings.time_sig_sections.snare'),
      value: SoundKey.snare,
      disabled: !props.unlockedPro,
    },
    {
      label: t('settings.time_sig_sections.kick'),
      value: SoundKey.kick,
      disabled: !props.unlockedPro,
    },
  ];

  const isActive = (option: Option, sig: TimeSig) => {
    if (option.value === 'all') {
      return every(props.value, (ts) => ts === sig.value);
    }

    return props.value[option.value] === sig.value;
  };

  const handleSelect = (option: Option, sig: TimeSig) => {
    if (option.disabled) {
      props.onRewardedClick();

      return;
    }

    props.onSelect({
      key: option.value,
      value: sig.value,
    });
  };

  return (
    <>
      <View style={timeSignatureSelectStyle.inputWrapper}>
        <Text style={timeSignatureSelectStyle.label}>{t('settings.time_sig')}</Text>
        <TouchableOpacity
          disabled={props.isOpen || props.isDisabled}
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

        {!props.unlockedPro && (
          <ConditionalAd>
            <TouchableHighlight
              style={[settingsStyle.btnRewardScreen, {
                marginBottom: 0,
              }]}
              onPress={props.onRewardedClick}
              underlayColor={colors.grayBlue}
            >
              <Text style={settingsStyle.btnRewardScreenText}>
                {t('settings.unlock_advanced')}
              </Text>
            </TouchableHighlight>
          </ConditionalAd>
        )}
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
                    {option.label}
                  </Text>
                  {option.disabled && (
                    <TouchableHighlight
                      style={timeSignatureSelectStyle.proWrapper}
                      onPress={props.onRewardedClick}
                      underlayColor={colors.gray}
                    >
                      <Text style={timeSignatureSelectStyle.proText}>
                        {t('settings.advanced')}
                      </Text>
                    </TouchableHighlight>
                  )}
                </View>
                <View style={timeSignatureSelectStyle.listSection}>
                  {map(timeSignatures, (sig: TimeSig, key: number) => (
                    <TouchableOpacity
                      key={key}
                      activeOpacity={0.6}
                      style={key === timeSignatures.length - 1 ? timeSignatureSelectStyle.listItemNoBorder : [timeSignatureSelectStyle.listItem, {
                        borderBottomColor: colors.grayBlue + '80',
                      }]}
                      onPress={() => handleSelect(option, sig)}
                    >
                      <Text style={[timeSignatureSelectStyle.listText, {
                        ...(isActive(option, sig) && {
                          color: colors.primary,
                        }),
                      }]}
                      >
                        {sig.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
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
