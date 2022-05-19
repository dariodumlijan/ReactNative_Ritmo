// @flow
import React from 'react';
import type { Node } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import useLocale from '../../../locales';
import styles from '../../../styles/styles';

type Props = {
  visible: boolean,
  onConfirm: Function,
  onCancel: Function,
};

function ClearPresetModal(props: Props): Node {
  const { t } = useLocale();

  return (
    <Modal animationType="fade" transparent visible={props.visible}>
      <View style={styles.modalView}>
        <Text style={styles.modalExp}>{t('modal.preset.title')}</Text>
        <View style={styles.modalBtnCont}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.modalBtn}
            onPress={() => props.onConfirm()}
          >
            <Text style={styles.modalBtnTxt}>{t('modal.preset.yes')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.modalBtn}
            onPress={() => props.onCancel()}
          >
            <Text style={styles.modalBtnTxt}>{t('modal.preset.no')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default ClearPresetModal;
