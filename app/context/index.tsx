import { createContext } from 'react';

export const PortalContext = createContext({
  teleport: (element: any) => element,
  close: () => {},
});
