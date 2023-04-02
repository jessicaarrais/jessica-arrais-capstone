import { Link } from "react-router-dom";
import placeholderImg from "../../assets/images/placeholder-img.jpg";
import ruleIcon from "../../assets/icons/rule-icon.png";
import bedIcon from "../../assets/icons/bed-icon.png";
import "./PropertyCard.scss";

export default function PropertyCard({ property }) {
  const { id, price, address, city, features, bedrooms, area } = property;

  return (
    <Link to={`property/${id}`}>
      <div className="property-card">
        <img
          className="property-card__img"
          src={placeholderImg}
          alt="property's exterior"
        />
        <div className="property-card__text-content">
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
      </div>
    </Link>
  );
}
