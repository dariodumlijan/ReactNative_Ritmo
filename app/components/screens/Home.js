// @flow
import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  Modal,
  Animated,
  Easing,
  Keyboard,
  Dimensions,
  useWindowDimensions,
} from 'react-native';

/* Other - Modules */
import DeviceInfo from 'react-native-device-info';
import { Slider } from '@miblanchard/react-native-slider';

/* Audio & Midi - Modules */
import Sound from 'react-native-sound';
import * as MidiWriter from 'midi-writer-js';
import { Buffer } from 'buffer';

/* Save - Modules */
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Share from 'react-native-share';

import { admob } from '../../tokens';

/* Style & Color */
import colors from '../../styles/colors';
import styles from '../../styles/styles';

/* SVG's */
import Logo from '../../assets/icons/Logo';
import Menu from '../../assets/icons/Menu';
import Settings from '../../assets/icons/Settings';
// import Recordings from '../assets/icons/Recordings';
import Guide from '../../assets/icons/Guide';
import Export from '../../assets/icons/Export';
import Exit from '../../assets/icons/Exit';
import Play from '../../assets/icons/Play';
import Pause from '../../assets/icons/Pause';

/* Device specific variables */
const deviceHeight = Dimensions.get('screen').height;
const deviceWidth = Dimensions.get('screen').width;
const useWidth = deviceWidth + deviceWidth * 0.06;

