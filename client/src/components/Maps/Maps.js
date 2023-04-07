import { useEffect, useRef } from "react";
import "./Maps.scss";

export default function Maps({ filteredProperties }) {
  const ref = useRef();

  // Each marker is labeled with a single alphabetical character.
  const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let labelIndex = 0;

  // Adds a marker to the map.
  function addMarker(location, map, price) {
    const contentString = `<div id="content">${price}</div>`;

    const infowindow = new window.google.maps.InfoWindow({
      content: contentString,
      ariaLabel: price,
    });

    // from the array of prices labels.
    const marker = new window.google.maps.Marker({
      position: location,
      label: labels[labelIndex++ % labels.length],
      map: map,
      title: "Exp NY",
    });

    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map,
      });
    });
  }

  useEffect(() => {
    const map = new window.google.maps.Map(ref.current, {
      center: {
        lat: 40.724787,
        lng: -73.99449,
      },
      zoom: 10,
    });

    // window.google.maps.event.addListener(map, "click", (event) => {
    //   addMarker(event.latLng, map);
    // });

    filteredProperties.forEach((prop) => {
      addMarker(
        {
          lat: prop.lat,
          lng: prop.lng,
        },
        map,
        prop.price
      );
    });
  });

  return <div ref={ref} className="map" />;
}
