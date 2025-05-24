import FertilizerRecommendations from "../../models/storeRecommendationFertilizer/storeRecommendationFertilizer.js";

const addOrUpdateRecommendationFertilizer = async (data, id, userId) => {
  if (id && userId) {
    console.log("update is called")
    const updatedRecord = await FertilizerRecommendations.findOneAndUpdate(
      { _id: id, userId: userId },
      { $set: data },
      { new: true, upsert: false }
    );

    if (!updatedRecord) {
      console.log("No matching record found for update.");
      return null; 
    }

    return updatedRecord
  } else {
    console.log("new record is called")
    const newRecord = new FertilizerRecommendations(data);
    return await newRecord.save();
  }
};



const getAllRecommendationFertilizer = async () => {
  return await FertilizerRecommendations.find().sort({ createdAt: -1 });
};

const getRecommendationByUserId = async (userId) => {
  return await FertilizerRecommendations.find({ userId: userId })
}

export {
  addOrUpdateRecommendationFertilizer,
  getAllRecommendationFertilizer,
  getRecommendationByUserId
};