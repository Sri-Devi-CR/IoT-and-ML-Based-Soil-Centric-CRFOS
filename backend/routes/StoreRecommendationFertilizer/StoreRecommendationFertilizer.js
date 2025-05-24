import express from "express"
import {addOrUpdateRecommendationFertilizer} from "../../services/storeRecommendationFertilizer/storeRecommendationFertilizer.js"
import  {getAllRecommendationFertilizer, getRecommendationByUserId}  from "../../services/storeRecommendationFertilizer/storeRecommendationFertilizer.js";
const Router = express.Router();

Router.post("/:id?/:userId?", async (req, res, next) => {
    try {
        const response = await addOrUpdateRecommendationFertilizer(req.body, req.params.id, req.params.userId);

        if (response) {
            res.status(200).json(response);
        } else {
            res.status(500).json({ message: "Failed to add/update Fertilizer recommendation" });
        }
    } catch (error) {
        next(error);
    }
});

Router.get("/", async(req, res)=>{
    try{
        const response = await getAllRecommendationFertilizer();
        if(response){
            res.status(200).json(response)
        }
        else{
            res.status(500).json({message:"failed fetching all stored recommendations for Fertilizer"})
        }
    }catch(error){
        console.log("Error fetching all stored recommendations", error);
    }
})

Router.get("/getbyuserID/:userId", async (req,res) => {
    try{
        const response = await getRecommendationByUserId(req.params.userId);
    if(response){
        res.status(200).json(response)
    }
    else{
        res.status(500).json({message: "failed to fetch crop recommendation by user Id"})
    }
    }catch(error){
        console.log("Error in fetching crop recommendations by user ID:", error);
    }
    
})

export default Router;