// /server/routes/turfRoutes.js
import express from 'express';
const router = express.Router();
import Turf from '../models/turfModel.js'; // your turf schema

router.get('/', async (req, res) => {
  try {
    const turfs = await Turf.find();
    res.json(turfs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
