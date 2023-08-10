import { createContext } from "react";

export interface User {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  has_privileges: boolean | number;
}

export interface Property {
  id: string;
  user_id: string;
  address: string;
  city: string;
  state: string;
  country: string;
  area: string;
  price: string;
  fees: string;
  availability: string;
  bedrooms: string;
  bathrooms: string;
  description: string;
  features: string;
  amenities: string;
  pictures: string;
  created_at: string;
  updated_at: string;
  type: string;
  pets: number;
  lat: number;
  lng: number;
}

export interface UserContextType {
  user: User | null;
  registerUser: (user: User) => void;
  unregisterUser: () => void;
  properties: Property[] | null;
  registerProperties: (properties: Property[]) => void;
  unregisterProperties: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export default UserContext;
