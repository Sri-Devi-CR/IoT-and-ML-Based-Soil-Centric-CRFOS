import SoilNutrientSensor from '../../models/SoilNutrientsSensor/soilNutrientsSensor.js';

const addSoilNutrients = async (data) => {
  const newRecord = new SoilNutrientSensor(data);
  return await newRecord.save();
};

const getAllSoilNutrients = async () => {
  return await SoilNutrientSensor.find().sort({ createdAt: -1 }); 
};

const getSoilNutrientById = async (id) => {
  const record = await SoilNutrientSensor.findById(id);
  if (!record) {
    throw new Error('Record not found');
  }
  return record;
};

const updateSoilNutrient = async (id, data) => {
  const updatedRecord = await SoilNutrientSensor.findByIdAndUpdate(id, data, { new: true });
  if (!updatedRecord) {
    throw new Error('Record not found');
  }
  return updatedRecord;
};

const deleteSoilNutrient = async (id) => {
  const deletedRecord = await SoilNutrientSensor.findByIdAndDelete(id);
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