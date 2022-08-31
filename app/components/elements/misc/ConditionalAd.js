// @flow
import type { Node } from 'react';
import { useSelector } from 'react-redux';
import { get, isEqual } from 'lodash';
import { selectors } from '../../../store/cmsStore';
import { deviceInfo } from '../../../utils';
import type { ReduxState } from '../../../types';

type Props = {
  children: Node,
};

function ConditionalAd(props: Props): any {
  const cms = useSelector(selectors.getCMS, isEqual);
  const codepushData = useSelector((state: ReduxState) => state.global.codepushData, isEqual);
  const displayAds = deviceInfo.isRealDevice && codepushData?.environment === 'Production'
    ? get(cms, 'master.ads', false)
    : get(cms, 'master.adsStaging', false);

  if (!displayAds) return null;

  return props.children;
}

export default ConditionalAd;
