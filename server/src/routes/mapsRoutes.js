import express from "express";
import { getDistance } from "../controllers/mapsController.js";
const router = express.Router();

router.post("/distance", getDistance);

export default router;
