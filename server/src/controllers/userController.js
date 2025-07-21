import User from '../models/User.js';

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user).select('-password');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Profile fetch failed', error: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.user,
      { name, email },
      { new: true }
    ).select('-password');

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};
