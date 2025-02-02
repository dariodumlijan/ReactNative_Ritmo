import AsyncStorage from '@react-native-async-storage/async-storage';
import { localStorageKeys } from '@tokens';
import type { Preset } from '@store/globalStore';
import type { PresetKey } from '@types';

export const getItem = async (key: string): Promise<any> => {
  try {
    const response = await AsyncStorage.getItem(key);

    return response;
  } catch (error) {
    Promise.reject(error);
  }
};

export const setItem = async (key: string, data: string) => {
  try {
    await AsyncStorage.setItem(key, data);
  } catch (error) {
    Promise.reject(error);
  }
};

export const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    Promise.reject(error);
  }
};

export const localStorage = {
  getItem,
  setItem,
  removeItem,
};

export type FetchResponse = {
  presets: {
    [PresetKey.one]: Preset | null,
    [PresetKey.two]: Preset | null,
    [PresetKey.three]: Preset | null,
  },
};

export type WriteResponse = {
  key: string,
  preset: Preset,
};

export type ClearResponse = string;
export type UnlockProFeaturesResponse = number;

export const fetchPresets = async (): Promise<FetchResponse> => {
  const one = await getItem(localStorageKeys.presets.one);
  const two = await getItem(localStorageKeys.presets.two);
  const three = await getItem(localStorageKeys.presets.three);

  return {
    presets: {
      one: JSON.parse(one),
      two: JSON.parse(two),
      three: JSON.parse(three),
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
