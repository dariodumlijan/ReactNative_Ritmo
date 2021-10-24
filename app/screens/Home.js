/* eslint-disable */
import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  Modal,
  Animated,
  Easing,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  Dimensions,
  useWindowDimensions,
  Image,
  AppState,
} from 'react-native';
import ImmersiveMode from 'react-native-immersive-mode';

/* Other - Modules */
import DeviceInfo from 'react-native-device-info';
import { Svg, Path } from 'react-native-svg';
import { Slider } from '@miblanchard/react-native-slider';

/* Audio & Midi - Modules */
import Sound from 'react-native-sound';
import * as MidiWriter from 'midi-writer-js';

/* Save - Modules */
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Share from 'react-native-share';

/* Admob & Review - Modules 
import {
  BannerAd,
  RewardedAd,
  // requestPermissionsAsync,
  // getPermissionsAsync,
} from '@react-native-firebase/admob';
*/
import admob from '../tokens';
import InAppReview from 'react-native-in-app-review';

/* Style & Color */
import colors from '../stylesheets/colors';
import styles from '../stylesheets/styles';

/* Backgrounds */
import HomeBG from './HomeBG';
import MenuBG from './MenuBG';
import RewardedBG from './RewardedBG';

/* IMG's */
import MidiFile from '../assets/img/midiFile.png';
import MidiFileLogic from '../assets/img/midiFile_Logic.png';

/* SVG's */
import Logo from '../assets/icons/Logo';
import Menu from '../assets/icons/Menu';
import Settings from '../assets/icons/Settings';
// import Recordings from '../assets/icons/Recordings';
import Guide from '../assets/icons/Guide';
import Export from '../assets/icons/Export';
import Close from '../assets/icons/Close';
import Exit from '../assets/icons/Exit';
import Arrow from '../assets/icons/Arrow';
import Play from '../assets/icons/Play';
import Pause from '../assets/icons/Pause';

/* General Configurations */
const sliderMin = 0;
const sliderMax = 90;
const sliderStep = 5;
const stepsInBar = 360 / sliderStep;
const midiNoteMin = 8;
const midiNoteMax = 64;
const midiBarTicks = 512;
const countdownHours = 24;
const refreshHours = 5;
const reviewMinutes = 2;
const reviewWait = new Date().getTime() + reviewMinutes * 6e4;

/* Device specific variables */
const isTablet = DeviceInfo.isTablet();
const deviceHeight = Dimensions.get('screen').height;
const deviceWidth = Dimensions.get('screen').width;
const useWidth = deviceWidth + deviceWidth * 0.06;

/* Ads Configuration */
let personalisedAds = false;
const emulator = DeviceInfo.isEmulator();
// console.log(emulator);
const admob_ios = {
  banner: emulator ? admob.banner.ios : admob.banner.ios_test,
  rewarded: emulator ? admob.rewarded.ios : admob.rewarded.ios_test,
};
const admob_android = {
  banner: emulator ? admob.banner.android : admob.banner.android_test,
  rewarded: emulator ? admob.rewarded.android : admob.rewarded.android_test,
};

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
let isRecording = false;
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
let soundList = [
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
let fileName = 'Ritmo_MIDI';
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
let timerUpdate = {
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

  let ms = value % 1000;
  value = (value - ms) / 1000;
  let secs = value % 60;
  value = (value - secs) / 60;
  let mins = value % 60;
  let hrs = (value - mins) / 60;

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
  let bpmAdjust = (60 / useBPM) * 4;
  let delayDegree = (1000 * bpmAdjust) / 360;

  for (let i in hihatCircle) {
    let delaySound,
      calcDelay = delayDegree * hihatSliderVal,
      beatDelay = delayDegree * hihatCircle[i].initAngle + calcDelay;
    (delaySound =
      beatDelay > bpmInterval ? beatDelay - bpmInterval : beatDelay),
      (hihatCircle[i].soundDelay = delaySound);
    hihatCircle[i].soundDelayKey = delaySound + '_timeout';
  }

  for (let i in snareCircle) {
    let delaySound,
      calcDelay = delayDegree * snareSliderVal,
      beatDelay = delayDegree * snareCircle[i].initAngle + calcDelay;
    (delaySound =
      beatDelay > bpmInterval ? beatDelay - bpmInterval : beatDelay),
      (snareCircle[i].soundDelay = delaySound);
    snareCircle[i].soundDelayKey = delaySound + '_timeout';
  }

  for (let i in kickCircle) {
    let delaySound,
      calcDelay = delayDegree * kickSliderVal,
      beatDelay = delayDegree * kickCircle[i].initAngle + calcDelay;
    (delaySound =
      beatDelay > bpmInterval ? beatDelay - bpmInterval : beatDelay),
      (kickCircle[i].soundDelay = delaySound);
    kickCircle[i].soundDelayKey = delaySound + '_timeout';
  }
}

/* Start Playback - Function */
function playSoundLib() {
  for (let i in hihatCircle) {
    if (hihatCircle[i].checked === true) {
      hihatCircle[i].soundDelayKey = setTimeout(async function () {
        const hihatMP3 = new Sound(hihatPath, Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            console.log(hihatPath + 'Failed', error);
            return;
          }
          hihatMP3.setVolume(0.8);
          /* Play the sound with an onEnd callback */
          hihatMP3.play((success) => {
            if (success) {
              hihatMP3.release();
            } else {
              console.log('Playback Fail');
            }
          });
        });
      }, hihatCircle[i].soundDelay);
    }
  }

  for (let i in snareCircle) {
    if (snareCircle[i].checked === true) {
      snareCircle[i].soundDelayKey = setTimeout(async function () {
        const snareMP3 = new Sound(snarePath, Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            console.log(snarePath + 'Failed', error);
            return;
          }
          snareMP3.setVolume(0.8);
          /* Play the sound with an onEnd callback */
          snareMP3.play((success) => {
            if (success) {
              snareMP3.release();
            } else {
              console.log('Playback Fail');
            }
          });
        });
      }, snareCircle[i].soundDelay);
    }
  }

  for (let i in kickCircle) {
    if (kickCircle[i].checked === true) {
      kickCircle[i].soundDelayKey = setTimeout(async function () {
        const kickMP3 = new Sound(kickPath, Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            console.log(kickPath + 'Failed', error);
            return;
          }
          kickMP3.setVolume(0.8);
          /* Play the sound with an onEnd callback */
          kickMP3.play((success) => {
            if (success) {
              kickMP3.release();
            } else {
              console.log('Playback Fail');
            }
          });
        });
      }, kickCircle[i].soundDelay);
    }
  }
}

