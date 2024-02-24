import { config } from '../../../tokens';

type Props = {
  children: any,
};

function ConditionalAd(props: Props): any {
  if (!config.ads) return null;

  return props.children;
}

export default ConditionalAd;
