import Turf from "../models/Turf.js";

export async function getAllTurfs(req, res) {
  try {
    const turfs = await Turf.find();
    res.json(turfs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch turfs" });
  }
}
