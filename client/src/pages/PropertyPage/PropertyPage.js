import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MapsWrapper from "../../components/MapsWrapper/MapsWrapper";
import propImage from "../../assets/images/placeholder-img.jpg";
import "./PropertyPage.scss";
import MarkerMaps from "../../components/MarkerMaps/MarkerMaps";

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
    <main className="property">
      <section className="property__section">
        <div className="property__images">
          <img className="property__img" src={propImage} alt="property" />
          <img className="property__img" src={propImage} alt="property" />
          <img className="property__img" src={propImage} alt="property" />
          <img className="property__img" src={propImage} alt="property" />
        </div>
        {property && (
          <div className="property__content">
            <div className="property__left-side">
              <h1 className="property__page-header">{property.price}</h1>
              <p className="property__text property__text--description">
                {property.description}
              </p>
              <p className="property__text property__text--address">{`${property.address}, ${property.city} - ${property.country}`}</p>
              <div>
                <h3 className="property__label">Area : </h3>
                <p>{property.area}</p>
              </div>
              <div>
                <h3 className="property__label">Fees : </h3>
                <p>{property.fees}</p>
              </div>
              <div>
                <h3 className="property__label">Avaailibility : </h3>
                <p>{property.availability}</p>
              </div>
              <div>
                <h3 className="property__label">Bedrroms : </h3>
                <p>{property.bedrooms}</p>
              </div>
              <div>
                <h3 className="property__label">Bathrooms : </h3>
                <p>{property.bathrooms}</p>
              </div>
              <div>
                <h3 className="property__label">Features: </h3>
                <p>{property.features}</p>
              </div>
              <div>
                <h3 className="property__label">Amenities: </h3>
                <p>{property.amenities}</p>
              </div>
            </div>
            <div className="property__right-side">
              <div className="property__map">
                <MapsWrapper>
                  <MarkerMaps filteredProperties={[property]} />
                </MapsWrapper>
              </div>
              <div className="property__contact">
                <p>{property.first_name}</p>
                <p>{property.email}</p>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
