import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Maps from "../../components/Maps/Maps";

export default function MapsWrapper({ filteredProperties }) {
  const render = (status) => {
    if (status === Status.FAILURE) return <h1>Error</h1>;
    return <h1>Loading...</h1>;
  };

  return (
    <Wrapper apiKey="AIzaSyDDI5_IX46u4HqwoYMx2iG7y4O1AHuU31w" render={render}>
      <Maps filteredProperties={filteredProperties} />
    </Wrapper>
  );
}
