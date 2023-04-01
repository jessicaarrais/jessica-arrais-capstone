import { Link } from "react-router-dom";
import placeholderImg from "../../assets/images/placeholder-img.jpg";

export default function PropertyCard({ property }) {
  const { id, price, address, city, features } = property;

  return (
    <Link to={`property/${id}`}>
      <div>
        <img
          style={{ width: "8rem" }}
          src={placeholderImg}
          alt="property's exterior"
        />
        <h3>{price}</h3>
        <p>{`${address}, ${city}`}</p>
        <p>{features}</p>
      </div>
    </Link>
  );
}
