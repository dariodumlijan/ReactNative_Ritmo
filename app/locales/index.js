// @flow
import get from "lodash/get";
// $FlowFixMe
import * as en from "./en.json";

const useLocale = (key: string): string => {
  return get(en, key, key.toString());
};

export default useLocale;