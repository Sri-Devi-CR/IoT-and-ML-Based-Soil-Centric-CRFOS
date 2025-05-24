import mongoose from "mongoose";

const CropRecommendationsSchema = new mongoose.Schema(
    {
        userId : {
            type: String,
        },

        N : {
            type: Number,
            required: true
        },
        P : {
            type: Number,
            required: true
        },
        K : {
            type: Number,
            required: true
        },
        soil_moisture : {
            type: Number,
            required: true
        },
        temperature : {
            type: Number,
            required: true
        },
        Region:{
            type: String,
            required: true
        },
        humidity:{
            type: Number,
            required: true
        },
        Soil_Type : {
            type: String,
            required: true
        },
        Crop: {
            type: String,
            required: true
        }
    },  {timestamps: true}
)

const CropRecommendations = mongoose.model('CropRecommendations', CropRecommendationsSchema);
export default CropRecommendations;