/* Hihat Array - START */
let hihatCircle = [
  {
    checked: false,
    timeSig: 'Free',
    visible: true,
    angle: 0,
    initAngle: 0,
    soundName: 'HiHat.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: '3/4',
    visible: true,
    angle: 30,
    initAngle: 30,
    soundName: 'HiHat.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: '4/4',
    visible: true,
    angle: 45,
    initAngle: 45,
    soundName: 'HiHat.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: '3/4',
    visible: true,
    angle: 60,
    initAngle: 60,
    soundName: 'HiHat.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: 'Free',
    visible: true,
    angle: 90,
    initAngle: 90,
    soundName: 'HiHat.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: '3/4',
    visible: true,
    angle: 120,
    initAngle: 120,
    soundName: 'HiHat.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: '4/4',
    visible: true,
    angle: 135,
    initAngle: 135,
    soundName: 'HiHat.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: '3/4',
    visible: true,
    angle: 150,
    initAngle: 150,
    soundName: 'HiHat.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: 'Free',
    visible: true,
    angle: 180,
    initAngle: 180,
    soundName: 'HiHat.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: '3/4',
    visible: true,
    angle: 210,
    initAngle: 210,
    soundName: 'HiHat.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: '4/4',
    visible: true,
    angle: 225,
    initAngle: 225,
    soundName: 'HiHat.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: '3/4',
    visible: true,
    angle: 240,
    initAngle: 240,
    soundName: 'HiHat.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: 'Free',
    visible: true,
    angle: 270,
    initAngle: 270,
    soundName: 'HiHat.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: '3/4',
    visible: true,
    angle: 300,
    initAngle: 300,
    soundName: 'HiHat.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: '4/4',
    visible: true,
    angle: 315,
    initAngle: 315,
    soundName: 'HiHat.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: '3/4',
    visible: true,
    angle: 330,
    initAngle: 330,
    soundName: 'HiHat.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
];
/* Hihat Array - END */

/* Snare Array - START */
let snareCircle = [
  {
    checked: false,
    timeSig: 'Free',
    visible: true,
    angle: 0,
    initAngle: 0,
    soundName: 'Snare.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: '3/4',
    visible: true,
    angle: 30,
    initAngle: 30,
    soundName: 'Snare.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: '4/4',
    visible: true,
    angle: 45,
    initAngle: 45,
    soundName: 'Snare.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: '3/4',
    visible: true,
    angle: 60,
    initAngle: 60,
    soundName: 'Snare.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: 'Free',
    visible: true,
    angle: 90,
    initAngle: 90,
    soundName: 'Snare.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: '3/4',
    visible: true,
    angle: 120,
    initAngle: 120,
    soundName: 'Snare.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: '4/4',
    visible: true,
    angle: 135,
    initAngle: 135,
    soundName: 'Snare.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: '3/4',
    visible: true,
    angle: 150,
    initAngle: 150,
    soundName: 'Snare.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: 'Free',
    visible: true,
    angle: 180,
    initAngle: 180,
    soundName: 'Snare.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: '3/4',
    visible: true,
    angle: 210,
    initAngle: 210,
    soundName: 'Snare.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: '4/4',
    visible: true,
    angle: 225,
    initAngle: 225,
    soundName: 'Snare.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: '3/4',
    visible: true,
    angle: 240,
    initAngle: 240,
    soundName: 'Snare.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: 'Free',
    visible: true,
    angle: 270,
    initAngle: 270,
    soundName: 'Snare.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: '3/4',
    visible: true,
    angle: 300,
    initAngle: 300,
    soundName: 'Snare.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: '4/4',
    visible: true,
    angle: 315,
    initAngle: 315,
    soundName: 'Snare.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: '3/4',
    visible: true,
    angle: 330,
    initAngle: 330,
    soundName: 'Snare.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
];
/* Snare Array - END */

/* Kick Array - START */
let kickCircle = [
  {
    checked: false,
    timeSig: 'Free',
    visible: true,
    angle: 0,
    initAngle: 0,
    soundName: 'Kick.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: '3/4',
    visible: true,
    angle: 30,
    initAngle: 30,
    soundName: 'Kick.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: '4/4',
    visible: true,
    angle: 45,
    initAngle: 45,
    soundName: 'Kick.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: '3/4',
    visible: true,
    angle: 60,
    initAngle: 60,
    soundName: 'Kick.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: 'Free',
    visible: true,
    angle: 90,
    initAngle: 90,
    soundName: 'Kick.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: '3/4',
    visible: true,
    angle: 120,
    initAngle: 120,
    soundName: 'Kick.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: '4/4',
    visible: true,
    angle: 135,
    initAngle: 135,
    soundName: 'Kick.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: '3/4',
    visible: true,
    angle: 150,
    initAngle: 150,
    soundName: 'Kick.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: 'Free',
    visible: true,
    angle: 180,
    initAngle: 180,
    soundName: 'Kick.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: '3/4',
    visible: true,
    angle: 210,
    initAngle: 210,
    soundName: 'Kick.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: '4/4',
    visible: true,
    angle: 225,
    initAngle: 225,
    soundName: 'Kick.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: '3/4',
    visible: true,
    angle: 240,
    initAngle: 240,
    soundName: 'Kick.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: 'Free',
    visible: true,
    angle: 270,
    initAngle: 270,
    soundName: 'Kick.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: '3/4',
    visible: true,
    angle: 300,
    initAngle: 300,
    soundName: 'Kick.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: '4/4',
    visible: true,
    angle: 315,
    initAngle: 315,
    soundName: 'Kick.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
  {
    checked: false,
    timeSig: '3/4',
    visible: true,
    angle: 330,
    initAngle: 330,
    soundName: 'Kick.mp3',
    soundDelay: 0,
    soundDelayKey: '_timeout',
  },
];
/* Kick Array - END */

/* Circle Variables */
let visibleState1 = hihatCircle.map(({ visible }) => visible);
let visibleState2 = snareCircle.map(({ visible }) => visible);
let visibleState3 = kickCircle.map(({ visible }) => visible);
let hihatStates = hihatCircle.map(({ checked }) => checked);
let snareStates = snareCircle.map(({ checked }) => checked);
let kickStates = kickCircle.map(({ checked }) => checked);

/* Main Variables */
let navCheck = false;
let isPlaying = false;
const isRecording = false;
let selectedPresetModul;
let hihatSliderVal = 0;
let snareSliderVal = 0;
let kickSliderVal = 0;

/* Settings Variables */
let menuCheck;
let useBPM = 100;
let bpmInterval = 240000 / useBPM;
let pulseInterval = bpmInterval / 8;
let beatCycle;
let useTimeSig = 'Free';

/* Sounds & Midi Variables */
const soundList = [
  {
    name: 'Acoustic',
    hihatSound: 'acoustic_hihat.mp3',
    snareSound: 'acoustic_snare.mp3',
    kickSound: 'acoustic_kick.mp3',
    disabled: false,
  },
  {
    name: 'HipHop',
    hihatSound: 'hiphop_hihat.mp3',
    snareSound: 'hiphop_snare.mp3',
    kickSound: 'hiphop_kick.mp3',
    disabled: false,
  },
  {
    name: 'Trap',
    hihatSound: 'trap_hihat.mp3',
    snareSound: 'trap_snare.mp3',
    kickSound: 'trap_kick.mp3',
    disabled: false,
  },
  {
    name: 'Lo-fi',
    hihatSound: 'lofi_hihat.mp3',
    snareSound: 'lofi_snare.mp3',
    kickSound: 'lofi_kick.mp3',
    disabled: false,
  },
  {
    name: 'Latin',
    hihatSound: 'latin_hihat.mp3',
    snareSound: 'latin_snare.mp3',
    kickSound: 'latin_kick.mp3',
    disabled: false,
  },
  {
    name: 'African 1',
    hihatSound: 'african1_hihat.mp3',
    snareSound: 'african1_snare.mp3',
    kickSound: 'african1_kick.mp3',
    disabled: false,
  },
  {
    name: 'African 2',
    hihatSound: 'african2_hihat.mp3',
    snareSound: 'african2_snare.mp3',
    kickSound: 'african2_kick.mp3',
    disabled: false,
  },
  {
    name: 'Toms',
    hihatSound: 'toms_hihat.mp3',
    snareSound: 'toms_snare.mp3',
    kickSound: 'toms_kick.mp3',
    disabled: false,
  },
  {
    name: 'Epic Toms',
    hihatSound: 'epictoms_hihat.mp3',
    snareSound: 'epictoms_snare.mp3',
    kickSound: 'epictoms_kick.mp3',
    disabled: false,
  },
  {
    name: 'Taiko',
    hihatSound: 'taiko_hihat.mp3',
    snareSound: 'taiko_snare.mp3',
    kickSound: 'taiko_kick.mp3',
    disabled: false,
  },
];
let unlockedSamples = soundList.map(({ disabled }) => disabled);
let selectedSoundNameSaved = 'Acoustic';
let selectedSoundIndexSaved = 0;
let libraryLoaded = false;
const fileName = 'Ritmo_MIDI';
let fileUri = '';

/* Preset Variables */
let preset1Config = [];
let preset2Config = [];
let preset3Config = [];

/* Enable Playback in Silent mode */
Sound.setCategory('Playback');
/* Register Sound variables */
let hihatPath = soundList[selectedSoundIndexSaved].hihatSound;
let snarePath = soundList[selectedSoundIndexSaved].snareSound;
let kickPath = soundList[selectedSoundIndexSaved].kickSound;

/* Rewarded Variables */
let rewardList = [];
let rewardListName;
let rewardIndex;
let rewardDisabled = false;
let refreshEnabled = false;

/* Timer Variables */
let timerStart = false;
const timerUpdate = {
  hours: 0,
  minutes: 0,
  seconds: 0,
};
let tickVariable;

/* Recording formats - NOT USED */
/*
const RecordingOptions = {
  isMeteringEnabled: true,
  android: {
    extension: ".m4a",
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
  },
  ios: {
    extension: ".m4a",
    outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MEDIUM,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
};
*/

/* Calc Milliseconds to Hours:Minutes:Seconds - Function */
function ms2Time(value) {
  function pad(n, z) {
    z = z || 2;

    return ('00' + n).slice(-z);
  }

  const ms = value % 1000;
  value = (value - ms) / 1000;
  const secs = value % 60;
  value = (value - secs) / 60;
  const mins = value % 60;
  const hrs = (value - mins) / 60;

  timerUpdate.hours = pad(hrs);
  timerUpdate.minutes = pad(mins);
  timerUpdate.seconds = pad(secs);
}

/* OnLoad init Sounds - Function */
async function loadSounLib() {
  if (libraryLoaded === false) {
    hihatPath = soundList[selectedSoundIndexSaved].hihatSound;
    snarePath = soundList[selectedSoundIndexSaved].snareSound;
    kickPath = soundList[selectedSoundIndexSaved].kickSound;

    libraryLoaded = true;
  }
}

/* Clear Sounds from Cache - Function */
async function unloadSoundLib() {
  libraryLoaded = false;
}

/* Change Sounds - Function */
async function reloadSoundLib() {
  libraryLoaded = false;

  hihatPath = soundList[selectedSoundIndexSaved].hihatSound;
  snarePath = soundList[selectedSoundIndexSaved].snareSound;
  kickPath = soundList[selectedSoundIndexSaved].kickSound;

  libraryLoaded = true;
}

/* Calc Sound Delay Time - Function */
function calcSoundDelay() {
  bpmInterval = 240000 / useBPM;
  const bpmAdjust = (60 / useBPM) * 4;
  const delayDegree = (1000 * bpmAdjust) / 360;

  for (const i in hihatCircle) {
    let delaySound;
    const calcDelay = delayDegree * hihatSliderVal;
    const beatDelay = delayDegree * hihatCircle[i].initAngle + calcDelay;
    (delaySound = beatDelay > bpmInterval ? beatDelay - bpmInterval : beatDelay),
      (hihatCircle[i].soundDelay = delaySound);
    hihatCircle[i].soundDelayKey = delaySound + '_timeout';
  }

  for (const i in snareCircle) {
    let delaySound;
    const calcDelay = delayDegree * snareSliderVal;
    const beatDelay = delayDegree * snareCircle[i].initAngle + calcDelay;
    (delaySound = beatDelay > bpmInterval ? beatDelay - bpmInterval : beatDelay),
      (snareCircle[i].soundDelay = delaySound);
    snareCircle[i].soundDelayKey = delaySound + '_timeout';
  }

  for (const i in kickCircle) {
    let delaySound;
    const calcDelay = delayDegree * kickSliderVal;
    const beatDelay = delayDegree * kickCircle[i].initAngle + calcDelay;
    (delaySound = beatDelay > bpmInterval ? beatDelay - bpmInterval : beatDelay),
      (kickCircle[i].soundDelay = delaySound);
    kickCircle[i].soundDelayKey = delaySound + '_timeout';
  }
}

/* Start Playback - Function */
function playSoundLib() {
  for (const i in hihatCircle) {
    if (hihatCircle[i].checked === true) {
      hihatCircle[i].soundDelayKey = setTimeout(async () => {
        const hihatMP3 = new Sound(hihatPath, Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            // console.log(hihatPath + 'Failed', error);
            return;
          }
          hihatMP3.setVolume(0.8);
          /* Play the sound with an onEnd callback */
          hihatMP3.play((success) => {
            if (success) {
              hihatMP3.release();
            } else {
              // console.log('Playback Fail');
            }
          });
        });
      }, hihatCircle[i].soundDelay);
    }
  }

  for (const i in snareCircle) {
    if (snareCircle[i].checked === true) {
      snareCircle[i].soundDelayKey = setTimeout(async () => {
        const snareMP3 = new Sound(snarePath, Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            // console.log(snarePath + 'Failed', error);
            return;
          }
          snareMP3.setVolume(0.8);
          /* Play the sound with an onEnd callback */
          snareMP3.play((success) => {
            if (success) {
              snareMP3.release();
            } else {
              // console.log('Playback Fail');
            }
          });
        });
      }, snareCircle[i].soundDelay);
    }
  }

  for (const i in kickCircle) {
    if (kickCircle[i].checked === true) {
      kickCircle[i].soundDelayKey = setTimeout(async () => {
        const kickMP3 = new Sound(kickPath, Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            // console.log(kickPath + 'Failed', error);
            return;
          }
          kickMP3.setVolume(0.8);
          /* Play the sound with an onEnd callback */
          kickMP3.play((success) => {
            if (success) {
              kickMP3.release();
            } else {
              // console.log('Playback Fail');
            }
          });
        });
      }, kickCircle[i].soundDelay);
    }
  }
}

