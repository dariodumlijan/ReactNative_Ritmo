import useLocale from '@locales';

export type Sample = {
  label: string,
  hihatSound: string,
  snareSound: string,
  kickSound: string,
};

export type TimeSig = {
  label: string,
  value: string,
};

export type Lists = {
  samples: Sample[],
  timeSignatures: TimeSig[],
};

export const getSamples = (): Sample[] => ([
  {
    label: 'Acoustic',
    hihatSound: 'acoustic_hihat.mp3',
    snareSound: 'acoustic_snare.mp3',
    kickSound: 'acoustic_kick.mp3',
  },
  {
    label: 'Hip-hop',
    hihatSound: 'hiphop_hihat.mp3',
    snareSound: 'hiphop_snare.mp3',
    kickSound: 'hiphop_kick.mp3',
  },
  {
    label: 'Trap',
    hihatSound: 'trap_hihat.mp3',
    snareSound: 'trap_snare.mp3',
    kickSound: 'trap_kick.mp3',
  },
  {
    label: 'Lo-fi',
    hihatSound: 'lofi_hihat.mp3',
    snareSound: 'lofi_snare.mp3',
    kickSound: 'lofi_kick.mp3',
  },
  {
    label: 'Latin',
    hihatSound: 'latin_hihat.mp3',
    snareSound: 'latin_snare.mp3',
    kickSound: 'latin_kick.mp3',
  },
  {
    label: 'African 1',
    hihatSound: 'african1_hihat.mp3',
    snareSound: 'african1_snare.mp3',
    kickSound: 'african1_kick.mp3',
  },
  {
    label: 'African 2',
    hihatSound: 'african2_hihat.mp3',
    snareSound: 'african2_snare.mp3',
    kickSound: 'african2_kick.mp3',
  },
  {
    label: 'Toms',
    hihatSound: 'toms_hihat.mp3',
    snareSound: 'toms_snare.mp3',
    kickSound: 'toms_kick.mp3',
  },
  {
    label: 'Epic Toms',
    hihatSound: 'epictoms_hihat.mp3',
    snareSound: 'epictoms_snare.mp3',
    kickSound: 'epictoms_kick.mp3',
  },
  {
    label: 'Taiko',
    hihatSound: 'taiko_hihat.mp3',
    snareSound: 'taiko_snare.mp3',
    kickSound: 'taiko_kick.mp3',
  },
]);

export const getTimeSignatures = (t: Function): TimeSig[] => ([
  { label: t('settings.time_sig_options.option_1'), value: 'Free' },
  { label: t('settings.time_sig_options.option_2'), value: '4/4' },
  { label: t('settings.time_sig_options.option_3'), value: '3/4' },
]);

const useSelectLists = (): Lists => {
  const { t } = useLocale();

  return {
    samples: getSamples(),
    timeSignatures: getTimeSignatures(t),
  };
};

export default useSelectLists;