/* Change TimeSig - Function */
function changeTimeSig() {
  for (let i in hihatCircle) {
    if (
      hihatCircle[i].timeSig !== useTimeSig &&
      hihatCircle[i].timeSig !== 'Free'
    ) {
      hihatCircle[i].visible = false;
    } else {
      hihatCircle[i].visible = true;
    }
  }

  for (let i in snareCircle) {
    if (
      snareCircle[i].timeSig !== useTimeSig &&
      snareCircle[i].timeSig !== 'Free'
    ) {
      snareCircle[i].visible = false;
    } else {
      snareCircle[i].visible = true;
    }
  }

  for (let i in kickCircle) {
    if (
      kickCircle[i].timeSig !== useTimeSig &&
      kickCircle[i].timeSig !== 'Free'
    ) {
      kickCircle[i].visible = false;
    } else {
      kickCircle[i].visible = true;
    }
  }

  if (useTimeSig == 'Free') {
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

  for (let i in visibleState1) {
    if (visibleState1[i] == false) {
      hihatCircle[i].checked = false;
    }
    hihatStates.push(hihatCircle[i].checked);
  }
  for (let i in visibleState2) {
    if (visibleState2[i] == false) {
      snareCircle[i].checked = false;
    }
    snareStates.push(snareCircle[i].checked);
  }
  for (let i in visibleState3) {
    if (visibleState3[i] == false) {
      kickCircle[i].checked = false;
    }
    kickStates.push(kickCircle[i].checked);
  }

  if (useTimeSig == '3/4') {
    pulseInterval = bpmInterval / 6;
  } else {
    pulseInterval = bpmInterval / 8;
  }
}

/* Current Date - Function */
let date;
function getDate() {
  let today = new Date();
  date =
    today.getFullYear() + '' + (today.getMonth() + 1) + '.' + today.getDate();
}
/* Current Date - Call onLoad */
getDate();

/* Review - Function */
async function askForReview() {
  const available = InAppReview.isAvailable();
  const currentDate = new Date().getTime();

  if ((reviewWait - currentDate) <= 0) {
    const numberDATE = Number(date);

    const timeStamp = await AsyncStorage.getItem('reviewTimeStampSAVE');
    const reviewTimeStamp = Number(timeStamp);

    if (
      reviewTimeStamp <= numberDATE || reviewTimeStamp == 0
    ) {
      await AsyncStorage.removeItem('reviewTimeStampSAVE');

      InAppReview.RequestInAppReview().then(async (hasFlowFinishedSuccessfully) => {
        if (hasFlowFinishedSuccessfully) {
          /* 0.1 = 1day, 1 = 1month */
          await AsyncStorage.setItem(
            'reviewTimeStampSAVE',
            JSON.stringify(numberDATE + 1),
          );
        }
      })
    }
  }
}

/* Custom Slider Thumbs - START */
const CustomThumbHihat = () => (
  <View style={[styles.sliderThumb, { backgroundColor: colors.orange }]}>
    <Text style={styles.sliderThumbText}>Hi-Hat</Text>
  </View>
);

const CustomThumbSnare = () => (
  <View style={[styles.sliderThumb, { backgroundColor: colors.green }]}>
    <Text style={styles.sliderThumbText}>Snare</Text>
  </View>
);

const CustomThumbKick = () => (
  <View style={[styles.sliderThumb, { backgroundColor: colors.cyan }]}>
    <Text style={styles.sliderThumbText}>Kick</Text>
  </View>
);
/* Custom Slider Thumbs - END */

/* Dismiss Keyboard Component */
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

/* Guide Screen */
export const GuideScreen = ({ guideCallback }) => {
  const [beat1, setBeat1] = useState(false);
  const [beat2, setBeat2] = useState(true);
  return (
    <View style={styles.guideWrapper}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.exit}
        onPress={() => guideCallback(false)}>
        <Svg height="100%" width="100%" viewBox="0 0 352 352">
          <Path
            fill={colors.primaryDark}
            d="M242.7,176L342.8,75.9c12.3-12.3,12.3-32.2,0-44.5L320.6,9.2c-12.3-12.3-32.2-12.3-44.5,0L176,109.3L75.9,9.2 C63.7-3.1,43.7-3.1,31.5,9.2L9.2,31.4c-12.3,12.3-12.3,32.2,0,44.5L109.3,176L9.2,276.1c-12.3,12.3-12.3,32.2,0,44.5l22.2,22.2 c12.3,12.3,32.2,12.3,44.5,0L176,242.7l100.1,100.1c12.3,12.3,32.2,12.3,44.5,0l22.2-22.2c12.3-12.3,12.3-32.2,0-44.5L242.7,176z"
          />
        </Svg>
      </TouchableOpacity>

      <ScrollView style={styles.guideScroll}>
        <Text style={styles.guideTitle}>How to use Ritmo</Text>
        <Text style={styles.guideSub}>Create your beat</Text>
        <Text style={styles.guideTxt}>Tap on any input to activate it.</Text>
        <View style={styles.guideBullet}>
          <View
            style={{
              width: 15,
              aspectRatio: 1 / 1,
              borderRadius: 15,
              marginRight: 5,
              backgroundColor: colors.orange,
            }}
          />
          <Text style={styles.guideTxt}>ORANGE represent the Hi-Hat</Text>
        </View>
        <View style={styles.guideBullet}>
          <View
            style={{
              width: 15,
              aspectRatio: 1 / 1,
              borderRadius: 15,
              marginRight: 5,
              backgroundColor: colors.green,
            }}
          />
          <Text style={styles.guideTxt}>GREEN represent the Snare</Text>
        </View>
        <View style={styles.guideBullet}>
          <View
            style={{
              width: 15,
              aspectRatio: 1 / 1,
              borderRadius: 15,
              marginRight: 5,
              backgroundColor: colors.cyan,
            }}
          />
          <Text style={styles.guideTxt}>CYAN represent the Kick</Text>
        </View>

        <Text style={styles.guideTxt}>
          You can offset the individual sounds by using the sliders below the
          circle.
        </Text>
        <Slider
          value={15}
          minimumValue={sliderMin}
          maximumValue={sliderMax}
          step={sliderStep}
          minimumTrackTintColor={colors.grayLight}
          maximumTrackTintColor={colors.grayLight}
          containerStyle={[styles.sliderContainer, { marginVertical: 10 }]}
          trackStyle={styles.sliderTrack}
          renderThumbComponent={CustomThumbHihat}
          thumbTouchSize={{ width: 65, height: 25 }}
        //onValueChange={}
        />
        <Text style={styles.guideTxt}>
          Once you have activated at least one input you can start the beat. Any
          changes made to the beat while in play mode will be heard on the next
          interval pass.
        </Text>
        <Text style={styles.guideSub}>Settings</Text>
        <Text style={styles.guideTxt}>
          In the settings screen you can change:
        </Text>
        <View style={styles.guideBullet}>
          <View
            style={{
              width: 15,
              aspectRatio: 1 / 1,
              borderRadius: 15,
              marginRight: 5,
              backgroundColor: colors.grayBlue,
            }}
          />
          <Text style={styles.guideTxt}>BPM</Text>
        </View>

        <View style={styles.guideBullet}>
          <View
            style={{
              width: 15,
              aspectRatio: 1 / 1,
              borderRadius: 15,
              marginRight: 5,
              backgroundColor: colors.grayBlue,
            }}
          />
          <Text style={styles.guideTxt}>Time Signature</Text>
        </View>

        <View style={styles.guideBullet}>
          <View
            style={{
              width: 15,
              aspectRatio: 1 / 1,
              borderRadius: 15,
              marginRight: 5,
              backgroundColor: colors.grayBlue,
            }}
          />
          <Text style={styles.guideTxt}>Sound Library</Text>
        </View>

        <Text style={styles.guideTxt}>
          Any changes in the settings screen will pause your beat if it is
          playing so that changes can be applied correctly.
        </Text>
        <Text style={styles.guideSub}>Presets</Text>
        <Text style={styles.guideTxt}>
          <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>Save</Text>
          {'\n'}
          Once you have a beat you can tap on a preset to save that beat. (This
          will save your configuration including the active inputs, the position
          of each slider, the BPM and the time signature)
        </Text>
        <View style={styles.guidePresetWrapper}>
          <View style={styles.guidePresetCont}>
            <TouchableHighlight
              underlayColor={colors.grayBlue}
              style={[
                beat1 ? styles.presetBtn : styles.presetBtnEmpty,
                { paddingVertical: 8, width: '100%' },
              ]}
              onPress={() => setBeat1(!beat1)}>
              <Text style={styles.presetText}>Beat 1</Text>
            </TouchableHighlight>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: 12,
                textAlign: 'center',
                color: colors.primaryDark,
              }}>
              Empty preset
            </Text>
          </View>
          <View style={styles.guidePresetCont}>
            <TouchableHighlight
              underlayColor={colors.grayBlue}
              style={[
                beat2 ? styles.presetBtn : styles.presetBtnEmpty,
                { paddingVertical: 8, width: '100%' },
              ]}
              onPress={() => setBeat2(!beat2)}>
              <Text style={styles.presetText}>Beat 2</Text>
            </TouchableHighlight>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: 12,
                textAlign: 'center',
                color: colors.primaryDark,
              }}>
              Saved preset
            </Text>
          </View>
        </View>
        <Text style={styles.guideTxt}>
          Once saved the preset button will change colour to indicate that it
          can now be loaded.{'\n'}
          {'\n'}
          <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>Load</Text>
          {'\n'}
          To load the preset just tap it.{'\n'}
          {'\n'}
          <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>Delete</Text>
          {'\n'}
          To clear/delete the preset{' '}
          <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>long-press</Text> it and a
          window will appear asking you to confirm the action.
        </Text>
        <View style={styles.guideModalView}>
          <Text style={styles.modalExp}>
            Are you sure you want to clear the saved beat?
          </Text>
          <View style={styles.modalBtnCont}>
            <TouchableOpacity activeOpacity={0.8} style={styles.modalBtn}>
              <Text style={styles.modalBtnTxt}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.modalBtn}>
              <Text style={styles.modalBtnTxt}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.guideSub}>Export MIDI</Text>
        <Text style={styles.guideTxt}>
          When selected you will be prompted with a window to name your MIDI
          file. (If no name is given the placeholder name "
          <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>Ritmo_MIDI</Text>" will be
          used){'\n'}
          {'\n'}
          Once named you can save it, this will open up a sharing option to
          transfer your file to your computer so you can use your Ritmo beat in
          your DAW.
        </Text>
        <View style={styles.guideImgCont}>
          <Image
            style={styles.guideImg}
            resizeMode={'contain'}
            source={MidiFile}
          />
        </View>
        <Text style={styles.guideTxt}>
          The exported MIDI file is a single bar (that can be looped), with a
          Kick (C1 - pitch), Snare (D1 - pitch) and Hi-Hat (F#1 - pitch)
          configuration. It has a fixed velocity, an encoded BPM and time
          signature if your beat is NOT in "Free time sig" mode.
        </Text>
        <View style={styles.guideImgCont2}>
          <Image
            style={styles.guideImg}
            resizeMode={'contain'}
            source={MidiFileLogic}
          />
        </View>
        <Text style={styles.guideTxt}>
          The MIDI file is not stored in the internal phone storage unless you
          save it yourself inside the share window. (This is done to minimise
          app space and conserve your phone's storage space)
        </Text>
        <Text style={styles.guideSub}>Contact</Text>
        <Text style={styles.guideTxt}>
          If you find any bugs or have any other questions or ideas for
          improving Ritmo, please contact us at:
        </Text>
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            textAlign: 'left',
            fontSize: 16,
            color: colors.primaryDark,
          }}
          selectable={true}>
          chimerastudiotm@gmail.com
        </Text>
      </ScrollView>
      <View style={styles.adSpace} />
    </View>
  );
};

