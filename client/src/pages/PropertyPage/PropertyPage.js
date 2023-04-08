import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MapsWrapper from "../../components/MapsWrapper/MapsWrapper";
import MarkerMaps from "../../components/MarkerMaps/MarkerMaps";
import Button from "../../components/Button/Button";
import propImage from "../../assets/images/placeholder-img.jpg";
import ruleIcon from "../../assets/icons/rule-icon.png";
import moneyIcon from "../../assets/icons/money-icon.png";
import calendarIcon from "../../assets/icons/calendar-icon.png";
import bedIcon from "../../assets/icons/bed-icon.png";
import showerIcon from "../../assets/icons/shower-icon.png";
import petIcon from "../../assets/icons/pet-icon.png";
import featuresIcon from "../../assets/icons/features-icon.png";
import amenitiesIcon from "../../assets/icons/amenities-icon.png";
import "./PropertyPage.scss";

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
              <h2 className="property__text property__text--address">{`${property.address}, ${property.city} - ${property.country}`}</h2>
              <h3 className="property__subheader">{property.description}</h3>
              <div className="property__grid">
                <div>
                  <img
                    className="property__icon"
                    src={ruleIcon}
                    alt="rule icon"
                  />
                  <h3 className="property__label">Area : </h3>
                  <p>{property.area}</p>
                </div>
                <div>
                  <img
                    className="property__icon"
                    src={moneyIcon}
                    alt="money icon"
                  />
                  <h3 className="property__label">Fees : </h3>
                  <p>{property.fees}</p>
                </div>
                <div>
                  <img
                    className="property__icon"
                    src={calendarIcon}
                    alt="calendar icon"
                  />
                  <h3 className="property__label">Availability : </h3>
                  <p>{property.availability}</p>
                </div>
                <div>
                  <img
                    className="property__icon"
                    src={bedIcon}
                    alt="bed icon"
                  />
                  <h3 className="property__label">Bedrooms : </h3>
                  <p>{property.bedrooms}</p>
                </div>
                <div>
                  <img
                    className="property__icon"
                    src={showerIcon}
                    alt="shower icon"
                  />
                  <h3 className="property__label">Bathrooms : </h3>
                  <p>{property.bathrooms}</p>
                </div>
                <div>
                  <img
                    className="property__icon"
                    src={petIcon}
                    alt="pet icon"
                  />
                  <h3 className="property__label">Pets : </h3>
                  <p>{property.pets === 1 ? "Allowed" : "Not allowed"}</p>
                </div>
                <div>
                  <img
                    className="property__icon"
                    src={featuresIcon}
                    alt="features icon"
                  />
                  <h3 className="property__label">Features: </h3>
                  <p>{property.features}</p>
                </div>
                <div>
                  <img
                    className="property__icon"
                    src={amenitiesIcon}
                    alt="amenities icon"
                  />
                  <h3 className="property__label">Amenities: </h3>
                  <p>{property.amenities}</p>
                </div>
              </div>
            </div>
            <div className="property__right-side">
              <div className="property__map">
                <MapsWrapper>
                  <MarkerMaps filteredProperties={[property]} />
                </MapsWrapper>
              </div>
              <div className="property__contact">
                <p>{`A property offered by ${property.first_name}`}</p>
                <a
                  target="_blank"
                  className="property__email"
                  href={`mailto:${property.email}`}
                >
                  {`Contact via email : ${property.email}`}
                </a>
                <Button text="BOOK A TOUR" emphasis="low-emphasis" />
                <Button text="CHAT WITH OWNER" emphasis="low-emphasis" />
                <Button text="RESERVE" emphasis="high-emphasis" />
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
