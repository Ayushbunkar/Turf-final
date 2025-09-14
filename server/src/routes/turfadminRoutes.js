import express from "express";
import * as turfadminController from "../controllers/turfadminController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`),
});
const upload = multer({ storage });

const router = express.Router();

// Auth
router.post("/register", turfadminController.registerAdmin);
router.post("/login", turfadminController.loginAdmin);

// Protected routes
router.use(protect);
router.use(restrictTo("turfadmin"));

// Admin account
router.patch("/change-password", turfadminController.changeAdminPassword);

// Dashboard
router.get("/dashboard", turfadminController.getDashboardData);
router.get("/stats", turfadminController.getStats);

// Turf
router.get("/turfs", turfadminController.getMyTurfs);
router.post("/turfs", upload.array("images", 5), turfadminController.createTurf);
router.put("/turfs/:id", upload.array("images", 5), turfadminController.updateTurf);
router.delete("/turfs/:id", turfadminController.deleteTurf);

// Bookings
router.get("/bookings", turfadminController.getMyBookings);
router.get("/bookings/recent", turfadminController.getRecentBookings);
router.get("/bookings/export", turfadminController.exportBookings);
router.patch("/bookings/:id/status", turfadminController.updateBookingStatus);

export default router;
