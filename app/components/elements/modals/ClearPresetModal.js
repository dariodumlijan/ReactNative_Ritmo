// @flow
import React from 'react';
import type { Node } from 'react';
import {
  Modal, Text, TouchableOpacity, View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import useLocale from '../../../locales';
import { useTeleport } from '../../../utils/hooks';
import { actions } from '../../../store/globalStore';
import modalsStyle from '../../../styles/modals';

type Props = {
  presetKey: string,
};

function ClearPresetModal(props: Props): Node {
  const { t } = useLocale();
  const { close } = useTeleport();
  const dispatch = useDispatch();

  const handleClear = () => {
    dispatch(actions.clearPreset(props.presetKey));
    close();
  };

  return (
    <Modal animationType="fade" transparent visible>
      <View style={modalsStyle.modalView}>
        <Text style={modalsStyle.modalExp}>{t('modal.preset.title')}</Text>
        <View style={modalsStyle.modalBtnCont}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={modalsStyle.modalBtn}
            onPress={handleClear}
          >
            <Text style={modalsStyle.modalBtnTxt}>{t('modal.preset.yes')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={modalsStyle.modalBtn}
            onPress={() => close()}
          >
            <Text style={modalsStyle.modalBtnTxt}>{t('modal.preset.no')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default ClearPresetModal;
