import { Wrapper, Status } from "@googlemaps/react-wrapper";

export default function MapsWrapper({ children }) {
  const render = (status) => {
    if (status === Status.FAILURE) return <h1>Error</h1>;
    return <h1>Loading...</h1>;
  };

  return (
    <Wrapper apiKey="AIzaSyDDI5_IX46u4HqwoYMx2iG7y4O1AHuU31w" render={render}>
      {children}
    </Wrapper>
  );
}
