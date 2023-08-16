import { Wrapper, Status } from "@googlemaps/react-wrapper";

export default function MapsWrapper(props: { children: React.ReactNode }) {
  const render = (status: Status) => {
    if (status === Status.FAILURE) return <h1>Error</h1>;
    return <h1>Loading...</h1>;
  };

  const apiKey = process.env.REACT_APP_MAPS_API_KEY;

  return (
    <>
      {apiKey && (
        <Wrapper apiKey={apiKey} render={render}>
          {props.children}
        </Wrapper>
      )}
    </>
  );
}
