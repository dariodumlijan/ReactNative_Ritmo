// @flow
import React, { useContext } from 'react';
import type { Node } from 'react';
import {
  Modal, Text, TouchableOpacity, View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import useLocale from '../../../locales';
import { PortalContext } from '../../../context';
import { actions } from '../../../store/globalStore';
import styles from '../../../styles/styles';

type Props = {
  presetKey: string,
};

function ClearPresetModal(props: Props): Node {
  const { t } = useLocale();
  const { close } = useContext(PortalContext);
  const dispatch = useDispatch();

  const handleClear = () => {
    dispatch(actions.clearPreset(props.presetKey));
    close();
  };

  return (
    <Modal animationType="fade" transparent visible>
      <View style={styles.modalView}>
        <Text style={styles.modalExp}>{t('modal.preset.title')}</Text>
        <View style={styles.modalBtnCont}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.modalBtn}
            onPress={handleClear}
          >
            <Text style={styles.modalBtnTxt}>{t('modal.preset.yes')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.modalBtn}
            onPress={() => close()}
          >
            <Text style={styles.modalBtnTxt}>{t('modal.preset.no')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default ClearPresetModal;
