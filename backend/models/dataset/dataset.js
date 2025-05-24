import mongoose from "mongoose";

// Define the schema
const SoilDataSchema = new mongoose.Schema({
  N: { type: Number, required: true },
  P: { type: Number, required: true },
  K: { type: Number, required: true },
  temperature: { type: Number, required: true },
  Region: { type: String, required: true },
  Soil_Type: { type: String, required: true },
  humidity: { type: Number, required: true },
  soil_moisture_range: { type: String, required: true },
  label: { type: String, required: true },
});

// Create the model
const soildatas = mongoose.model('soildatas', SoilDataSchema);
export default soildatas; // Use "export default"