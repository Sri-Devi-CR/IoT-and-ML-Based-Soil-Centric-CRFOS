import express from "express"
import {addRecommendationCrop} from "../../services/storeRecommendationCrop/storeRecommendationCrop.js"
import  {getAllRecommendationCrop , getRecommendationByUserId}  from "../../services/storeRecommendationCrop/storeRecommendationCrop.js";
const Router = express.Router();

Router.post("/", async (req,res, next)=>{
    try{
        const response = await addRecommendationCrop(req.body);
        if(response){
            res.status(200).json(response)
        }
        else{
            res.status(500).json({message: "failed adding crop recommendation"})
            console.log("failed adding data")
        }
    }catch(error){
        next(error)
    }
});

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

Router.get("/", async(req, res)=>{
    try{
        const response = await getAllRecommendationCrop();
        if(response){
            res.status(200).json(response)
        }
        else{
            res.status(500).json({message:"failed fetching all stored recommendations for crop"})
        }
    }catch(error){
        console.log("Error fetching all stored recommendations", error);
    }
})

export default Router;