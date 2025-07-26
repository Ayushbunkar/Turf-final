import axios from "axios";

export async function getDistanceFromGoogleMaps(origin, destination) {
  if (!origin || !destination || !origin.lat || !origin.lng || !destination.lat || !destination.lng) {
    console.error("Invalid origin or destination coordinates", origin, destination);
    return null;
  }
  try {
    const response = await axios.post("/api/maps/distance", { origin, destination });
    const data = response.data;
    if (data.rows && data.rows[0] && data.rows[0].elements && data.rows[0].elements[0].distance) {
      return data.rows[0].elements[0].distance.text;
    }
    return null;
  } catch (error) {
    console.error("Server Distance API error:", error);
    return null;
  }
}
