// @flow
import { getItem, removeItem, setItem } from './hooks';
import { localStorageKeys } from '../tokens';
import type { Preset } from '../store/globalStore';

type FetchResponse = {
  presets: {
    one: Preset|null,
    two: Preset|null,
    three: Preset|null,
  },
  unlockedSamples: string[],
};

type WriteResponse = {
  key: string,
  preset: Preset,
};

type ClearResponse = string;

export const fetchPresetAndSamples = async (): Promise<FetchResponse> => {
  const one = await getItem(localStorageKeys.presets.one);
  const two = await getItem(localStorageKeys.presets.two);
  const three = await getItem(localStorageKeys.presets.three);
  const samples = await getItem(localStorageKeys.unlockedRewards);

  return {
    presets: {
      one: JSON.parse(one),
      two: JSON.parse(two),
      three: JSON.parse(three),
    },
    unlockedSamples: JSON.parse(samples) || [],
  };
};

export const writePreset = async (key: string, preset: Preset): Promise<WriteResponse> => {
  await setItem(localStorageKeys.presets[key], JSON.stringify(preset));

  return {
    key,
    preset,
  };
};

export const clearPreset = async (key: string): Promise<ClearResponse> => {
  await removeItem(localStorageKeys.presets[key]);

  return key;
};
