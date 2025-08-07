// models/Admin.js
import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: {
    type: String,
    default: 'admin',
  },
});

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
