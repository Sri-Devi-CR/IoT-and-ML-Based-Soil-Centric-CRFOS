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
    soilType: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } 
);

const SoilNutrient = mongoose.model('SoilNutrient', soilNutrientSchema);
export default SoilNutrient;