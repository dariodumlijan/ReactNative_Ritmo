// @flow
import get from 'lodash/get';
// $FlowFixMe
import * as en from './en.json';

type Props = {
  t: Function,
};

const t = (key: string): string => get(en, key, key.toString());

const useLocale = (): Props => ({
  t,
});

export default useLocale;
