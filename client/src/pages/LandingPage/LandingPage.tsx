import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import aptIcon from "../../assets/icons/apt-icon.png";
import houseIcon from "../../assets/icons/house-icon.png";
import petIcon from "../../assets/icons/pet-icon.png";
import "./LandingPage.scss";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <main className="landing-page">
      <div className="landing-page__body">
        <h1 className="landing-page__page-header">Find your new place!</h1>
        <input
          className="landing-page__searchbar"
          type="text"
          // onChange={handleOnSearch}
          // value={searchKeyword}
          placeholder="Where?"
        />
        <div className="landing-page__filters">
          <input className="landing-page__calendar" type="date" />
          <Button
            icon={houseIcon}
            emphasis="low-emphasis"
            // handleOnClick={(e) => handleOnFilter(e, "type", "house")}
          />
          <Button
            icon={aptIcon}
            emphasis="low-emphasis"
            // handleOnClick={(e) => handleOnFilter(e, "type", "apartment")}
          />
          <Button
            icon={petIcon}
            emphasis="low-emphasis"
            // handleOnClick={(e) => handleOnFilter(e, "pets", 1)}
          />
          <Button
            emphasis="low-emphasis"
            text="Price $"
            // handleOnClick={(e) => handleOnSort(e, "lower")}
          />
          <Button
            emphasis="low-emphasis"
            text="Price $$$$"
            // handleOnClick={(e) => handleOnSort(e, "higher")}
          />
        </div>
        <Button
          text="Check Our Properties"
          emphasis="high-emphasis"
          handleOnClick={() => navigate("/listings")}
        />
      </div>
    </main>
  );
}
