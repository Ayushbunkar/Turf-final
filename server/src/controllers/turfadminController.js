import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/appError.js";
import { createObjectCsvWriter } from "csv-writer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import fsSync from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Models (resolved lazily to avoid circular imports)
let User = null;
let Turf = null;
let Booking = null;
let Admin = null;

function ensureModels() {
  if (User && Turf && Booking && Admin) return;
  const models = mongoose.models || {};
  User = User || models.User || mongoose.model("User");
  Turf = Turf || models.Turf || mongoose.model("Turf");
  Booking = Booking || models.Booking || mongoose.model("Booking");
  Admin = Admin || models.Admin || mongoose.model("Admin");
}

// -------------------- AUTH --------------------

export const registerAdmin = catchAsync(async (req, res, next) => {
  ensureModels();
  const { name, email, password, turfName, phoneNumber, secretKey } = req.body;

  if (!name || !email || !password || !turfName || !phoneNumber || !secretKey) {
    return next(
      new AppError("All fields including secretKey are required", 400)
    );
  }

  if (secretKey !== process.env.TURF_ADMIN_SECRET) {
    return next(new AppError("Invalid secret key", 403));
  }

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) return next(new AppError("Email already in use", 409));

  const hashedPassword = await bcrypt.hash(password, 12);

  const newAdmin = new Admin({
    name,
    email,
    password: hashedPassword,
    role: "turfadmin",
    turfName,
    phoneNumber,
  });

  await newAdmin.save();
  res
    .status(201)
    .json({
      message: "Turf Admin registered successfully",
      adminId: newAdmin._id,
    });
});

export const loginAdmin = catchAsync(async (req, res, next) => {
  ensureModels();
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("Email and password are required", 400));

  const admin = await Admin.findOne({ email });
  if (!admin) return next(new AppError("Admin not found", 404));

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return next(new AppError("Invalid credentials", 401));

  const token = jwt.sign(
    { id: admin._id, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.status(200).json({
    message: "Login successful",
    token,
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      turfName: admin.turfName,
      phoneNumber: admin.phoneNumber,
    },
  });
});

export const changeAdminPassword = catchAsync(async (req, res, next) => {
  ensureModels();
  const adminId = req.user?.id;
  const { oldPassword, newPassword } = req.body;

  if (!adminId) return next(new AppError("Unauthorized", 401));
  if (!oldPassword || !newPassword)
    return next(new AppError("Old and new password are required", 400));

  const admin = await Admin.findById(adminId);
  if (!admin) return next(new AppError("Admin not found", 404));

  const isMatch = await bcrypt.compare(oldPassword, admin.password);
  if (!isMatch) return next(new AppError("Old password is incorrect", 401));

  admin.password = await bcrypt.hash(newPassword, 12);
  await admin.save();

  res.status(200).json({ message: "Password changed successfully" });
});

// -------------------- DASHBOARD --------------------

export const getDashboardData = catchAsync(async (req, res, next) => {
  ensureModels();
  const userId = req.user?.id;
  if (!userId) return next(new AppError("Unauthorized", 401));

  const [turfCount, bookingAgg, userCount] = await Promise.all([
    Turf.countDocuments({ owner: userId }),
    Booking.aggregate([
      { $match: { turfOwner: mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          revenue: { $sum: { $ifNull: ["$amount", 0] } },
          completed: {
            $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
          },
          pending: {
            $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
          },
        },
      },
    ]),
    User.countDocuments({ role: "user" }),
  ]);

  const recentBookings = await Booking.find({ turfOwner: userId })
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("user", "name email")
    .populate("turf", "name");

  const agg = bookingAgg[0] || {};
  res.status(200).json({
    turfCount,
    bookingCount: agg.count || 0,
    revenue: agg.revenue || 0,
    completedBookings: agg.completed || 0,
    pendingBookings: agg.pending || 0,
    recentBookings,
    userCount,
  });
});

export const getStats = catchAsync(async (req, res, next) => {
  ensureModels();
  const userId = req.user?.id;
  if (!userId) return next(new AppError("Unauthorized", 401));

  const today = new Date();
  const lastMonth = new Date(today);
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  const [turfs, bookingsCount, revenueAgg, users] = await Promise.all([
    Turf.countDocuments({ owner: userId }),
    Booking.countDocuments({ turfOwner: userId }),
    Booking.aggregate([
      { $match: { turfOwner: mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: { $ifNull: ["$amount", 0] } } } },
    ]),
    User.countDocuments({ role: "user" }),
  ]);

  const currentRevenue = revenueAgg[0]?.total || 0;

  res.status(200).json({
    turfCount: turfs,
    bookingCount: bookingsCount,
    revenue: currentRevenue,
    userCount: users,
  });
});

// -------------------- TURF MANAGEMENT --------------------

export const getMyTurfs = catchAsync(async (req, res) => {
  ensureModels();
  const turfs = await Turf.find({ owner: req.user.id });
  res.status(200).json(turfs);
});

