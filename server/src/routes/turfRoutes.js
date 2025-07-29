import express from "express";
import { getAllTurfs } from "../controllers/turfController.js";

const router = express.Router();
router.get("/", getAllTurfs); // GET /api/turfs

export default router;
