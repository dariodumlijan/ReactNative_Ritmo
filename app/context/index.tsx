import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';

type UsePortal = {
  teleport: (element: ReactNode) => void,
  close: () => void,
};

export const PortalContext = createContext<UsePortal>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  teleport: (element: ReactNode) => undefined,
  close: () => undefined,
});

export const useTeleport = () => useContext(PortalContext);
