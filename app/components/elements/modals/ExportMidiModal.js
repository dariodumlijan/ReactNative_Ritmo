// @flow
import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import {
  Keyboard, Modal, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import useLocale from '../../../locales';
import { selectors as staticSelectors } from '../../../store/staticStore';
import { actions, selectors as globalSelectors } from '../../../store/globalStore';
import { selectors as beatSelectors } from '../../../store/beatsStore';
import { useTeleport } from '../../../utils/hooks';
import styles from '../../../styles';
import colors from '../../../styles/colors';
import type { State as StaticState } from '../../../store/staticStore';
import type { UI } from '../../../store/globalStore';
import type { Beats } from '../../../sound/beats';

function ExportMidiModal(): Node {
  const { t } = useLocale();
  const { close } = useTeleport();
  const dispatch = useDispatch();
  const staticState: StaticState = useSelector(staticSelectors.getStatic, isEqual);
  const globalUI: UI = useSelector(globalSelectors.getUI, isEqual);
  const beats: Beats = useSelector(beatSelectors.getBeats, isEqual);
  const [fileName, setFileName] = useState('Ritmo_MIDI');

  const nameMidiFile = (value) => setFileName(value.toString());

  const handleExportMIDI = () => {
    Keyboard.dismiss();
    dispatch(
      actions.exportMIDI({
        beats,
        fileName,
        midiBarTicks: staticState.midiBarTicks,
        midiNoteMax: staticState.midiNoteMax,
        midiNoteMin: staticState.midiNoteMin,
        sliderStep: staticState.sliderStep,
        stepsInBar: staticState.stepsInBar,
        useBPM: globalUI.useBPM,
        useTimeSig: globalUI.useTimeSig,
      }),
    );
  };

  useEffect(() => {
    Keyboard.dismiss();
    if (globalUI.fileUri) {
      dispatch(actions.deleteMIDIFile(globalUI.fileUri));
      close();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalUI.fileUri]);

  return (
    <Modal animationType="fade" transparent>
      <View style={styles.modalView}>
        <Text style={styles.modalTxt}>{t('modal.midi.label')}</Text>
        <TextInput
          style={styles.inputMidi}
          onChangeText={(val) => nameMidiFile(val)}
          onSubmitEditing={() => nameMidiFile(fileName)}
          value={fileName}
          placeholder="Ritmo_MIDI"
          placeholderTextColor={colors.grayBlue}
          keyboardType="default"
          multiline={false}
        />

        <View style={styles.modalBtnCont}>
          <TouchableOpacity
            style={styles.modalBtn}
            activeOpacity={0.8}
            onPress={handleExportMIDI}
          >
            <Text style={styles.modalBtnTxt}>{t('modal.midi.save')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalBtn}
            activeOpacity={0.8}
            onPress={() => close()}
          >
            <Text style={styles.modalBtnTxt}>{t('modal.midi.cancel')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default ExportMidiModal;
