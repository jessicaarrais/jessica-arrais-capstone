import { createContext } from "react";
import { Property } from "./UserContext";

export type PropertiesContextType = {
  allProperties: Property[] | null,
  registerAllProperties: (properties: Property[]) => void,
  unregisterAllProperties: () => void,
}

const PropertiesContext = createContext<PropertiesContextType | null>(null);

export default PropertiesContext;
