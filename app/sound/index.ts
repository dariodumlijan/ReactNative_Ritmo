/* eslint-disable @typescript-eslint/lines-between-class-members */
import Sound from 'react-native-sound';
import { sliderStep } from '@tokens';
import accurateInterval from 'accurate-interval';
import { filter, floor, keyBy } from 'lodash';
import type { Beat, Beats } from '@sound/beats';
import type { Sample } from '@utils/lists';
import type { AccurateInterval } from 'accurate-interval';

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
  activeDegree: number;
  interval: AccurateInterval | null;
  timeoutIds: number[];

  constructor() {
    this.sounds = {
      hihat: null,
      snare: null,
      kick: null,
    };
    this.beats = null;
    this.activeDegree = 0;
    this.interval = null;
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

  playSounds = (deg: number) => {
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
  };

  /**
  * Loop through time (by BPM Interval / (360deg / sliderStep)), on each loop check if there is a sound which Angle matches the tick and then play it
  * */
  playBeat = (props: Props) => {
    this.beats = this.formatBeats(props.beats);
    const intervalPerDegStep = floor(props.bpmInterval / (360 / sliderStep), 2);
    // const intervalPerDegStep = floor(props.bpmInterval / (360 / 90), 2);

    const loop = () => {
      this.playSounds(this.activeDegree);
      const nextDeg = this.activeDegree + sliderStep;
      if (nextDeg < 360) this.activeDegree = nextDeg;
      else this.activeDegree = 0;
    };

    this.interval = accurateInterval(() => loop(), intervalPerDegStep, {
      aligned: true,
      immediate: true,
    });
  };

  stopBeat = () => {
    this.activeDegree = 0;
    if (this.interval) this.interval.clear();
  };

  updateBeat = (beats: Beats) => {
    this.beats = this.formatBeats(beats);
  };
}
