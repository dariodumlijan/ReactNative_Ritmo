import { getItem, removeItem, setItem } from './hooks';
import { localStorageKeys } from '../tokens';
import type { Preset, RewardedAt } from '../store/globalStore';
import type { PresetKey } from '../types';

export type FetchResponse = {
  presets: {
    [PresetKey.one]: Preset | null,
    [PresetKey.two]: Preset | null,
    [PresetKey.three]: Preset | null,
  },
  unlockedSamples: string[],
  rewardedAt: RewardedAt,
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
export type UnlockProFeaturesResponse = number;

export const fetchPresetAndSamples = async (): Promise<FetchResponse> => {
  const one = await getItem(localStorageKeys.presets.one);
  const two = await getItem(localStorageKeys.presets.two);
  const three = await getItem(localStorageKeys.presets.three);
  const samples = await getItem(localStorageKeys.unlockedRewards);
  const rewardedAtSamples = await getItem(localStorageKeys.rewardedAtSamples);
  const rewardedAtPro = await getItem(localStorageKeys.rewardedAtPro);

  return {
    presets: {
      one: JSON.parse(one),
      two: JSON.parse(two),
      three: JSON.parse(three),
    },
    unlockedSamples: JSON.parse(samples) || [],
    rewardedAt: {
      samples: JSON.parse(rewardedAtSamples),
      pro: JSON.parse(rewardedAtPro),
    },
  };
};

export const writePreset = async (key: PresetKey, preset: Preset): Promise<WriteResponse> => {
  await setItem(localStorageKeys.presets[key], JSON.stringify(preset));

  return {
    key,
    preset,
  };
};

export const clearPreset = async (key: PresetKey): Promise<ClearResponse> => {
  await removeItem(localStorageKeys.presets[key]);

  return key;
};

export const saveRewards = async (rewardedAt: number, unlockedSamples?: string[]): Promise<SaveRewardsResponse> => {
  if (unlockedSamples) {
    await setItem(localStorageKeys.unlockedRewards, JSON.stringify(unlockedSamples));
  }
  await setItem(localStorageKeys.rewardedAtSamples, JSON.stringify(rewardedAt));

  return {
    unlockedSamples,
    rewardedAt,
  };
};

export const clearRewards = async (): Promise<any> => {
  await removeItem(localStorageKeys.unlockedRewards);
  await removeItem(localStorageKeys.rewardedAtSamples);
};

export const unlockProFeatures = async (): Promise<UnlockProFeaturesResponse> => {
  const rewardedAt = Date.now();
  await setItem(localStorageKeys.rewardedAtPro, JSON.stringify(rewardedAt));

  return rewardedAt;
};

export const lockProFeatures = async (): Promise<any> => {
  await removeItem(localStorageKeys.rewardedAtPro);
};
