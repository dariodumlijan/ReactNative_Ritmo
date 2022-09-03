/* eslint-disable no-undef -- jest is not defined and cannot be */
import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock';

jest.mock('react-native-device-info', () => mockRNDeviceInfo);
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
