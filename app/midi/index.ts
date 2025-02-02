import { Buffer } from 'buffer';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { TimeSig } from '@app/utils/lists';
import { forEach, times, without } from 'lodash';
import MidiWriter from 'midi-writer-js';
import type { Beat, Beats } from '@sound/beats';
import type { TimeSignature } from '@store/globalStore';

// @ts-ignore
window.Buffer = Buffer; // HACK to fix midi-writer-js: Buffer is not defined

enum MidiNote {
  KSH = 'KSH',
  KS = 'KS',
  KH = 'KH',
  SH = 'SH',
  K = 'K',
  S = 'S',
  H = 'H',
  R = 'R',
}

type Note = MidiNote | MidiNote.R;
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

    switch (true) {
      case kickIndex !== -1 && snareIndex !== -1 && hihatIndex !== -1:
        notesLayout.push(MidiNote.KSH);
        break;
      case kickIndex !== -1 && snareIndex !== -1:
        notesLayout.push(MidiNote.KS);
        break;
      case kickIndex !== -1 && hihatIndex !== -1:
        notesLayout.push(MidiNote.KH);
        break;
      case snareIndex !== -1 && hihatIndex !== -1:
        notesLayout.push(MidiNote.SH);
        break;
      case kickIndex !== -1:
        notesLayout.push(MidiNote.K);
        break;
      case snareIndex !== -1:
        notesLayout.push(MidiNote.S);
        break;
      case hihatIndex !== -1:
        notesLayout.push(MidiNote.H);
        break;
      default:
        notesLayout.push(MidiNote.R);
        break;
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
    if (calcNoteTick > midiNoteMax) calcNoteTick = midiNoteMax;

    const noteTick = 'T' + calcNoteTick;
    notesTicks.unshift(noteTick);
    prevNote = startTick as number;
  }

  /* Create MIDI note layout array without rests (R) */
  const midiLayout: MidiLayout = without(notesLayout, MidiNote.R) as MidiLayout;

  /* Write MIDI sequence */
  const track = new MidiWriter.Track();
  const notesMIDI: any[] = [];
  times(midiLayout.length, (i) => {
    // `|| 1` is a hack to fix a bug in the midi lib which by default
    // will set a duration as the delta ie. note position
    const startTick = startTicks[i] || 1;
    const noteTick = notesTicks[i];

    switch (midiLayout[i]) {
      case MidiNote.KSH:
        notesMIDI.push(
          new MidiWriter.NoteEvent({
            pitch: ['C2', 'D2', 'F#2'],
            duration: noteTick,
            startTick,
          }),
        );
        break;
      case MidiNote.KS:
        notesMIDI.push(
          new MidiWriter.NoteEvent({
            pitch: ['C2', 'D2'],
            duration: noteTick,
            startTick,
          }),
        );
        break;
      case MidiNote.KH:
        notesMIDI.push(
          new MidiWriter.NoteEvent({
            pitch: ['C2', 'F#2'],
            duration: noteTick,
            startTick,
          }),
        );
        break;
      case MidiNote.SH:
        notesMIDI.push(
          new MidiWriter.NoteEvent({
            pitch: ['D2', 'F#2'],
            duration: noteTick,
            startTick,
          }),
        );
        break;
      case MidiNote.K:
        notesMIDI.push(
          new MidiWriter.NoteEvent({
            pitch: ['C2'],
            duration: noteTick,
            startTick,
          }),
        );
        break;
      case MidiNote.S:
        notesMIDI.push(
          new MidiWriter.NoteEvent({
            pitch: ['D2'],
            duration: noteTick,
            startTick,
          }),
        );
        break;
      case MidiNote.H:
        notesMIDI.push(
          new MidiWriter.NoteEvent({
            pitch: ['F#2'],
            duration: noteTick,
            startTick,
          }),
        );
        break;
      default:
        break;
    }
  });

  track.addEvent(notesMIDI, () => ({ sequential: false }));
  track.setTempo(useBPM);

  switch (useTimeSig.kick) {
    case TimeSig.FourFour:
      track.setTimeSignature(4, 4, 24, 8);
      break;
    case TimeSig.TreeFour:
      track.setTimeSignature(3, 4, 24, 8);
      break;
    default:
      break;
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
