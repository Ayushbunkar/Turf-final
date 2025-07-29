import { useState } from "react";

const Test = () => {
  const [coords, setCoords] = useState({});
  const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ latitude, longitude });
        },
        (error) => {
          console.error("Error fetching location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const getGoTurfLocation = () => {
    handleGetLocation();

    const Tolat =  23.287404;
    const Tolon =  77.326699;
    const FromLat = coords.latitude;
    const FromLon = coords.longitude;
    

    console.log("Latitude:", FromLat, Tolat);
    console.log("Longitude:", FromLon, Tolon);

    window.location.href = `https://www.google.com/maps/dir/?api=1&origin=${FromLat},${FromLon}&destination=${Tolat},${Tolon}`;

  };

  return (
    <div className="p-5">
      <button
        className="border p-2 rounded mt-20"
        onClick={handleGetLocation}
      >
        Get my location
      </button>

      <button
        className="border p-2 rounded mt-20"
        onClick={getGoTurfLocation}
      >
        Go turf
      </button>
    </div>
  );
};

export default Test;
