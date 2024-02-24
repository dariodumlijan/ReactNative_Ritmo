import Sound from 'react-native-sound';
import { forEach } from 'lodash';
import type { Beat, Beats } from './beats';
import type { Sample } from '../utils/lists';

type Props = {
  bpmInterval: number,
  sample: Sample,
  beats: Beats,
};

let intervalID: any = null;
let soundBeats: any = null;

export const playBeat = (props: Props) => {
  soundBeats = { ...props.beats };

  const play = (beatArray: Beat[], soundPath: string) => {
    for (let index = 0; index < beatArray.length; index++) {
      const beat: Beat = beatArray[index] as Beat;
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
    }
  };

  const loopThroughBeats = () => forEach(soundBeats, (beatArray, key: string) => play(beatArray, props.sample[`${key}Sound`]));

  loopThroughBeats();
  intervalID = setInterval(loopThroughBeats, props.bpmInterval);
};

export const stopBeat = () => {
  const stop = (beatArray: Beat[]) => {
    forEach(beatArray, (beat: Beat) => {
      clearTimeout(beat.soundKey as NodeJS.Timeout);
      beat.soundKey = null;
    });
  };

  clearInterval(intervalID);
  forEach(soundBeats, (beatArray) => stop(beatArray));
};

export const updateBeat = (beats: Beats) => {
  soundBeats = { ...beats };
};
