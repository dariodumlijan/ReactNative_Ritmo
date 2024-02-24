import React, { useState } from 'react';
import { PortalContext } from '../../../context';

type Props = {
  children: any,
};

function PortalProvider({ children }: Props) {
  const [component, setComponent] = useState<any>(null);

  const teleport = (element: any) => setComponent(element);
  const close = () => setComponent(null);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <PortalContext.Provider value={{ teleport, close }}>
      {component}
      {children}
    </PortalContext.Provider>
  );
}

export default PortalProvider;
