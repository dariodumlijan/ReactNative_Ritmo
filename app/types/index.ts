export type ReduxAction = {
  type: string,
  payload?: any,
};

export enum SoundKey {
  hihat = 'hihat',
  snare = 'snare',
  kick = 'kick',
}

export enum PresetKey {
  one = 'one',
  two = 'two',
  three = 'three',
}
