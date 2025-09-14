import express from 'express';
import cors from 'cors';
// Other imports...

// Make sure your models are imported/initialized first
import './models/userModel.js';
import './models/turfModel.js';
import './models/bookingModel.js';

// Then import routes that use those models
import turfadminRoutes from './routes/turfadminRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// Other middleware...

// Make uploads foldear accessible
app.use('/uploads', express.static('uploads'));

// API Routes
app.use('/api/turfadmin', turfadminRoutes);
// Other routes...

// 404 handler
app.use((req, res, next) => {
	res.status(404).json({ status: 'fail', message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
	console.error('Error:', err);
	const status = err.status || 500;
	res.status(status).json({
		status: 'error',
		message: err.message || 'Internal Server Error'
	});
});

export default app;