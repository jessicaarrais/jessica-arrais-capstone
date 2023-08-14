// @ts-nocheck

import { useEffect, useRef, useState } from "react";
import "./MarkerMaps.scss";

export default function MarkerMaps({ filteredProperties }) {
  const [renderedMap, setRenderedMap] = useState(null);
  const prevMarkersRef = useRef([]);
  const ref = useRef();
  // Each marker is labeled with its index value.
  let labelIndex = 0;

  const mapOptions = {
    center: {
      lat: filteredProperties?.[0]?.lat || 40.782864,
      lng: filteredProperties?.[0]?.lng || -73.965355,
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
      map,
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

    return marker;
  }

  const addMarkerToProperties = (map) => {
    filteredProperties?.forEach((prop) => {
      const marker = addMarker(
        {
          lat: prop.lat,
          lng: prop.lng,
        },
        map,
        prop.price,
        prop.id
      );
      prevMarkersRef.current.push(marker);
    });
  };

  function clearMarkers(markers) {
    for (let m of markers) {
      m.setMap(null);
    }
  }

  useEffect(() => {
    console.log("check");
    if (!renderedMap) {
      const tempMap = new window.google.maps.Map(ref.current, mapOptions);
      setRenderedMap(tempMap);
      addMarkerToProperties(tempMap);
    } else {
      clearMarkers(prevMarkersRef.current);
      addMarkerToProperties(renderedMap);
    }
  }, [filteredProperties, renderedMap]);

  return <div ref={ref} className="marker-maps" />;
}
