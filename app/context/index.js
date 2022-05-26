// @flow
import { createContext } from 'react';
import type { Context, Node } from 'react';

type Props = {
  teleport: Function,
  close: Function,
}

export const PortalContext: Context<Props> = createContext({
  teleport: (element: Node) => element,
  close: () => null,
});
