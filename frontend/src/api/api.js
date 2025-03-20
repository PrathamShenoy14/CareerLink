import axios from "axios";

const API_URL = "http://127.0.0.1:5000"; // Flask backend

export const submitCareerTest = async (answers) => {
  try {
    const response = await axios.post(`${API_URL}/predict-career`, answers);
    return response.data; // JSON response from Flask
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};
