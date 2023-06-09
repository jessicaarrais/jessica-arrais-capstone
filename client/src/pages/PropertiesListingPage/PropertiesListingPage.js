import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropertiesContext from "../../contexts/PropertiesContext";
import UserContext from "../../contexts/UserContext";
import MapsWrapper from "../../components/MapsWrapper/MapsWrapper";
import MarkerMaps from "../../components/MarkerMaps/MarkerMaps";
import Button from "../../components/Button/Button";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import aptIcon from "../../assets/icons/apt-icon.png";
import houseIcon from "../../assets/icons/house-icon.png";
import petIcon from "../../assets/icons/pet-icon.png";
import "./PropertiesListingPage.scss";

export default function PropertiesListingPage() {
  const { allProperties, registerAllProperties } =
    useContext(PropertiesContext);
  const { properties } = useContext(UserContext);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const properties = await axios.get(
          `http://localhost:8080/api/properties`
        );
        registerAllProperties(properties.data);
        setFilteredProperties(properties.data);
      } catch (err) {
        console.error(`Faild retrieving properties list. Error: ${err}`);
      }
    };

    fetch();
  }, [properties]);

  // Search by city
  const handleOnSearch = (e) => {
    setSearchKeyword(e.target.value);
  };

  // Filters
  const handleOnFilter = (e, query, value) => {
    e.preventDefault();

    const newFilter = allProperties.filter((prop) => {
      return prop[query] === value;
    });

    setFilteredProperties(newFilter);
  };

  // Sort
  const handleOnSort = (e, order) => {
    e.preventDefault();

    const newSort = [...filteredProperties].sort((propA, propB) => {
      if (order === "lower") {
        return propA.price.localeCompare(propB.price);
      } else if (order === "higher") {
        return propB.price.localeCompare(propA.price);
      }
      return propA;
    });

    setFilteredProperties(newSort);
  };

  return (
    <main className="property-list">
      <section className="property-list__filters">
        <input
          className="property-list__searchbar"
          type="text"
          onChange={handleOnSearch}
          value={searchKeyword}
          placeholder="Search by city"
        />

        <Button
          icon={houseIcon}
          emphasis="low-emphasis"
          handleOnClick={(e) => handleOnFilter(e, "type", "house")}
        />
        <Button
          icon={aptIcon}
          emphasis="low-emphasis"
          handleOnClick={(e) => handleOnFilter(e, "type", "apartment")}
        />
        <Button
          icon={petIcon}
          emphasis="low-emphasis"
          handleOnClick={(e) => handleOnFilter(e, "pets", 1)}
        />
        <Button
          emphasis="low-emphasis"
          text="Price $"
          handleOnClick={(e) => handleOnSort(e, "lower")}
        />
        <Button
          emphasis="low-emphasis"
          text="Price $$$$"
          handleOnClick={(e) => handleOnSort(e, "higher")}
        />
        <Button
          emphasis="low-emphasis"
          text="Clear"
          handleOnClick={(e) => {
            e.preventDefault();
            setFilteredProperties(allProperties);
            navigate("/listings");
          }}
        />
      </section>
      {filteredProperties && (
        <section className="property-list__section">
          <div className="property-list__list">
            {filteredProperties
              .filter((prop) => prop.city.toLowerCase().includes(searchKeyword))
              .map((property, index) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  index={index}
                />
              ))}
          </div>
          <div className="property-list__map">
            <MapsWrapper>
              <MarkerMaps filteredProperties={filteredProperties} />
            </MapsWrapper>
          </div>
        </section>
      )}
    </main>
  );
}
