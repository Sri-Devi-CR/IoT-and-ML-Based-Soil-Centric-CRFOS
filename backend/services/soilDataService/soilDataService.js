import soildatas from "../../models/dataset/dataset.js"

// Function to get all unique regions
export const getAllRegions = async () => {
  try {
    const regions = await soildatas.distinct("Region");
    return regions;
  } catch (error) {
    throw new Error("Error fetching regions: " + error.message);
  }
};

export const getAllCrops = async () => {
  try {
    const crops = await soildatas.distinct("label");
    return crops;
  } catch (error) {
    throw new Error("Error fetching crops: " + error.message);
  }
};

// Function to get soil types for a given region
export const getSoilTypesByRegion = async (Region) => {
  try {
    const soilTypes = await soildatas.distinct("Soil_Type", { Region });

    if (!soilTypes || soilTypes.length === 0) {
      throw new Error("No soil types found for the given region.");
    }

    return soilTypes;
  } catch (error) {
    throw new Error("Error fetching soil types: " + error.message);
  }
};