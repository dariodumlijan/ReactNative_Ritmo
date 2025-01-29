import { useState } from 'react';
import enLang from '@locales/en.json';
import get from 'lodash/get';

enum Languages {
  en = 'en',
}

const availableLanguages = {
  [Languages.en]: enLang,
};

type Props = {
  t: Function,
  setLanguage: Function,
};

export const t = (key: string, lng: Languages = Languages.en): string => get(availableLanguages[lng], key, key.toString());

const useLocale = (): Props => {
  const [lng, setLng] = useState(Languages.en);

  return {
    t: (key: string) => t(key, lng),
    setLanguage: (key: any) => setLng(key),
  };
};

export default useLocale;
