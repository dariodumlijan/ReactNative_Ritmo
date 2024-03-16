import { Dimensions, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Admob, { AdsConsent, AdsConsentStatus, MaxAdContentRating } from 'react-native-google-mobile-ads';
import {
  every, flatten, floor, includes, values,
} from 'lodash';
import type { Option } from '../components/elements/inputs/Select';
import type { Beats } from '../sound/beats';

type DeviceInfoType = {
  isApple: boolean,
  isTablet: boolean,
  isiPhone: boolean,
  isRealDevice?: boolean,
};

export const isApple: boolean = Platform.OS === 'ios';
export const isTablet: boolean = DeviceInfo.isTablet();
export const isiPhone: boolean = isApple && !isTablet;
export const deviceInfo: DeviceInfoType = {
  isApple,
  isTablet,
  isiPhone,
};
export const deviceWidth: number = Dimensions.get('screen').width;
export const deviceHeight: number = Dimensions.get('screen').height;

export const getDeviceInfo = async (): Promise<DeviceInfoType> => {
  const isEmulator = await DeviceInfo.isEmulator();
  deviceInfo.isRealDevice = !isEmulator;

  return deviceInfo;
};

export const isPromise = (p: any): boolean => !!p && typeof p.then === 'function';

export const isSampleUnlocked = (unlockedSamples: string[], sample: Option): boolean => includes(unlockedSamples, sample.label);

export const isBeatEmpty = (beats: Beats): boolean => every(flatten(values(beats)), ['checked', false]);

export const calcBpmInterval = (bpm: number): number => floor(240000 / bpm);

export const calcPulseInterval = (bpmInterval: number): number => floor(bpmInterval / 8);

export const calcSoundDelay = (initAngle: number, sliderVal?: number, useBPM?: number): number => {
  const bpm = useBPM || 100;
  const slider = sliderVal || 0;
  const bpmInterval = calcBpmInterval(bpm);
  const bpmAdjust = (60 / bpm) * 4;
  const delayDegree = (1000 * bpmAdjust) / 360;
  const calcDelay = delayDegree * slider;
  const beatDelay = delayDegree * initAngle + calcDelay;

  return floor(beatDelay > bpmInterval ? beatDelay - bpmInterval : beatDelay);
};

type AdsResponse = {
  showAds: boolean,
  personalisedAds: boolean,
};

export const checkAdsConsent = async (): Promise<AdsResponse> => {
  const { selectPersonalisedAds, storeAndAccessInformationOnDevice } = await AdsConsent.getUserChoices();

  return {
    showAds: storeAndAccessInformationOnDevice,
    personalisedAds: selectPersonalisedAds,
  };
};

export const handleAdsConsent = async (): Promise<AdsResponse> => {
  const consentInfo = await AdsConsent.requestInfoUpdate();
  const consentObtained = consentInfo.status === AdsConsentStatus.OBTAINED;
  const consentRequired = consentInfo.status === AdsConsentStatus.REQUIRED;

  if (consentObtained) {
    const { showAds, personalisedAds } = await checkAdsConsent();

    return {
      showAds,
      personalisedAds,
    };
  }

  if (consentInfo.isConsentFormAvailable && consentRequired) {
    await AdsConsent.showForm();
    const { showAds, personalisedAds } = await checkAdsConsent();

    return {
      showAds,
      personalisedAds,
    };
  }

  return {
    showAds: true,
    personalisedAds: true,
  };
};

export const initializeAds = async (): Promise<AdsResponse> => {
  try {
    await Admob().setRequestConfiguration({
      maxAdContentRating: MaxAdContentRating.G,
      tagForUnderAgeOfConsent: true,
    });
    await Admob().initialize();
    const response = await handleAdsConsent();

    return response;
  } catch {
    return {
      showAds: false,
      personalisedAds: false,
    };
  }
};
