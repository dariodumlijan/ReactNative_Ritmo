/* eslint-disable no-undef -- jest is not defined and cannot be */
import * as ReactNative from 'react-native';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock';

afterEach(() => {
  jest.clearAllMocks();
});

jest.useFakeTimers();

jest.doMock('react-native', () => Object.setPrototypeOf(
  {
    NativeModules: {
      ...ReactNative.NativeModules,
      RNAppModule: {
        addListener: jest.fn(),
        removeListeners: jest.fn(),
        eventsAddListener: jest.fn(),
        eventsNotifyReady: jest.fn(),
      },
    },
    TurboModuleRegistry: {
      getEnforcing: () => ({
        initialize: jest.fn(),
        setRequestConfiguration: jest.fn(),
        openAdInspector: jest.fn(),
        openDebugMenu: jest.fn(),
      }),
    },
  },
  ReactNative,
));

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native-device-info', () => mockRNDeviceInfo);

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('react-native-linear-gradient', () => 'LinearGradient');

jest.mock('react-native-in-app-review', () => ({
  RequestInAppReview: jest.fn(),
  isAvailable: jest.fn(),
}));

jest.mock('react-native-share', () => ({
  default: jest.fn(),
}));

jest.mock('react-native-fs', () => ({
  mkdir: jest.fn(),
  moveFile: jest.fn(),
  copyFile: jest.fn(),
  pathForBundle: jest.fn(),
  pathForGroup: jest.fn(),
  getFSInfo: jest.fn(),
  getAllExternalFilesDirs: jest.fn(),
  unlink: jest.fn(),
  exists: jest.fn(),
  stopDownload: jest.fn(),
  resumeDownload: jest.fn(),
  isResumable: jest.fn(),
  stopUpload: jest.fn(),
  completeHandlerIOS: jest.fn(),
  readDir: jest.fn(),
  readDirAssets: jest.fn(),
  existsAssets: jest.fn(),
  readdir: jest.fn(),
  setReadable: jest.fn(),
  stat: jest.fn(),
  readFile: jest.fn(),
  read: jest.fn(),
  readFileAssets: jest.fn(),
  hash: jest.fn(),
  copyFileAssets: jest.fn(),
  copyFileAssetsIOS: jest.fn(),
  copyAssetsVideoIOS: jest.fn(),
  writeFile: jest.fn(),
  appendFile: jest.fn(),
  write: jest.fn(),
  downloadFile: jest.fn(),
  uploadFiles: jest.fn(),
  touch: jest.fn(),
  MainBundlePath: jest.fn(),
  CachesDirectoryPath: jest.fn(),
  DocumentDirectoryPath: jest.fn(),
  ExternalDirectoryPath: jest.fn(),
  ExternalStorageDirectoryPath: jest.fn(),
  TemporaryDirectoryPath: jest.fn(),
  LibraryDirectoryPath: jest.fn(),
  PicturesDirectoryPath: jest.fn(),
}));

jest.mock('react-native-sound', () => {
  class SoundMock {}

  SoundMock.prototype.setVolume = jest.fn();
  SoundMock.prototype.setNumberOfLoops = jest.fn();
  SoundMock.prototype.play = jest.fn();
  SoundMock.prototype.stop = jest.fn();

  SoundMock.setCategory = jest.fn();

  return SoundMock;
});

jest.mock('@miblanchard/react-native-slider', () => ({
  Slider: 'Slider',
}));

jest.mock('react-native-json-tree', () => 'JSONTree');

jest.mock('axios', () => {
  const mockAxios = jest.genMockFromModule('axios');

  return {
    create: jest.fn(() => mockAxios),
  };
});
