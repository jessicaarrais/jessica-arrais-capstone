import { ChangeEvent, FormEvent, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import FormInput from "../../components/FormInput/FormInput";
import Button from "../../components/Button/Button";
import "./ProfilePage.scss";

const latList = [
  40.7851, 40.7589, 40.7589, 40.7484, 40.7127, 40.7061, 40.7527, 40.7587,
  40.5754, 73.9704, 40.8296,
];
const lngList = [
  -73.9683, -73.9851, -73.9857, -74.0134, -73.9969, -73.9772, -73.9787,
  -73.9262,
];

export default function ProfilePage() {
  const currentUserContext = useContext(UserContext);
  const [inputValues, setInputValues] = useState({
    user_id: currentUserContext?.user?.id,
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
    type: "",
    pictures:
      "https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/Stock-Modern-House-In-Twilight-AdobeStock-368976934-copy.jpg",
  });
  const navigate = useNavigate();

  const pictureGenerator = async () => {
    try {
      const pictures = await axios.get(
        `https://api.unsplash.com/photos/random?client_id=KV0k1z9ZD3wpJhxCbAVYC2NawiXsS2jybx77t9C6wL0`
      );

      setInputValues({ ...inputValues, pictures: pictures.data.urls.small });
    } catch (err) {
      console.error(err);
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (
    e: FormEvent<HTMLFormElement> & {
      preventDefault: () => void;
      target: EventTarget & {
        type: { value: string };
        pets: { value: boolean };
        availability: { value: string };
      };
    }
  ) => {
    e.preventDefault();

    try {
      pictureGenerator();
    } catch (err) {
      console.error(`Failed. Error: ${err}`);
    } finally {
      let randomIndex = Math.floor(Math.random() * latList.length);
      const lat = latList[randomIndex];
      const lng = lngList[randomIndex];

      const userProperties = await axios.post(
        `http://localhost:8080/api/properties/${currentUserContext?.user?.id}/add`,
        {
          ...inputValues,
          type: e.target.type.value,
          pets: Boolean(e.target.pets.value),
          availability: e.target.availability.value,
          lat,
          lng,
        }
      );
      currentUserContext?.registerProperties(userProperties.data);
      alert("Property listed");
    }
  };

  if (!currentUserContext?.user) {
    navigate("/");
  }

  return (
    <>
      {currentUserContext?.user && (
        <main className="profile">
          <div className="profile__body">
            <section className="profile__profile">
              <h2 className="profile__page-header">{`Welcome back, ${currentUserContext.user.first_name} ${currentUserContext.user.last_name}! Manage your properties!`}</h2>
            </section>
            {currentUserContext.user.has_privileges === 1 && (
              <>
                <section className="profile__properties">
                  {currentUserContext.properties &&
                    currentUserContext.properties.map((property, index) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        index={index}
                      />
                    ))}
                </section>
                <section>
                  <h2 className="listing-form__subheader">List a property!</h2>
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
                            value="true"
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
                            value="false"
                          />
                        </div>
                      </div>
                    </div>
                    <Button
                      emphasis="high-emphasis"
                      text="SAVE"
                      type="submit"
                    />
                  </form>
                </section>
              </>
            )}
          </div>
        </main>
      )}
    </>
  );
}
