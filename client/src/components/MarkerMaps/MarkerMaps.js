import { useEffect, useRef } from "react";
import "./MarkerMaps.scss";

export default function MarkerMaps({ filteredProperties }) {
  const ref = useRef();
  // Each marker is labeled with its index value.
  let labelIndex = 0;

  const mapOptions = {
    center: {
      lat: filteredProperties?.[0]?.lat,
      lng: filteredProperties?.[0]?.lng,
    },
    zoom: filteredProperties?.length > 1 ? 12 : 15,
  };

  // Adds a marker to the map.
  function addMarker(location, map, price, id) {
    const contentString = `
      <div class="content">${price}</div>
      <a 
        class="content__link" 
        target="_blanket" 
        href="http://localhost:3000/listings/property/${id}"
      >
        Check it out!
      </a>
    `;

    const infoWindow = new window.google.maps.InfoWindow({
      content: contentString,
      ariaLabel: price,
    });

    // Adds label from the array of labels.
    const marker = new window.google.maps.Marker({
      position: location,
      label: String(labelIndex++ % filteredProperties.length),
      map: map,
      title: "Property",
    });

    if (filteredProperties.length > 1) {
      // Adds popup with price and link to preperty page
      marker.addListener("click", () => {
        infoWindow.open({
          anchor: marker,
          map,
        });
      });
    }
  }

  useEffect(() => {
    const map = new window.google.maps.Map(ref.current, mapOptions);

    filteredProperties?.forEach((prop) => {
      addMarker(
        {
          lat: prop.lat,
          lng: prop.lng,
        },
        map,
        prop.price,
        prop.id
      );
    });
  });

  return <div ref={ref} className="marker-maps" />;
}
