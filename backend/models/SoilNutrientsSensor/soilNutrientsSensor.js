import mongoose from 'mongoose';

const soilNutrientSchema = new mongoose.Schema(
  {
    n: {
      type: Number,
      required: true,
    },
    p: {
      type: Number,
      required: true,
    },
    k: {
      type: Number,
      required: true,
    },
    soilTemp: {
      type: Number,
      required: true,
    },
    soilMoisture: {
      type: Number,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } 
);

const SoilNutrientSensor = mongoose.model('SoilNutrientSensor', soilNutrientSchema);
export default SoilNutrientSensor;