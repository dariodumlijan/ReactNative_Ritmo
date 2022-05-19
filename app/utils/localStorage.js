// @flow
import { useLocalStorage } from ".";
import { localStorageKeys } from "../tokens";
import type { Preset } from "../store/globalStore";

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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const localStorage = useLocalStorage();
  const one = await localStorage.getItem(localStorageKeys.presets.one);
  const two = await localStorage.getItem(localStorageKeys.presets.two);
  const three = await localStorage.getItem(localStorageKeys.presets.three);
  const samples = await localStorage.getItem(localStorageKeys.unlockedRewards);

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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  await useLocalStorage().setItem(localStorageKeys.presets[key], JSON.stringify(preset));

  return {
    key,
    preset,
  };
};

export const clearPreset = async (key: string): Promise<ClearResponse> => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  await useLocalStorage().removeItem(localStorageKeys.presets[key]);

  return key;
};
