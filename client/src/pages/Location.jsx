import { useState } from "react";

const Location = () => {
  const [coords, setCoords] = useState({});
  const goToTurfWithLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const Tolat = 23.287404;
          const Tolon = 77.326699;
          window.location.href = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${Tolat},${Tolon}`;
        },
        (error) => {
          alert("Error fetching location: " + error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="p-5">
      <button
        className="border p-2 rounded mt-20"
        onClick={goToTurfWithLocation}
      >
        Go turf
      </button>
    </div>
  );
};
// adfs
export default Location;
