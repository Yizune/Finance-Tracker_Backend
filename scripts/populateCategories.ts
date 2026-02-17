import mongoose from 'mongoose';
import Transaction from '../models/Transaction.js';
import Category from '../models/Category.js';
import { connectDB } from '../config/connection.js';

(async () => {
	try {
		await connectDB();

		const uniqueCategories: string[] = await Transaction.distinct('category');
    
		const categoriesWithIds = uniqueCategories.map((category, index) => ({
			id: index + 1,
			category,
		}));

		await Category.insertMany(categoriesWithIds, { ordered: true });

		mongoose.connection.close();
	} catch (error) {
		console.error('Error populating categories:', error);
		mongoose.connection.close();
	}
})();
