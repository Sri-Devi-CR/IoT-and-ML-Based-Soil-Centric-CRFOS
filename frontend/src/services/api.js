import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const submitCropRecommendation = async (data) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/crop-recommendation`,
    data
  );
  return response;
};
