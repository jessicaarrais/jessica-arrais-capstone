import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <Button
      text="Check Our Properties"
      handleOnClick={() => navigate("/listings")}
    />
  );
}
