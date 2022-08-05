// @flow
import { getItem, removeItem, setItem } from './hooks';
import { localStorageKeys } from '../tokens';
import type { Preset } from '../store/globalStore';

export type FetchResponse = {
  presets: {
    one: Preset|null,
    two: Preset|null,
    three: Preset|null,
  },
  unlockedSamples: string[],
  rewardedAt: number|null,
};

export type WriteResponse = {
  key: string,
  preset: Preset,
};

export type SaveRewardsResponse = {
  unlockedSamples?: string[],
  rewardedAt: number,
};

export type ClearResponse = string;

export const fetchPresetAndSamples = async (): Promise<FetchResponse> => {
  const one = await getItem(localStorageKeys.presets.one);
  const two = await getItem(localStorageKeys.presets.two);
  const three = await getItem(localStorageKeys.presets.three);
  const samples = await getItem(localStorageKeys.unlockedRewards);
  const rewardedAt = await getItem(localStorageKeys.rewardedAt);

  return {
    presets: {
      one: JSON.parse(one),
      two: JSON.parse(two),
      three: JSON.parse(three),
    },
    unlockedSamples: JSON.parse(samples) || [],
    rewardedAt: JSON.parse(rewardedAt),
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

export const saveRewards = async (rewardedAt: number, unlockedSamples?: string[]): Promise<SaveRewardsResponse> => {
  if (unlockedSamples) await setItem(localStorageKeys.unlockedRewards, JSON.stringify(unlockedSamples));
  await setItem(localStorageKeys.rewardedAt, JSON.stringify(rewardedAt));

  return {
    unlockedSamples,
    rewardedAt,
  };
};

export const clearRewards = async (): Promise<any> => {
  await removeItem(localStorageKeys.unlockedRewards);
  await removeItem(localStorageKeys.rewardedAt);
};
