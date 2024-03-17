/* eslint-disable @typescript-eslint/lines-between-class-members */
import Sound from 'react-native-sound';
import { filter, keyBy } from 'lodash';
import { sliderStep } from '../tokens';
import type { Beat, Beats } from './beats';
import type { Sample } from '../utils/lists';

export type PlaybackSounds = {
  hihat: Sound | null,
  snare: Sound | null,
  kick: Sound | null,
};

type PlaybackBeats = {
  hihat: { [angle: number]: Beat },
  snare: { [angle: number]: Beat },
  kick: { [angle: number]: Beat },
};

type Props = {
  beats: Beats,
  bpmInterval: number,
};

export default class Playback {
  sounds: PlaybackSounds;
  beats: PlaybackBeats | null;
  intervalId: number | null;
  timeoutIds: number[];

  constructor() {
    this.sounds = {
      hihat: null,
      snare: null,
      kick: null,
    };
    this.beats = null;
    this.intervalId = null;
    this.timeoutIds = [];
  }

  initSound = (soundPath: string): Sound => {
    const sound = new Sound(soundPath, Sound.MAIN_BUNDLE, (error) => {
      if (error) return;

      sound.setVolume(0.8);
    });

    return sound;
  };

  initSample = (sample: Sample) => {
    this.sounds.hihat = this.initSound(sample.hihatSound);
    this.sounds.snare = this.initSound(sample.snareSound);
    this.sounds.kick = this.initSound(sample.kickSound);
  };

  switchSample = (sample: Sample) => {
    this.sounds.hihat?.release();
    this.sounds.snare?.release();
    this.sounds.kick?.release();
    this.initSample(sample);
  };

  formatBeats = (beats: Beats): PlaybackBeats => ({
    hihat: keyBy(filter(beats.hihat, 'checked'), 'angle'),
    snare: keyBy(filter(beats.snare, 'checked'), 'angle'),
    kick: keyBy(filter(beats.kick, 'checked'), 'angle'),
  });

  /**
  * Loop through time (by BPM Interval / (360deg / sliderStep)), on each loop check if there is a sound which Angle matches the tick and then play it
  * */
  playBeat = (props: Props) => {
    this.beats = this.formatBeats(props.beats);
    const delayDegStep = props.bpmInterval / 360;

    const loop = () => {
      for (let deg = 0; deg < 360; deg += sliderStep) {
        this.timeoutIds.push(setTimeout(() => {
          if (this.beats?.hihat[deg]) {
            this.sounds.hihat?.stop();
            this.sounds.hihat?.play();
          }
          if (this.beats?.snare[deg]) {
            this.sounds.snare?.stop();
            this.sounds.snare?.play();
          }
          if (this.beats?.kick[deg]) {
            this.sounds.kick?.stop();
            this.sounds.kick?.play();
          }
        }, delayDegStep * (deg || 1)));
      }
    };

    loop();
    this.intervalId = setInterval(() => loop(), props.bpmInterval);
  };

  stopBeat = () => {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
    this.timeoutIds = [];
  };

  updateBeat = (beats: Beats) => {
    this.beats = this.formatBeats(beats);
  };
}
