import mongoose from "mongoose";

const FertilizerRecommendationsSchema = new mongoose.Schema(
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
        soil_moisture_range : {
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
        },
        Nitrogen: {
            type: String,
            required: true
        },
        Phosphorus: {
            type: String,
            required: true
        },
        Potassium: {
            type: String,
            required: true
        }
    }, {timestamps: true}
)

const FertilizerRecommendations = mongoose.model('FertilizerRecommendations', FertilizerRecommendationsSchema );
export default FertilizerRecommendations;