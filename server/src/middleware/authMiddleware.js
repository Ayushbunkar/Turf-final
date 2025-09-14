import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import mongoose from 'mongoose';
import { AppError } from '../utils/appError.js';
import { catchAsync } from '../utils/catchAsync.js';

// Get a reference to the existing User model without redeclaring it
let User;
try {
  // Try to get the existing model
  User = mongoose.model('User');
} catch (error) {
  // If the model doesn't exist yet, this will be handled elsewhere
  console.log("User model not available yet in authMiddleware");
}

// Add authenticate as an alias for protect
export const authenticate = catchAsync(async (req, res, next) => {
  if (!User) {
    User = mongoose.model('User'); // Try again to get the model
  }
  
  // 1) Get the token
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in. Please log in to get access', 401));
  }

  // 2) Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new AppError('The user belonging to this token no longer exists', 401));
  }

  // 4) Check if user changed password after the token was issued
  if (user.changedPasswordAfter && user.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('User recently changed password. Please log in again', 401));
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = user;
  next();
});

// Original protect function - same implementation
export const protect = catchAsync(async (req, res, next) => {
  if (!User) {
    User = mongoose.model('User'); // Try again to get the model
  }

  // 1) Get the token
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in. Please log in to get access', 401));
  }

  // 2) Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  
  if (!user) {
    return next(new AppError('The user belonging to this token no longer exists', 401));
  }

  if (user.changedPasswordAfter && user.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('User recently changed password. Please log in again', 401));
  }

  req.user = user;
  next();
});

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };
};