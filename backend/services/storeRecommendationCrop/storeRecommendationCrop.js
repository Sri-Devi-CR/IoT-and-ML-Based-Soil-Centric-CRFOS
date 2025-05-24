import CropRecommendations from "../../models/storeRecommendationCrop/storeRecommendationCrop.js";

const addRecommendationCrop = async (data) => {
    const newRecord = new CropRecommendations(data)
    return await newRecord.save()
};


const getAllRecommendationCrop = async () => {
  return await CropRecommendations.find().sort({ createdAt: -1 }); 
};

const getRecommendationByUserId = async (userId) => {
  return await CropRecommendations.find({userId: userId})
}

export {
    addRecommendationCrop,
    getAllRecommendationCrop,
    getRecommendationByUserId
};