import express from 'express';
import { 
    createProduct, 
    getProducts, 
    getProduct, 
    updateProduct, 
    deleteAllProducts, 
    deleteProduct
} from '../controllers/productController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken, createProduct);
router.get('/', authenticateToken, getProducts);
router.get('/:id', authenticateToken, getProduct);
router.put('/:id', authenticateToken, updateProduct);
router.delete('/:id', authenticateToken, deleteProduct);
router.delete('/', deleteAllProducts);

export default router;