/* Change TimeSig - Function */
function changeTimeSig() {
  for (const i in hihatCircle) {
    if (hihatCircle[i].timeSig !== useTimeSig && hihatCircle[i].timeSig !== 'Free') {
      hihatCircle[i].visible = false;
    } else {
      hihatCircle[i].visible = true;
    }
  }

  for (const i in snareCircle) {
    if (snareCircle[i].timeSig !== useTimeSig && snareCircle[i].timeSig !== 'Free') {
      snareCircle[i].visible = false;
    } else {
      snareCircle[i].visible = true;
    }
  }

  for (const i in kickCircle) {
    if (kickCircle[i].timeSig !== useTimeSig && kickCircle[i].timeSig !== 'Free') {
      kickCircle[i].visible = false;
    } else {
      kickCircle[i].visible = true;
    }
  }

  if (useTimeSig === 'Free') {
    visibleState1 = hihatCircle.map(({ visible }) => (visible = true));
    visibleState2 = snareCircle.map(({ visible }) => (visible = true));
    visibleState3 = kickCircle.map(({ visible }) => (visible = true));
  } else {
    visibleState1 = hihatCircle.map(({ visible }) => visible);
    visibleState2 = snareCircle.map(({ visible }) => visible);
    visibleState3 = kickCircle.map(({ visible }) => visible);
  }

  hihatStates = [];
  snareStates = [];
  kickStates = [];

  for (const i in visibleState1) {
    if (visibleState1[i] === false) {
      hihatCircle[i].checked = false;
    }
    hihatStates.push(hihatCircle[i].checked);
  }
  for (const i in visibleState2) {
    if (visibleState2[i] === false) {
      snareCircle[i].checked = false;
    }
    snareStates.push(snareCircle[i].checked);
  }
  for (const i in visibleState3) {
    if (visibleState3[i] === false) {
      kickCircle[i].checked = false;
    }
    kickStates.push(kickCircle[i].checked);
  }

  if (useTimeSig === '3/4') {
    pulseInterval = bpmInterval / 6;
  } else {
    pulseInterval = bpmInterval / 8;
  }
}

/* Current Date - Function */
let date;
function getDate() {
  const today = new Date();
  date = today.getFullYear() + '' + (today.getMonth() + 1) + '.' + today.getDate();
}
/* Current Date - Call onLoad */
getDate();

/* Review - Function */
async function askForReview() {
  const available = InAppReview.isAvailable();
  const currentDate = new Date().valueOf();

  if (reviewWait - currentDate <= 0 && available) {
    const numberDATE = Number(date);

    const timeStamp = await AsyncStorage.getItem('reviewTimeStampSAVE');
    const reviewTimeStamp = Number(timeStamp);

    if (reviewTimeStamp <= numberDATE || reviewTimeStamp === 0) {
      await AsyncStorage.removeItem('reviewTimeStampSAVE');

      InAppReview.RequestInAppReview().then(async (hasFlowFinishedSuccessfully) => {
        if (hasFlowFinishedSuccessfully) {
          /* 0.1 = 1day, 1 = 1month */
          await AsyncStorage.setItem('reviewTimeStampSAVE', JSON.stringify(numberDATE + 1));
        }
      });
    }
  }
}

