import SoilNutrient from '../../models/SoilNutrients/soilNutrients.js';

const addSoilNutrients = async (data) => {
  const newRecord = new SoilNutrient(data);
  return await newRecord.save();
};

const getAllSoilNutrients = async () => {
  return await SoilNutrient.find().sort({ createdAt: -1 }); 
};

const getSoilNutrientById = async (id) => {
  const record = await SoilNutrient.findById(id);
  if (!record) {
    throw new Error('Record not found');
  }
  return record;
};

const updateSoilNutrient = async (id, data) => {
  const updatedRecord = await SoilNutrient.findByIdAndUpdate(id, data, { new: true });
  if (!updatedRecord) {
    throw new Error('Record not found');
  }
  return updatedRecord;
};

const deleteSoilNutrient = async (id) => {
  const deletedRecord = await SoilNutrient.findByIdAndDelete(id);
  if (!deletedRecord) {
    throw new Error('Record not found');
  }
  return deletedRecord;
};

export {
  addSoilNutrients,
  getAllSoilNutrients,
  getSoilNutrientById,
  updateSoilNutrient,
  deleteSoilNutrient,
};