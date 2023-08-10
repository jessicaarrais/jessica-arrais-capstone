import axios from "axios";
import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext, { Property } from "../../contexts/UserContext";
import ruleIcon from "../../assets/icons/rule-icon.png";
import bedIcon from "../../assets/icons/bed-icon.png";
import deleteIcon from "../../assets/icons/delete-icon.png";
import "./PropertyCard.scss";

export default function PropertyCard({ property, index }: { property: Property, index: number}) {
  const { id, price, address, city, features, bedrooms, area, pictures } =
    property;
  const currentUserContext = useContext(UserContext);

  const handleOnDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userProperties = await axios.delete(
        `http://localhost:8080/api/properties/${property.id}/${currentUserContext?.user?.id}/delete`
      );

      currentUserContext?.registerProperties(userProperties.data);
    } catch (err) {
      console.error(`Failed deleting property. Error: ${err}`);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <Link
      to={`/listings/property/${id}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="property-card">
        <img
          className="property-card__img"
          src={pictures.split(",")[0]}
          alt="property's exterior"
        />
        <div className="property-card__text-content">
          <p className="property-card__body-small">{`Ref. on map: ${index}`}</p>
          <h3 className="property-card__subheader">{price}</h3>
          <p className="property-card__body-large">{`${address}, ${city}`}</p>
          <div className="property-card__info-box flex-center">
            <p className="property-card__body-large flex-center">
              <img
                className="property-card__icon"
                src={ruleIcon}
                alt="rule icon"
              />
              {area}
            </p>
            <p className="property-card__body-large flex-center">
              <img
                className="property-card__icon"
                src={bedIcon}
                alt="bed icon"
              />
              {bedrooms}
            </p>
          </div>
          <p className="property-card__body-large">{features}</p>
        </div>
        {currentUserContext?.user?.id === property?.user_id && (
          <img
            className="property-card__icon property-card__icon--delete"
            src={deleteIcon}
            alt="delete icon"
            onClick={handleOnDelete}
          />
        )}
      </div>
    </Link>
  );
}
