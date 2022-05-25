// @flow
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import * as MidiWriter from 'midi-writer-js';
import { forEach, times } from 'lodash';
import type { Beat, Beats } from '../sound/beats';

export type BuildMidi = {
  beats: Beats,
  fileName: string,
  midiBarTicks: number,
  midiNoteMax: number,
  midiNoteMin: number,
  sliderStep: number,
  stepsInBar: number,
  useBPM: number,
  useTimeSig: string,
};

export const exportMIDI = async ({
  beats,
  fileName,
  midiBarTicks,
  midiNoteMax,
  midiNoteMin,
  sliderStep,
  stepsInBar,
  useBPM,
  useTimeSig,
}: BuildMidi): Promise<{ shared: boolean, fileUri: string } | null> => {
  /* Get position of all notes for each sound */
  const hihatMIDI = [];
  const snareMIDI = [];
  const kickMIDI = [];
  forEach(beats.hihat, (beat: Beat) => {
    if (beat.checked === true) hihatMIDI.push(beat.angle);
  });

  forEach(beats.snare, (beat: Beat) => {
    if (beat.checked === true) snareMIDI.push(beat.angle);
  });

  forEach(beats.kick, (beat: Beat) => {
    if (beat.checked === true) kickMIDI.push(beat.angle);
  });

  /* Create midi note layout from beat configuration */
  let countAngle = 0;
  const notesLayout = [];
  times(stepsInBar, () => {
    const hihatIndex = hihatMIDI.indexOf(countAngle);
    const snareIndex = snareMIDI.indexOf(countAngle);
    const kickIndex = kickMIDI.indexOf(countAngle);
    if (kickIndex !== -1 && snareIndex !== -1 && hihatIndex !== -1) {
      notesLayout.push('KSH');
    } else if (kickIndex !== -1 && snareIndex !== -1) {
      notesLayout.push('KS');
    } else if (kickIndex !== -1 && hihatIndex !== -1) {
      notesLayout.push('KH');
    } else if (snareIndex !== -1 && hihatIndex !== -1) {
      notesLayout.push('SH');
    } else if (kickIndex !== -1) {
      notesLayout.push('K');
    } else if (snareIndex !== -1) {
      notesLayout.push('S');
    } else if (hihatIndex !== -1) {
      notesLayout.push('H');
    } else {
      notesLayout.push('R');
    }

    countAngle += sliderStep;
  });
  const shiftLayout = notesLayout.slice();

  /* Calc note start point */
  let countStart = 0;
  let prevStart = 0;
  const startTicks = [];
  times(shiftLayout.length, () => {
    if (shiftLayout[0] !== 'R') {
      const calcTicks = countStart * midiNoteMin + prevStart;
      startTicks.push(calcTicks);
      prevStart = calcTicks;
      countStart = 0;
    } else {
      countStart++;
    }
    shiftLayout.push(shiftLayout.shift());
  });

  /* Calc note duration */
  let prevNote = midiBarTicks;
  const notesTicks = [];
  for (let i = startTicks.length - 1; i >= 0; i--) {
    let calcNoteTick = prevNote - startTicks[i];
    if (calcNoteTick > midiNoteMax) {
      calcNoteTick = midiNoteMax;
    }
    const noteTick = 'T' + calcNoteTick;
    notesTicks.unshift(noteTick);
    prevNote = startTicks[i];
  }

  /* Create midi note layout array without rests (R) */
  const midiLayout = notesLayout.filter((i) => i !== 'R');

  /* Write midi sequance */
  const track = new MidiWriter.Track();
  const notesMIDI = [];
  times(midiLayout.length, (i) => {
    if (midiLayout[i] === 'KSH') {
      notesMIDI.push(
        new MidiWriter.NoteEvent({
          pitch: ['C2', 'D2', 'F#2'],
          duration: notesTicks[i],
          startTick: startTicks[i],
        }),
      );
    } else if (midiLayout[i] === 'KS') {
      notesMIDI.push(
        new MidiWriter.NoteEvent({
          pitch: ['C2', 'D2'],
          duration: notesTicks[i],
          startTick: startTicks[i],
        }),
      );
    } else if (midiLayout[i] === 'KH') {
      notesMIDI.push(
        new MidiWriter.NoteEvent({
          pitch: ['C2', 'F#2'],
          duration: notesTicks[i],
          startTick: startTicks[i],
        }),
      );
    } else if (midiLayout[i] === 'SH') {
      notesMIDI.push(
        new MidiWriter.NoteEvent({
          pitch: ['D2', 'F#2'],
          duration: notesTicks[i],
          startTick: startTicks[i],
        }),
      );
    } else if (midiLayout[i] === 'K') {
      notesMIDI.push(
        new MidiWriter.NoteEvent({
          pitch: ['C2'],
          duration: notesTicks[i],
          startTick: startTicks[i],
        }),
      );
    } else if (midiLayout[i] === 'S') {
      notesMIDI.push(
        new MidiWriter.NoteEvent({
          pitch: ['D2'],
          duration: notesTicks[i],
          startTick: startTicks[i],
        }),
      );
    } else if (midiLayout[i] === 'H') {
      notesMIDI.push(
        new MidiWriter.NoteEvent({
          pitch: ['F#2'],
          duration: notesTicks[i],
          startTick: startTicks[i],
        }),
      );
    }
  });
  track.addEvent(notesMIDI, () => ({ sequential: false }));
  track.setTempo(useBPM);
  if (useTimeSig === '4/4') {
    track.setTimeSignature(4, 4);
  } else if (useTimeSig === '3/4') {
    track.setTimeSignature(3, 4);
  }

  /* Write .mid file to app storage */
  const write = new MidiWriter.Writer(track).base64();
  const fileUri = RNFS.DocumentDirectoryPath + `/${encodeURI(fileName)}.midi`;
  RNFS.writeFile(fileUri, write, 'base64');

  /* Start Share */
  const shareOptions = {
    type: 'audio/midi audio/x-midi',
    filename: encodeURI(fileName),
    url: 'file://' + fileUri,
    failOnCancel: true,
  };

  let payload = null;
  await Share.open(shareOptions)
    .then(() => {
      payload = { shared: true, fileUri };
    })
    .catch(() => {
      payload = { shared: false, fileUri };
    });

  return payload;
};