export const createTurf = catchAsync(async (req, res) => {
  ensureModels();
  const images = req.files?.map((f) => f.path || f.filename) || [];
  let amenities = req.body.amenities;
  if (typeof amenities === "string") {
    try {
      amenities = JSON.parse(amenities);
    } catch {}
  }

  const turf = await Turf.create({
    ...req.body,
    owner: req.user.id,
    turfOwner: req.user.id,
    images,
    amenities,
  });

  res.status(201).json({ status: "success", data: turf });
});

export const updateTurf = catchAsync(async (req, res, next) => {
  ensureModels();
  const { id } = req.params;
  const turf = await Turf.findOne({ _id: id, owner: req.user.id });
  if (!turf) return next(new AppError("Turf not found", 404));

  const newImages = req.files?.map((f) => f.path || f.filename) || [];
  const updatedImages = [...(turf.images || []), ...newImages];

  let amenities = req.body.amenities;
  if (typeof amenities === "string") {
    try {
      amenities = JSON.parse(amenities);
    } catch {}
  }

  const updatedTurf = await Turf.findByIdAndUpdate(
    id,
    { ...req.body, images: updatedImages, amenities: amenities || turf.amenities },
    { new: true, runValidators: true }
  );

  res.status(200).json({ status: "success", data: updatedTurf });
});

export const deleteTurf = catchAsync(async (req, res, next) => {
  ensureModels();
  const turf = await Turf.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
  if (!turf) return next(new AppError("Turf not found", 404));
  res.status(204).json({ status: "success", data: null });
});

// -------------------- BOOKINGS --------------------

export const getMyBookings = catchAsync(async (req, res) => {
  ensureModels();
  const bookings = await Booking.find({ turfOwner: req.user.id })
    .sort({ date: -1 })
    .populate("user", "name email")
    .populate("turf", "name");
  res.status(200).json(bookings);
});

export const getRecentBookings = catchAsync(async (req, res) => {
  ensureModels();
  const bookings = await Booking.find({ turfOwner: req.user.id })
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("user", "name email")
    .populate("turf", "name");
  res.status(200).json(bookings);
});

export const updateBookingStatus = catchAsync(async (req, res, next) => {
  ensureModels();
  const { id } = req.params;
  const { status } = req.body;
  const booking = await Booking.findOne({ _id: id, turfOwner: req.user.id });
  if (!booking) return next(new AppError("Booking not found", 404));

  booking.status = status;
  await booking.save();
  res.status(200).json({ status: "success", data: booking });
});

export const exportBookings = catchAsync(async (req, res, next) => {
  ensureModels();
  const bookings = await Booking.find({ turfOwner: req.user.id })
    .populate("user", "name email")
    .populate("turf", "name location");

  const rows = bookings.map((b) => ({
    id: b._id.toString(),
    userName: b.user?.name || "Unknown",
    userEmail: b.user?.email || "Unknown",
    turfName: b.turf?.name || "Unknown",
    location: b.turf?.location || "Unknown",
    date: b.date ? new Date(b.date).toLocaleDateString() : "",
    amount: b.amount || 0,
    status: b.status || "",
  }));

  const tempDir = path.join(__dirname, "..", "..", "temp");
  if (!fsSync.existsSync(tempDir)) await fs.mkdir(tempDir, { recursive: true });

  const fileName = `bookings-${Date.now()}.csv`;
  const filePath = path.join(tempDir, fileName);

  const csvWriter = createObjectCsvWriter({
    path: filePath,
    header: [
      { id: "id", title: "Booking ID" },
      { id: "userName", title: "User Name" },
      { id: "userEmail", title: "User Email" },
      { id: "turfName", title: "Turf Name" },
      { id: "location", title: "Location" },
      { id: "date", title: "Date" },
      { id: "amount", title: "Amount" },
      { id: "status", title: "Status" },
    ],
  });

  await csvWriter.writeRecords(rows);
  res.download(filePath, fileName, async () => {
    try {
      await fs.unlink(filePath);
    } catch {}
  });
});

//   registerAdmin,     // For registering turf admins (with secret key)
  // loginAdmin,        // For both superadmin & turfadmin login
  // getAllUsers,       // View all users (admin-only)
  // getAllBookings,    // View all bookings (admin-only)
  // changeAdminPassword, // Change password for Turf Admin
  // getAdminStats,
  // getAdminRecentActivities


export const getAdminRecentActivities = catchAsync(async (req, res, next) => {
  ensureModels();
  // Example: Fetch last 10 bookings and last 10 turfs created by this admin
  const adminId = req.user?.id;
  if (!adminId) return next(new AppError("Unauthorized", 401));

  const recentBookings = await Booking.find({ turfOwner: adminId })
    .sort({ createdAt: -1 })
    .limit(10)
    .populate("user", "name email")
    .populate("turf", "name");

  const recentTurfs = await Turf.find({ owner: adminId })
    .sort({ createdAt: -1 })
    .limit(10);

  res.status(200).json({
    recentBookings,
    recentTurfs,
  });
});
