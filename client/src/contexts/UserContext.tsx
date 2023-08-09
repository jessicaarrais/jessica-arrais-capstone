import { createContext } from "react";

export interface User {
  id: String,
  username: String,
  first_name: String,
  last_name: String,
  email: String,
  has_privileges: Boolean,
};

export interface Property {
  id: String,
  user_id: String,
  address: String,
  city: String,
  state: String,
  country: String,
  area: String,
  price: String,
  fees: String,
  availability: String,
  bedrooms: String,
  bathrooms: String,
  description: String,
  features: String,
  amenities: String,
  pictures: String,
  created_at: String,
  updated_at: String,
  type: String,
  pets: Number,
  lat: Number,
  lng: Number,
};

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
