import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from "cors";
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000', 
}));

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/products', productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
