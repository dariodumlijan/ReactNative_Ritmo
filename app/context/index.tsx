import { createContext } from 'react';

export const PortalContext = createContext({
  teleport: (element) => element,
  close: () => {},
});
