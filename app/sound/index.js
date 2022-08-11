// @flow
import Sound from 'react-native-sound';
import { forEach } from 'lodash';
import type { Sample } from '../utils/lists';
import type { Beat, Beats } from './beats';

type Props = {
  bpmInterval: number,
  sample: Sample,
  beats: Beats,
}

Sound.setCategory('Playback');

let intervalID = null;
let soundBeats = null;

export const playBeat = (props: Props) => {
  soundBeats = props.beats;

  const play = (beatArray: Beat[], soundPath: string) => {
    forEach(beatArray, (beat: Beat) => {
      if (beat.checked) {
        beat.soundKey = setTimeout(() => {
          const sound = new Sound(soundPath, Sound.MAIN_BUNDLE, (error) => {
            if (error) return;

            sound.setVolume(0.8);
            sound.play((success) => {
              if (success) sound.release();
              else /* Playback Fail */;
            });
          });
        }, beat.soundDelay);
      }
    });
  };

  const loopThroughBeats = () => forEach(soundBeats, (beatArray, key: string) => play(beatArray, props.sample[`${key}Sound`]));

  loopThroughBeats();
  intervalID = setInterval(loopThroughBeats, props.bpmInterval);
};

export const stopBeat = (beats: Beats) => {
  const stop = (beatArray: Beat[]) => {
    forEach(beatArray, (beat: Beat) => {
      clearTimeout(beat.soundKey);
    });
  };

  clearInterval(intervalID);
  forEach(beats, (beatArray) => stop(beatArray));
};

export const updateBeat = (beats: Beats) => {
  soundBeats = beats;
};
