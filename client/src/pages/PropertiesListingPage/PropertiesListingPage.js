import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import PropertiesContext from "../../contexts/PropertiesContext";
import Button from "../../components/Button/Button";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import aptIcon from "../../assets/icons/apt-icon.png";
import houseIcon from "../../assets/icons/house-icon.png";
import petIcon from "../../assets/icons/pet-icon.png";
import "./PropertiesListingPage.scss";

export default function PropertiesListingPage() {
  const { allProperties, registerAllProperties } =
    useContext(PropertiesContext);
  const [filteredProperties, setFilteredProperties] = useState();
  const [sort, setSort] = useState();
  // const [params, setParams] = useState("");
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
  }, []);

  const handleOnSearch = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleOnFilter = (query, value) => {
    // const searchParams = createSearchParams(params);

    // if (params.includes(query)) searchParams.delete(query);
    // else searchParams.append(query, value);

    // setParams(searchParams.toString());

    // navigate({
    //   pathname: "/listings",
    //   search: searchParams.toString(),
    // });

    const newFilter = allProperties.filter((prop) => {
      console.log(prop[query], value);
      return prop[query] === value;
    });
    console.log(newFilter);

    setFilteredProperties(newFilter);
  };

  return (
    <main className="property-list">
      <div className="property-list__filters">
        <input
          className="property-list__searchbar"
          type="text"
          onChange={handleOnSearch}
          placeholder="Search for city"
        />

        <Button
          icon={houseIcon}
          emphasis="low-emphasis"
          handleOnClick={() => handleOnFilter("type", "house")}
        />
        <Button
          icon={aptIcon}
          emphasis="low-emphasis"
          handleOnClick={() => handleOnFilter("type", "apartment")}
        />
        <Button
          icon={petIcon}
          emphasis="low-emphasis"
          handleOnClick={() => handleOnFilter("pets", 1)}
        />
        <Button
          emphasis="low-emphasis"
          text="Price $"
          handleOnClick={() => setSort("lower")}
        />
        <Button
          emphasis="low-emphasis"
          text="Price $$$$"
          handleOnClick={() => setSort("higher")}
        />
        <Button
          emphasis="low-emphasis"
          text="Clear"
          handleOnClick={() => {
            navigate("/listings");
            setFilteredProperties(allProperties);
            setSort("");
          }}
        />
      </div>
      <section className="property-list__section">
        <div className="property-list__list">
          {filteredProperties &&
            filteredProperties
              .filter((prop) => prop.city.toLowerCase().includes(searchKeyword))
              .sort((propA, propB) => {
                console.log(propA.price, propB.price);
                console.log(propA.price > propB.price);
                console.log(sort);
                if (sort === "lower")
                  return propA.price.localeCompare(propB.price);
                else if (sort === "higher")
                  return propB.price.localeCompare(propA.price);
              })
              .map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
        </div>
        <div className="property-list__map">Maps</div>
      </section>
    </main>
  );
}
