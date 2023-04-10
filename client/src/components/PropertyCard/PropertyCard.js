import axios from "axios";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import placeholderImg from "../../assets/images/placeholder-img.jpg";
import ruleIcon from "../../assets/icons/rule-icon.png";
import bedIcon from "../../assets/icons/bed-icon.png";
import deleteIcon from "../../assets/icons/delete-icon.png";
import "./PropertyCard.scss";

export default function PropertyCard({ property, index }) {
  const { id, price, address, city, features, bedrooms, area, pictures } =
    property;
  const { user, registerProperties } = useContext(UserContext);

  useEffect(() => {
    const avatarGenerator = async () => {
      try {
        const pic = await axios.get(
          `https://api.unsplash.com/photos/random?client_id=KV0k1z9ZD3wpJhxCbAVYC2NawiXsS2jybx77t9C6wL0`
        );

        console.log(pic.data.urls.small);
      } catch (err) {
        console.error(err);
      }
    };
    // const pictures = avatarGenerator();
  }, []);

  const handleOnDelete = async (e) => {
    e.preventDefault();

    try {
      const userProperties = await axios.delete(
        `http://localhost:8080/api/properties/${property.id}/${user.id}/delete`
      );

      registerProperties(userProperties.data);
    } catch (err) {
      console.error(`Failed deleting property. Error: ${err}`);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <Link to={`/listings/property/${id}`}>
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
        {user?.id === property?.user_id && (
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
