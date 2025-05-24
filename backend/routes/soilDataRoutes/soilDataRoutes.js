import express from "express";
import { getAllRegions, getSoilTypesByRegion, getAllCrops } from "../../services/soilDataService/soilDataService.js"

const router = express.Router();

// Route to fetch all regions
router.get("/regions", async (req, res) => {
  try {
    const regions = await getAllRegions();
    res.status(200).json(regions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/crops", async (req, res) => {
  try {
    const crops = await getAllCrops();
    res.status(200).json(crops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Route to fetch soil types by region
router.get("/soil-types/:Region", async (req, res) => {
  const { Region } = req.params;

  if (!Region) {
    return res.status(400).json({ message: "Region parameter is required." });
  }

  try {
    const soilTypes = await getSoilTypesByRegion(Region);
    // Clean and process soil types
    const cleanedSoilTypes = soilTypes
      .flatMap((type) => {
        return type
          .replace(/[\[\]']/g, "") 
          .split(/,|&/)            
          .map((item) => item.trim())
          .filter((item) => item.length > 0); 
      })
      .filter((type) => type !== ""); 

    // Return unique soil types
    const result = [...new Set(cleanedSoilTypes)];
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;