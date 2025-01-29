import React, { useMemo, useState } from 'react';
import { PortalContext } from '@context';

type Props = {
  children: any,
};

function PortalProvider({ children }: Props) {
  const [component, setComponent] = useState<JSX.Element | null>(null);

  const teleport = (element: any) => setComponent(element);
  const close = () => setComponent(null);

  const options = useMemo(() => ({ teleport, close }), []);

  return (
    <PortalContext.Provider value={options}>
      {component}
      {children}
    </PortalContext.Provider>
  );
}

export default PortalProvider;