/* Rhythm Screen */
export const RhythmScreen = forwardRef((props, ref) => {
  /* Register Sounds Angle Array */
  let hihatRotation = hihatCircle.map(({ angle }) => angle);
  let snareRotation = snareCircle.map(({ angle }) => angle);
  let kickRotation = kickCircle.map(({ angle }) => angle);

  /* Rhythm Screen onLoad */
  useEffect(() => {
    checkIfPreset();
    loadSounLib();
    calcSoundDelay();
  }, []);

  /* Calls from Outside */
  useImperativeHandle(ref, () => ({
    pause,
    timeSigUpdate,
  }));

  /* Open Navigation - Callback */
  const navOpen = () => {
    props.navCallback(true);
  };

  /* Update TimeSig from Settings - Function */
  const timeSigUpdate = () => {
    setVisibleHihat(visibleState1);
    setVisibleSnare(visibleState2);
    setVisibleKick(visibleState3);

    setCheckedHihatState(hihatStates);
    setCheckedSnareState(snareStates);
    setCheckedKickState(kickStates);
  };

  /* Play & Record States */
  const [play, setPlay] = useState(isPlaying);
  // const [recordingStatus, setRecordingStatus] = useState(isRecording);
  // const [recording, setRecording] = useState(new Audio.Recording());

  /* Checkbox Visible States */
  const [visibleHihat, setVisibleHihat] = useState(visibleState1);
  const [visibleSnare, setVisibleSnare] = useState(visibleState2);
  const [visibleKick, setVisibleKick] = useState(visibleState3);

  /* Checkbox Checked States */
  const [checkedHihatState, setCheckedHihatState] = useState(hihatStates);
  const [checkedSnareState, setCheckedSnareState] = useState(snareStates);
  const [checkedKickState, setCheckedKickState] = useState(kickStates);

  /* Checkbox Angle States */
  const [useHihatRotation, setUseHihatRotation] = useState(hihatRotation);
  const [useSnareRotation, setUseSnareRotation] = useState(snareRotation);
  const [useKickRotation, setUseKickRotation] = useState(kickRotation);

  /* Circle Angle States */
  const [hihatRadius, setHihatRadius] = useState(0);
  const [snareRadius, setSnareRadius] = useState(0);
  const [kickRadius, setKickRadius] = useState(0);

  /* Slider States */
  const [hihatValue, setHihatValue] = useState(hihatSliderVal);
  const [snareValue, setSnareValue] = useState(snareSliderVal);
  const [kickValue, setKickValue] = useState(kickSliderVal);

  /* Preset States */
  const [beat1, setBeat1] = useState(false);
  const [beat2, setBeat2] = useState(false);
  const [beat3, setBeat3] = useState(false);
  const [presetModul, setPresetModul] = useState(false);

  /* Alert Message States */
  const [alertShow, setAlertShow] = useState(true);
  const fadeAlert = useState(new Animated.Value(0))[0];

  /* Alert Show & Hide - Function */
  const alertDelay = () => {
    setAlertShow(true);
    Animated.sequence([
      Animated.timing(fadeAlert, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAlert, {
        toValue: 0,
        delay: 2700,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
    setTimeout(() => {
      setAlertShow(false);
    }, 3300);
  };

  /* Calc Circle Radius - START */
  const getHihatDimentions = (event) => {
    const { width } = event.nativeEvent.layout;
    setHihatRadius(width / 2 - 2.5);
  };

  const getSnareDimentions = (event) => {
    const { width } = event.nativeEvent.layout;
    setSnareRadius(width / 2 - 2.5);
  };

  const getKickDimentions = (event) => {
    const { width } = event.nativeEvent.layout;
    setKickRadius(width / 2 - 2.5);
  };
  /* Calc Circle Radius - END */

  /* Playback Animation States */
  const rotate = useState(new Animated.Value(0))[0];
  const pulse = useState(new Animated.Value(0))[0];

  /* Playback Animation Functions - START */
  const startBeat = () => {
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: bpmInterval,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: pulseInterval,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: pulseInterval,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopBeat = () => {
    rotate.stopAnimation();
    rotate.setValue(0);
    pulse.stopAnimation();
    pulse.setValue(0);
  };

  const rotateBeat = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const pulseBtn = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.9],
  });
  /* Playback Animation Functions - END */

  /* Checkbox toggle - Function */
  const toggleCheckbox = (soundName, index) => {
    if (!hihatCircle[index].checked && soundName == 'HiHat.mp3') {
      hihatCircle[index].checked = true;
    } else if (hihatCircle[index].checked && soundName == 'HiHat.mp3') {
      hihatCircle[index].checked = false;
    } else if (!snareCircle[index].checked && soundName == 'Snare.mp3') {
      snareCircle[index].checked = true;
    } else if (snareCircle[index].checked && soundName == 'Snare.mp3') {
      snareCircle[index].checked = false;
    } else if (!kickCircle[index].checked && soundName == 'Kick.mp3') {
      kickCircle[index].checked = true;
    } else if (kickCircle[index].checked && soundName == 'Kick.mp3') {
      kickCircle[index].checked = false;
    }
    hihatStates = hihatCircle.map(({ checked }) => checked);
    snareStates = snareCircle.map(({ checked }) => checked);
    kickStates = kickCircle.map(({ checked }) => checked);
    setCheckedHihatState(hihatStates);
    setCheckedSnareState(snareStates);
    setCheckedKickState(kickStates);
    setAlertShow(false);
  };

  /* Checkbox Reset - Function */
  const checkboxInitReset = () => {
    Object.keys(hihatCircle).forEach((i) => (hihatCircle[i].checked = false));
    Object.keys(snareCircle).forEach((i) => (snareCircle[i].checked = false));
    Object.keys(kickCircle).forEach((i) => (kickCircle[i].checked = false));

    setCheckedHihatState(false);
    setCheckedSnareState(false);
    setCheckedKickState(false);
  };

  /* Slider & Circle Rotate - Function - START */
  const rotateHihatCircle = (value) => {
    setHihatValue(value);
    hihatSliderVal = value;
    for (const i in hihatCircle) {
      const rotationUpdate = hihatCircle[i].initAngle + Number(value);
      hihatCircle[i].angle = rotationUpdate;
    }
    hihatRotation = hihatCircle.map(({ angle }) => angle);
    setUseHihatRotation(hihatRotation);
    calcSoundDelay();
  };

  const rotateSnareCircle = (value) => {
    setSnareValue(value);
    snareSliderVal = value;
    for (const i in snareCircle) {
      const rotationUpdate = snareCircle[i].initAngle + Number(value);
      snareCircle[i].angle = rotationUpdate;
    }
    snareRotation = snareCircle.map(({ angle }) => angle);
    setUseSnareRotation(snareRotation);
    calcSoundDelay();
  };

  const rotateKickCircle = (value) => {
    setKickValue(value);
    kickSliderVal = value;
    for (const i in kickCircle) {
      const rotationUpdate = kickCircle[i].initAngle + Number(value);
      kickCircle[i].angle = rotationUpdate;
    }
    kickRotation = kickCircle.map(({ angle }) => angle);
    setUseKickRotation(kickRotation);
    calcSoundDelay();
  };
  /* Slider & Circle Rotate - Function - END */

  /* Slider & Circle Rotate Reset - Function */
  const rotateInitReset = () => {
    setHihatValue(0);
    setSnareValue(0);
    setKickValue(0);
    hihatSliderVal = 0;
    snareSliderVal = 0;
    kickSliderVal = 0;
    Object.keys(hihatCircle).forEach((i) => (hihatCircle[i].angle = hihatCircle[i].initAngle));
    Object.keys(snareCircle).forEach((i) => (snareCircle[i].angle = snareCircle[i].initAngle));
    Object.keys(kickCircle).forEach((i) => (kickCircle[i].angle = kickCircle[i].initAngle));
    hihatRotation = hihatCircle.map(({ initAngle }) => initAngle);
    snareRotation = snareCircle.map(({ initAngle }) => initAngle);
    kickRotation = kickCircle.map(({ initAngle }) => initAngle);
    setUseHihatRotation(hihatRotation);
    setUseSnareRotation(snareRotation);
    setUseKickRotation(kickRotation);
  };

  /* Check for Saved Presets - Function */
  async function checkIfPreset() {
    if ((await AsyncStorage.getItem('preset1Config')) !== null) {
      setBeat1(true);
    }
    if ((await AsyncStorage.getItem('preset2Config')) !== null) {
      setBeat2(true);
    }
    if ((await AsyncStorage.getItem('preset3Config')) !== null) {
      setBeat3(true);
    }
  }

  /* Load Preset - Function */
  const loadPreset = async (value) => {
    let findBeat = false;
    for (const i in hihatCircle) {
      if (
        hihatCircle[i].checked == true ||
        snareCircle[i].checked == true ||
        kickCircle[i].checked == true
      ) {
        findBeat = true;
        break;
      }
    }
    if (value == 1 && beat1 == true) {
      preset1Config = JSON.parse(await AsyncStorage.getItem('preset1Config'));
      useBPM = Number(preset1Config[0].bpm);
      useTimeSig = preset1Config[0].timeSig.toString();

      hihatCircle = JSON.parse(await AsyncStorage.getItem('preset1Hihat'));
      snareCircle = JSON.parse(await AsyncStorage.getItem('preset1Snare'));
      kickCircle = JSON.parse(await AsyncStorage.getItem('preset1Kick'));

      changeTimeSig();

      setCheckedHihatState(hihatStates);
      setCheckedSnareState(snareStates);
      setCheckedKickState(kickStates);

      setVisibleHihat(visibleState1);
      setVisibleSnare(visibleState2);
      setVisibleKick(visibleState3);

      rotateHihatCircle(preset1Config[0].hihatSlider);
      rotateSnareCircle(preset1Config[0].snareSlider);
      rotateKickCircle(preset1Config[0].kickSlider);

      setAlertShow(false);
    } else if (value == 2 && beat2 == true) {
      preset2Config = JSON.parse(await AsyncStorage.getItem('preset2Config'));
      useBPM = Number(preset2Config[0].bpm);
      useTimeSig = preset2Config[0].timeSig.toString();

      hihatCircle = JSON.parse(await AsyncStorage.getItem('preset2Hihat'));
      snareCircle = JSON.parse(await AsyncStorage.getItem('preset2Snare'));
      kickCircle = JSON.parse(await AsyncStorage.getItem('preset2Kick'));

      changeTimeSig();

      setCheckedHihatState(hihatStates);
      setCheckedSnareState(snareStates);
      setCheckedKickState(kickStates);

      setVisibleHihat(visibleState1);
      setVisibleSnare(visibleState2);
      setVisibleKick(visibleState3);

      rotateHihatCircle(preset2Config[0].hihatSlider);
      rotateSnareCircle(preset2Config[0].snareSlider);
      rotateKickCircle(preset2Config[0].kickSlider);

      setAlertShow(false);
    } else if (value == 3 && beat3 == true) {
      preset3Config = JSON.parse(await AsyncStorage.getItem('preset3Config'));
      useBPM = Number(preset3Config[0].bpm);
      useTimeSig = preset3Config[0].timeSig.toString();

      hihatCircle = JSON.parse(await AsyncStorage.getItem('preset3Hihat'));
      snareCircle = JSON.parse(await AsyncStorage.getItem('preset3Snare'));
      kickCircle = JSON.parse(await AsyncStorage.getItem('preset3Kick'));

      changeTimeSig();

      setCheckedHihatState(hihatStates);
      setCheckedSnareState(snareStates);
      setCheckedKickState(kickStates);

      setVisibleHihat(visibleState1);
      setVisibleSnare(visibleState2);
      setVisibleKick(visibleState3);

      rotateHihatCircle(preset3Config[0].hihatSlider);
      rotateSnareCircle(preset3Config[0].snareSlider);
      rotateKickCircle(preset3Config[0].kickSlider);

      setAlertShow(false);
    } else if (findBeat == true) {
      writePreset(value);
    } else {
      alertDelay();
    }
  };

  /* Save Preset - Function */
  const writePreset = async (value) => {
    if (value == 1) {
      const obj = {};
      obj.beat = true;
      obj.bpm = useBPM;
      obj.timeSig = useTimeSig;
      obj.hihatSlider = Number(hihatSliderVal);
      obj.snareSlider = Number(snareSliderVal);
      obj.kickSlider = Number(kickSliderVal);
      preset1Config.push(obj);

      await AsyncStorage.setItem('preset1Config', JSON.stringify(preset1Config));
      await AsyncStorage.setItem('preset1Hihat', JSON.stringify(hihatCircle));
      await AsyncStorage.setItem('preset1Snare', JSON.stringify(snareCircle));
      await AsyncStorage.setItem('preset1Kick', JSON.stringify(kickCircle));

      setBeat1(true);
    } else if (value == 2) {
      const obj = {};
      obj.beat = true;
      obj.bpm = useBPM;
      obj.timeSig = useTimeSig;
      obj.hihatSlider = Number(hihatSliderVal);
      obj.snareSlider = Number(snareSliderVal);
      obj.kickSlider = Number(kickSliderVal);
      preset2Config.push(obj);

      await AsyncStorage.setItem('preset2Config', JSON.stringify(preset2Config));
      await AsyncStorage.setItem('preset2Hihat', JSON.stringify(hihatCircle));
      await AsyncStorage.setItem('preset2Snare', JSON.stringify(snareCircle));
      await AsyncStorage.setItem('preset2Kick', JSON.stringify(kickCircle));
      setBeat2(true);
    } else if (value == 3) {
      const obj = {};
      obj.beat = true;
      obj.bpm = useBPM;
      obj.timeSig = useTimeSig;
      obj.hihatSlider = Number(hihatSliderVal);
      obj.snareSlider = Number(snareSliderVal);
      obj.kickSlider = Number(kickSliderVal);
      preset3Config.push(obj);

      await AsyncStorage.setItem('preset3Config', JSON.stringify(preset3Config));
      await AsyncStorage.setItem('preset3Hihat', JSON.stringify(hihatCircle));
      await AsyncStorage.setItem('preset3Snare', JSON.stringify(snareCircle));
      await AsyncStorage.setItem('preset3Kick', JSON.stringify(kickCircle));
      setBeat3(true);
    }
  };

  /* Open Preset Modal for Delete - Function */
  const openPresetModul = (value) => {
    if (beat1 || beat2 || beat3) {
      selectedPresetModul = value;
      setPresetModul(true);
    }
  };

  /* Delete Preset - Function */
  const clearPreset = async () => {
    if (selectedPresetModul == 1) {
      preset1Config = [];
      await AsyncStorage.removeItem('preset1Config');
      await AsyncStorage.removeItem('preset1Hihat');
      await AsyncStorage.removeItem('preset1Snare');
      await AsyncStorage.removeItem('preset1Kick');
      setBeat1(false);
    } else if (selectedPresetModul == 2) {
      preset2Config = [];
      await AsyncStorage.removeItem('preset2Config');
      await AsyncStorage.removeItem('preset2Hihat');
      await AsyncStorage.removeItem('preset2Snare');
      await AsyncStorage.removeItem('preset2Kick');
      setBeat2(false);
    } else if (selectedPresetModul == 3) {
      preset3Config = [];
      await AsyncStorage.removeItem('preset3Config');
      await AsyncStorage.removeItem('preset3Hihat');
      await AsyncStorage.removeItem('preset3Snare');
      await AsyncStorage.removeItem('preset3Kick');
      setBeat3(false);
    }
    setPresetModul(false);
  };

  /* Start Playback - Function */
  const start = () => {
    let findBeat = false;
    for (const i in hihatCircle) {
      if (
        hihatCircle[i].checked == true ||
        snareCircle[i].checked == true ||
        kickCircle[i].checked == true
      ) {
        findBeat = true;
        break;
      }
    }
    if (findBeat == true) {
      isPlaying = true;
      setPlay(isPlaying);
      startBeat();
      playSoundLib();
      beatCycle = setInterval(playSoundLib, bpmInterval);
    } else {
      alertDelay();
    }
  };

  /* Stop Playback - Function */
  const pause = () => {
    isPlaying = false;
    setPlay(isPlaying);
    stopBeat();
    for (const i in hihatCircle) {
      clearTimeout(hihatCircle[i].soundDelayKey);
      clearTimeout(snareCircle[i].soundDelayKey);
      clearTimeout(kickCircle[i].soundDelayKey);
    }
    clearInterval(beatCycle);

    let findBeat = false;
    for (const i in hihatCircle) {
      if (
        hihatCircle[i].checked == true ||
        snareCircle[i].checked == true ||
        kickCircle[i].checked == true
      ) {
        findBeat = true;
        break;
      }
    }
  };

  /* Clear All Checkboxes - Function */
  const clearBeat = () => {
    checkboxInitReset();
    for (const i in hihatCircle) {
      clearTimeout(hihatCircle[i].soundDelayKey);
      clearTimeout(snareCircle[i].soundDelayKey);
      clearTimeout(kickCircle[i].soundDelayKey);
    }
  };

  /* Reset Everything - Function */
  const resetAll = () => {
    pause();
    useBPM = 100;
    useTimeSig = 'Free';
    selectedSoundNameSaved = 'Acoustic';
    selectedSoundIndexSaved = 0;
    changeTimeSig();
    checkboxInitReset();
    rotateInitReset();
    reloadSoundLib();
    calcSoundDelay();

    setVisibleHihat(visibleState1);
    setVisibleSnare(visibleState2);
    setVisibleKick(visibleState3);
  };

  /* Recording Functions - START */
  /*
  const startRec = async () => {
    let findBeat = false;
    for (let i in hihatCircle) {
      if (
        hihatCircle[i].checked == true ||
        snareCircle[i].checked == true ||
        kickCircle[i].checked == true
      ) {
        findBeat = true;
        break;
      }
    }

    let status = (await Audio.getPermissionsAsync()).granted;
    if (status == true && isPlaying == false && findBeat == true) {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: false,
          playThroughEarpieceAndroid: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          interruptionModeAndroid:
            Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        });

        await recording.prepareToRecordAsync(RecordingOptions);
        await recording.startAsync();

        start();

        isRecording = true;
        setRecordingStatus(isRecording);
      } catch (err) {
        console.error(err);
      }
    } else if (status == true && isPlaying == true && findBeat == true) {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: false,
          playThroughEarpieceAndroid: true,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          interruptionModeAndroid:
            Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        });

        await recording.prepareToRecordAsync(RecordingOptions);
        await recording.startAsync();

        isRecording = true;
        setRecordingStatus(isRecording);
      } catch (err) {
        console.error(err);
      }
    } else if (status == true && isPlaying == false && findBeat == false) {
      alertDelay();
    } else {
      await Audio.requestPermissionsAsync();
    }
  };

  const stopRec = async () => {
    pause();

    await recording.stopAndUnloadAsync();
    setRecording(new Audio.Recording());
    const uri = recording.getURI();

    console.log(uri);
    // Current Save Folder URL: /Users/dariodumlijan/Library/Developer/CoreSimulator/Devices/B54A7218-4990-45B7-925F-BC578F42FB29/data/Containers/Data/Application/13C70B38-FE6B-4F46-A0C0-CC95AE195051/Library/Caches/ExponentExperienceData/%40ddario%2FRitmo

    isRecording = false;
    setRecordingStatus(isRecording);
  };
  */
  /* Recording Functions - END */

  return (
    <View style={styles.screenWrapper}>
      <View style={styles.topWrapper}>
        <View style={styles.navigation}>
          <Logo style={styles.logo} fill={colors.gray} />
          <TouchableOpacity activeOpacity={0.8} onPress={navOpen}>
            <Menu style={styles.menu} />
          </TouchableOpacity>
        </View>
        <View style={styles.circleWrapper}>
          <Animated.View
            style={[
              styles.beatline,
              {
                transform: [{ rotate: rotateBeat }, { translateY: -hihatRadius / 2 }],
              },
            ]}
          />

          <View style={[styles.hihatCircle]} onLayout={getHihatDimentions} />

          <View style={[styles.snareCircle]} onLayout={getSnareDimentions} />

          <View style={[styles.kickCircle]} onLayout={getKickDimentions} />

          {hihatCircle.map((checkBox, index) =>
            visibleHihat[index] ? (
              <TouchableOpacity
                key={checkBox.timeSig + '_' + index}
                activeOpacity={1}
                style={[
                  styles.checkBox,
                  {
                    transform: [
                      {
                        rotate: useHihatRotation[index] + 'deg',
                      },
                      {
                        translateY: -hihatRadius,
                      },
                    ],
                  },
                ]}
                onPress={() => toggleCheckbox(checkBox.soundName, index)}
              >
                <View style={!checkedHihatState[index] ? styles.unchecked : styles.checkedHihat} />
              </TouchableOpacity>
            ) : null
          )}

          {snareCircle.map((checkBox, index) =>
            visibleSnare[index] ? (
              <TouchableOpacity
                key={checkBox.timeSig + '_' + index}
                activeOpacity={1}
                style={[
                  styles.checkBox,
                  {
                    transform: [
                      {
                        rotate: useSnareRotation[index] + 'deg',
                      },
                      {
                        translateY: -snareRadius,
                      },
                    ],
                  },
                ]}
                onPress={() => toggleCheckbox(checkBox.soundName, index)}
              >
                <View style={!checkedSnareState[index] ? styles.unchecked : styles.checkedSnare} />
              </TouchableOpacity>
            ) : null
          )}

          {kickCircle.map((checkBox, index) =>
            visibleKick[index] ? (
              <TouchableOpacity
                key={checkBox.timeSig + '_' + index}
                activeOpacity={1}
                style={[
                  styles.checkBox,
                  {
                    transform: [
                      {
                        rotate: useKickRotation[index] + 'deg',
                      },
                      {
                        translateY: -kickRadius,
                      },
                    ],
                  },
                ]}
                onPress={() => toggleCheckbox(checkBox.soundName, index)}
              >
                <View style={!checkedKickState[index] ? styles.unchecked : styles.checkedKick} />
              </TouchableOpacity>
            ) : null
          )}

          {!play ? (
            <TouchableHighlight
              style={[styles.circleBtnWrapper]}
              underlayColor={colors.primaryDark}
              onPress={start}
            >
              <Play style={styles.circleBtn} />
            </TouchableHighlight>
          ) : (
            <TouchableHighlight
              style={[styles.circleBtnAnimatedWrapper]}
              underlayColor={colors.primaryDark}
              onPress={() => {
                pause();
                askForReview();
              }}
            >
              <Animated.View
                style={[
                  styles.circleBtnAnimated,
                  {
                    transform: [{ scale: pulseBtn }],
                  },
                ]}
              >
                <Pause style={styles.circleBtn} />
              </Animated.View>
            </TouchableHighlight>
          )}
        </View>
      </View>
      <View style={styles.bottomWrapper}>
        <View style={styles.presetWrapper}>
          <TouchableHighlight
            underlayColor={colors.grayBlue}
            style={beat1 ? styles.presetBtn : styles.presetBtnEmpty}
            onPress={() => loadPreset(1)}
            onLongPress={() => openPresetModul(1)}
          >
            <Text style={styles.presetText}>Beat 1</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={colors.grayBlue}
            style={beat2 ? styles.presetBtn : styles.presetBtnEmpty}
            onPress={() => loadPreset(2)}
            onLongPress={() => openPresetModul(2)}
          >
            <Text style={styles.presetText}>Beat 2</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={colors.grayBlue}
            style={beat3 ? styles.presetBtn : styles.presetBtnEmpty}
            onPress={() => loadPreset(3)}
            onLongPress={() => openPresetModul(3)}
          >
            <Text style={styles.presetText}>Beat 3</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.sliderWrapper}>
          <Slider
            value={hihatValue}
            minimumValue={sliderMin}
            maximumValue={sliderMax}
            step={sliderStep}
            minimumTrackTintColor={colors.grayLight}
            maximumTrackTintColor={colors.grayLight}
            containerStyle={styles.sliderContainer}
            trackStyle={styles.sliderTrack}
            renderThumbComponent={CustomThumbHihat}
            thumbTouchSize={{ width: 65, height: 25 }}
            onValueChange={(hihatValue) => rotateHihatCircle(hihatValue)}
          />

          <Slider
            value={snareValue}
            minimumValue={sliderMin}
            maximumValue={sliderMax}
            step={sliderStep}
            minimumTrackTintColor={colors.grayLight}
            maximumTrackTintColor={colors.grayLight}
            containerStyle={styles.sliderContainer}
            trackStyle={styles.sliderTrack}
            renderThumbComponent={CustomThumbSnare}
            thumbTouchSize={{ width: 65, height: 25 }}
            onValueChange={(snareValue) => rotateSnareCircle(snareValue)}
          />
          <Slider
            value={kickValue}
            minimumValue={sliderMin}
            maximumValue={sliderMax}
            step={sliderStep}
            minimumTrackTintColor={colors.grayLight}
            maximumTrackTintColor={colors.grayLight}
            containerStyle={styles.sliderContainer}
            trackStyle={styles.sliderTrack}
            renderThumbComponent={CustomThumbKick}
            thumbTouchSize={{ width: 65, height: 25 }}
            onValueChange={(kickValue) => rotateKickCircle(kickValue)}
          />
        </View>
        <View style={styles.btnWrapper}>
          <TouchableHighlight
            underlayColor={colors.grayBlue}
            style={styles.btnPrimary}
            onPress={clearBeat}
          >
            <Text style={styles.btnPrimaryText}>Clear beat</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={colors.grayBlue}
            style={styles.btnPrimary}
            onPress={resetAll}
          >
            <Text style={styles.btnPrimaryText}>Reset all</Text>
          </TouchableHighlight>

          {/*
				<TouchableHighlight
					underlayColor={colors.grayBlue}
					style={styles.btnRec}
					onPress={!recordingStatus ? startRec : stopRec}
				>
					<View
						style={
							!recordingStatus ? styles.recStart : styles.recStop
						}
					/>
				</TouchableHighlight>
			*/}
        </View>
      </View>
      <View style={styles.adSpace} />

      {alertShow ? (
        <Animated.View style={[styles.alertWrapper, { opacity: fadeAlert }]}>
          <Text style={styles.alertText}>Tap on a circle to add a beat.</Text>
        </Animated.View>
      ) : null}

      <Modal animationType="fade" transparent visible={presetModul}>
        <View style={styles.modalView}>
          <Text style={styles.modalExp}>Are you sure you want to clear the saved beat?</Text>
          <View style={styles.modalBtnCont}>
            <TouchableOpacity activeOpacity={0.8} style={styles.modalBtn} onPress={clearPreset}>
              <Text style={styles.modalBtnTxt}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.modalBtn}
              onPress={() => setPresetModul(false)}
            >
              <Text style={styles.modalBtnTxt}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
});

/* Final Screen */
function Home() {
  /* Component States */
  const windowHeight = useWindowDimensions().height;
  const [ads, setAds] = useState(false);
  const [midiName, setMidiName] = useState('');
  const [midiModal, setMidiModal] = useState(false);
  const [mainOpen, setMainOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [recordingsOpen, setRecordingsOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [rewardedOpen, setRewardedOpen] = useState(false);

  /* Screen Transition Animations - START */
  const opacityMain = useState(new Animated.Value(0))[0];
  const opacityMenu = useState(new Animated.Value(0))[0];
  const opacityGuide = useState(new Animated.Value(0))[0];
  const opacityRewarded = useState(new Animated.Value(0))[0];

  /* onLoad */
  useEffect(() => {
    initFadeIn();
    setTimeout(askForPermission, 1000);
  }, []);

  function initFadeIn() {
    Animated.timing(opacityMain, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
    opacityMenu.setValue(1);
  }

  function fadeGuideIn() {
    Animated.timing(opacityMain, {
      toValue: 0,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      setMainOpen(false);
      setGuideOpen(true);
      Animated.timing(opacityGuide, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }, 500);
  }

  function fadeGuideOut() {
    Animated.timing(opacityGuide, {
      toValue: 0,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      setGuideOpen(false);
      setMainOpen(true);
      opacityMenu.setValue(1);
      Animated.timing(opacityMain, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }, 500);
  }

  function fadeRewardedIn() {
    opacityMain.setValue(0);
    Animated.timing(opacityMenu, {
      toValue: 0,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      setMainOpen(false);
      setRewardedOpen(true);
      Animated.timing(opacityRewarded, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }, 500);
  }

  function fadeRewardedOut() {
    Animated.timing(opacityRewarded, {
      toValue: 0,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      setRewardedOpen(false);
      setMainOpen(true);

      Animated.parallel([
        Animated.timing(slideInMenu, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.timing(opacityMenu, {
          toValue: 1,
          duration: 10000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(opacityMain, {
          toValue: 1,
          delay: 500,
          duration: 0,
          useNativeDriver: true,
        }),
      ]).start();
    }, 500);
  }
  /* Screen Transition Animations - END */

  /* Refs */
  const refMain = useRef(null);
  const refMenu = useRef(null);

  /* Navigation - Animation */
  const slideInNavY = useState(new Animated.Value(-deviceWidth * 1.3))[0];
  const slideInNavX = useState(new Animated.Value(deviceWidth))[0];
  const fadeNav = useState(new Animated.Value(0))[0];
  const displayNav = useState(new Animated.Value(0))[0];
  const zNav = useState(new Animated.Value(-1))[0];

  function slideNavEffect() {
    let slideYVal = -deviceWidth * 1.3;
    let slideXVal = deviceWidth;
    let displayDelay = 500;
    let heightVal = 0;
    let opacityVal = 0;
    let zVal = -1;
    if (navCheck == true) {
      slideYVal = !isTablet ? -deviceWidth : -deviceWidth / 2;
      slideXVal = !isTablet ? 0 - (deviceWidth / 100) * 5 : (deviceWidth / 100) * 45;
      displayDelay = 0;
      heightVal = deviceHeight + (deviceWidth / 100) * 10;
      opacityVal = 0.5;
      zVal = 1;
    }
    Animated.parallel([
      Animated.timing(slideInNavY, {
        toValue: slideYVal,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.elastic(1),
      }),
      Animated.timing(slideInNavX, {
        toValue: slideXVal,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.elastic(1),
      }),
      Animated.timing(displayNav, {
        toValue: heightVal,
        delay: displayDelay,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(zNav, {
        toValue: zVal,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(fadeNav, {
        toValue: opacityVal,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ]).start();
  }

  const moveNav = {
    width: !isTablet ? deviceWidth * 2 : deviceWidth,
    aspectRatio: 1 / 1,
    borderRadius: !isTablet ? (deviceWidth * 2) / 2 : deviceWidth / 2,
    transform: [{ translateY: slideInNavY }, { translateX: slideInNavX }],
  };

  /* Navigation No Beat - Alert Animation */
  const opacityTag = useState(new Animated.Value(1))[0];
  const opacityAlert = useState(new Animated.Value(0))[0];

  function fadeNavAlert() {
    Animated.sequence([
      Animated.timing(opacityTag, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(opacityAlert, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ]).start();
    Animated.sequence([
      Animated.delay(4000),
      Animated.timing(opacityAlert, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(opacityTag, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ]).start();
  }

  /* Settings Screen - Slide Animation */
  const slideInMenu = useState(new Animated.Value(useWidth))[0];

  function slideMenuEffect() {
    let slideVal = 0;
    if (menuOpen) {
      slideVal = useWidth;
    }
    Animated.timing(slideInMenu, {
      toValue: slideVal,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  }

  /* Pause playback from Menu Screen */
  const pauseFromMenu = () => {
    refMain.current.pause();
  };

  /* Update timeSig at Rhythm Screen from Menu Screen */
  const updateMainState = () => {
    refMain.current.timeSigUpdate();
  };

  /* Open & Close - Navigation */
  const openNav = (value) => {
    navCheck = value;
    slideNavEffect();
  };

  /* Call Open Settings & Close Nav  */
  const openMenuCall = () => {
    openNav(false);
    openMenu(true);
  };

  /* Open & Close - Settings Screen */
  const openMenu = (value) => {
    setMenuOpen(value);
    menuCheck = value;
    refMenu.current.rotateEffect();
    refMenu.current.updateMenuState();
    slideMenuEffect();
  };

  /* Open & Close - Rewarded Screen */
  const openRewarded = (value) => {
    if (value == false) {
      fadeRewardedOut();
    } else {
      fadeRewardedIn();
    }
  };

  /* Open & Close - Library Screen */
  const openLibrary = (value) => {
    if (value == false) {
      setRecordingsOpen(value);
      setMainOpen(!value);
    } else {
      openNav(false);
      pauseFromMenu();

      setMainOpen(!value);
      setRecordingsOpen(value);
    }
  };

  /* Open & Close - Guide Screen */
  const openGuide = (value) => {
    if (value == false) {
      fadeGuideOut();
    } else {
      openNav(false);
      pauseFromMenu();

      fadeGuideIn();
    }
  };

  /* Open midi Modal */
  const openMidiModal = () => {
    let findBeat = false;
    for (const i in hihatCircle) {
      if (
        hihatCircle[i].checked == true ||
        snareCircle[i].checked == true ||
        kickCircle[i].checked == true
      ) {
        findBeat = true;
        break;
      }
    }
    if (findBeat == true) {
      openNav(false);
      setMidiModal(true);
    } else {
      fadeNavAlert();
    }
  };

  /* Close midi Modal */
  const exitMidiModal = (bool) => {
    Keyboard.dismiss();
    setMidiModal(false);
    setMidiName('');
    if (bool === true) {
      RNFS.unlink(fileUri);
    }
  };

  /* Custom Name midi file */
  const nameMidiFile = (value) => {
    setMidiName(value.toString());
  };

  /* Midi Modal on Save */
  const saveMIDI = (value) => {
    Keyboard.dismiss();
    if (value == undefined || value == null || value == '') {
      exportMIDI(fileName);
    } else {
      exportMIDI(value);
    }
  };

  /* Write midi file and Share */
  const exportMIDI = async (value) => {
    /* Get position of all notes for each sound */
    const hihatMIDI = [];
    const snareMIDI = [];
    const kickMIDI = [];
    for (const i in hihatCircle) {
      if (hihatCircle[i].checked == true) {
        hihatMIDI.push(hihatCircle[i].angle);
      }
    }
    for (const i in snareCircle) {
      if (snareCircle[i].checked == true) {
        snareMIDI.push(snareCircle[i].angle);
      }
    }
    for (const i in kickCircle) {
      if (kickCircle[i].checked == true) {
        kickMIDI.push(kickCircle[i].angle);
      }
    }

    /* Create midi note layout from beat configuration */
    let countAngle = 0;
    const notesLayout = [];
    for (let i = 0; i < stepsInBar; i++) {
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

      const newCount = countAngle + sliderStep;
      countAngle = newCount;
    }
    const shiftLayout = notesLayout.slice();

    /* Calc note start point */
    let countStart = 0;
    let prevStart = 0;
    const startTicks = [];
    for (let i = 0; i < shiftLayout.length; i++) {
      if (shiftLayout[0] !== 'R') {
        const calcTicks = countStart * midiNoteMin + prevStart;
        startTicks.push(calcTicks);
        prevStart = calcTicks;
        countStart = 0;
      } else {
        countStart++;
      }
      shiftLayout.push(shiftLayout.shift());
    }

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
    for (let i = 0; i < midiLayout.length; i++) {
      if (midiLayout[i] === 'KSH') {
        notesMIDI.push(
          new MidiWriter.NoteEvent({
            pitch: ['C2', 'D2', 'F#2'],
            duration: notesTicks[i],
            startTick: startTicks[i],
          })
        );
      } else if (midiLayout[i] === 'KS') {
        notesMIDI.push(
          new MidiWriter.NoteEvent({
            pitch: ['C2', 'D2'],
            duration: notesTicks[i],
            startTick: startTicks[i],
          })
        );
      } else if (midiLayout[i] === 'KH') {
        notesMIDI.push(
          new MidiWriter.NoteEvent({
            pitch: ['C2', 'F#2'],
            duration: notesTicks[i],
            startTick: startTicks[i],
          })
        );
      } else if (midiLayout[i] === 'SH') {
        notesMIDI.push(
          new MidiWriter.NoteEvent({
            pitch: ['D2', 'F#2'],
            duration: notesTicks[i],
            startTick: startTicks[i],
          })
        );
      } else if (midiLayout[i] === 'K') {
        notesMIDI.push(
          new MidiWriter.NoteEvent({
            pitch: ['C2'],
            duration: notesTicks[i],
            startTick: startTicks[i],
          })
        );
      } else if (midiLayout[i] === 'S') {
        notesMIDI.push(
          new MidiWriter.NoteEvent({
            pitch: ['D2'],
            duration: notesTicks[i],
            startTick: startTicks[i],
          })
        );
      } else if (midiLayout[i] === 'H') {
        notesMIDI.push(
          new MidiWriter.NoteEvent({
            pitch: ['F#2'],
            duration: notesTicks[i],
            startTick: startTicks[i],
          })
        );
      }
    }
    track.addEvent(notesMIDI, (event, index) => ({ sequential: false }));
    track.setTempo(useBPM);
    if (useTimeSig === '4/4') {
      track.setTimeSignature(4, 4);
    } else if (useTimeSig === '3/4') {
      track.setTimeSignature(3, 4);
    }

    /* Write .mid file to app storage */
    const write = new MidiWriter.Writer(track).base64();
    fileUri = RNFS.DocumentDirectoryPath + `/${encodeURI(value)}.midi`;
    RNFS.writeFile(fileUri, write, 'base64');

    /* Start Share */
    const shareOptions = {
      type: 'audio/midi audio/x-midi',
      filename: encodeURI(value),
      url: 'file://' + fileUri,
      failOnCancel: true,
    };
    await Share.open(shareOptions)
      .then(() => {
        /* Close midi modal, reset custom name & delete file from storage */
        exitMidiModal(true);
      })
      .catch(() => {
        /* Close midi modal, reset custom name & delete file from storage */
        exitMidiModal(true);
      });
  };

  return (
    <SafeAreaView style={[styles.container, { minHeight: Math.round(windowHeight) }]}>
      <StatusBar hidden />

      {/* APP BG & RewardedScreen BG */}
      <RewardedBG />

      {/* RhythmScreen BG */}
      {mainOpen ? (
        <Animated.View
          style={[
            {
              position: 'absolute',
              width: '100%',
              height: '100%',
              opacity: opacityMain,
              flex: 1,
            },
          ]}
        >
          <HomeBG />
        </Animated.View>
      ) : null}

      {/* RhythmScreen */}
      {mainOpen ? (
        <Animated.View
          style={[
            {
              opacity: opacityMain,
              flex: 1,
            },
          ]}
        >
          <RhythmScreen navCallback={openNav} ref={refMain} />
        </Animated.View>
      ) : null}

      {/* MenuScreen & MenuScreen BG */}
      {mainOpen ? (
        <Animated.View
          style={[
            {
              position: 'absolute',
              width: '100%',
              height: '100%',
              transform: [{ translateX: slideInMenu }],
              opacity: opacityMenu,
              zIndex: 3,
            },
          ]}
        >
          <MenuBG />
          <MenuScreen
            menuCallback={openMenu}
            rewardedCallback={openRewarded}
            guideCallback={openGuide}
            pauseCallback={pauseFromMenu}
            updateCallback={updateMainState}
            ref={refMenu}
          />
        </Animated.View>
      ) : null}

      {/* GuideScreen BG */}
      {guideOpen ? (
        <Animated.View
          style={[
            {
              position: 'absolute',
              width: '100%',
              height: '100%',
              opacity: opacityGuide,
              flex: 1,
            },
          ]}
        >
          <MenuBG />
        </Animated.View>
      ) : null}

      {/* Navigation BG */}
      {mainOpen ? (
        <Animated.View
          style={[
            styles.navOverlay,
            {
              scaleY: displayNav,
              opacity: fadeNav,
              zIndex: zNav,
            },
          ]}
        />
      ) : null}

      {/* Save MIDI Modal */}
      <Modal animationType="fade" transparent visible={midiModal}>
        <View style={styles.modalView}>
          <Text style={styles.modalTxt}>MIDI file name:</Text>
          <TextInput
            style={styles.inputMidi}
            onChangeText={(midiName) => nameMidiFile(midiName)}
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
              <Text style={styles.modalBtnTxt}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalBtn} activeOpacity={0.8} onPress={exitMidiModal}>
              <Text style={styles.modalBtnTxt}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default Home;
