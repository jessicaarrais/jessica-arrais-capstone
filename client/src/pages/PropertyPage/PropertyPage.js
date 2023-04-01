import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PropertyPage() {
  const [property, setProperty] = useState();
  const { propertyId } = useParams();

  useEffect(() => {
    const fetch = async () => {
      try {
        const property = await axios.get(
          `http://localhost:8080/api/properties/${propertyId}`
        );
        setProperty(property.data);
      } catch (err) {
        console.error(`Failed retrieving property. Error: ${err}`);
      }
    };

    fetch();
  }, [propertyId]);

  return (
    <main>
      {property && (
        <>
          <h1>PropertyPage</h1>
          <h3>{property.price}</h3>
          <p>{`${property.address}, ${property.city} - ${property.country}`}</p>
          <p>{property.area}</p>
          <p>{property.fees}</p>
          <p>{property.availability}</p>
          <p>{property.bedrooms}</p>
          <p>{property.bathrooms}</p>
          <p>{property.description}</p>
          <p>{property.features}</p>
          <p>{property.amenities}</p>
          <p>{property.pictures}</p>
          <p>{property.first_name}</p>
          <p>{property.email}</p>
        </>
      )}
    </main>
  );
}