/* Library Screen */
export const LibraryScreen = ({ libraryCallback }) => {
  return (
    <View style={styles.guideWrapper}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.exit}
        onPress={() => libraryCallback(false)}>
        <Svg height="100%" width="100%" viewBox="0 0 352 352">
          <Path
            fill={colors.primaryDark}
            d="M242.7,176L342.8,75.9c12.3-12.3,12.3-32.2,0-44.5L320.6,9.2c-12.3-12.3-32.2-12.3-44.5,0L176,109.3L75.9,9.2 C63.7-3.1,43.7-3.1,31.5,9.2L9.2,31.4c-12.3,12.3-12.3,32.2,0,44.5L109.3,176L9.2,276.1c-12.3,12.3-12.3,32.2,0,44.5l22.2,22.2 c12.3,12.3,32.2,12.3,44.5,0L176,242.7l100.1,100.1c12.3,12.3,32.2,12.3,44.5,0l22.2-22.2c12.3-12.3,12.3-32.2,0-44.5L242.7,176z"
          />
        </Svg>
      </TouchableOpacity>

      <Text>Recordings</Text>
    </View>
  );
};

/* Rewarded Screen */
export const RewardedScreen = ({ rewardedCallback }) => {
  /* Register Reward Variables */
  rewardList = [];
  let rewardEarned = false;
  let disableList = false;

  /* Create Rewards List */
  for (let i = 0; i < soundList.length; i++) {
    if (soundList[i].disabled == true) {
      rewardList.push(soundList[i]);
    }
  }

  /* Check if Rewards List Empty */
  if (rewardList.length == undefined || rewardList.length == 0) {
    rewardListName = 'N/A';
    disableList = true;
  } else {
    rewardListName = rewardList[0].name;
  }

  /* Rewarded Screen onLoad */
  useEffect(() => {
    setHrs(('0' + timerUpdate.hours).slice(-2));
    setMins(('0' + timerUpdate.minutes).slice(-2));
    setSecs(('0' + timerUpdate.seconds).slice(-2));
    checkTimerStart();
    setSelectedRewardName(rewardListName);
    rewardIndex = soundList.findIndex(obj => obj.name == rewardListName);
  }, []);

  /* Rewarded States */
  const [loadRewarded, setLoadRewarded] = useState(false);

  /* Rewarded List States */
  const [openSelect, setOpenSelect] = useState(false);
  const [selectedRewardName, setSelectedRewardName] = useState(rewardListName);

  /* Countdown Timer States */
  const [countdownStart, setCountdownStart] = useState(timerStart);
  const [refresh, setRefresh] = useState(refreshEnabled);

  /* Timer States */
  const [hrs, setHrs] = useState([timerUpdate.hours]);
  const [mins, setMins] = useState([timerUpdate.minutes]);
  const [secs, setSecs] = useState([timerUpdate.seconds]);

  /* Check if Timer is Null - Function */
  async function checkTimerStart() {
    timerStart = await AsyncStorage.getItem('timerStart');

    if (timerStart !== null) {
      timerStart = true;
      setCountdownStart(timerStart);
      checkRewardCountdown();
    } else {
      timerStart = false;
      setCountdownStart(timerStart);
    }
    checkSoundList();
  }

  /* Check Countdown time - Function */
  async function checkRewardCountdown() {
    let countdownDate = JSON.parse(await AsyncStorage.getItem('countdownTime'));

    let currentDate = new Date().getTime();
    let timeDiff = countdownDate - currentDate;
    ms2Time(timeDiff);

    if (timeDiff <= 0) {
      lockRewards();
    } else {
      tickVariable = setInterval(() => tick(), 1000);
    }
  }

  /* Countdown tick Interval - Function */
  function tick() {
    if (
      timerUpdate.hours === 0 &&
      timerUpdate.minutes === 0 &&
      timerUpdate.seconds === 0
    ) {
      lockRewards();
    } else if (
      timerUpdate.hours <= -1 ||
      timerUpdate.minutes <= -1 ||
      timerUpdate.seconds <= -1
    ) {
      clearInterval(tickVariable);
      checkRewardCountdown();
    } else if (timerUpdate.minutes === 0 && timerUpdate.seconds === 0) {
      let calcTime = timerUpdate.hours - 1;
      timerUpdate.hours = calcTime;
      timerUpdate.minutes = 59;
      timerUpdate.seconds = 59;
    } else if (timerUpdate.seconds === 0) {
      let calcTime = timerUpdate.minutes - 1;
      timerUpdate.minutes = calcTime;
      timerUpdate.seconds = 59;
    } else {
      let calcTime = timerUpdate.seconds - 1;
      timerUpdate.seconds = calcTime;
    }

    setHrs(('0' + timerUpdate.hours).slice(-2));
    setMins(('0' + timerUpdate.minutes).slice(-2));
    setSecs(('0' + timerUpdate.seconds).slice(-2));
  }

  /* Reset/Lock Rewards & Timer - Function */
  async function lockRewards() {
    clearInterval(tickVariable);
    timerUpdate.hours = 0;
    timerUpdate.minutes = 0;
    timerUpdate.seconds = 0;

    await AsyncStorage.removeItem('timerStart');
    await AsyncStorage.removeItem('countdownTime');
    await AsyncStorage.removeItem('unlockedRewards');
    timerStart = false;
    setCountdownStart(timerStart);

    for (let i = 0; i < soundList.length; i++) {
      if (i <= 2) {
        soundList[i].disabled = false;
      } else {
        soundList[i].disabled = true;
      }
    }
    unlockedSamples = soundList.map(({ disabled }) => disabled);

    rewardList = [];
    for (let i = 0; i < soundList.length; i++) {
      if (soundList[i].disabled == true) {
        rewardList.push(soundList[i]);
      }
    }

    if (rewardList.length == undefined || rewardList.length == 0) {
      rewardListName = 'N/A';
      disableList = true;
    } else {
      rewardListName = rewardList[0].name;
    }
    setSelectedRewardName(rewardListName);
    rewardIndex = soundList.findIndex(obj => obj.name == rewardListName);
  }

  /* Check what Reward Content to Show - Function */
  function checkSoundList() {
    for (let i = 0; i < soundList.length; i++) {
      if (soundList[i].disabled == true) {
        rewardDisabled = false;
        break;
      } else {
        rewardDisabled = true;
      }
    }
    if (rewardDisabled) {
      refreshEnabled = true;
      setRefresh(refreshEnabled);
    }
  }

  /* Exit Rewarded Screen - Function */
  function exitReward() {
    clearInterval(tickVariable);
    rewardedCallback(false);
  }

  /* Register Admob Listeners - START */
  /*
  RewardedAd.addEventListener('rewardedVideoDidFailToLoad', () => {
    resetRewarded();
  });

  RewardedAd.addEventListener('rewardedVideoDidFailToPresent', () => {
    resetRewarded();
  });

  RewardedAd.addEventListener('rewardedVideoDidDismiss', () => {
    resetRewarded();
  });

  RewardedAd.addEventListener('rewardedVideoUserDidEarnReward', () => {
    if (!rewardDisabled) {
      unlockSamples();
    } else {
      refreshCount();
    }
  });
  */
  /* Register Admob Listeners - END */

  /* Request Ad Video - Function */
  async function requestReward() {
    setLoadRewarded(true);

    /*
    await RewardedAd.setAdUnitID(
      Platform.OS === 'ios' ? admob_ios.rewarded : admob_android.rewarded,
    ); // Test ID, Replace with your-admob-unit-id
    await RewardedAd.requestAdAsync();
    await RewardedAd.showAdAsync();
    */
  }

  /* Reset Rewarded Loading Animation - Function */
  function resetRewarded() {
    if (loadRewarded == true && rewardEarned == false) {
      setTimeout(function () {
        setLoadRewarded(false);
      }, 10000);
    }
  }

  /* Open Rewarded List - Function */
  const openSelectList = () => {
    setOpenSelect(true);
  };

  /* Select Reward Item - Function */
  const selectedSound = name => {
    setSelectedRewardName(name);
    rewardIndex = soundList.findIndex(obj => obj.name == name);

    setOpenSelect(false);
  };

  /* Give Sound Reward - Function */
  async function unlockSamples() {
    await AsyncStorage.removeItem('timerStart');
    await AsyncStorage.removeItem('countdownTime');
    await AsyncStorage.removeItem('unlockedRewards');

    let countdownDate = new Date().getTime() + countdownHours * 36e5;
    await AsyncStorage.setItem('countdownTime', JSON.stringify(countdownDate));

    timerStart = true;
    await AsyncStorage.setItem('timerStart', JSON.stringify(timerStart));

    soundList[rewardIndex].disabled = false;
    unlockedSamples = soundList.map(({ disabled }) => disabled);
    await AsyncStorage.setItem(
      'unlockedRewards',
      JSON.stringify(unlockedSamples),
    );

    rewardEarned = true;
    rewardedCallback(false);
  }

  /* Refresh Reward Timer - Function */
  async function refreshCount() {
    await AsyncStorage.removeItem('timerStart');
    await AsyncStorage.removeItem('countdownTime');

    let countdownDate = new Date().getTime() + countdownHours * 36e5;
    await AsyncStorage.setItem('countdownTime', JSON.stringify(countdownDate));

    timerStart = true;
    await AsyncStorage.setItem('timerStart', JSON.stringify(timerStart));

    rewardEarned = true;
    rewardedCallback(false);
  }

  return (
    <View style={styles.rewardedWrapper}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.exit}
        disabled={loadRewarded || openSelect ? true : false}
        onPress={exitReward}>
        <Svg height="100%" width="100%" viewBox="0 0 352 352">
          <Path
            fill={!loadRewarded ? colors.gray : colors.grayBlue}
            d="M242.7,176L342.8,75.9c12.3-12.3,12.3-32.2,0-44.5L320.6,9.2c-12.3-12.3-32.2-12.3-44.5,0L176,109.3L75.9,9.2 C63.7-3.1,43.7-3.1,31.5,9.2L9.2,31.4c-12.3,12.3-12.3,32.2,0,44.5L109.3,176L9.2,276.1c-12.3,12.3-12.3,32.2,0,44.5l22.2,22.2 c12.3,12.3,32.2,12.3,44.5,0L176,242.7l100.1,100.1c12.3,12.3,32.2,12.3,44.5,0l22.2-22.2c12.3-12.3,12.3-32.2,0-44.5L242.7,176z"
          />
        </Svg>
      </TouchableOpacity>

      <View style={styles.countdownCon}>
        {countdownStart ? (
          <Text style={styles.countdownTimer}>
            {hrs}:{mins}:{secs}
          </Text>
        ) : (
          <Text style={styles.countdownTimer}>00:00:00</Text>
        )}
        <Text style={styles.countdownTxt}>
          till unlocked samples are locked
        </Text>
      </View>

      {!refresh ? (
        <View style={styles.rewardedCon}>
          <View style={styles.selectReward}>
            <Text style={styles.rewardTitle}>Choose the library you want:</Text>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.selectRewardInput}
              disabled={disableList}
              onPress={openSelectList}>
              <Text style={styles.selectRewardInputText}>
                {selectedRewardName}
              </Text>
              <Arrow style={styles.selectRewardArrow} />
            </TouchableOpacity>
          </View>

          <View style={styles.rewardedExp}>
            <Text style={styles.rewardedExpText}>
              To get the chosen library{'\n'}
              watch this Advert:
            </Text>
            <Text style={styles.rewardedExp2Text}>
              The unlocked sample will be available for{' '}
              <Text style={{ color: colors.orange }}>24h</Text>
              {'\n'}
              from <Text style={{ color: colors.orange }}>the last one</Text> that
              you unlocked.
            </Text>
          </View>
          <TouchableOpacity
            style={
              !loadRewarded ? styles.rewardedStart : styles.rewardedDisabled
            }
            activeOpacity={1}
            disabled={loadRewarded || openSelect ? true : false}
            onPress={() => requestReward()}>
            {!loadRewarded ? (
              <Text style={styles.rewardedStartText}>Watch the Ad</Text>
            ) : (
              <ActivityIndicator size="large" color={colors.grayLight} />
            )}
          </TouchableOpacity>
          <Text style={styles.rewardedDisc}>
            If no Advert is shown come back a bit later
          </Text>
        </View>
      ) : (
        <View style={styles.rewardedCon}>
          <View style={styles.rewardedExp}>
            <Text style={styles.rewardedExpText}>
              To keep the rewards,{'\n'}
              watch one Advert:
            </Text>
            <Text style={styles.rewardedExp2Text}>
              The refresh will give you{' '}
              <Text style={{ color: colors.orange }}>24h</Text>
              {'\n'}
              from <Text style={{ color: colors.orange }}>
                the end of the Ad
              </Text>{' '}
              {'\n'}
              and will become available again{'\n'}
              <Text style={{ color: colors.orange }}>6h</Text> before the time
              runs out.
            </Text>
          </View>
          <TouchableOpacity
            style={
              !loadRewarded ? styles.rewardedStart : styles.rewardedDisabled
            }
            activeOpacity={1}
            disabled={loadRewarded || openSelect ? true : false}
            onPress={() => requestReward()}>
            {!loadRewarded ? (
              <Text style={styles.rewardedStartText}>Watch the Ad</Text>
            ) : (
              <ActivityIndicator size="large" color={colors.grayLight} />
            )}
          </TouchableOpacity>
          <Text style={styles.rewardedDisc}>
            If no Advert is shown come back a bit later
          </Text>
        </View>
      )}

      <Modal animationType="fade" transparent={true} visible={openSelect}>
        <View style={styles.selectListWrapper}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.selectList}
            centerContent={true}>
            {rewardList.map((sound, index) => (
              <TouchableOpacity
                activeOpacity={0.6}
                style={
                  index === rewardList.length - 1
                    ? styles.selectItemNoBorder
                    : styles.selectItem
                }
                key={sound.name}
                onPress={() => selectedSound(sound.name)}>
                <Text style={styles.selectText}>{sound.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

/* Settings Screen */
export const MenuScreen = forwardRef((props, ref) => {
  /* Menu Screen onLoad */
  useEffect(() => {
    checkCountdown();
  }, []);

  /* Calls from Outside */
  useImperativeHandle(ref, () => {
    return {
      rotateEffect: rotateEffect,
      updateMenuState: updateMenuState,
    };
  });

  /* Update Settings State - Callback */
  const updateMenuState = () => {
    setBpmNumber(useBPM.toString());
    setRadioCheck(useTimeSig);
  };

  /* Settings States */
  const [bpmNumber, setBpmNumber] = useState(useBPM.toString());
  const [radioCheck, setRadioCheck] = useState(useTimeSig);
  const [openSelect, setOpenSelect] = useState(false);
  const [selectedSoundName, setSelectedSoundName] = useState(
    selectedSoundNameSaved,
  );
  const [disabled, setDisabled] = useState(rewardDisabled);
  const [refresh, setRefresh] = useState(refreshEnabled);
  const [alertShow, setAlertShow] = useState(false);
  const fadeAlert = useState(new Animated.Value(0))[0];

  /* Show Alert message - Function */
  const alertRewardedDisabled = () => {
    Keyboard.dismiss();
    setAlertShow(true);
    Animated.sequence([
      Animated.timing(fadeAlert, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAlert, {
        toValue: 0,
        delay: 4700,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
    setTimeout(function () {
      setAlertShow(false);
    }, 5300);
  };

  /* Rotate Settings Icon - Animation - START */
  const rotate = useRef(new Animated.Value(0)).current;

  const rotateEffect = () => {
    if (menuCheck) {
      rotate.setValue(1);
      setTimeout(function () {
        Animated.timing(rotate, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.ease,
        }).start();
      }, 500);
    } else {
      setTimeout(function () {
        rotate.setValue(1);
      }, 500);
    }
  };

  const interpolateRotate = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-180deg'],
  });

  const rotateArrow = {
    transform: [{ rotate: interpolateRotate }],
  };
  /* Rotate Settings Icon - Animation - END */

  /* Check Reward Reset Time - Function */
  async function checkCountdown() {
    let countdownDate = JSON.parse(await AsyncStorage.getItem('countdownTime'));

    if (countdownDate) {
      let currentDate = new Date().getTime();
      let timeDiff = countdownDate - currentDate;
      ms2Time(timeDiff);

      if (timeDiff <= 0) {
        lockRewards();
      } else {
        checkUnlocked();
      }
    }
  }

  /* Lock Rewards - Function */
  async function lockRewards() {
    timerUpdate.hours = 0;
    timerUpdate.minutes = 0;
    timerUpdate.seconds = 0;

    await AsyncStorage.removeItem('timerStart');
    await AsyncStorage.removeItem('countdownTime');
    await AsyncStorage.removeItem('unlockedRewards');
    timerStart = false;

    for (let i = 0; i < soundList.length; i++) {
      if (i <= 2) {
        soundList[i].disabled = false;
      } else {
        soundList[i].disabled = true;
      }
    }
    checkUnlocked();
  }

  /* Check Unlocked Sounds List - Function */
  async function checkUnlocked() {
    unlockedSamples = JSON.parse(await AsyncStorage.getItem('unlockedRewards'));
    if (unlockedSamples && unlockedSamples.length) {
      for (let i = 0; i < soundList.length; i++) {
        soundList[i].disabled = unlockedSamples[i];
      }
    } else {
      unlockedSamples = soundList.map(({ disabled }) => disabled);
    }

    checkSoundList();
  }

  /* Check Reward Call Button - Function */
  function checkSoundList() {
    for (let i = 0; i < soundList.length; i++) {
      if (soundList[i].disabled == true) {
        rewardDisabled = false;
        setDisabled(rewardDisabled);
        break;
      } else {
        rewardDisabled = true;
        setDisabled(rewardDisabled);
      }
    }
    if (rewardDisabled && timerUpdate.hours <= refreshHours) {
      refreshEnabled = true;
      setRefresh(refreshEnabled);
    } else {
      refreshEnabled = false;
      setRefresh(refreshEnabled);
    }
  }

  /* BPM Input - Function */
  const bpmUpdate = value => {
    setBpmNumber(value.toString());
  };

  /* BPM on Blur/Submit - Function */
  const bpmCheck = value => {
    let valueNum = Math.trunc(Number(value));
    if (valueNum < 1) {
      setBpmNumber('1');
      useBPM = 1;
    } else if (valueNum > 300) {
      setBpmNumber('300');
      useBPM = 300;
    } else if (valueNum == undefined || valueNum == null || isNaN(valueNum)) {
      setBpmNumber('1');
      useBPM = 1;
    } else {
      setBpmNumber(valueNum.toString());
      useBPM = valueNum;
    }
    calcSoundDelay();
  };

  /* Time Sig Update - Function */
  const gridChange = value => {
    Keyboard.dismiss();
    useTimeSig = value.toString();
    setRadioCheck(useTimeSig);
    changeTimeSig();
    props.updateCallback();
  };

  /* Open Select List - Function */
  const openSelectList = () => {
    Keyboard.dismiss();
    setOpenSelect(true);
    pause();
  };

  /* Select Sound from List - Function */
  const selectedSound = (name, index) => {
    setSelectedSoundName(name);
    selectedSoundNameSaved = name;
    selectedSoundIndexSaved = index;

    reloadSoundLib();

    setOpenSelect(false);
  };

  /* Pause Playback - Function */
  const pause = () => {
    props.pauseCallback();
  };

  /* Close Settings Screen - Function */
  const menuClose = () => {
    Keyboard.dismiss();
    props.menuCallback(false);
    rotateEffect();
  };

  /* Open Rewarded Screen - Function */
  const callRewarded = () => {
    Keyboard.dismiss();
    props.rewardedCallback(true);
    pause();
  };

  return (
    <DismissKeyboard>
      <View style={styles.screenMenuWrapper}>
        <View style={styles.navigationMenu}>
          <TouchableOpacity
            activeOpacity={0.8}
            disabled={openSelect}
            onPress={menuClose}>
            <Animated.View style={[rotateArrow, styles.menuCloseW]}>
              <Close style={styles.menuClose} />
            </Animated.View>
          </TouchableOpacity>
        </View>

        <View style={styles.menuWrapper}>
          <View style={styles.bpmWrapper}>
            <Text style={styles.menuTitle}>BPM</Text>
            <TextInput
              style={styles.inputBPM}
              maxLength={3}
              onChangeText={bpmNumber => bpmUpdate(bpmNumber)}
              onSubmitEditing={() => bpmCheck(bpmNumber)}
              onBlur={() => bpmCheck(bpmNumber)}
              onFocus={pause}
              value={bpmNumber}
              placeholderTextColor={colors.grayBlue}
              keyboardType="numeric"
              multiline={false}
            />
          </View>

          <View style={styles.radioWrapper}>
            <Text style={styles.menuTitle}>Time Signature</Text>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => gridChange('Free')}>
              <View style={styles.radioCont}>
                <Text style={styles.radioText}>Free</Text>
                <View
                  style={
                    radioCheck == 'Free'
                      ? styles.radioSelected
                      : styles.radioNotSelected
                  }
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => gridChange('4/4')}>
              <View style={styles.radioCont}>
                <Text style={styles.radioText}>4/4</Text>
                <View
                  style={
                    radioCheck == '4/4'
                      ? styles.radioSelected
                      : styles.radioNotSelected
                  }
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => gridChange('3/4')}>
              <View style={styles.radioCont}>
                <Text style={styles.radioText}>3/4</Text>
                <View
                  style={
                    radioCheck == '3/4'
                      ? styles.radioSelected
                      : styles.radioNotSelected
                  }
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.selectWrapper}>
            <Text style={styles.menuTitle}>Sound</Text>
            <TouchableOpacity
              disabled={openSelect}
              activeOpacity={0.6}
              style={styles.selectInput}
              onPress={openSelectList}>
              <Text style={styles.selectInputText}>{selectedSoundName}</Text>
              <Arrow style={styles.selectListArrow} />
            </TouchableOpacity>
          </View>

          {/*
					{!disabled ? (
						<TouchableHighlight
							underlayColor={colors.grayBlue}
							style={styles.btnRewardScreen}
							disabled={openSelect}
							onPress={callRewarded}
						>
							<Text style={styles.btnRewardScreenText}>
								Get more samples
							</Text>
						</TouchableHighlight>
					) : (
						<TouchableHighlight
							underlayColor={colors.grayBlue}
							style={
								refresh
									? styles.btnRewardScreen
									: styles.btnRewardScreenDisabled
							}
							disabled={openSelect}
							onPress={
								refresh ? callRewarded : alertRewardedDisabled
							}
						>
							<Text
								style={
									refresh
										? styles.btnRewardScreenText
										: styles.btnRewardScreenTextDisabled
								}
							>
								Keep rewards
							</Text>
						</TouchableHighlight>
					)}
					*/}
        </View>

        <View style={styles.adSpace} />

        <Modal animationType="fade" transparent={true} visible={openSelect}>
          <View style={styles.selectListWrapper}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.selectList}
              centerContent={true}>
              {soundList.map((sound, index) => (
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={
                    index === soundList.length - 1
                      ? styles.selectItemNoBorder
                      : styles.selectItem
                  }
                  key={sound.name}
                  disabled={sound.disabled}
                  onPress={() => selectedSound(sound.name, index)}>
                  <Text
                    style={
                      !sound.disabled
                        ? styles.selectText
                        : styles.selectDisabledText
                    }>
                    {sound.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Modal>

        {alertShow ? (
          <Animated.View style={[styles.alertWrapper, { opacity: fadeAlert }]}>
            <Text style={styles.alertText2}>
              This will become available{' '}
              <Text style={{ color: colors.green }}>6h</Text> before
              {'\n'}
              the timer runs out.
            </Text>
          </Animated.View>
        ) : null}
      </View>
    </DismissKeyboard>
  );
});

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
  useImperativeHandle(ref, () => {
    return {
      pause: pause,
      timeSigUpdate: timeSigUpdate,
    };
  });

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
    setTimeout(function () {
      setAlertShow(false);
    }, 3300);
  };

  /* Calc Circle Radius - START */
  const getHihatDimentions = event => {
    let { width } = event.nativeEvent.layout;
    setHihatRadius(width / 2 - 2.5);
  };

  const getSnareDimentions = event => {
    let { width } = event.nativeEvent.layout;
    setSnareRadius(width / 2 - 2.5);
  };

  const getKickDimentions = event => {
    let { width } = event.nativeEvent.layout;
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
      }),
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
      ]),
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
    Object.keys(hihatCircle).forEach(i => (hihatCircle[i].checked = false));
    Object.keys(snareCircle).forEach(i => (snareCircle[i].checked = false));
    Object.keys(kickCircle).forEach(i => (kickCircle[i].checked = false));

    setCheckedHihatState(false);
    setCheckedSnareState(false);
    setCheckedKickState(false);
  };

  /* Slider & Circle Rotate - Function - START */
  const rotateHihatCircle = value => {
    setHihatValue(value);
    hihatSliderVal = value;
    for (let i in hihatCircle) {
      let rotationUpdate = hihatCircle[i].initAngle + Number(value);
      hihatCircle[i].angle = rotationUpdate;
    }
    hihatRotation = hihatCircle.map(({ angle }) => angle);
    setUseHihatRotation(hihatRotation);
    calcSoundDelay();
  };

  const rotateSnareCircle = value => {
    setSnareValue(value);
    snareSliderVal = value;
    for (let i in snareCircle) {
      let rotationUpdate = snareCircle[i].initAngle + Number(value);
      snareCircle[i].angle = rotationUpdate;
    }
    snareRotation = snareCircle.map(({ angle }) => angle);
    setUseSnareRotation(snareRotation);
    calcSoundDelay();
  };

  const rotateKickCircle = value => {
    setKickValue(value);
    kickSliderVal = value;
    for (let i in kickCircle) {
      let rotationUpdate = kickCircle[i].initAngle + Number(value);
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
    Object.keys(hihatCircle).forEach(
      i => (hihatCircle[i].angle = hihatCircle[i].initAngle),
    );
    Object.keys(snareCircle).forEach(
      i => (snareCircle[i].angle = snareCircle[i].initAngle),
    );
    Object.keys(kickCircle).forEach(
      i => (kickCircle[i].angle = kickCircle[i].initAngle),
    );
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
  const loadPreset = async value => {
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
  const writePreset = async value => {
    if (value == 1) {
      let obj = {};
      obj.beat = true;
      obj.bpm = useBPM;
      obj.timeSig = useTimeSig;
      obj.hihatSlider = Number(hihatSliderVal);
      obj.snareSlider = Number(snareSliderVal);
      obj.kickSlider = Number(kickSliderVal);
      preset1Config.push(obj);

      await AsyncStorage.setItem(
        'preset1Config',
        JSON.stringify(preset1Config),
      );
      await AsyncStorage.setItem('preset1Hihat', JSON.stringify(hihatCircle));
      await AsyncStorage.setItem('preset1Snare', JSON.stringify(snareCircle));
      await AsyncStorage.setItem('preset1Kick', JSON.stringify(kickCircle));

      setBeat1(true);
    } else if (value == 2) {
      let obj = {};
      obj.beat = true;
      obj.bpm = useBPM;
      obj.timeSig = useTimeSig;
      obj.hihatSlider = Number(hihatSliderVal);
      obj.snareSlider = Number(snareSliderVal);
      obj.kickSlider = Number(kickSliderVal);
      preset2Config.push(obj);

      await AsyncStorage.setItem(
        'preset2Config',
        JSON.stringify(preset2Config),
      );
      await AsyncStorage.setItem('preset2Hihat', JSON.stringify(hihatCircle));
      await AsyncStorage.setItem('preset2Snare', JSON.stringify(snareCircle));
      await AsyncStorage.setItem('preset2Kick', JSON.stringify(kickCircle));
      setBeat2(true);
    } else if (value == 3) {
      let obj = {};
      obj.beat = true;
      obj.bpm = useBPM;
      obj.timeSig = useTimeSig;
      obj.hihatSlider = Number(hihatSliderVal);
      obj.snareSlider = Number(snareSliderVal);
      obj.kickSlider = Number(kickSliderVal);
      preset3Config.push(obj);

      await AsyncStorage.setItem(
        'preset3Config',
        JSON.stringify(preset3Config),
      );
      await AsyncStorage.setItem('preset3Hihat', JSON.stringify(hihatCircle));
      await AsyncStorage.setItem('preset3Snare', JSON.stringify(snareCircle));
      await AsyncStorage.setItem('preset3Kick', JSON.stringify(kickCircle));
      setBeat3(true);
    }
  };

  /* Open Preset Modal for Delete - Function */
  const openPresetModul = value => {
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
    for (let i in hihatCircle) {
      clearTimeout(hihatCircle[i].soundDelayKey);
      clearTimeout(snareCircle[i].soundDelayKey);
      clearTimeout(kickCircle[i].soundDelayKey);
    }
    clearInterval(beatCycle);

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
  };

  /* Clear All Checkboxes - Function */
  const clearBeat = () => {
    checkboxInitReset();
    for (let i in hihatCircle) {
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
                transform: [
                  { rotate: rotateBeat },
                  { translateY: -hihatRadius / 2 },
                ],
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
                onPress={() => toggleCheckbox(checkBox.soundName, index)}>
                <View
                  style={
                    !checkedHihatState[index]
                      ? styles.unchecked
                      : styles.checkedHihat
                  }
                />
              </TouchableOpacity>
            ) : null,
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
                onPress={() => toggleCheckbox(checkBox.soundName, index)}>
                <View
                  style={
                    !checkedSnareState[index]
                      ? styles.unchecked
                      : styles.checkedSnare
                  }
                />
              </TouchableOpacity>
            ) : null,
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
                onPress={() => toggleCheckbox(checkBox.soundName, index)}>
                <View
                  style={
                    !checkedKickState[index]
                      ? styles.unchecked
                      : styles.checkedKick
                  }
                />
              </TouchableOpacity>
            ) : null,
          )}

          {!play ? (
            <TouchableHighlight
              style={[styles.circleBtnWrapper]}
              underlayColor={colors.primaryDark}
              onPress={start}>
              <Play style={styles.circleBtn} />
            </TouchableHighlight>
          ) : (
            <TouchableHighlight
              style={[styles.circleBtnAnimatedWrapper]}
              underlayColor={colors.primaryDark}
              onPress={() => {
                pause();
                askForReview();
              }}>
              <Animated.View
                style={[
                  styles.circleBtnAnimated,
                  {
                    transform: [{ scale: pulseBtn }],
                  },
                ]}>
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
            onLongPress={() => openPresetModul(1)}>
            <Text style={styles.presetText}>Beat 1</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={colors.grayBlue}
            style={beat2 ? styles.presetBtn : styles.presetBtnEmpty}
            onPress={() => loadPreset(2)}
            onLongPress={() => openPresetModul(2)}>
            <Text style={styles.presetText}>Beat 2</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={colors.grayBlue}
            style={beat3 ? styles.presetBtn : styles.presetBtnEmpty}
            onPress={() => loadPreset(3)}
            onLongPress={() => openPresetModul(3)}>
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
            onValueChange={hihatValue => rotateHihatCircle(hihatValue)}
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
            onValueChange={snareValue => rotateSnareCircle(snareValue)}
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
            onValueChange={kickValue => rotateKickCircle(kickValue)}
          />
        </View>
        <View style={styles.btnWrapper}>
          <TouchableHighlight
            underlayColor={colors.grayBlue}
            style={styles.btnPrimary}
            onPress={clearBeat}>
            <Text style={styles.btnPrimaryText}>Clear beat</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={colors.grayBlue}
            style={styles.btnPrimary}
            onPress={resetAll}>
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

      <Modal animationType="fade" transparent={true} visible={presetModul}>
        <View style={styles.modalView}>
          <Text style={styles.modalExp}>
            Are you sure you want to clear the saved beat?
          </Text>
          <View style={styles.modalBtnCont}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.modalBtn}
              onPress={clearPreset}>
              <Text style={styles.modalBtnTxt}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.modalBtn}
              onPress={() => setPresetModul(false)}>
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
  const appState = useRef(AppState.currentState);
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
    ImmersiveMode.setBarMode('FullSticky');
    initFadeIn();
    /* setTimeout(askForPermission, 1000); */
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

    setTimeout(function () {
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

    setTimeout(function () {
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

    setTimeout(function () {
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

    setTimeout(function () {
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

  /* Permission for tracking & personalised Ads
  async function askForPermission() {
    const { granted } = await getPermissionsAsync();
    if (granted) {
      personalisedAds = true;
      setAds(true);
    } else {
      const { status } = await requestPermissionsAsync();
      if (status === 'granted') {
        personalisedAds = true;
      }
      setAds(true);
    }
  }
  */

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
      slideXVal = !isTablet
        ? 0 - (deviceWidth / 100) * 5
        : (deviceWidth / 100) * 45;
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
  const openNav = value => {
    navCheck = value;
    slideNavEffect();
  };

  /* Call Open Settings & Close Nav  */
  const openMenuCall = () => {
    openNav(false);
    openMenu(true);
  };

  /* Open & Close - Settings Screen */
  const openMenu = value => {
    setMenuOpen(value);
    menuCheck = value;
    refMenu.current.rotateEffect();
    refMenu.current.updateMenuState();
    slideMenuEffect();
  };

  /* Open & Close - Rewarded Screen */
  const openRewarded = value => {
    if (value == false) {
      fadeRewardedOut();
    } else {
      fadeRewardedIn();
    }
  };

  /* Open & Close - Library Screen */
  const openLibrary = value => {
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
  const openGuide = value => {
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
    if (findBeat == true) {
      openNav(false);
      setMidiModal(true);
    } else {
      fadeNavAlert();
    }
  };

  /* Close midi Modal */
  const exitMidiModal = () => {
    Keyboard.dismiss();
    setMidiModal(false);
    setMidiName('');
    if (appState.current === 'active') {
      RNFS.unlink(fileUri);
    }
  };

  /* Custom Name midi file */
  const nameMidiFile = value => {
    setMidiName(value.toString());
  };

  /* Midi Modal on Save */
  const saveMIDI = value => {
    Keyboard.dismiss();
    if (value == undefined || value == null || value == '') {
      exportMIDI(fileName);
    } else {
      exportMIDI(value);
    }
  };

  /* Write midi file and Share */
  const exportMIDI = async value => {
    /* Get position of all notes for each sound */
    let hihatMIDI = [];
    let snareMIDI = [];
    let kickMIDI = [];
    for (let i in hihatCircle) {
      if (hihatCircle[i].checked == true) {
        hihatMIDI.push(hihatCircle[i].angle);
      }
    }
    for (let i in snareCircle) {
      if (snareCircle[i].checked == true) {
        snareMIDI.push(snareCircle[i].angle);
      }
    }
    for (let i in kickCircle) {
      if (kickCircle[i].checked == true) {
        kickMIDI.push(kickCircle[i].angle);
      }
    }

    /* Create midi note layout from beat configuration */
    let countAngle = 0;
    let notesLayout = [];
    for (let i = 0; i < stepsInBar; i++) {
      let hihatIndex = hihatMIDI.indexOf(countAngle);
      let snareIndex = snareMIDI.indexOf(countAngle);
      let kickIndex = kickMIDI.indexOf(countAngle);
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

      let newCount = countAngle + sliderStep;
      countAngle = newCount;
    }
    let shiftLayout = notesLayout.slice();

    /* Calc note start point */
    let countStart = 0;
    let prevStart = 0;
    let startTicks = [];
    for (let i = 0; i < shiftLayout.length; i++) {
      if (shiftLayout[0] !== 'R') {
        let calcTicks = countStart * midiNoteMin + prevStart;
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
    let notesTicks = [];
    for (let i = startTicks.length - 1; i >= 0; i--) {
      let calcNoteTick = prevNote - startTicks[i];
      if (calcNoteTick > midiNoteMax) {
        calcNoteTick = midiNoteMax;
      }
      let noteTick = 'T' + calcNoteTick;
      notesTicks.unshift(noteTick);
      prevNote = startTicks[i];
    }

    /* Create midi note layout array without rests (R) */
    let midiLayout = notesLayout.filter(i => i !== 'R');

    /* Write midi sequance */
    let track = new MidiWriter.Track();
    let notesMIDI = [];
    for (let i = 0; i < midiLayout.length; i++) {
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
    }
    track.addEvent(notesMIDI, function (event, index) {
      return { sequential: false };
    });
    track.setTempo(useBPM);
    if (useTimeSig === '4/4') {
      track.setTimeSignature(4, 4);
    } else if (useTimeSig === '3/4') {
      track.setTimeSignature(3, 4);
    }

    /* Write .mid file to app storage */
    const write = new MidiWriter.Writer(track);
    fileUri = RNFS.DocumentDirectoryPath + `/${encodeURI(value)}.midi`;
    RNFS.writeFile(fileUri, write.base64(), 'base64');

    /* Start Share */
    const shareOptions = {
      url: fileUri,
      failOnCancel: true,
    };
    const shareResponse = await Share.open(shareOptions).then((res) => {
      /* Close midi modal, reset custom name & delete file from storage */
      exitMidiModal();
    }).catch((err) => {
      /* Close midi modal, reset custom name & delete file from storage */
      exitMidiModal();
    });
  };

  return (
    <SafeAreaView
      style={[styles.container, { minHeight: Math.round(windowHeight) }]}>
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
          ]}>
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
          ]}>
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
          ]}>
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
          ]}>
          <MenuBG />
        </Animated.View>
      ) : null}

      {/* GuideScreen */}
      {guideOpen ? (
        <Animated.View
          style={[
            {
              opacity: opacityGuide,
              flex: 1,
            },
          ]}>
          <GuideScreen guideCallback={openGuide} />
        </Animated.View>
      ) : null}

      {/* RewardedScreen 
      {rewardedOpen ? (
        <Animated.View
          style={{
            opacity: opacityRewarded,
            flex: 1,
          }}>
          <RewardedScreen rewardedCallback={openRewarded} />
        </Animated.View>
      ) : null}
      */}

      {/* LibraryScreen & LibraryScreen BG - Not yet supported */}
      {/*
			{recordingsOpen ? <MenuBG /> : null}
			{recordingsOpen ? (
				<LibraryScreen libraryCallback={openLibrary} />
			) : null}
			 */}

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

      {/* Navigation */}
      {mainOpen ? (
        <Animated.View style={[moveNav, styles.nav]}>
          <View style={styles.navWrapper}>
            <View style={styles.navTop}>
              <Animated.Text style={[{ opacity: opacityTag }, styles.navTag]}>
                Redefine Beatmaking
              </Animated.Text>

              <Animated.Text
                style={[{ opacity: opacityAlert }, styles.navTagAlert]}>
                Nothing to export!
              </Animated.Text>

              <TouchableOpacity
                style={styles.navClose}
                activeOpacity={0.6}
                onPress={() => openNav(false)}>
                <Exit fill={colors.grayLight} />
              </TouchableOpacity>
            </View>
            <View style={styles.navItems}>
              <TouchableOpacity
                style={styles.navBtnCont}
                activeOpacity={0.6}
                onPress={openMenuCall}>
                <View style={styles.navBtn}>
                  <Text style={styles.navTxt}>Settings</Text>
                  <Settings style={styles.navIcon} />
                </View>
              </TouchableOpacity>
              {/*
								<TouchableOpacity
									style={styles.navBtnCont}
									activeOpacity={0.6}
									onPress={() => openLibrary(true)}
								>
									<View style={styles.navBtn}>
										<Text style={styles.navTxt}>
											Recordings
										</Text>
										<Recordings
											style={styles.navIcon}
										/>
									</View>
								</TouchableOpacity>
								*/}
              <TouchableOpacity
                style={styles.navBtnCont}
                activeOpacity={0.6}
                onPress={() => openGuide(true)}>
                <View style={styles.navBtn}>
                  <Text style={styles.navTxt}>How to use</Text>
                  <Guide style={styles.navIcon} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.navBtnCont}
                activeOpacity={0.6}
                onPress={openMidiModal}>
                <View style={styles.navBtn}>
                  <Text style={styles.navTxt}>Export MIDI</Text>
                  <Export style={styles.navIcon} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      ) : null}

      {/* Save MIDI Modal */}
      <Modal animationType="fade" transparent={true} visible={midiModal}>
        <View style={styles.modalView}>
          <Text style={styles.modalTxt}>MIDI file name:</Text>
          <TextInput
            style={styles.inputMidi}
            onChangeText={midiName => nameMidiFile(midiName)}
            onSubmitEditing={() => nameMidiFile(midiName)}
            value={midiName}
            placeholder={'Ritmo_MIDI'}
            placeholderTextColor={colors.grayBlue}
            keyboardType="default"
            multiline={false}
          />

          <View style={styles.modalBtnCont}>
            <TouchableOpacity
              style={styles.modalBtn}
              activeOpacity={0.8}
              onPress={() => saveMIDI(midiName)}>
              <Text style={styles.modalBtnTxt}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalBtn}
              activeOpacity={0.8}
              onPress={exitMidiModal}>
              <Text style={styles.modalBtnTxt}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Banner Ad
      <View style={styles.ads}>
        {ads && !rewardedOpen ? (
          <BannerAd
            bannerSize="smartBannerPortrait"
            adUnitID={
              Platform.OS === 'ios' ? admob_ios.banner : admob_android.banner
            } // Test ID, Replace with your-admob-unit-id
            servePersonalizedAds={personalisedAds}
          />
        ) : null}
      </View>
      */}
    </SafeAreaView>
  );
}

export default Home;
