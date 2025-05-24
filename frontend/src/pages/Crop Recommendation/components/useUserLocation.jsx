import { useEffect, useState } from "react";

const useUserLocation = () => {
  const [location, setLocation] = useState({ state: null, latitude: null, longitude: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();

          setLocation({
            latitude,
            longitude,
            state: data.address?.state || "State not found",
          });
        } catch (err) {
          setError("Failed to fetch location details.");
        }
      },
      (err) => setError(err.message)
    );
  }, []);

  return { location, error };
};

export default useUserLocation;
