import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/FormInput/FormInput";
import Button from "../../components/Button/Button";
import "./ProfilePage.scss";

export default function ProfilePage({ user, properties }) {
  const [inputValues, setInputValues] = useState({
    user_id: user.id,
    address: "",
    city: "",
    state: "",
    country: "",
    area: "",
    price: "",
    fees: "",
    availability: "",
    bedrooms: "",
    bathrooms: "",
    description: "",
    features: "",
    amenities: "",
    pictures:
      "https%3A%2F%2Fcharlotte.axios.com%2F313890%2Fhot-homes-5-houses-for-sale-in-charlotte-ranging-from-299k-to-2-2m%2F",
    type: "",
    pets: false,
    lat: 40.724883,
    lng: -73.996209,
  });
  const navigate = useNavigate();
  console.log(inputValues);

  useEffect(() => {
    if (!user) navigate("/");
  }, []);

  const handleOnChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:8080/api/properties/add`, {
        ...inputValues,
        type: e.target.type.value,
        pets: Boolean(e.target.pets.value),
        availability: e.target.availability.value,
      });
      alert("Property listed");
    } catch (err) {
      console.error(`Failed. Error: ${err}`);
    }
  };

  return (
    <main className="profile">
      <div className="profile__body">
        <section className="profile__profile">
          <h2 className="profile__page-header">{`Welcome back, ${user.first_name} ${user.last_name}! List a property!`}</h2>
        </section>
        {user.has_privileges === 1 && (
          <>
            <section>
              {/* {properties && properties.map((prop) => <p>{prop.city}</p>)} */}
            </section>
            <section>
              {/* <h2 className="listing-form__subheader">List a property!</h2> */}
              <form className="listing-form" onSubmit={handleOnSubmit}>
                <div className="listing-form__left-side">
                  <FormInput
                    label="Address :"
                    name="address"
                    type="text"
                    value={inputValues.address}
                    handleOnChange={handleOnChange}
                  />
                  <FormInput
                    label="City :"
                    name="city"
                    type="text"
                    value={inputValues.city}
                    handleOnChange={handleOnChange}
                  />
                  <FormInput
                    label="State :"
                    name="state"
                    type="text"
                    value={inputValues.state}
                    handleOnChange={handleOnChange}
                  />
                  <FormInput
                    label="Country :"
                    name="country"
                    type="text"
                    value={inputValues.country}
                    handleOnChange={handleOnChange}
                  />
                  <FormInput
                    label="Area :"
                    name="area"
                    type="text"
                    value={inputValues.area}
                    handleOnChange={handleOnChange}
                  />
                  <FormInput
                    label="Price :"
                    name="price"
                    type="text"
                    value={inputValues.price}
                    handleOnChange={handleOnChange}
                  />
                  <FormInput
                    label="Fees :"
                    name="fees"
                    type="text"
                    value={inputValues.fees}
                    handleOnChange={handleOnChange}
                  />
                  <div>
                    <label
                      className="listing-form__label"
                      htmlFor="availability"
                    >
                      Select a date :
                    </label>
                    <input
                      className="listing-form__input"
                      name="availability"
                      type="date"
                    />
                  </div>
                </div>
                <div className="listing-form__right-side">
                  <FormInput
                    label="Bedrooms :"
                    name="bedrooms"
                    type="number"
                    value={inputValues.bedrooms}
                    handleOnChange={handleOnChange}
                  />
                  <FormInput
                    label="Bathrooms :"
                    name="bathrooms"
                    type="number"
                    value={inputValues.bathrooms}
                    handleOnChange={handleOnChange}
                  />
                  <FormInput
                    label="Description :"
                    name="description"
                    type="text"
                    value={inputValues.description}
                    handleOnChange={handleOnChange}
                  />
                  <FormInput
                    label="Features :"
                    name="features"
                    type="text"
                    value={inputValues.features}
                    handleOnChange={handleOnChange}
                  />
                  <FormInput
                    label="Amenities :"
                    name="amenities"
                    type="text"
                    value={inputValues.amenities}
                    handleOnChange={handleOnChange}
                  />
                  <div>
                    <label className="listing-form__label" htmlFor="type">
                      Choose a type :
                    </label>
                    <select className="listing-form__input" name="type">
                      <option value="apartment">Apartment</option>
                      <option value="house">House</option>
                    </select>
                  </div>

                  <div>
                    <label className="listing-form__label">Pets :</label>
                    <div className="listing-form__options-box">
                      <label
                        className="listing-form__label listing-form__label--option"
                        htmlFor="allowed"
                      >
                        Allowed
                      </label>
                      <input
                        className="listing-form__radio"
                        id="allowed"
                        name="pets"
                        type="radio"
                        value={true}
                      />
                      <label
                        className="listing-form__label listing-form__label--option"
                        htmlFor="notAllowed"
                      >
                        Not Allowed
                      </label>
                      <input
                        className="listing-form__radio"
                        id="notAllowed"
                        name="pets"
                        type="radio"
                        value={false}
                      />
                    </div>
                  </div>
                </div>
                <Button emphasis="high-emphasis" text="SAVE" type="submit" />
              </form>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
