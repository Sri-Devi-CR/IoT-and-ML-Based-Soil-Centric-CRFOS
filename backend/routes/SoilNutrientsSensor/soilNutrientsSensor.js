import express from 'express';
import {
  addSoilNutrients,
  getAllSoilNutrients,
  getSoilNutrientById,
  updateSoilNutrient,
  deleteSoilNutrient,
} from '../../services/SoilNutrientsSensor/soilNutrientsService.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const data = req.body;
    const result = await addSoilNutrients(data);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const records = await getAllSoilNutrients();
    res.status(200).json(records);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const record = await getSoilNutrientById(id);
    res.status(200).json(record);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedRecord = await updateSoilNutrient(id, data);
    res.status(200).json(updatedRecord);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedRecord = await deleteSoilNutrient(id);
    res.status(200).json(deletedRecord);
  } catch (error) {
    next(error);
  }
});

export default router;