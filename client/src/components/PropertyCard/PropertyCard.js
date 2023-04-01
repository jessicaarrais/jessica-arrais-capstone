import placeholderImg from "../../assets/images/placeholder-img.jpg";

export default function PropertyCard({ price, address, city, features }) {
  return (
    <div>
      <img src={placeholderImg} alt="property's exterior" />
      <h3>{price}</h3>
      <p>{`${address}, ${city}`}</p>
      <p>{features}</p>
    </div>
  );
}
