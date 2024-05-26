import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000', 
}));

app.use(express.json());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/products', productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
