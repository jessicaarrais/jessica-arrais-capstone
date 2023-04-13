import { useState, useMemo } from "react";
import MapsContext from "./MapsContext";

export default function MapsContextProvider(props) {
  const [renderedMaps, setRenderedMaps] = useState(null);

  const contextValue = useMemo(
    () => ({
      renderedMaps,
      registerMaps: (map) => {
        setRenderedMaps(map);
      },
      unregisterMaps: () => {
        setRenderedMaps(null);
      },
    }),
    []
  );

  return (
    <MapsContext.Provider value={contextValue}>
      {props.children}
    </MapsContext.Provider>
  );
}
