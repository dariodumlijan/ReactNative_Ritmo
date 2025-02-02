import React, { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { PortalContext } from '@context';

type Props = {
  children: any,
};

function PortalProvider({ children }: Props) {
  const [component, setComponent] = useState<ReactNode | null>(null);
  const options = useMemo(() => ({
    teleport: (element: ReactNode) => setComponent(element),
    close: () => setComponent(null),
  }), []);

  return (
    <PortalContext.Provider value={options}>
      {component}
      {children}
    </PortalContext.Provider>
  );
}

export default PortalProvider;
