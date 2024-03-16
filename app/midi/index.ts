import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { filter, forEach, times } from 'lodash';
import MidiWriter from 'midi-writer-js';
import type { Beat, Beats } from '../sound/beats';
import type { TimeSignature } from '../store/globalStore';

type MidiNote = 'KSH' | 'KS' | 'KH' | 'SH' | 'K' | 'S' | 'H';
type Note = MidiNote | 'R';
type MidiLayout = MidiNote[];
type NotesLayout = Note[];

export type BuildMidi = {
  beats: Beats,
  fileName: string,
  midiBarTicks: number,
  midiNoteMax: number,
  midiNoteMin: number,
  sliderStep: number,
  stepsInBar: number,
  useBPM: number,
  useTimeSig: TimeSignature,
};

export type BuildPromise = {
  fileUri: string,
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
}: BuildMidi): Promise<BuildPromise> => {
  /* Get position of all notes for each sound */
  const hihatMIDI: number[] = [];
  const snareMIDI: number[] = [];
  const kickMIDI: number[] = [];
  forEach(beats.hihat, (beat: Beat) => {
    if (beat.checked) hihatMIDI.push(beat.angle);
  });

  forEach(beats.snare, (beat: Beat) => {
    if (beat.checked) snareMIDI.push(beat.angle);
  });

  forEach(beats.kick, (beat: Beat) => {
    if (beat.checked) kickMIDI.push(beat.angle);
  });

  /* Create midi note layout from beat configuration */
  let countAngle = 0;
  const notesLayout: NotesLayout = [];
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
  const shiftLayout: NotesLayout = notesLayout.slice();

  /* Calc note start point */
  let countStart = 0;
  let prevStart = 0;
  const startTicks: number[] = [];
  times(shiftLayout.length, () => {
    if (shiftLayout[0] !== 'R') {
      const calcTicks = countStart * midiNoteMin + prevStart;
      startTicks.push(calcTicks);
      prevStart = calcTicks;
      countStart = 0;
    } else {
      countStart++;
    }
    shiftLayout.push(shiftLayout.shift() as Note);
  });

  /* Calc note duration */
  let prevNote = midiBarTicks;
  const notesTicks: string[] = [];
  for (let i = startTicks.length - 1; i >= 0; i--) {
    const startTick = startTicks[i] as number;
    let calcNoteTick = prevNote - startTick;
    if (calcNoteTick > midiNoteMax) {
      calcNoteTick = midiNoteMax;
    }
    const noteTick = 'T' + calcNoteTick;
    notesTicks.unshift(noteTick);
    prevNote = startTick as number;
  }

  /* Create midi note layout array without rests (R) */
  const midiLayout: MidiLayout = filter(notesLayout, (key) => key !== 'R') as MidiLayout;

  /* Write midi sequance */
  const track = new MidiWriter.Track();
  const notesMIDI: any[] = [];
  times(midiLayout.length, (i) => {
    const startTick = startTicks[i] as number;
    const noteTick = notesTicks[i] as string;

    if (midiLayout[i] === 'KSH') {
      notesMIDI.push(
        new MidiWriter.NoteEvent({
          pitch: ['C2', 'D2', 'F#2'],
          duration: noteTick,
          startTick,
        }),
      );
    } else if (midiLayout[i] === 'KS') {
      notesMIDI.push(
        new MidiWriter.NoteEvent({
          pitch: ['C2', 'D2'],
          duration: noteTick,
          startTick,
        }),
      );
    } else if (midiLayout[i] === 'KH') {
      notesMIDI.push(
        new MidiWriter.NoteEvent({
          pitch: ['C2', 'F#2'],
          duration: noteTick,
          startTick,
        }),
      );
    } else if (midiLayout[i] === 'SH') {
      notesMIDI.push(
        new MidiWriter.NoteEvent({
          pitch: ['D2', 'F#2'],
          duration: noteTick,
          startTick,
        }),
      );
    } else if (midiLayout[i] === 'K') {
      notesMIDI.push(
        new MidiWriter.NoteEvent({
          pitch: ['C2'],
          duration: noteTick,
          startTick,
        }),
      );
    } else if (midiLayout[i] === 'S') {
      notesMIDI.push(
        new MidiWriter.NoteEvent({
          pitch: ['D2'],
          duration: noteTick,
          startTick,
        }),
      );
    } else if (midiLayout[i] === 'H') {
      notesMIDI.push(
        new MidiWriter.NoteEvent({
          pitch: ['F#2'],
          duration: noteTick,
          startTick,
        }),
      );
    }
  });
  track.addEvent(notesMIDI, () => ({ sequential: false }));
  track.setTempo(useBPM);
  if (useTimeSig.kick === '4/4') {
    track.setTimeSignature(4, 4, 24, 8);
  } else if (useTimeSig.kick === '3/4') {
    track.setTimeSignature(3, 4, 24, 8);
  }

  /* Write .mid file to app storage */
  const write = new MidiWriter.Writer(track).base64();
  const fileUri = RNFS.DocumentDirectoryPath + `/${encodeURI(fileName)}.midi`;
  RNFS.writeFile(fileUri, write, 'base64');

  /* Start Share */
  const sharedPayload = await Share.open({
    type: 'audio/midi audio/x-midi',
    filename: encodeURI(fileName),
    url: 'file://' + fileUri,
    failOnCancel: true,
  }).then(() => ({ fileUri })).catch(() => ({ fileUri }));

  return sharedPayload;
};

export const deleteMIDIFile = (fileUri: string) => {
  RNFS.unlink(fileUri);
};
