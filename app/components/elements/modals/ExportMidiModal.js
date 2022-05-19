// @flow
import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import { Keyboard, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import RNFS from 'react-native-fs';
import { isEqual } from 'lodash';
import useLocale from '../../../locales';
import { actions } from '../../../store/globalStore';
import { selectors } from '../../../store/beatsStore';
import styles from '../../../styles/styles';
import colors from '../../../styles/colors';
import type { State as GlobalState } from '../../../store/globalStore';
import type { State as BeatsState } from '../../../store/beatsStore';

type Props = {
  exit: Function,
};

function ExportMidiModal(props: Props): Node {
  const { t } = useLocale();
  const dispatch = useDispatch();
  const global: GlobalState = useSelector((state) => state.global, isEqual);
  const beats: BeatsState = useSelector(selectors.getBeats, isEqual);
  const [midiName, setMidiName] = useState('Ritmo_MIDI');

  const nameMidiFile = (value) => {
    setMidiName(value.toString());
  };

  const saveMIDI = (value) => {
    Keyboard.dismiss();
    dispatch(
      actions.exportMIDI({
        beats,
        fileName: value,
        midiBarTicks: global.static.midiBarTicks,
        midiNoteMax: global.static.midiNoteMax,
        midiNoteMin: global.static.midiNoteMin,
        sliderStep: global.static.sliderStep,
        stepsInBar: global.static.stepsInBar,
        useBPM: global.ui.useBPM,
        useTimeSig: global.ui.useTimeSig,
      })
    );
  };

  useEffect(
    () => () => {
      Keyboard.dismiss();
      if (global.ui.fileUri) RNFS.unlink(global.ui.fileUri);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Modal animationType="fade" transparent>
      <View style={styles.modalView}>
        <Text style={styles.modalTxt}>{t('modal.label')}</Text>
        <TextInput
          style={styles.inputMidi}
          onChangeText={(val) => nameMidiFile(val)}
          onSubmitEditing={() => nameMidiFile(midiName)}
          value={midiName}
          placeholder="Ritmo_MIDI"
          placeholderTextColor={colors.grayBlue}
          keyboardType="default"
          multiline={false}
        />

        <View style={styles.modalBtnCont}>
          <TouchableOpacity
            style={styles.modalBtn}
            activeOpacity={0.8}
            onPress={() => saveMIDI(midiName)}
          >
            <Text style={styles.modalBtnTxt}>{t('modal.save')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalBtn}
            activeOpacity={0.8}
            onPress={() => props.exit()}
          >
            <Text style={styles.modalBtnTxt}>{t('modal.cancel')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default ExportMidiModal;
