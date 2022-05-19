// @flow
import { forEach } from 'lodash';
import Sound from 'react-native-sound';
import type { Beat } from '../store/beatsStore';

type Props = {
  hihatPath: string,
  snarePath: string,
  kickPath: string,
  hihatCircle: Beat[],
  snareCircle: Beat[],
  kickCircle: Beat[],
};

Sound.setCategory('Playback');

export const playSoundLib = ({
  hihatCircle,
  snareCircle,
  kickCircle,
  hihatPath,
  snarePath,
  kickPath,
}: Props) => {
  forEach(hihatCircle, (beat) => {
    if (beat.checked === true) {
      beat.soundDelayKey = setTimeout(() => {
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
      }, beat.soundDelay);
    }
  });

  forEach(snareCircle, (beat) => {
    if (beat.checked === true) {
      beat.soundDelayKey = setTimeout(() => {
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
      }, beat.soundDelay);
    }
  });

  forEach(kickCircle, (beat) => {
    if (beat.checked === true) {
      beat.soundDelayKey = setTimeout(() => {
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
      }, beat.soundDelay);
    }
  });
};
