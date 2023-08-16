import React, { useState, useMemo } from "react";
import PropertiesContext, { PropertiesContextType } from "./PropertiesContext";
import { Property } from "./UserContext";

export default function PropertiesContextProvider(props: { children: React.ReactNode }) {
  const [allProperties, setAllProperties] = useState<Property[] | null>(null);

  const contextValue: PropertiesContextType = useMemo(
    () => ({
      allProperties,
      registerAllProperties: (properties) => {
        setAllProperties(properties);
      },
      unregisterAllProperties: () => {
        setAllProperties(null);
      },
    }),
    [allProperties]
  );

  return (
    <PropertiesContext.Provider value={contextValue}>
      {props.children}
    </PropertiesContext.Provider>
  );
}
