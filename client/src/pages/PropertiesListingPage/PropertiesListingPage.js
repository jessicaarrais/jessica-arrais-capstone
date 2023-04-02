import { useEffect, useState } from "react";
import axios from "axios";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import "./PropertiesListingPage.scss";

export default function PropertiesListingPage() {
  const [properties, setProperties] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        const properties = await axios.get(
          `http://localhost:8080/api/properties`
        );
        setProperties(properties.data);
      } catch (err) {
        console.error(`Faild retrieving properties list. Error: ${err}`);
      }
    };

    fetch();
  }, []);

  return (
    <main className="property-list">
      {properties &&
        properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
    </main>
  );
}
