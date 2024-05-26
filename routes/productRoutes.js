import express from "express";
import { 
    getProducts, 
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/', authMiddleware, createProduct);
router.get('/', authMiddleware, getProducts);
router.get('/:id', authMiddleware, getProducts);
router.put('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

export default router
