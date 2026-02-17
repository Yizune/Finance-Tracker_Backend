import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/connection.js';
import { extractUser } from './middleware/auth.js';
import Transaction from './models/Transaction.js';
import Category from './models/Category.js';
import transactionRoutes from './routes/transactionRoutes.js';
import categoriesRoutes from './routes/categoriesRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';

dotenv.config({ path: './.env' });

const app = express();
const PORT = process.env.PORT ?? 5002;

app.use(cors());
app.use(express.json());
app.use(extractUser);

app.get('/', async (req, res) => {
	try {
		const transactions = await Transaction.find({}, '-_id');
		const categories = await Category.find({}, '-_id');
		res.json({
			message: 'Finance Tracker Backend is running.',
			transactions,
			categories
		});
	} catch (error) {
		const details = error instanceof Error ? error.message : String(error);
		res.status(500).json({ error: 'Failed to fetch demo data', details });
	}
});

app.use('/transactions', transactionRoutes);
app.use('/categories', categoriesRoutes);
app.use('/settings', settingsRoutes);

// connectDB();

let isConnected = false;
let connectPromise = connectDB()
	.then(() => {
		isConnected = true;
		console.log('MongoDB connected before handling requests.');
	})
	.catch((err) => {
		console.error('Failed to connect to MongoDB:', err);
	});

// Middleware to block requests until DB is connected
app.use(async (req, res, next) => {
	if (!isConnected) {
		await connectPromise;
		if (!isConnected) {
			return res.status(503).json({ error: 'Database not connected' });
		}
	}
	next();
});

export default app;

// For testing purposes only

// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//   });
// });

// export default app;
